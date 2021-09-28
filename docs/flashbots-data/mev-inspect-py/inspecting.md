---
title: inspecting
---

running inspect for a block will:
- pull down traces, receipts, and block data from the RPC endpoint
- decode the traces using known ABIs
- pull out structured objects like transfers and swaps
- and save them all to the database for querying

### Inspecting a single block

Inspecting block [12914944](https://twitter.com/mevalphaleak/status/1420416437575901185)
```
kubectl exec deploy/mev-inspect-deployment -- poetry run inspect-block 12914944
```

### Inspecting many blocks

Inspecting blocks 12914944 to 12914954
```
kubectl exec deploy/mev-inspect-deployment -- poetry run inspect-many-blocks 12914944 12914954
```

### Inspecting all incoming blocks

Start a block listener with
```
kubectl exec deploy/mev-inspect-deployment -- /app/listener start
```

By default, it will pick up wherever you left off.
If running for the first time, listener starts at the latest block

See logs for the listener with
```
kubectl exec deploy/mev-inspect-deployment -- tail -f listener.log
```

And stop the listener with
```
kubectl exec deploy/mev-inspect-deployment -- /app/listener stop
```
