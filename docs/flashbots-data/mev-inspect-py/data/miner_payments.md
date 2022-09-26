---
title: miner_payments
---
### description

a **miner payment** is how much was paid to a miner in a given transaction

miner payment includes payment through gas and coinbase transfers

### fields

| Column                           | Type                        | Nullable | Description                                            |
|----------------------------------|-----------------------------|----------|--------------------------------------------------------|
| created_at                       | timestamp without time zone | not null | when the entry was added to the database               |
| block_number                     | numeric                     | not null | block number                                           |
| transaction_hash                 | character varying(66)       | not null | transaction hash                                       |
| transaction_index                | numeric                     | not null | transaction index                                      |
| miner_address                    | character varying(256)      | not null | address of the miner                                   |
| coinbase_transfer                | numeric                     | not null | amount of ETH was paid as direct transfer to the miner |
| base_fee_per_gas                 | numeric                     | not null | base fee for this block                                |
| gas_price                        | numeric                     | not null | gas price (excludes coinbase transfer)                 |
| gas_price_with_coinbase_transfer | numeric                     | not null | gas price (includes coinbase transfer)                 |
| gas_used                         | numeric                     | not null | total gas used by the transaction                      |
| transaction_to_address           | character varying(256)      |          | to address of the transaction                          |
| transaction_from_address         | character varying(256)      |          | from address of the transaction                        |

:::note

The "miner" nomenclature will be replaced in a future release to accurately reflect PoS Ethereum architecture.

:::
