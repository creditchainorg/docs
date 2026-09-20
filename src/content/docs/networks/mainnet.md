---
title: Mainnet
description: What CreditChain mainnet will be, what has to be true before it launches, and how to check it when it does.
---

**Mainnet has not launched.** There is no mainnet chain to join, and no CCC with monetary value.
The clients enforce this rather than relying on you to read it: `--chain argos` refuses to start,
because the genesis it would need does not exist yet.

```sh
creditchaind node --chain argos
# `argos` has no genesis yet: Argos mainnet's allocation and withdrawal addresses are
# produced by the offline key ceremony, which has not run. Use `argos-testnet`.
```

The public RPC answers the same way, so an application pointed at mainnet by mistake fails
loudly instead of silently doing nothing:

```sh
curl -s https://rpc.creditchain.org -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}'
# {"error":"mainnet_launch_gated","message":"Public mainnet JSON-RPC is disabled until
#  the PoS, audit, custody, and genesis gates pass."}
```

## What mainnet will be

| | |
|---|---|
| Network name | `argos` |
| Chain id | `2026042405` (`0x78c2f425`) |
| Currency | CreditChain Coin (CCC), 18 decimals |
| Consensus | Proof of stake, 12-second slots, 32 slots per epoch |
| Clients | the same `creditchaind` and `creditbeacon` releases that run [Argos testnet](/networks/argos-testnet/) |

Contracts deployed on Argos testnet port to mainnet unchanged: same EVM, same tooling, same
addresses derivation. Build against testnet today and the work is not thrown away.

## What has to be true before launch

These are the conditions, not a schedule. A date will be announced when they are met, not before.

1. **An independent security audit** of the chain configuration, the genesis artifacts and the
   treasury contracts, with its findings resolved — not merely received.
2. **A long, clean testnet run.** Argos testnet has to demonstrate sustained finality, full
   participation and no unexplained restarts over a monitored period.
3. **A genesis produced by an offline key ceremony.** The allocation is held by contracts with
   published source — a multisig, a timelock, a vesting wallet and a rate-limited reserve — not
   by wallets. No single key controls the supply, and no key that has touched a networked machine
   holds any part of it.
4. **The genesis hash published before the chain starts**, so anyone can check that the chain they
   joined is the chain that was announced.
5. **A public checkpoint-sync endpoint**, so a new node can join without asking anyone for help.
6. **Validators across independent failure domains**, with the stake distribution stated plainly —
   including its limits.

## How to check mainnet when it launches

Do not take an endpoint's word for which chain it is. Three checks, in order:

```sh
# 1. the chain id is the one you expect
cast chain-id --rpc-url https://rpc.creditchain.org

# 2. the genesis block hash matches the published announcement
cast block 0 --field hash --rpc-url https://rpc.creditchain.org

# 3. the allocation is where the announcement says it is, and it is a contract
cast balance <announced-address> --rpc-url https://rpc.creditchain.org
cast code    <announced-address> --rpc-url https://rpc.creditchain.org   # not 0x
```

The third check is the one worth doing. An allocation at an address with no code is a balance
somebody holds a key to; an allocation at a contract is a balance governed by rules you can read.

## Until then

Everything is on [Argos testnet](/networks/argos-testnet/): RPC, explorer, faucet, and the same
clients mainnet will run. Test CCC has no monetary value, which is what makes it the right place
to make mistakes.
