---
title: The AT Protocol
description: How the AT Protocol network fits together, and where Tophhie Social sits in it.
sidebar:
  order: 12
---

The AT Protocol splits a social network into separate parts that different people can
run. Bluesky is one application built on it. Tophhie Social is one server hosting
accounts on it.

## The three moving parts

Personal Data Servers hold accounts. Your PDS stores your repository, signs your
records as genuinely yours, and serves them to anyone who asks. Tophhie Social is a
PDS, and so is `bsky.social`, along with hundreds of others.

Relays crawl every PDS they know about and republish everything as one combined stream.
A relay does not store your account or have any authority over it. It aggregates.

AppViews consume that stream and build something usable from it: timelines, search,
notifications, follower counts. The Bluesky app you read in is a client of an AppView.

So your posts do not live in an app. They live on your PDS, and apps read them from the
aggregated stream. Changing app does not move your data, and neither does changing
server.

## Where Tophhie Social sits

```
   your app  ──────────────►  AppView  ◄────────  Relay
  (Bluesky, etc.)                                   ▲
       │                                            │ crawls
       │ writes and reads your account              │
       ▼                                            │
  Tophhie Social PDS  ────────────────────────────►─┘
  pds.tophhie.cloud
```

When you post, your app writes to Tophhie Social. Tophhie Social records it in your
repository and announces the change. Relays pick it up, AppViews index it, and it
appears in other people's feeds, including people who have never heard of
`tophhie.social`.

When you read your timeline, your app is mostly talking to an AppView rather than to
Tophhie Social. This is why timelines keep working normally during an outage here, and
why an outage affects your ability to post and to log in more than your ability to
read.

## What running your own PDS does and does not change

It changes who stores your data, who you trust to keep it available, whose terms you
are under, and which jurisdiction it sits in. Tophhie Social is hosted in the United
Kingdom.

It does not change who can follow you, who can see your posts, whether you appear in
search, or which apps you can use. A `.tophhie.social` handle is a full citizen of the
network.

## Server identity

Tophhie Social identifies itself to the network with the service DID
`did:web:pds.tophhie.cloud`. That is the server's identity, and it is separate from the
DID that identifies you, which is covered in
[Your account and your data](/tophhie-social/technical/how-it-works/your-account-and-data/).

The server also publishes its own capabilities, which any client can read:

```bash
curl https://pds.tophhie.cloud/xrpc/com.atproto.server.describeServer
```

That response is how a client discovers the available handle domains, whether an invite
code is needed, and where the terms and privacy policy live.

## Further reading

[atproto.com](https://atproto.com) has the specification and guides.
[What is the AT Protocol?](https://atproto.com/guides/overview) is the official
overview, in more depth than this page.
