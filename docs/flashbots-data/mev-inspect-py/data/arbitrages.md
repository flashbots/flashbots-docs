---
title: arbitrages
---
### description

an **arbitrage** is an circuit of swaps

arbitrages are joined to their corresponding swaps in the **arbitrage_swaps** table

### fields

| Column               | Type                        | Nullable | Description                                                           |
|----------------------|-----------------------------|----------|-----------------------------------------------------------------------|
| id                   | character varying(256)      | not null | unique id                                                             |
| created_at           | timestamp without time zone | not null | when the entry was added to the database                              |
| block_number         | numeric                     | not null | block number                                                          |
| transaction_hash     | character varying(256)      | not null | transaction hash                                                      |
| account_address      | character varying(256)      | not null | address that took the profit of the arb - can be a contract or an EOA |
| profit_token_address | character varying(256)      | not null | token that profit was taken in                                        |
| profit_amount        | numeric                     | not null | gross profit - note: this does not account for miner payment          |
| start_amount         | numeric                     | not null | starting amount of the profit token                                   |
| end_amount           | numeric                     | not null | end amount of the profit token                                        |

:::note

The "miner" nomenclature will be replaced in a future release to accurately reflect PoS Ethereum architecture.

:::
