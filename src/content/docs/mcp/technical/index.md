---
title: How it works
description: Architecture and design of the Tophhie Cloud MCP Server.
sidebar:
  label: How it works
  order: 20
---

A single Cloudflare Worker running the official
[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) behind Hono.

```
MCP client (Claude, …)
   │  JSON-RPC over HTTP
   ▼
Worker (mcp.tophhie.cloud)
   ├── GET  /      ──▶ server name, version, endpoint path
   └── POST /mcp   ──▶ MCP SDK ──▶ Tophhie Cloud API ──▶ upstream services
```

## Stateless by necessity

The transport runs in stateless mode, with no session ID generator and JSON responses
enabled. That is not a preference; Workers have no persistent memory between requests, so
a session-based transport has nowhere to keep the session.

The practical effect is that a fresh `McpServer` and transport are built per request, and
every call carries everything it needs. There is no handshake to complete first and no
session to resume, which is why a bare `tools/call` works from `curl` without an
`initialize` step.

## A wrapper, not a data source

The Worker holds no data. Every tool calls the [Tophhie Cloud API](/tophhie-api/) and
formats the answer as text for a model to read.

That is why the tools are read-only and unauthenticated: the API endpoints behind them
are already public and already unauthenticated. The MCP server adds a protocol, not
access to anything new.

It also means the API's [rate limit](/tophhie-api/getting-started/rate-limits-and-errors/)
applies. Requests reach the API from the Worker rather than from you, so a burst of tool
calls counts against the Worker's address rather than the client's.

## Tools are registered per module

Each area lives in its own module and registers its own tools against the server:
domain health, Tophhie Social, health and policies. Adding an area means writing a module
and calling its register function in the factory.

Input schemas are Zod, which the SDK converts to the JSON Schema clients receive. The
descriptions on each argument matter more than usual here, because they are what the
model reads to decide how to call a tool. A vague description produces bad calls.

## Stack

| Layer | What |
| --- | --- |
| Protocol | `@modelcontextprotocol/sdk`, Streamable HTTP transport |
| HTTP | Hono on Cloudflare Workers |
| Validation | Zod |
| Bridging | `fetch-to-node`, adapting Workers' fetch API to the Node-style request and response the SDK expects |
| Data | The Tophhie Cloud API |

CORS is open, so browser-based MCP clients can reach it. Observability logging and source
map upload are both enabled on the Worker.

## Adding a tool

1. Add a `registerTool` call in the relevant module under `src/tools/`, with a title, a
   description, and a Zod input schema.
2. Write descriptions aimed at a model rather than a developer. State what the tool
   returns and when it is the right one to call.
3. If it is a new area, add a module and call its register function from the server
   factory in `src/index.ts`.

The repository is public at
[Tophhie/tophhie-cloud-mcp](https://github.com/Tophhie/tophhie-cloud-mcp).
