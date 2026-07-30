---
title: How it works
description: The architecture behind the Tophhie Cloud Account portal.
sidebar:
  order: 21
---

The portal exists because Microsoft does not provide a self-service account page for
Entra External ID consumer accounts. It is a Vue single-page app in front of a
Cloudflare Worker, with Microsoft Graph as the identity backend.

## The request path

```
browser (Vue SPA)              Cloudflare Worker (Hono)            Microsoft
─────────────────              ────────────────────────            ─────────
 Pinia + vue-router  ──/auth/login──▶  PKCE + auth code  ──▶  Entra (ciamlogin.com)
 opaque session cookie  ◀─/auth/callback   code exchanged  ◀──
 (no tokens in JS)      ◀───────────────  session held in KV
 fetch /api/*  ─────────────────────▶  adds bearer, refreshes  ──▶  Graph /v1.0/me…
```

## Tokens never reach the browser

The Worker is a confidential OAuth client. It runs the PKCE authorisation-code flow,
exchanges the code for tokens, and stores them in Workers KV against a session.

What the browser gets is an opaque `tca_session` httpOnly cookie. No access token, no
refresh token, and nothing readable from JavaScript.

The practical consequence: a cross-site scripting bug in the SPA cannot steal a token,
because there is no token in the page to steal. It could still make requests as you
while you are on the page, which is why the Worker exposes a small allow-list of
endpoints rather than proxying Graph wholesale.

## No blanket Graph proxy

The Worker exposes a specific set of `/api/*` routes, each mapping to one operation:
profile read and update, password change, sign-in methods, MFA state, session
revocation, sign-in history, apps, and account deletion.

That is deliberate. A general "forward anything to Graph with my token attached" proxy
would give any caller the full reach of the granted scopes. An allow-list gives them
exactly the operations the portal needs.

## Where your data lives

Nowhere in the portal. Every page fetches from Microsoft Graph when you load it, and the
portal holds no database of profiles or sign-ins. Workers KV holds sessions, not account
data.

This is why some things lag. Sign-in history in particular comes from Microsoft's audit
log, which takes a few hours to reflect a new sign-in and only retains a limited window.
The portal cannot make that faster, because it has no copy of its own to show you.

## Permissions

Some features depend on permissions granted to the app registration rather than on
anything about your account, which is why they can be present but inactive:

| Feature | Needs |
| --- | --- |
| Profile read and update | Delegated, on your behalf |
| Password change | Delegated, may require a fresh sign-in |
| Sign-in history | `AuditLog.Read.All` |
| Account deletion | `User.ReadWrite.All`, application permission with admin consent |

Account deletion is not enabled today. The endpoint exists but returns a clear "not
enabled" response until the permission is granted, and there is no button for it in the
portal. See [Your data](/account/guides/your-data/#deleting-your-account) for how to
request deletion.

## Stack

| Layer | What |
| --- | --- |
| Frontend | Vue 3, Vite, Pinia, vue-router, vue-i18n, Tailwind |
| Maps | Leaflet, for sign-in locations |
| Backend | Hono on Cloudflare Workers |
| Sessions | Workers KV |
| Identity | Microsoft Entra External ID and Microsoft Graph |
| Hosting | Cloudflare, at `myaccount.tophhie.cloud` |

The design follows the Tophhie Cloud Design System, so it matches the other Tophhie
Cloud surfaces in both light and dark themes.

## Languages

The interface ships in English, French, German and Spanish. English is the authoritative
catalog and the others fall back to it, so an untranslated string appears in English
rather than as a missing key.
