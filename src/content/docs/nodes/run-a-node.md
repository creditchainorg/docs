---
title: Run a node
description: Run an execution client and a beacon node on Argos testnet.
---

A CreditChain node is two processes: **creditchain** (execution) and **creditbeacon** (consensus),
joined by an authenticated Engine API connection.

:::caution[Release status]
The built-in `argos-testnet` network ships in
[creditchain v2.4.0-argos-testnet](https://github.com/creditchainorg/creditchain/releases/tag/v2.4.0-argos-testnet)
and
[creditbeacon v2.4.0-argos-testnet](https://github.com/creditchainorg/creditbeacon/releases/tag/v2.4.0-argos-testnet).
Joining also needs a public checkpoint endpoint, which is not yet published. These steps have been
run end to end against Argos from outside the network's own sites.
:::

## 0. Build the clients

Both releases are source releases. creditchain needs Rust 1.95 or newer; see each repository's
README for other build prerequisites.

```sh
git clone --branch v2.4.0-argos-testnet https://github.com/creditchainorg/creditchain
(cd creditchain && cargo build --release --bin creditchaind)

git clone --branch v2.4.0-argos-testnet https://github.com/creditchainorg/creditbeacon
(cd creditbeacon && cargo build --release --bin creditbeacon)
```

The binaries are `creditchain/target/release/creditchaind` and
`creditbeacon/target/release/creditbeacon`.

## 1. A shared secret for the Engine API

```sh
mkdir -p ~/creditchain && openssl rand -hex 32 > ~/creditchain/jwt.hex
```

## 2. Execution client

```sh
creditchaind node --chain argos-testnet \
  --datadir ~/creditchain/el \
  --authrpc.jwtsecret ~/creditchain/jwt.hex \
  --http --http.api eth,net,web3
```

No genesis file and no peer list: the chain and its bootstrap peers are built into the client.

## 3. Beacon node

```sh
creditbeacon bn --network argos-testnet \
  --datadir ~/creditchain/cl \
  --execution-endpoint http://127.0.0.1:8551 \
  --execution-jwt ~/creditchain/jwt.hex \
  --checkpoint-sync-url <checkpoint endpoint>
```

**A checkpoint-sync URL is required.** A beacon node that starts from genesis cannot join Argos
today: the network uses PeerDAS, and no reachable peer currently holds data for the first epochs,
so syncing from slot 0 waits indefinitely. Starting from a recent finalized checkpoint avoids this —
a new node reaches the head in seconds and the execution client then syncs behind it.

A public Argos checkpoint endpoint is being set up; its address will be published on this page.

## 4. Check it is on the right chain

```sh
curl -s http://127.0.0.1:8545 -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_getBlockByNumber","params":["0x0",false]}'
```

The `hash` must be `0xcbb0f12e…42c9` (see [Argos testnet](/networks/argos-testnet/)).

## Ports

| Port | Protocol | Purpose | Expose publicly? |
|---|---|---|---|
| 30303 | TCP + UDP | execution peer-to-peer | yes, if you want inbound peers |
| 9000 | TCP + UDP | beacon peer-to-peer and discovery | yes, if you want inbound peers |
| 9001 | UDP | beacon QUIC transport (`--port` + 1 by default) | yes, if you want inbound peers |
| 8551 | TCP | Engine API | **never** |
| 8545 | TCP | JSON-RPC | only behind your own access control |

Discovery uses UDP. If you forward a port, forward both TCP and UDP.
