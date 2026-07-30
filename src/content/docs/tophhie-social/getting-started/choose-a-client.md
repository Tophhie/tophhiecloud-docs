---
title: Choose a client
description: Apps you can use with a Tophhie Social account, and how to point them at the right server.
sidebar:
  order: 3
---

Tophhie Social stores your account. It does not provide the app you read and post
in, so you choose that separately. You can change it whenever you like, or use
several at once.

## Pointing an app at your account

Apps handle this one of two ways.

Newer clients use OAuth. You type your handle, `alice.tophhie.social`, and the app
works out which server hosts you on its own. Nothing else to configure.

Older sign-in flows ask for the server as well as your handle and password. When an
app wants a hosting provider, PDS, server or custom server, give it:

```
https://pds.tophhie.cloud
```

:::caution
If an app only offers "Bluesky Social" with no way to change the server, it cannot
sign you in. That is a limitation of the app rather than of your account.
:::

## Clients known to work

| Client | Platforms | Signing in |
| --- | --- | --- |
| [Bluesky](https://bsky.app) | Web, iOS, Android | Change the hosting provider on the sign-in screen from `bsky.social` to `https://pds.tophhie.cloud` |
| [Witchsky](https://witchsky.app) | Web | Enter your handle. It accepts a handle, DID or PDS address, and supports OAuth |

Many other AT Protocol clients support custom servers, and any that do will work
here. There is nothing Tophhie-specific to configure beyond the two options above.

This list is short on purpose, because a stale list of apps is worse than none. If
you have a client working against Tophhie Social, please add a row: these docs are
open source at
[Tophhie/tophhiecloud-docs](https://github.com/Tophhie/tophhiecloud-docs).

## App passwords

Where an app offers to use an app password instead of your account password, use it.
App passwords are issued per app and can be revoked one at a time, so dropping a
client you no longer trust does not mean changing your main password.

## Settings your client will not show you

Some Tophhie Social settings are specific to this server, so third-party apps do not
expose them. Those live at
[profile.tophhie.social](https://profile.tophhie.social/), and are covered in
[Your first post](/tophhie-social/getting-started/your-first-post/#settings-worth-knowing-about).
