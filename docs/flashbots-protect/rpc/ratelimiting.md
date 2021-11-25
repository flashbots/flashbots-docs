---
title: Rate limiting
---

In order to protect our service from abuse, we have rate limits on the number of requests that can be made to Flashbots Protect RPC. In particular you can only make 80 rpc requests per second with a burst limit of up to 100 requests. Note that this is *requests* per second and not *transactions* submitted per second. If you are making more than 80 requests per second on average your requests will be blocked for 1 minute.

Note that you are not required to read json rpc requests to send transactions to Flashbots Protect RPC.

## Rate limiting exceptions
If you are a wallet or application integrating with protect and you require a higher rate limit please reach out to [bertcmiller](https://twitter.com/bertcmiller).