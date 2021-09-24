---
title: tables
---

## classified_traces

a **classified trace** represents a single trace

classified traces optionally include:
- a classification for the call (ex: transfer, swap, liquidation)
- decoded function name and inputs

### fields

| Column             | Type                        | Nullable | Description                                                                               |
|--------------------|-----------------------------|----------|-------------------------------------------------------------------------------------------|
| classified_at      | timestamp without time zone | not null | when this trace was added to the database                                                 |
| block_number       | numeric                     | not null | block number                                                                              |
| transaction_hash   | character varying(66)       | not null | transaction hash                                                                          |
| trace_address      | integer[]                   | not null | trace address                                                                             |
| trace_type         | character varying(256)      | not null | the type of call in the trace - one of `call`, `create`, `delegate_call`, `reward`, `suicide` |
| classification     | character varying(256)      | not null | classification for the trace - one of `unknown`, `swap`, `burn`, `transfer`, `liquidate`      |
| protocol           | character varying(256)      |          | the protocol associated with the trace                                                    |
| abi_name           | character varying(1024)     |          | the ABI used to decode this trace                                                         |
| function_name      | character varying(2048)     |          | the name of the function called                                                           |
| function_signature | character varying(2048)     |          | the signature of the function called                                                      |
| inputs             | json                        |          | inputs of the function                                                                    |
| from_address       | character varying(256)      |          | from address                                                                              |
| to_address         | character varying(256)      |          | to address                                                                                |
| gas                | numeric                     |          | gas                                                                                       |
| value              | numeric                     |          | ETH value                                                                                 |
| gas_used           | numeric                     |          | gas used                                                                                  |
| error              | character varying(256)      |          | error                                                                                     |
