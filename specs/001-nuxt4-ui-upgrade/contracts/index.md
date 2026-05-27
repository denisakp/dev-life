# Contracts Index

**Feature**: `001-nuxt4-ui-upgrade`
**Date**: 2026-05-27

This feature exposes no public API, CLI, or RPC. The "contracts" here are
**internal verification contracts** that gate the migration:

| File | What it covers |
|---|---|
| [requirements.md](./requirements.md) | 20 grep/shell checks + 6 human checks mapped to FR/NFR/SC IDs in spec.md. |

## How to use

1. Before merging, run each `C*` row from `requirements.md` in order.
   First failure stops the merge.
2. Human checks (`H*`) need a reviewer present for at least one full pass
   per blog category (DevOps, Cloud, DSA, Backend, Security).
3. New requirements added to the spec MUST gain a row here (or an explicit
   "subjective" justification under the human-checks table).

## Public-API contracts

N/A — this is a portfolio site, not a library. No external consumers.

## Composable signatures

Internal composable contracts live in [`../data-model.md`](../data-model.md)
§3 (`useThemeTransition`, `usePageTransition`, `useImageFadeIn`).
