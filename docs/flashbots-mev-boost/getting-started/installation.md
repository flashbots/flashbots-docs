---
title: Installation
---

Get started with MEV-Boost installation with this guide. Whether you are looking to install it on a machine with the beacon client or multiple beacon clients, this guide will assist you in setting it up smoothly.

## Prerequisites

- For a comprehensive guide on preparing for the merge, refer to [Rémy Roy's guide](https://github.com/remyroy/ethstaker/blob/main/prepare-for-the-merge.md#installing-mev-boost).
- Ensure you have [Go 1.18+](https://go.dev/doc/install) installed for source-based installations.

## Installation Methods

### Using Binaries

For convenience, each release includes binaries suitable for Linux, Windows, and macOS (both amd and arm). Find the latest releases [here](https://github.com/flashbots/mev-boost/releases).

### From Source

#### Build and install with `go install`

The easiest way to build and install MEV-Boost from sources is to use `go install`. You can simply execute the `go install` command as shown below:

```bash
go install github.com/flashbots/mev-boost@latest
mev-boost -help
```

This would install the latest version of MEV-Boost in your `$GOPATH/bin` directory. You can then run the `mev-boost` command from anywhere in your terminal.

If you want to install a specific version, you can use the `@` syntax:

```bash
go install github.com/flashbots/mev-boost@VERSION
```

Simply look up the specific version you want to install in the [releases](https://github.com/flashbots/mev-boost/releases) page.

#### Clone and Build

You can also clone the repository and build the software yourself without using `go install`.

1. Clone the repository:

   ```bash
   git clone https://github.com/flashbots/mev-boost.git
   cd mev-boost
   ```

2. (Optional) To build a specific release, refer to the available [releases](https://github.com/flashbots/mev-boost/releases) and checkout the desired tag:

   ```bash
   git checkout tags/YOUR_VERSION
   ```

3. Build the software:

   ```bash
   make build
   ```

4. If you experience issues, use the portable build:

   ```bash
   make build-portable
   ```

5. Verify your installation:

   ```bash
   ./mev-boost -help
   ```

### From Docker Image

Flashbots provides maintained Docker images for MEV-Boost.

1. [Install Docker Engine](https://docs.docker.com/engine/install/).

2. Pull the latest MEV-Boost image:

   ```bash
   docker pull flashbots/mev-boost:latest
   ```

   Or pull the portable version:

   ```bash
   docker pull flashbots/mev-boost:latest-portable
   ```

3. Run the Docker image:

   ```bash
   docker run flashbots/mev-boost -help
   ```

## Systemd Configuration

To keep MEV-Boost running as a service, configure systemd by creating the systemd config file `/etc/systemd/system/mev-boost.service`.

Below is an example of a config file:

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

## Troubleshooting

If you encounter an error: [`"SIGILL: illegal instruction"`](https://github.com/flashbots/mev-boost/issues/256), you'll need to use the portable build.

There are three ways to install the portable build:

1. Use the [portable Docker image](https://hub.docker.com/r/flashbots/mev-boost/tags).
2. Build the portable version from source:

   ```bash
   make build-portable
   ```

3. Using `go install`:

   ```bash
   CGO_CFLAGS="-O -D__BLST_PORTABLE__" go install github.com/flashbots/mev-boost@latest
   ```
