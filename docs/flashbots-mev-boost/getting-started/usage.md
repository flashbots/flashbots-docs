# Usage

To connect to various networks, use the appropriate network flag for the specific network and relay URL, e.g. `-kiln`, `-ropsten`, `-sepolia`,  `-goerli` or `-mainnet`. You can add multiple relays comma-separated to the `-relays` flag, like this: `-relays https://relay1,https://relay2`

You can find a comprehensive list of relays at https://boost.flashbots.net

### **Mainnet Relay**

Run mev-boost pointed at our [Mainnet Relay:](https://0xac6e77dfe25ecd6110b8e780608cce0dab71fdd5ebea22a16c0205200f2f8e2e3ad3b71d3499c54ad14d6c21b41a37ae@boost-relay.flashbots.net/)

```bash
./mev-boost -mainnet -relay-check -relays https://0xac6e77dfe25ecd6110b8e780608cce0dab71fdd5ebea22a16c0205200f2f8e2e3ad3b71d3499c54ad14d6c21b41a37ae@boost-relay.flashbots.net
```

### **Goerli testnet**

Run mev-boost pointed at our [Goerli Relay](https://builder-relay-goerli.flashbots.net/):

```bash
./mev-boost -goerli -relay-check -relays https://0xafa4c6985aa049fb79dd37010438cfebeb0f2bd42b115b89dd678dab0670c1de38da0c4e9138c9290a398ecd9a0b3110@builder-relay-goerli.flashbots.net
```

### **Sepolia testnet**

Run mev-boost pointed at our [Sepolia Relay](https://builder-relay-sepolia.flashbots.net/):

```bash
./mev-boost -sepolia -relay-check -relays https://0x845bd072b7cd566f02faeb0a4033ce9399e42839ced64e8b2adcfc859ed1e8e1a5a293336a49feac6d9a5edb779be53a@builder-relay-sepolia.flashbots.net
```

## mev-boost cli arguments

```bash
$ ./mev-boost -help
Usage of ./mev-boost:
  -addr string
        listen-address for mev-boost server (default "localhost:18550")
  -debug
        shorthand for '-loglevel debug'
  -genesis-fork-version string
        use a custom genesis fork version
  -goerli
        use Goerli
  -json
        log in JSON format instead of text
  -loglevel string
        minimum loglevel: trace, debug, info, warn/warning, error, fatal, panic (default "info")
  -mainnet
        use Mainnet
  -relay-check
        check relay status on startup and on the status API call
  -relay-monitors string
        relay monitor urls - single entry or comma-separated list (scheme://host)
  -relays string
        relay urls - single entry or comma-separated list (scheme://pubkey@host)
  -request-timeout-getheader int
        timeout for getHeader requests to the relay [ms] (default 950)
  -request-timeout-getpayload int
        timeout for getPayload requests to the relay [ms] (default 4000)
  -request-timeout-regval int
        timeout for registerValidator requests [ms] (default 3000)
  -sepolia
        use Sepolia
  -version
        only print version
```


## Checking if everything works

You can check if you setup works by looking up the validator registration of your proposer using the [Relay Data API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5#308368dd0b9d4eccaa1ffad1c9e68906).

Example API URL: https://boost-relay.flashbots.net/relay/v1/data/validator_registration?pubkey=0xb606e206c2bf3b78f53ebff8be8e8d4af2f0da68646b5642c4d511b15ab5ddb122ae57b48eab614f8ca5bafbe75a5999

