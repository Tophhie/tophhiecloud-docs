---
title: Getting started
description: Connect the Tophhie Cloud MCP Server to an AI assistant.
sidebar:
  label: Overview
  order: 1
---

There is nothing to install and no key to obtain. Point a client at the endpoint and the
tools appear.

```
https://mcp.tophhie.cloud/mcp
```

See [Connecting a client](/mcp/getting-started/connecting/) for the exact configuration
per client.

## Checking it works

Once connected, ask the assistant something that needs a tool. Good first questions,
because each maps to exactly one tool and the answer is obvious if it worked:

- "Is the Tophhie Cloud API healthy?"
- "Check the mail security for tophhie.cloud."
- "Is the handle `alice.tophhie.social` available?"

If the assistant answers from memory rather than calling a tool, say so explicitly:
"use the Tophhie Cloud tools to check".

## What it is not

It cannot change anything. There are no write tools, so an assistant connected to this
server can read Tophhie Cloud data and nothing else.

It is not a general Tophhie Cloud API client either. It exposes nine specific tools, not
the whole [API](/tophhie-api/). If you are writing software rather than connecting an
assistant, use the API directly.
