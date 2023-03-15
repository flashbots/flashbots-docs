---
title: Installation
---

The most common setup is to install MEV-Boost on the same machine as the beacon client. Multiple beacon-clients can use a single MEV-Boost instance. The default port is 18550.

See also [Rémy Roy's](https://github.com/remyroy/ethstaker/blob/main/prepare-for-the-merge.md#installing-mev-boost) guide for comprehensive instructions on installing, configuring and running MEV-Boost.


## Binaries

Each release includes binaries from Linux, Windows and macOS (portable build, for amd and arm). You can find the latest release at
https://github.com/flashbots/mev-boost/releases

## From source

Requires [Go 1.18+](https://go.dev/doc/install).

### `go install`

Install MEV-Boost with `go install`:

```bash
go install github.com/flashbots/mev-boost@latest
mev-boost -help
```

### Clone and Build

Ensure you are downloading the most updated MEV-Boost release. Releases are available at https://github.com/flashbots/mev-boost/releases

clone the repository and build it:

```bash
git clone https://github.com/flashbots/mev-boost.git
cd mev-boost

# If you want to build a specific release, check out the tag first. https://github.com/flashbots/mev-boost/releases
git checkout tags/YOUR_VERSION

# Build most recent version of MEV-Boost
make build

# Use build-portable if the standard build crashes on startup
make build-portable

# Show help. This confirms MEV-Boost is able to start
./mev-boost -help
```

## From Docker image

We maintain a MEV-Boost Docker images at https://hub.docker.com/r/flashbots/mev-boost

- [Install Docker Engine](https://docs.docker.com/engine/install/)
- Pull & run the latest image:

```bash
# Get the default MEV-Boost image
docker pull flashbots/mev-boost:latest

# Get the portable MEV-Boost image
docker pull flashbots/mev-boost:latest-portable

# Run it
docker run flashbots/mev-boost -help
```

## Systemd configuration

You can run MEV-Boost with a systemd config like this:

`/etc/systemd/system/mev-boost.service`
```ini
[Unit]
Description=mev-boost
Wants=network-online.target
After=network-online.target

[Service]
User=mev-boost
Group=mev-boost
WorkingDirectory=/home/mev-boost
Type=simple
Restart=always
RestartSec=5
ExecStart=/home/mev-boost/bin/mev-boost \
		-mainnet \
		-relay-check \
		-relays YOUR_RELAY_CHOICE

[Install]
WantedBy=multi-user.target
```

## Troubleshoot Installation

If MEV-Boost crashes with [`"SIGILL: illegal instruction"`](https://github.com/flashbots/mev-boost/issues/256) then you need to use a portable build:

You can either use a [portable Docker image](https://hub.docker.com/r/flashbots/mev-boost/tags), or install/build the portable build like this:

```bash
# using `go install`
CGO_CFLAGS="-O -D__BLST_PORTABLE__" go install github.com/flashbots/mev-boost@latest

# build from source
make build-portable
```


