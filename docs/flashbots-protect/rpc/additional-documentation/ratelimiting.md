---
title: rate limiting
---

In order to protect our service from abuse we have rate limits on the number of requests that can be made to Flashbots Protect RPC. Currently, the rate limits are set as follows:

- Maximum Requests per Second: 80 requests

- Burst Limit: Up to 100 requests


Note that this is *requests* and not *transactions* submitted per second. There is no limitation on the number of transactions in a request.
Note that you are not required to read JSON RPC requests to send transactions to Flashbots Protect RPC.


## Rate limiting exceptions

If you are a wallet or application integrating with protect and you require a higher rate limit please reach out to [bertcmiller](https://twitter.com/bertcmiller).

## Batch request support

Flashbots Protect RPC is not supporting batch JSON-RPC requests.
