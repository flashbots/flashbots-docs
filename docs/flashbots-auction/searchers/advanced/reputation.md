---
title: Searcher Reputation
---

In order to maintain reliable performance, we've introduced searcher reputation to provide consistent access to the Flashbots block builder for searchers with a good performance track record during periods of heavy load. Reputation is one of many solutions currently being explored to make Flashbots infrastructure resilient against sophisticated Layer 7 attacks. The system described on this page is likely to change and we encourage you to participate in defining the direction it will take by engaging in the [discussion board](https://github.com/flashbots/pm/discussions/79).

## Reputation queues

The current reputation system is designed to classify searchers into a high reputation and low reputation queue. The high reputation queue is designed to filter out searchers who use an excessive amount of computation resources. Otherwise, both queues are identical.

## Reputation scoring

To determine which queue a searcher belongs to, Flashbots looks at their history of submissions to the builder. Specifically, Flashbots uses the following scoring function:

$$r(U) = \frac{\sum_{T\in H_U}\Delta_{coinbase_T} + g_Tp_T}{\sum_{T\in S_U}g_T}$$

$r$: searcher reputation score.  
$H_U$: set of all transactions $T$ submitted by searcher $U$ to `eth_sendBundle` RPC and successfully landed on chain.  
$S_U$: set of all transactions $T$ submitted by searcher $U$ to `eth_sendBundle` and `eth_callBundle` RPC.  
$g_{T}$: _gas used_ by transaction $T$.  
$p_{T}$: _gas price_ of transaction $T$.  
$\Delta_{coinbase_T}$: coinbase difference from direct payment in transaction $T$.  

## Querying reputation

Flashbots uses a dynamic threshold to classify users between the high reputation and low reputation queue. The dynamic variables are: 1) the historical time period considered to calculate reputation, 2) the cutoff reputation score which classifies a searcher as "high reputation". Using a dynamic threshold allows the builder to adapt in periods of high demand and maintain high reliability for top searchers.

A searcher can query their current reputation status using the [`flashbots_getUserStats` RPC method](/flashbots-auction/searchers/advanced/rpc-endpoint#flashbots_getuserstats).

## Building reputation

Searcher reputation is associated with the signing key used to authenticate with Flashbots. That is, the ethereum address associated with the `X-Flashbots-Signature` field of your bundle submission.

As a searcher, the best way to improve your score is to only submit bundles/transactions which have a high likelihood of landing on chain.
