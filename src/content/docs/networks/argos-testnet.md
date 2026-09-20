---
title: Argos testnet
description: Chain parameters and public endpoints for the Argos testnet.
---

Argos testnet is where the **Argos** release is proven before it is promoted to mainnet.
Test CCC has no monetary value.

## Parameters

| | |
|---|---|
| Network name | `argos-testnet` |
| Chain id | `2026042404` (`0x78c2f424`) |
| Currency | CCC (test) |
| Consensus | Proof of stake, 12-second slots, 32 slots per epoch (6 min 24 s) |
| Genesis block hash | `0xcbb0f12e2a67c07a59218baefb4eb8211d9867b52b716fb190e4df12628042c9` |
| Genesis validators root | `0x24097cf8bdc6db5cc8500ff0895a08365e8c2de8790e5bafc118177d3f571d75` |

Check the genesis hash yourself before trusting any endpoint:

```sh
curl -s https://argos.creditchain.org -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_getBlockByNumber","params":["0x0",false]}'
```

## Public endpoints

| Service | URL |
|---|---|
| JSON-RPC, pinned to Argos | `https://argos.creditchain.org` |
| JSON-RPC, current testnet | `https://testnet.creditchain.org` |
| Explorer | `https://scan.creditchain.org` |
| Faucet | `https://faucet.creditchain.org` |

`argos.creditchain.org` always means Argos. `testnet.creditchain.org` follows whichever release
is current, and will move when the next one arrives. Pin the one you mean.

## Release names

Releases are named after the city-states of ancient Greece, in rough order of antiquity.
A release is proven on `<name>-testnet` and promoted to `<name>` on mainnet, so "this was
tested" can be checked by comparing the two chains. Argos is first; Knossos is next.

## Mainnet

Argos mainnet has not launched — see [mainnet](/networks/mainnet/) for what has to be true
before it does, and how to check the chain you join is the one that was announced.
