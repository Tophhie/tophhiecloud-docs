---
title: Custom handles
description: Use a domain you own as your Tophhie Social handle.
sidebar:
  order: 11
---

:::note[Placeholder]
This page is scaffolding. Replace it with the real handle verification steps.
:::

## DNS method

Document the exact `_atproto` TXT record, including the value format.

```txt title="DNS zone record"
_atproto.example.com.  IN  TXT  "did=did:plc:REPLACE_ME"
```

## HTTP method

Document the `/.well-known/atproto-did` file and what it must contain.

## Verify

Explain how the reader confirms the handle resolved, and how long propagation
usually takes.
