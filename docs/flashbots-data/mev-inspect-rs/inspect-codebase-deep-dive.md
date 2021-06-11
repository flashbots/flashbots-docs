---
title: codebase - deep dive
---

_Notes courtesy of Will Drevo, [source](https://github.com/worldveil/mev-inspect-rs/blob/master/NOTES.md)_

A deep dive into the codebase, particularly for those who are looking to get familiar with both Rust and the inspect codebase

## `main.rs`

### `main()`

This is where the execution begins, in the `main()` function. Note it is an async function, which returns a Future. [Read more here](https://rust-lang.github.io/async-book/01_getting_started/04_async_await_primer.html).

The [gumdrop::Options](https://docs.rs/gumdrop/0.5.0/gumdrop/trait.Options.html) package (crate) is used for command line option parsing. The order of arguments here matters:

```bash
# will work
./target/release/mev-inspect -u http://localhost:8080 tx 0xa72072f5041bcde89c560ba12cc00b22a87779ee369dbff81a78bba26d35e989 

# won't parse url
./target/release/mev-inspect tx 0xa72072f5041bcde89c560ba12cc00b22a87779ee369dbff81a78bba26d35e989 -u http://localhost:8080
# will return "unrecognized option `-u`"
```

We parse the arguments with `Opts::parse_args_default_or_exit()`. Next we want to retrieve a tx from a provider (ETH node), but we want to check if it's in the cache.

We use this line `let Some(ref cache) = opts.cache` to test for this. `opts.cache` is an `Option<PathBuf>`, meaning it either has no value (null), or is a `PathBuf`. `Some(&Option<PathBuf>)` returns true if the reference is non-null. Additionally, these two are the same:

```rust
// using ref operator
let Some(ref cache) = opts.cache
// is identical to
let Some(cache) = &opts.cache
```

Then we create a provider, either the [ethers::providers::Provider](https://docs.rs/ethers-providers/0.2.2/ethers_providers/struct.Provider.html), or the cached version, which reads from disk.

### `run()`

This is a complex function definition:

```rust
async fn run<M: Middleware + Clone + 'static>(provider: M, opts: Opts) -> anyhow::Result<()> { ... }
```

* takes the provider & options as input
* returns an [anyhow:::Result](https://docs.rs/anyhow/1.0.0/anyhow/type.Result.html), which is some nice syntactic sugar around catching and printing context and a backtrace if something goes wrong. See [here](https://docs.rs/anyhow/1.0.0/anyhow/trait.Context.html) specifically for how to add context inside a function. 
* defines a type `M` that accepts any type that implements the Middleware, Clone, and [static lifetime](https://doc.rust-lang.org/rust-by-example/scope/lifetime/static_lifetime.html#trait-bound) traits. This is like an interface in Java. In our code, you can see how this was done for `CachedProvider` (src/cached_provider.rs). 

We wrap our provider in a reference counter [std::styc::Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html), which is the [C++ equvilent of std::shared_ptr](https://stackoverflow.com/a/49834496), inorder to prevent memory leaks. 

We create a `mev_inspect::HistoricalPrice` object, giving it a provider, the price coming from Uniswap.

The inspectors are added to a vector. They are encased in `std::Box`es, which tells Rust to put these objects on the heap. This might seem silly at first (...after all, elements in a variable sized data structure like `Vec` (vector) [are stored in the heap](https://stackoverflow.com/a/43642518)), but since we are using generics to hold a list of objects of a different type but all implement the same interface (ie: `Vec<Box<dyn Inspector>>`), the Box has the additional benefit of preventing the compiler from complaining about not knowing how much memory to set aside a prioi. If you remove the std::Box encasement, you'll get:

```
the size for values of type `dyn mev_inspect::Inspector` cannot be known at compilation time

doesn't have a size known at compile-time
```

The [`dyn` keyword](https://doc.rust-lang.org/std/keyword.dyn.html) isn't strictly necessary (the compiler will make this trait dynamically dispatched), but know that it's depcrated and you'll get a warning.

Next we create a vector of reducers. 

After that, we create a processor. 

The connection between these different types seems to be:

- **Inspectors** are "parsers" that know how a given contract is set up, and are able to extract necessary fields
- **Reducers** are "checkers" that examine extracted fields for different MEV actions
- **Processor** is a coordinating object that takes inspectors and parsers to inspect transactions 

Next we create a database connection.

Next we match on command, but if it's a tx, we inspect.

### Inspecting a tx

We create a `mev_inspect::types::Inspection`. This seems to choose the correct inspector and from that extracts:

- status (success/fail)
- actions that happened, which can be any of the ones described [here](/docs/flashbots-data/mev-inspect-rs/inspect-codebase-design)
- protocols involved
- the sender, contract (if any), and proxy contract (if any) of the tx
- tx hsh & block height

We query the provider for:

- the gas_used (from receipt)
- the gas_price (from tx)


With the inspection, gas_price, gas_used, and pricing in hand, we can coalesce into a `mev_inspect::types::Evaluation` struct which holds:

- the `mev_inspect::types::Inspection` object
- gas_used, gas_price
- actions involved
- profit made!

Finally, we insert the evaluation into the database.

### Inspecting a block

If the command is instead for a range of blocks, we iterate through this range one by one and process the block given the usual suspects:

```rust
process_block(&mut lock, block, &provider, &processor, &mut db, &prices).await?
```

### `src/prices.rs`

First, generate the ABI with [ethers::contract::abigen](https://docs.rs/ethers-contract/0.1.3/ethers_contract/macro.abigen.html) macro for the Uniswap contract, and store it in the `abi/` folder. This will help us decode binary data from the transactions that interact with this contract. There are many resources on this, but see [SO answer here](https://ethereum.stackexchange.com/a/1171/34397).


### Sample inspector - `src/inspectors/aave.rs`

This is the inspector for Aave.

[As is customary in Rust](https://doc.rust-lang.org/std/keyword.impl.html), we define a `struct` for the data fields, and an `impl` for the methods on the object itself. 

Aave inspector doesn't need a provider because it can simply load the ABI included in the repo.

Next we implment the Inspector interface for the Aave object, which is a function that takes in a mutable inspection object that we'll write fields to as a result of the inspection logic.


### Deriving from Traits

It seems in rust that having structs derive from traits like `Debug` is universally a good idea, but there are some others to be careful of. [Good post on the subject here](https://users.rust-lang.org/t/what-traits-should-i-normally-derive/484/9).