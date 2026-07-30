---
title: Domain tools
description: Check a domain's DNS and mail security, and list Tophhie Cloud domains.
sidebar:
  order: 11
---

## check_domain_health

Runs a full DNS and mail security health check on a domain.

| Argument | Type | Required |
| --- | --- | --- |
| `domain` | string, minimum 3 characters | Yes |

Pass a bare domain such as `example.com`. No protocol, no path.

It reports on:

- **MX records**, whether mail is routed at all
- **DMARC**, the policy telling receivers what to do with failures
- **SPF**, which servers may send as the domain
- **DKIM selectors**, the signing keys published in DNS
- **MTA-STS**, whether TLS is required for inbound mail
- **DNSSEC**, whether DNS answers are signed
- **TLS**

Each check comes back as pass, fail, warn or missing, with a readable explanation rather
than a raw record dump. That distinction matters: **missing** means nothing is published,
while **fail** means something is published and wrong. The second is usually more urgent,
because it can break mail that currently works.

This is the most useful tool here for a conversation, because an assistant can run it and
then explain what a failing DMARC policy actually means for you.

:::note
It works on any domain, not just Tophhie Cloud ones. Everything it reads is public DNS,
so pointing it at a domain you do not own tells you nothing you could not have looked up
yourself.
:::

## list_domains

Returns the domains registered in Tophhie Cloud. No arguments.

Useful as a first step: ask for the list, then check the health of anything on it.
