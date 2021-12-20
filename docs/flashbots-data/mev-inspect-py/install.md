---
title: install
---

mev-inspect-py is built to run on kubernetes locally and in production

### Install dependencies

First, setup a local kubernetes deployment - we use [Docker](https://www.docker.com/products/docker-desktop) and [kind](https://kind.sigs.k8s.io/docs/user/quick-start)

If using kind, create a new cluster with:
```
kind create cluster
```

Next, install the kubernetes CLI [`kubectl`](https://kubernetes.io/docs/tasks/tools/)

Then, install [helm](https://helm.sh/docs/intro/install/) - helm is a package manager for kubernetes

Lastly, setup [Tilt](https://docs.tilt.dev/install.html) which manages running and updating kubernetes resources locally

### Start up

Set an environment variable `RPC_URL` to an RPC for fetching blocks
Example:
```
export RPC_URL="http://111.111.111.111:8546"
```

**Note: mev-inspect-py currently requires and RPC with support for OpenEthereum / Erigon traces (not geth 😔)**

Next, start all servcies with:
```
tilt up
```

Press "space" to see a browser of the services starting up

On first startup, you'll need to apply database migrations. Apply with:
```
./mev exec alembic upgrade head
```

### Tear down

First stop the running tilt window with `Ctrl+C`

Then run
```
tilt down
```
