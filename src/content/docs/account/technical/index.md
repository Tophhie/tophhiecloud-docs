---
title: Technical
description: How the Tophhie Cloud Account portal is built.
sidebar:
  label: Overview
  order: 20
---

Written for technical readers. If you just want to use the portal, the
[guides](/account/guides/) are the place to start.

- [How it works](/account/technical/how-it-works/) covers the architecture, how sign-in
  and sessions work, and where your data actually lives.

## The short version

The portal is a Vue single-page app served by a Cloudflare Worker. The Worker is a
backend-for-frontend: it holds the OAuth client, exchanges the authorisation code, keeps
the tokens server-side, and gives the browser nothing but an opaque session cookie.

Your account lives in Microsoft Entra External ID, and everything the portal shows comes
from Microsoft Graph at the moment you load the page. The portal keeps no copy.
