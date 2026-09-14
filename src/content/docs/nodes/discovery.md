---
title: How nodes find each other
description: Bootnodes, hostnames, and why nothing in a CreditChain config should be an IP address.
---

A new node finds the network through **bootnodes**: discovery-only servers that answer one
question — who else is here? — and store no chain data.

## Hostnames, not addresses

CreditChain's bootstrap peers are compiled into the clients **by hostname** and resolved each
time a node starts. An operator's address can change without notice; a hostname follows it,
while a literal address in a config file quietly points at whoever holds that address next.

The same rule applies to your own configuration:

- Do not set an external IP by hand. `creditchaind` resolves its public address itself.
- If you run several nodes on one host, give each its own ports, and let each advertise the
  port it is actually published on. A node that announces a port it is not reachable on looks
  exactly like a network fault.

## Behind a home router

Outbound connections are enough to follow the chain. Accepting inbound peers helps the network:
forward the peer-to-peer ports (TCP **and** UDP) to the machine running the node.
