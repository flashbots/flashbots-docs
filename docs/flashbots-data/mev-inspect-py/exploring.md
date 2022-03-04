---
title: exploring
---

All inspect output data is stored in Postgres.

To connect to the local Postgres database for querying, launch a client container with:
```
./mev db
```

When you see the prompt
```
mev_inspect=#
```

You're ready to query!

Try finding the total number of swaps decoded with UniswapV3Pool
```
SELECT COUNT(*) FROM swaps WHERE abi_name='UniswapV3Pool';
```

or top 10 arbs by gross profit that took profit in WETH
```
SELECT *
FROM arbitrages
WHERE profit_token_address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
ORDER BY profit_amount DESC
LIMIT 10;
```

Postgres tip: Enter `\x` to enter "Expanded display" mode which looks nicer for results with many columns
