# CreditChain Docs

Source for **https://docs.creditchain.org** — how to connect to, run, validate and build on CreditChain.

## Principles

- **Checkable.** Every parameter here can be verified against the running network, and pages say how.
- **Honest about status.** Anything not yet released is labelled as such on the page that describes it.
- **Nothing internal.** No IP addresses, internal hostnames or key material. `npm run check:sensitive`
  enforces the shapes of these on every push and pull request; the build does not run if it fails.

## Local development

```sh
npm ci
npm run dev        # http://localhost:4321
npm run check:sensitive
npm run build
```

Pages live in `src/content/docs/`. Built with [Starlight](https://starlight.astro.build).

## Security

Report vulnerabilities to **security@creditchain.org**, not in issues.
