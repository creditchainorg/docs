---
title: Network upgrades
description: How CreditChain changes after launch — scheduled forks, new contracts and on-chain governance — without ever restarting the chain from a new genesis.
---

A blockchain's history is the thing its users are trusting. CreditChain therefore treats the genesis
of a production network as final: once mainnet has produced its first block, it is never restarted
from a new genesis, and no balance or history is reset. Every later change goes through one of the
paths below.

## What changes, and how

| Change | How it happens | Needs a new client release? |
|---|---|---|
| New application features (agent mandates, reputation, clearing, verifiers, tokens) | New contracts are deployed beside the old ones; nothing is edited in place | No |
| Treasury and governance actions | Transactions of the network's multisig contracts, through a timelock where funds are held, visible on-chain before they take effect | No |
| Validator set | Deposits, voluntary exits, execution-layer exits and consolidations, as on Ethereum | No |
| Gas limit | Validators' configured targets; the limit moves gradually block by block | No |
| Protocol rules (new EVM features, precompiles, blob parameters, Ethereum's future forks, CreditChain protocol features) | A **scheduled hard fork** | Yes |

## Scheduled forks

A hard fork adds a rule change that starts at a published time. The genesis block — its header, its
state and its hash — does not change. What changes is the chain's configuration: both clients read a
schedule ("from time T, apply these rules"), and a node restarted with the extended schedule keeps its
database and switches rules when the chain reaches T.

For every fork on a CreditChain network:

1. The fork is activated on the **Argos testnet first**, always.
2. The mainnet activation time and the client release are announced at least **14 days** ahead.
3. Node operators install the release and the new configuration before the activation time.
4. A node that has not been updated keeps the old rules and leaves the network at the fork. That is
   by design: it can never silently follow a chain with different rules.

The procedure has been rehearsed on a five-node test network running the mainnet launch tooling: a
blob-parameter fork was scheduled on the running chain, every node was updated and restarted on its
existing database, and the chain finalized the fork epoch with every validator participating.

### Checking that your node is ready

Before the activation time, the execution client reports the scheduled fork as `next`:

```sh
curl -s -X POST -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"eth_config","params":[]}' http://127.0.0.1:8545
```

and the consensus client lists it in its configuration:

```sh
curl -s http://127.0.0.1:5052/eth/v1/config/spec   # the fork epoch, or a new BLOB_SCHEDULE entry
```

Both must name the same moment. The execution layer activates by block timestamp and the consensus
layer by epoch; the timestamp is the beacon chain's genesis time plus the epoch's start
(`epoch × 32 slots × 12 s`).

## Contracts that ship in the genesis

A few contracts have to exist from block 0, because the protocol calls them at fixed addresses or
because they can only be placed at their usual address at the start: the deposit contract and the
system contracts of Ethereum's Prague upgrade, the deterministic deployment proxy, the Safe
contracts and Multicall3 — byte-identical to their Ethereum mainnet deployments. Everything else,
including the ERC-4337 EntryPoint and Permit2, can be deployed later at its usual address through
the deterministic deployment proxy.

## The testnet is different

Test networks may be reset before a production launch; their coins have no value. The Argos testnet
carries the same upgrade discipline as mainnet so that each fork is rehearsed where mistakes are cheap.

CreditChain mainnet is not live yet; see [Mainnet](/networks/mainnet/).
