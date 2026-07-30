---
title: Automation and operations
description: Scheduled jobs, container updates, email delivery and incident history for Tophhie Social.
sidebar:
  order: 23
---

How Tophhie Social is kept running between incidents.

## Scheduled deletion of deactivated repos

The 14-day deletion window described in
[Leaving or moving on](/tophhie-social/technical/how-it-works/leaving-or-moving-on/) is
implemented as a scheduled job rather than a timer per account.

An Azure Automation runbook, written in PowerShell, runs daily at roughly 02:00. It queries
the PDS for deactivated repositories and acts on their age:

| Repo age since deactivation | Action |
| --- | --- |
| Day 1 | Send acknowledgement email, stating the deletion date |
| Around day 14 or 15 | Delete via `com.atproto.admin.deleteAccount`, send confirmation email |

Because it is a daily batch, deletion happens on the first run after a repo becomes
eligible, so the window is a floor rather than a deadline. The schedule is automated and the
decision is not: this job handles repos that are already deactivated, while deletion in
response to a request or to moderation is reviewed by a person. See
[Keeping abuse out](/tophhie-social/technical/infrastructure/keeping-abuse-out/).

Running this from Azure Automation rather than as a cron job on the PDS host has a useful
property. The thing that deletes data is not on the machine that holds it, so compromising
the PDS host does not directly hand over a deletion mechanism.

## Container updates

Watchtower watches for new images and updates the containers, which keeps the PDS close to
upstream without manual intervention.

It has a side effect worth knowing about, because it caused a three-day-delayed outage. A
container recreate clears in-memory state, including Caddy's certificate caches, so
automated updates periodically re-exercise cold-start paths at unpredictable times. If a
control-plane dependency is broken, an update is what surfaces it. See
[The request path](/tophhie-social/technical/infrastructure/the-request-path/#the-failure-mode-worth-understanding).

## Email

The PDS sends account and security email, meaning verification, 2FA codes, and deactivation
and deletion notices, from `donotreply@tophhie.social` via Tophhie Cloud's own email
infrastructure. The sender is configured in `pds.env`.

Email is a hard dependency rather than a nicety. Sign-in uses email 2FA, so if email delivery
fails, sign-up and sign-in fail with it.

That is what happened in January 2026. The From address was reconfigured and typed as
`donutreply@tophhie.social` instead of `donotreply@`. The address did not exist, verification
email could not be sent, and account creation returned Internal Server Errors. One character
in one config value took out sign-ups.

The general point is that config values validated by an external system rather than at
startup will fail late and loudly. A sender address that does not exist is
indistinguishable from a correct one until something tries to send.

## Monitoring and reported reliability

An internal monitoring service watches the service and raises alerts. The published figures
all come from the October 2025 debrief and are therefore historic:

| Metric | Value |
| --- | --- |
| Uptime, September 2025 | 99.9% |
| Average uptime | 99.91% |
| Mean response time | 284ms over a three-day window, noted as needing improvement |
| Requests served | 113,000 over 30 days |
| Active repositories | 14, as of 21 October 2025 |

Cloudflare blocked four attacks against Tophhie Social domains in the 30 days to that
report.

:::note
These are point-in-time figures from October 2025, kept because they usefully characterise
the scale rather than because they are current. Do not read them as an SLA.
:::

## Incident history

Tophhie Cloud publishes post-incident reports, which are the most reliable public source on
how the infrastructure actually behaves.

| Date | Incident | Cause |
| --- | --- | --- |
| 23 June 2026 | PDS unreachable | Cloudflare Bot Fight Mode blocked Caddy's on-demand TLS `ask` callback, surfacing days later on container recreate |
| 18 March 2026 | Bot sign-up wave | Insufficient controls on open account creation |
| 2 January 2026 | Verification email not delivered | Typo in the configured From address |
| 22 to 23 October 2025 | Service unavailable | DDoS on `createAccount`, with ineffective rate limiting and automated recovery that did not fire |

Read them in full:

- [Post Incident Report: 23rd June 2026](https://www.tophhie.cloud/post-incident-report-tophhie-social-23rd-june-2026/)
- [Increased Bot Activity & What We're Doing About It](https://www.tophhie.cloud/increased-bot-activity-what-were-doing-about-it/)
- [Post Incident Report: Email Delivery Issues](https://www.tophhie.cloud/pir-email-delivery-issues-2nd-jan-2026/)
- [Tophhie Social: Attack Report Oct 2025](https://www.tophhie.cloud/tophhie-social-attack-report-oct-2025/)
