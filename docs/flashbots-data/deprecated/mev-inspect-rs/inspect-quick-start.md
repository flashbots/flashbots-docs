---
title: quick start
---
This quickstart guide contains all the information necessary to get you up and running using [mev-inspect-rs](https://github.com/flashbots/mev-inspect-rs). If you have any questions, do not hesitate to ask on our [Forum](https://collective.flashbots.net/) or our [Discord](https://discord.gg/flashbots).


### requirements:
* Rust and Cargo, installation instructions [here](https://doc.rust-lang.org/cargo/getting-started/installation.html)
* OpenEthereum node running in archive mode with tracing enabled:
    *  `openethereum --pruning archive --tracing on`
    * If you are interested in contributing to mev-inspect but do not have access to an archive node, please reach out to us in our discord.
* Postgres instance running locally
    * Using docker: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 127.0.0.1:5432:5432 -d postgres`

### instructions:
* Fetch the repository: `git clone https://github.com/flashbots/mev-inspect-rs.git`
* Build: `cd mev-inspect-rs/ && cargo build --release`
* Run:
    * To inspect a single tx, run `./target/release/mev-inspect --db-cfg postgresql://postgres:postgres@localhost -u <link_to_archive_node> tx 0x5243f353cf41f8394ba480e3c15fb57881a5d8ec985874520a1b322ecf2519f4`
        * Note that the above command assumes postgres username + password to be "postgres", change credentials accordingly.
        * Sample output:

                Found: 0x5243f353cf41f8394ba480e3c15fb57881a5d8ec985874520a1b322ecf2519f4
                Revenue: 3137921082854343002 WEI
                Cost: 95196411000000000 WEI
                Actions: {Liquidation}
                Protocols: {Aave}
                Status: Success

    * Similarly, to inspect all transactions in an entire range of blocks, use: `./target/release/mev-inspect --db-cfg postgresql://postgres:postgres@localhost -u <link_to_archive_node> blocks -f 12472860 -t 12472867`
        * Blocks are inspected in parallel for efficiency
* Test: `cargo test`
