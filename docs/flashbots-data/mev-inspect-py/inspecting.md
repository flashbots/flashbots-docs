---
title: inspecting
---

### Inspect a single block

Inspecting block [12914944](https://twitter.com/mevalphaleak/status/1420416437575901185)
```
kubectl exec deploy/mev-inspect-deployment -- poetry run inspect-block 12914944
```

### Inspect many blocks

Inspecting blocks 12914944 to 12914954
```
kubectl exec deploy/mev-inspect-deployment -- poetry run inspect-many-blocks 12914944 12914954
```

### Inspect all incoming blocks

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
