---
title: transfers
---
### description

a **transfer** is an ERC-20 token transfer

### fields

| Column           | Type                        | Nullable | Description                                 |
|------------------|-----------------------------|----------|---------------------------------------------|
| created_at       | timestamp without time zone | not null | when the transfer was added to the database |
| block_number     | numeric                     | not null | block number                                |
| transaction_hash | character varying(66)       | not null | transaction hash                            |
| trace_address    | character varying(256)      | not null | trace address                               |
| from_address     | character varying(256)      | not null | who the tokens are transfering from         |
| to_address       | character varying(256)      | not null | who the tokens are transfering to           |
| token_address    | character varying(256)      | not null | token address                               |
| amount           | numeric                     | not null | amount                                      |
| protocol         | character varying(256)      |          | protocol associated with the transfer       |
| error            | character varying(256)      |          | error                                       |
