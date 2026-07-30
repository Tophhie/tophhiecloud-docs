---
title: Domain tools
description: Check the DNS and mail security of a Tophhie Cloud domain, and list the domains.
sidebar:
  order: 11
---

## check_domain_health

Returns the DNS and mail security posture of a Tophhie Cloud domain.

| Argument | Type | Required |
| --- | --- | --- |
| `domain` | string, minimum 3 characters | Yes |

Pass a bare domain such as `tophhie.cloud`. No protocol, no path.

:::caution[Tophhie Cloud domains only]
This only works on domains registered in Tophhie Cloud. Anything else comes back with:

> Domain 'example.com' is not a Tophhie Cloud domain. You can use the 'list_domains'
> tool to get a list of all Tophhie Cloud domains.

It is not a general-purpose domain checker. Use
[`list_domains`](#list_domains) first if you are unsure what is covered.
:::

## What it reports

| | |
| --- | --- |
| Registration | When the domain was registered, and whether it is the primary domain |
| Name servers | The authoritative name servers |
| Mail routing | MX records |
| DMARC | The policy, such as `reject`, and the reporting contacts |
| SPF | The policy, such as `hardfail` |
| MTA-STS | Whether it is enabled, the enforcement mode, and the policy URL |
| DKIM | Whether Microsoft 365 DKIM is configured |
| DNSSEC | Whether it is enabled |
| TLS and HTTPS | Minimum TLS version, Always Use HTTPS, HTTP/3, automatic HTTPS rewrites |
| Abuse contact | The published abuse address |

This is the most useful tool here for a conversation. An assistant can pull the current
state and then explain what a `hardfail` SPF policy or a missing MTA-STS record actually
means, rather than you reading raw DNS yourself.

Everything it returns is published DNS and public configuration, so nothing here is
sensitive on its own.

## list_domains

Returns the domains registered in Tophhie Cloud. No arguments.

Worth calling first. It tells you exactly which domains `check_domain_health` will accept,
which saves a round trip through the not-a-Tophhie-Cloud-domain response.
