---
title: Inspecting
---

Executing an inspection for a block will perform the following operations:

- Retrieve traces, receipts, and block data from the RPC endpoint.
- Decode the traces using recognized ABIs.
- Extract structured objects such as transfers and swaps.
- Store all these elements in the database for future querying.

## Examples

### Inspect a single block

Inspecting block [12914944](https://twitter.com/mevalphaleak/status/1420416437575901185):

```sh
./mev inspect 12914944
```

### Inspect many blocks

Inspecting blocks 12914944 to 12914954:

```sh
./mev inspect-many 12914944 12914954
```

### Inspect all incoming blocks

Start a block listener with:

```sh
./mev listener start
```

By default, it will pick up wherever you left off.
If running for the first time, listener starts at the latest block.

Tail logs for the listener with:

```sh
./mev listener tail
```

And stop the listener with:

```sh
./mev listener stop
```

### Backfilling

For larger backfills, you can inspect many blocks in parallel using kubernetes

To inspect blocks 12914944 to 12915044 divided across 10 worker pods:

```sh
./mev backfill 12914944 12915044 10
```

You can see worker pods spin up then complete by watching the status of all pods

```sh
watch kubectl get pods
```

To watch the logs for a given pod, take its pod name using the above, then run:

```sh
kubectl logs -f pod/mev-inspect-backfill-abcdefg
```

(where `mev-inspect-backfill-abcdefg` is your actual pod name)
