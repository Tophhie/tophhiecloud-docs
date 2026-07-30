---
title: Platform tools
description: API health and the Tophhie Cloud policy list.
sidebar:
  order: 13
---

## check_api_health

Checks whether the [Tophhie Cloud API](/tophhie-api/) is operational. No arguments.

```json
{"result":{"content":[{"type":"text","text":"API Health Status: ok"}]},"jsonrpc":"2.0","id":2}
```

Worth knowing what this actually tells you. Every other tool here is a wrapper over that
same API, so if this reports a problem, the others will fail too. It is the first thing
to check when a tool returns nothing useful.

It does not tell you anything about the MCP server itself. For that, request the root of
`mcp.tophhie.cloud`, which answers without touching the API at all.

## fetch_tophhie_cloud_policies

Returns the policies applied across Tophhie Cloud. No arguments.

Useful in conversation, because an assistant can pull the current policy list and answer
a question against it rather than guessing from whatever it remembers.
