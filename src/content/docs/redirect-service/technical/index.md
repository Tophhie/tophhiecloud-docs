---
title: Technical
description: How the service is built, what it logs, and the rate limit.
sidebar:
  label: Overview
  order: 30
---

- [How it works](/redirect-service/technical/how-it-works/) covers the architecture of
  both halves.
- [Rate limits](/redirect-service/technical/rate-limits/) covers the limit and what
  happens when you exceed it.
- [Logging and privacy](/redirect-service/technical/logging-and-privacy/) covers what is
  recorded when a link is followed.

## In one line

Two Cloudflare Workers over one MySQL database: a public one that resolves links, and an
internal one that manages them.
