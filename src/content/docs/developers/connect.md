---
title: Connect to CreditChain
description: Add Argos testnet to a wallet, call JSON-RPC, and deploy a contract.
---

CreditChain is EVM-compatible: standard Ethereum wallets, libraries and tooling work unchanged.

## Add the network to a wallet

| Field | Value |
|---|---|
| Network name | Argos testnet |
| RPC URL | `https://argos.creditchain.org` |
| Chain id | `2026042404` |
| Currency symbol | CCC |
| Explorer | `https://scan.creditchain.org` |

## JSON-RPC

```sh
curl -s https://argos.creditchain.org -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_blockNumber","params":[]}'
```

## Deploy a contract with Foundry

Get test CCC from the [faucet](https://faucet.creditchain.org), then:

```sh
forge create src/Counter.sol:Counter \
  --rpc-url https://argos.creditchain.org \
  --account my-deployer --broadcast
```

Use an encrypted keystore (`cast wallet import my-deployer --interactive`) rather than a
private key on the command line.
