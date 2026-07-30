---
title: Connecting a client
description: Add the Tophhie Cloud MCP Server to Claude and other MCP clients.
sidebar:
  order: 2
---

The server speaks **Streamable HTTP**, so any client supporting a remote MCP server over
HTTP can use it. There is no command to run and nothing to install locally.

```
https://mcp.tophhie.cloud/mcp
```

## Claude Code

```bash
claude mcp add --transport http tophhie-cloud https://mcp.tophhie.cloud/mcp
```

Then `/mcp` in a session lists the connected servers and their tools.

## Claude Desktop

Add it to your MCP settings as a remote HTTP server with the URL above. In the JSON
config that looks like:

```json
{
  "mcpServers": {
    "tophhie-cloud": {
      "type": "http",
      "url": "https://mcp.tophhie.cloud/mcp"
    }
  }
}
```

Restart the app afterwards. The tools appear under the server name.

## Other clients

Anything that accepts a remote MCP endpoint works the same way. Give it the URL, choose
HTTP or Streamable HTTP as the transport, and leave any authentication fields empty.

:::note
Some clients still default to stdio, which expects a local command rather than a URL. If
a client will only accept a command, it is too old for remote servers, and the fix is
updating it rather than working around it.
:::

## Troubleshooting

**The client connects but shows no tools.** Check the URL ends in `/mcp`. The root of
`mcp.tophhie.cloud` returns a description of the server rather than the protocol
endpoint, and some clients report that as a successful but empty connection.

**A `406 Not Acceptable` response.** The endpoint requires an `Accept` header covering
both `application/json` and `text/event-stream`. Clients send this automatically; you
only hit it testing by hand with `curl`.

**The assistant answers without calling a tool.** Not a connection problem. Ask it
explicitly to use the Tophhie Cloud tools.

**Everything times out.** Check the server directly:

```bash
curl -sS https://mcp.tophhie.cloud/
```

That returns the server name, version and endpoint path without touching the protocol at
all, so a response means the Worker is up and the problem is client-side.
