---
title: rate limiting
---

We have rate limits on the number of requests that can be made to Flashbots Protect RPC in order to protect our service from abuse. Currently you can only make 80 requests per second with a burst limit of up to 100 requests.

Note that this is *requests* per second and not *transactions* submitted per second. The number of transactions in a request is not limited. 


Note that you are not required to read JSON RPC requests to send transactions to Flashbots Protect RPC.

## Rate limiting exceptions

If you are a wallet or application integrating with protect and you require a higher rate limit please reach out to [bertcmiller](https://twitter.com/bertcmiller).

## Batch request support
Flashbots Protect RPC is not supporting batch JSON-RPC requests.
