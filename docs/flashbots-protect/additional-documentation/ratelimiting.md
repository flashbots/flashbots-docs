---
title: Rate limiting
---

In order to protect our service from abuse we have rate limits on the number of requests that can be made to Flashbots Protect RPC. Currently, the rate limits are set as follows:

- There is no rate limit for `sendRawTransaction`
- Other requests are capped to 600/5min/IP

Note that this is _requests_ and not _transactions_ submitted per second. There is no limitation on the number of transactions in a request. Note that you are not required to read JSON RPC requests to send transactions to Flashbots Protect RPC.

## Rate limiting exceptions

If you are a wallet or application integrating with protect and you require a higher rate limit please reach out to [Shea Ketsdever](https://twitter.com/SheaKetsdever).

## Batch request support

Flashbots Protect RPC is not supporting batch JSON-RPC requests.
