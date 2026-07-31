---
title: Customising
description: Make the page your organisation's rather than Tophhie Cloud's.
sidebar:
  label: Overview
  order: 20
---

Everything you are likely to change lives in **`src/config.ts`**. It is a single class of
static strings: the logo, the two support destinations, the wording, and the button label.

- [Configuration](/block-page/customising/configuration/) covers every setting.
- [Wording](/block-page/customising/wording/) covers what the page should actually say.
- [Styling](/block-page/customising/styling/) covers the visual side.

## The minimum to rebrand

Three values, and you are no longer showing somebody else's branding:

| Setting | Change it to |
| --- | --- |
| `HEADER_LOGO_URL` | Your logo |
| `CONTACT_EMAIL` | The address that should receive access requests |
| `CONTACT_WEB` | Your support site |

The defaults point at Tophhie Cloud's logo, help address and support portal. Leaving them
means your blocked users are emailing Tophhie Cloud, so change them before you deploy
rather than after.
