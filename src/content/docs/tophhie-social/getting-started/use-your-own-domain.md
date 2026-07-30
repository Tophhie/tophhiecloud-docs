---
title: Use your own domain
description: Use a domain you own as your Tophhie Social handle instead of a .tophhie.social one.
sidebar:
  order: 6
---

Tophhie Social supports custom domain handles. If you own `example.com`, you can be
`@example.com` instead of `@alice.tophhie.social`.

This is an AT Protocol feature rather than a Tophhie Social one, so it works the same
way here as anywhere else on the network. You prove you control the domain, then tell
your account to use it.

## What changes and what does not

Your handle changes. Your DID does not, so your posts, followers and everyone you
follow are unaffected. Nobody has to re-follow you.

Your old `.tophhie.social` handle stops working once you switch, and it becomes
available for someone else to claim. If the old one is written down anywhere that
matters, replace it.

## Find your DID first

You need your DID for either method below. Ask the server for it:

```bash
curl "https://pds.tophhie.cloud/xrpc/com.atproto.identity.resolveHandle?handle=alice.tophhie.social"
```

The response looks like `{"did":"did:plc:..."}`. Your client will also show your DID
somewhere in account settings.

## Prove you own the domain

Pick whichever of these you can do more easily. One is enough.

### DNS record

Add a TXT record on the `_atproto` subdomain of the handle you want:

```txt title="DNS zone record"
_atproto.example.com.  IN  TXT  "did=did:plc:your-did-here"
```

For a subdomain handle such as `social.example.com`, the record goes on
`_atproto.social.example.com`.

DNS changes take anywhere from a few minutes to a few hours to propagate. Check it
has landed before moving on:

```bash
dig +short TXT _atproto.example.com
```

### File on your web server

If you already run a web server on the domain, serve your DID as plain text from:

```
https://example.com/.well-known/atproto-did
```

The file contains the DID on its own with nothing else, no JSON and no markup:

```txt title="/.well-known/atproto-did"
did:plc:your-did-here
```

This has to be served over HTTPS with a valid certificate, and it must not redirect
elsewhere.

## Switch your handle

Once the record or file is in place, change your handle in your client. In the
Bluesky app that is under account settings, choosing the option for using a domain
you own rather than picking a new `.tophhie.social` name. The app checks the domain
and switches you over if the check passes.

Underneath, your client is calling `com.atproto.identity.updateHandle` against
`https://pds.tophhie.cloud`, and the server verifies your proof before accepting the
change.

## If verification fails

Almost always the proof is not visible yet or does not match. Check that:

- the DID in the record or file matches exactly, including the `did:plc:` prefix,
- the TXT value starts with `did=` and has no stray quotes or whitespace,
- the record is on `_atproto.` and not on the bare domain,
- DNS has actually propagated, using the `dig` command above,
- any well-known file returns plain text over HTTPS without redirecting.

Cloudflare proxying is worth a second look if you use it. A proxied record still
resolves for TXT lookups, but redirect rules and "always use HTTPS" behaviour can
interfere with the well-known file.

If the check still fails, email
[help@tophhie.cloud](mailto:help@tophhie.cloud) with the domain, your DID and which
method you used.

## Further reading

[Handles in the AT Protocol](https://atproto.com/specs/handle) is the specification,
including the resolution rules both methods follow.
