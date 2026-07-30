---
title: Connecting other AI apps
description: Use Marvelist from Claude, ChatGPT and other MCP-compatible AI clients.
sidebar:
  order: 62
---

As well as the assistant inside Marvelist, you can connect Marvelist to AI apps you already
use, so they can work with your lists directly.

This is a [Premium](/marvelist/premium/) feature.

## How it works

Marvelist runs a server speaking the **Model Context Protocol**, the standard AI clients
use to connect to outside tools. Adding it to a client gives that client a set of Marvelist
tools it can call on your behalf.

Find it at **Settings → AI Assistant → Connect to an AI Assistant**, which explains the
feature and gives you the connector URL to copy.

## Connecting

1. Open your AI client's settings and find **Connectors**, **Custom connectors** or **MCP
   servers**.
2. Add a new connector and paste the Marvelist URL.
3. When prompted, sign in with your Tophhie Cloud account and approve access. Have your
   two-factor code to hand, because you may be asked for it.
4. Ask your assistant to show or update your lists and tasks.

## The URL is not a secret

The connector URL is the same for everyone. It is a public address, not a key, so there is
nothing to leak by sharing it and nothing to rotate.

Access is granted at step 3, when you sign in and approve it. That sign-in is what ties the
connection to your account, and it is the step to pay attention to: approve it only in a
client you are willing to give your lists to.

## What a connected client can do

View and manage your lists, tasks, groups, events and RSVPs.

Note "manage". This is not a read-only connection: a connected client can create, change
and complete things. That is the point of it, and it is also the reason to think about
which clients you connect.

Anything a connected app changes is recorded in
[change history](/marvelist/lists-and-tasks/change-history/) as done by "a connected app",
separately from changes made by you or by Marvelist AI. If something has moved and you
cannot account for it, that is where to look.

## Which clients work

| Client | Notes |
| --- | --- |
| Claude | Desktop and web, as a custom connector |
| ChatGPT | Named as supported |
| Others | Any MCP-compatible client, using its HTTP or remote server option |

## How this differs from the built-in assistant

[Marvelist AI](/marvelist/marvelist-ai/chat-and-insights/) knows only Marvelist. A
connected client can combine Marvelist with everything else it is connected to, which is
what makes it worth setting up: "put the actions from that document on my launch list" is a
sentence only the connected client can act on.

## Turning it off

Remove the connector in your AI client. Since the URL is not a credential, there is nothing
to revoke on the Marvelist side.

If you want to be thorough about access rather than just disconnecting a client, the
approval you gave lives with your Tophhie Cloud account. See
[Tophhie Cloud Account](/account/).
