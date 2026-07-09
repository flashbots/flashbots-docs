---
title: Vulnerabilities
---

If you find a security vulnerability on this project or any other initiative related to Flashbots, please let us know sending an email to security@flashbots.net.
# Security Audits

- [20220620](https://github.com/flashbots/mev-boost/blob/develop/docs/audit-20220620.md), by [lotusbumi](https://github.com/lotusbumi).

### Bug Bounties

#### Post-mortem for a relay vulnerability leading to proposers falling back to local block production

- On November 10, 2022, a vulnerability in the Flashbots relay was exploited, causing block proposers to fall back to local block production instead of MEV-Boost blocks. The issue stemmed from incorrect `timestamp` and `prev_randao` values in block builder submissions, leading to their rejection by the beacon node. The vulnerability was responsibly disclosed by the [Manifold Finance team](https://twitter.com/foldfinance), and a fix was implemented and deployed by collaborating with various security and engineering teams. The incident affected approximately 350 blocks but did not result in proposers missing slots. 

For more details, ["Post-mortem for a relay vulnerability leading to proposers falling back to local block production (Nov. 10, 2022)"](https://collective.flashbots.net/t/post-mortem-for-a-relay-vulnerability-leading-to-proposers-falling-back-to-local-block-production-nov-10-2022/727)
