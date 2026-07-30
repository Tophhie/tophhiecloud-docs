---
title: Leaving or moving on
description: Deactivation, deletion, and moving a Tophhie Social account to another server.
sidebar:
  order: 14
---

There are two different exits, and they are not the same thing. Moving takes your account
somewhere else and keeps it, with the same DID, posts and followers. Deleting ends the
account and removes your repository from this server.

## Moving to another server

Because your identity is a DID rather than a hostname, moving servers is a first-class
operation rather than an export. Your followers do not have to do anything and will not
notice.

Mechanically it means creating the account on the new server, copying the repository and
blobs across, then updating your DID's record so it points at the new server. That last
step is the one that needs proof it is really you, which is why a confirmation token gets
emailed to you partway through.

The [Move from Bluesky](/tophhie-social/getting-started/move-from-bluesky/) guide walks
the same process in the other direction, and the tooling works both ways. If you are
leaving Tophhie Social for somewhere else, the destination values change and nothing else
does.

:::tip
Whichever direction you move, check your images afterwards. Blobs copy separately from
records and can lag, and the check is much easier to do straight away than months later.
:::

## Deleting your account

Deletion here is deliberately not instant, and deliberately not fully automatic at the
point of request.

Deactivating an account starts a grace period of roughly 14 days. During it nothing is
destroyed, and you can change your mind or export your data. After it, the repository is
deleted from the server.

You are told at both ends:

| When | What happens |
| --- | --- |
| Day 1 | An acknowledgement email confirming deactivation, stating the date deletion will happen |
| Around day 14 or 15 | The repository is deleted, and a confirmation email is sent |

The deletion itself runs from a scheduled job rather than being triggered by hand. See
[Automation and operations](/tophhie-social/technical/infrastructure/automation-and-operations/)
for how that works.

:::caution
Deletion removes your repository from Tophhie Social. It cannot reach copies that already
left the server, so relays, AppViews, other people's clients and anyone who archived your
posts are all outside this server's control. That is how a public federated network
behaves rather than a limitation specific to Tophhie Social.
:::

### Your DID after deletion

Your DID is not owned by Tophhie Social, so deleting your account here does not destroy
it. What it does is leave the DID pointing at a server that no longer has your data. If
you might want the identity later, move it instead of deleting it.

### Requesting deletion

Start from your client's account settings if it offers deactivation, or email
[help@tophhie.cloud](mailto:help@tophhie.cloud).

Account deletion at Tophhie Social is reviewed and executed by a person rather than being
fully automated on request. That is a deliberate choice, on the grounds that irreversible
account destruction should not be something a bug or a bad actor can trigger unattended.

## Backing up first

Whatever you are planning, having your own copy first is sensible. Your client may have
its own export. Otherwise `com.atproto.sync.getRepo` against `https://pds.tophhie.cloud`
returns your repository as a CAR file, though note that covers records only and blobs are
separate. [PDS MOOver](https://pdsmoover.com/info) offers a free automated backup service
covering both your repository and your blobs, plus a restore path.

:::note
PDS MOOver is a third-party service and is not operated by Tophhie Cloud. Its backups are
stored on its own infrastructure. Read its terms before relying on it.
:::
