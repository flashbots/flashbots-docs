# Relay API Specification

The current specification for the [open-source Flashbots relay](https://github.com/flashbots/mev-boost-relay). Diagram below displays the current architecture:

![Flashbots Relay](https://flashbots.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc4460f24-9643-470a-a956-d886bf92e354%2FScreenshot_2022-06-22_at_17.54.56.png?table=block&id=ed097235-1a1d-497f-b3a4-f2c4673ac26e&spaceId=df6156be-4a40-4dc3-9a41-d3def62df57a&width=2000&userId=&cache=v2)

### [Proposer API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

Standard [builder spec](https://ethereum.github.io/builder-specs/#/Builder) APIs

- [registerValidator](https://ethereum.github.io/builder-specs/#/Builder/registerValidator): `POST /eth/v1/builder/validators`
- [getHeader](https://ethereum.github.io/builder-specs/#/Builder/getHeader): `GET  /eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` - Get an execution payload header.
- [submitBlindedBlock](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock): `POST /eth/v1/builder/blinded_blocks` - Submit a signed blinded block and get unblinded execution payload.
- [status](https://ethereum.github.io/builder-specs/#/): `GET /eth/v1/builder/status`

### [Block Builder API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

Get a list of validator registrations for the current and next epoch, submit a new block to the relay.

### [Data API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

Provides data about received blocks from builders, payloads delivered to proposers as well as insights into validator registrations.