---
title: Validators
description: What running a validator commits you to on CreditChain.
---

A validator stakes CCC and signs blocks and attestations. It is paid for doing that correctly
and penalised for being offline or for signing contradictory messages.

## The decision that cannot be undone

A validator's **withdrawal address** is fixed when it is deposited. Once set to an execution
address (`0x01` credentials) it cannot be changed; the only remedy for a wrong address is to
exit the validator and deposit again. Verify it before you broadcast a deposit — after is too late.

Use an address you control and can recover: ideally a multisig, never an exchange deposit
address, never a key held on the signing machine.

## Settings you can change

The **fee recipient**, graffiti and gas limit can be changed while the validator runs, through
the validator client's standard Keymanager API. No restart, no chain transaction.

## Rules that protect your stake

- Run **exactly one** instance of each validator key. Two signers for one key is a slashable offence.
- Keep the slashing-protection database with the key when moving machines.

## Launchpad

A staking Launchpad is in development. It is being built for mainnet from the start: it checks
each deposit's withdrawal credentials against what you intend and refuses to continue on a mismatch.
