---
title: Reference
description: The parameters the page understands and how it behaves.
sidebar:
  label: Overview
  order: 30
---

- [Parameters](/block-page/reference/parameters/) lists every query parameter the page
  reads, and what it does with each.

## Behaviour in short

The page reads its parameters from the URL in the browser. There is no server, so nothing
is looked up, validated against Cloudflare or stored. What you see is what was in the link.

Rows with no value are dropped rather than shown empty, and if nothing meaningful arrives
the page falls back to its no-metadata wording.
