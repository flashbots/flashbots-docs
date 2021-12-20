---
title: inspecting
---

running inspect for a block will:
- pull down traces, receipts, and block data from the RPC endpoint
- decode the traces using known ABIs
- pull out structured objects like transfers and swaps
- and save them all to the database for querying

### Inspect a single block

Inspecting block [12914944](https://twitter.com/mevalphaleak/status/1420416437575901185):

```
./mev inspect 12914944
```

### Inspect many blocks

Inspecting blocks 12914944 to 12914954:

```
./mev inspect-many 12914944 12914954
```

### Inspect all incoming blocks

Start a block listener with:

```
./mev listener start
```

By default, it will pick up wherever you left off.
If running for the first time, listener starts at the latest block.

Tail logs for the listener with:

```
./mev listener tail
```

And stop the listener with:

```
./mev listener stop
```

### Backfilling

For larger backfills, you can inspect many blocks in parallel using kubernetes

To inspect blocks 12914944 to 12915044 divided across 10 worker pods:
```
./mev backfill 12914944 12915044 10
```

You can see worker pods spin up then complete by watching the status of all pods
```
watch kubectl get pods
```

To watch the logs for a given pod, take its pod name using the above, then run:
```
kubectl logs -f pod/mev-inspect-backfill-abcdefg
```

(where `mev-inspect-backfill-abcdefg` is your actual pod name)
