---
title: The request path
description: How a request reaches the Tophhie Social PDS, and how TLS works for per-user handle subdomains.
sidebar:
  order: 21
---

What happens between a client and the PDS.

```
client
  │
  ▼
Cloudflare ─────────────── edge TLS, DDoS mitigation, WAF
  │  (Full SSL mode, re-encrypts to the origin)
  ▼
Caddy ──────────────────── origin TLS termination, reverse proxy,
  │                        on-demand certificates
  ├──► PDS Gatekeeper ───► sensitive XRPC endpoints
  │
  ▼
bluesky-social/pds ─────── localhost:3000
```

Both hops are encrypted. Cloudflare runs in Full mode, so it terminates the client's
connection and opens its own TLS connection to Caddy instead of passing through or talking
to the origin in plaintext.

## Hostnames

| Hostname | Role |
| --- | --- |
| `pds.tophhie.cloud` | The PDS service endpoint. This is what clients enter, and the basis of the service DID `did:web:pds.tophhie.cloud` |
| `tophhie.social` | The handle domain, plus the public site |
| `<handle>.tophhie.social` | One per account, such as `alice.tophhie.social` |
| `signup.tophhie.social` | Sign-up |
| `profile.tophhie.social` | Tophhie Social profile preferences |
| `api.tophhie.dev` | The Tophhie Cloud API, including PDS-related endpoints |

## On-demand TLS, and why it is needed

Every account gets its own subdomain of `tophhie.social`. Handles are created whenever
someone signs up, so the set of hostnames needing certificates is not known in advance and
cannot be enumerated into a static config.

Caddy solves this with on-demand TLS. When a request arrives for a hostname it has no
certificate for, it issues one there and then. To stop that becoming an open invitation to
make Caddy request certificates for arbitrary hostnames, on-demand issuance is gated by an
`ask` endpoint: Caddy calls out and only proceeds if the answer is yes.

Tophhie Social's ask endpoint is `api.tophhie.dev/pds/tls-check`, and following the June
2026 incident it authenticates Caddy's calls with a shared-secret header.

Issued certificates are cached in Caddy's persistent volume. That cache is a functional
dependency rather than just an optimisation, because recreating the container clears
in-memory state and forces re-issuance. That is how the June 2026 outage became visible.

### The failure mode worth understanding

This generalises to anyone running on-demand TLS behind Cloudflare.

Cloudflare's Bot Fight Mode was enabled on the `tophhie.dev` and `tophhie.cloud` zones.
Caddy's `ask` request is, by construction, an automated machine-to-machine call with no
browser characteristics, so Bot Fight Mode challenged it. Caddy could not get an answer, so
it would not issue certificates, so TLS negotiation failed with `TLSv1 alert internal
error`.

The delay is the interesting part. The toggle was flipped on the Saturday and nothing
broke, because Caddy was serving cached certificates. It broke the following Tuesday, when
a container recreate cleared the cache and issuance was attempted again, leaving three days
between cause and symptom.

Two things come out of that. Bot protection and your own automation are in tension, because
anything that distinguishes bots from humans will correctly classify your infrastructure's
callbacks as bots. And caches hide breakage: a control-plane dependency that only runs on
cache miss can be broken for days before anything fails, so monitoring the certificate
issuance path directly rather than just endpoint availability is what catches it.

The fix was to disable Bot Fight Mode and replace it with WAF custom rules that skip bot
checks for the `/pds/tls-check` path, plus the shared-secret header so the endpoint is not
simply open.

## Hosting

A single virtual machine on Microsoft Azure, with the ability to fail over to a different
Azure host. Caddy and the PDS run as containers on it.

Single-VM is an honest description of the trade-off at this scale. Host-level maintenance is
visible to users, and it is why uptime is reported at 99.9% rather than higher.

## Checking it yourself

```bash
curl https://pds.tophhie.cloud/xrpc/_health
```

Returns the running PDS version.

```bash
curl https://pds.tophhie.cloud/xrpc/com.atproto.server.describeServer
```

Returns the server's advertised capabilities: handle domains, whether invite codes are
required, contact address and policy links.
