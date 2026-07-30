---
title: Tools
description: The nine read-only tools the Tophhie Cloud MCP Server exposes.
sidebar:
  label: Overview
  order: 10
---

Nine tools, all read-only, grouped by what they cover.

| Tool | Arguments | Page |
| --- | --- | --- |
| `check_domain_health` | `domain` | [Domains](/mcp/tools/domains/) |
| `list_domains` | none | [Domains](/mcp/tools/domains/) |
| `get_pds_repos` | none | [Tophhie Social](/mcp/tools/tophhie-social/) |
| `verify_pds_handle_availability` | `handle` | [Tophhie Social](/mcp/tools/tophhie-social/) |
| `get_pds_bsky_heatmap` | `year` | [Tophhie Social](/mcp/tools/tophhie-social/) |
| `get_pds_blob_storage_usage` | none | [Tophhie Social](/mcp/tools/tophhie-social/) |
| `get_pds_blob_storage_usage_for_did` | `did` | [Tophhie Social](/mcp/tools/tophhie-social/) |
| `check_api_health` | none | [Platform](/mcp/tools/platform/) |
| `fetch_tophhie_cloud_policies` | none | [Platform](/mcp/tools/platform/) |

## Listing them yourself

This page can go stale; the server cannot. Ask it directly:

```bash
curl -sS -X POST https://mcp.tophhie.cloud/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

The response includes each tool's name, title, description and JSON Schema, which is
exactly what a connected assistant sees.

## What they return

Every tool returns text content rather than structured JSON. That is normal for MCP: the
result is meant to be read by a model, so it comes back as a readable string rather than
something you would parse.

If you want parseable output, call the [Tophhie Cloud API](/tophhie-api/) directly. The
MCP server is a wrapper over it, and the API returns JSON.
