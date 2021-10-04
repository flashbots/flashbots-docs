---
title: swaps
---
### description

a **swap** is a swap between two ERC-20 tokens

### fields
| Column            | Type                        | Nullable | Description                               |
|-------------------|-----------------------------|----------|-------------------------------------------|
| created_at        | timestamp without time zone | not null | when the entry was added to the database  |
| block_number      | numeric                     | not null | block number                              |
| transaction_hash  | character varying(66)       | not null | transaction hash                          |
| trace_address     | integer[]                   | not null | trace address                             |
| abi_name          | character varying(1024)     | not null | name of the ABI used to decode the swap   |
| pool_address      | character varying(256)      | not null | pool address                              |
| from_address      | character varying(256)      | not null | address where tokens are coming from      |
| to_address        | character varying(256)      | not null | address where swapped tokens are going to |
| token_in_address  | character varying(256)      | not null | address of the token going in             |
| token_in_amount   | numeric                     | not null | amount of the token going in              |
| token_out_address | character varying(256)      | not null | address of the token going out            |
| token_out_amount  | numeric                     | not null | amount of the token going out             |
| protocol          | character varying(256)      |          | protocol                                  |
| error             | character varying(256)      |          | error                                     |
