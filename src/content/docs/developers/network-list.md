---
title: Network list for wallets
description: The machine-readable list of CreditChain networks that wallets and tools should read, and the checks to run before trusting it.
---

CreditChain publishes its networks as one JSON document:

```
https://docs.creditchain.org/networks.json
```

Wallets, explorers and SDKs should read this instead of copying chain parameters by hand. It is
the same information as the [Argos testnet](/networks/argos-testnet/) and
[mainnet](/networks/mainnet/) pages, in a form a program can consume.

## What it contains

Each entry in `networks` describes one network:

| Field | Meaning |
|---|---|
| `id` | Stable identifier, e.g. `argos-testnet`. Never reused. |
| `name` | Display name. |
| `status` | `active`, `planned` or `retired`. Only `active` networks may be offered as connectable. |
| `testnet` | `true` for networks whose coin has no monetary value. |
| `featured` | `true` for networks a wallet should show prominently. |
| `chainId`, `chainIdHex` | The EIP-155 chain id. Never changes for a given `id`. |
| `genesisHash` | Hash of block 0, or `null` where no genesis exists. |
| `nativeCurrency` | `CreditChain Coin`, symbol `CCC`, 18 decimals. |
| `rpc`, `ws` | Public JSON-RPC endpoints. Only endpoints that work are listed; an empty list means none. |
| `explorer` | Explorer home plus link templates for `{hash}`, `{address}` and `{number}`. |
| `faucet` | Where to request test coins, on test networks only. |
| `notice` | Shown to users verbatim when a network is not active. |

## Check before you trust

The list tells you what to expect; the chain tells you what you actually reached. Before using an
RPC endpoint, confirm both:

```sh
cast chain-id --rpc-url https://testnet.creditchain.org            # must equal chainId
cast block 0 --field hash --rpc-url https://testnet.creditchain.org # must equal genesisHash
```

An endpoint that answers with a different chain id or genesis hash is not the network it claims to
be, whatever its hostname says. Do not use it.

## Compatibility promise

- An `id` and its `chainId` never change, and are never reused for a different network.
- `status` moves forward only: `planned` → `active` → `retired`.
- New fields may be added at any time; read what you understand and ignore the rest.
- A change that would break existing readers increments `schemaVersion`.
- `ws` is empty today because the public WebSocket endpoint is not yet available. It will be
  listed here when it works, not before.

CreditChain mainnet is listed with `status: "planned"` and no RPC. It is not live; a wallet should
show it as unavailable, never as connectable. Test CCC has no monetary value.
