---
title: Tophhie Social tools
description: Repositories, handle availability, posting heatmap and storage usage.
sidebar:
  order: 12
---

Five tools covering [Tophhie Social](/tophhie-social/), the UK-hosted AT Protocol server.

## get_pds_repos

Lists the repositories currently on the server. No arguments.

A repository is one account's data, so this is effectively the account list. See
[Your account and your data](/tophhie-social/technical/how-it-works/your-account-and-data/)
for what a repository actually contains.

## verify_pds_handle_availability

Checks whether a handle can still be registered.

| Argument | Type | Required |
| --- | --- | --- |
| `handle` | string, minimum 3 characters | Yes |

Pass the full handle, such as `alice.tophhie.social`. A custom domain works too. Do not
include the `@`.

Returns available or unavailable, which makes it the natural tool to reach for when
someone is picking a name during
[sign-up](/tophhie-social/getting-started/create-an-account/).

## get_pds_bsky_heatmap

Returns posting activity across a year, as a count per day.

| Argument | Type | Required |
| --- | --- | --- |
| `year` | integer, 2020 to the current year | Yes |

The shape a contribution graph is drawn from. An assistant can use it to answer questions
about posting patterns over time rather than just totals.

## get_pds_blob_storage_usage

Returns total blob storage used across the server. No arguments.

Blobs are images and video, stored separately from the records that reference them.

## get_pds_blob_storage_usage_for_did

The same figure for one account.

| Argument | Type | Required |
| --- | --- | --- |
| `did` | string | Yes |

Takes a DID, not a handle, so `did:plc:...` rather than `alice.tophhie.social`. If you
only have the handle, resolve it first:

```bash
curl "https://pds.tophhie.cloud/xrpc/com.atproto.identity.resolveHandle?handle=alice.tophhie.social"
```

The distinction is deliberate rather than awkward: handles change and DIDs do not, so
storage is tracked against the thing that stays constant. See
[Your account and your data](/tophhie-social/technical/how-it-works/your-account-and-data/).
