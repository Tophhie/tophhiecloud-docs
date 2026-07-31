---
title: Managing redirects
description: The admin portal, who can use it, and how links are created and retired.
sidebar:
  label: Overview
  order: 20
---

:::note[Internal to Tophhie Cloud]
The admin portal is for Tophhie Cloud staff. It is not open for public sign-up, and there
is no self-service route to creating a short link. If you want one, ask.

The links it produces are entirely public. Anyone can follow them.
:::

Short links are created and edited in a web portal at `redirect-admin.tophhie.cloud`,
which signs you in with your Microsoft Entra account.

- [Signing in](/redirect-service/managing/signing-in/) covers access and what happens if
  you are refused.
- [Creating and editing links](/redirect-service/managing/creating-and-editing/) covers
  the fields and the rules they have to satisfy.
- [Link states](/redirect-service/managing/link-states/) covers the two switches, which
  are the part that catches people out.
- [Admin API](/redirect-service/managing/api/) covers the endpoints behind the portal.

## What the portal is for

Making a link, pointing it somewhere, publishing it or not, and retiring it later. That is
the whole job.

It is worth reading [Link states](/redirect-service/managing/link-states/) before your
first edit. The two switches are named **Indexed** and **Public**, and the first one does
more than its name suggests: it decides whether the link works at all, not just whether it
is listed.
