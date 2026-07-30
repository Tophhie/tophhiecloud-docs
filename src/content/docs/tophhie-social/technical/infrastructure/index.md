---
title: Infrastructure
description: The stack, hosting and operational design behind Tophhie Social.
sidebar:
  label: Overview
  order: 20
---

Written for technical readers, and for anyone running or considering running their own
PDS. For the conceptual side, see
[How it works](/tophhie-social/technical/how-it-works/).

- [The request path](/tophhie-social/technical/infrastructure/the-request-path/) covers
  Cloudflare, Caddy, TLS and the PDS itself.
- [Keeping abuse out](/tophhie-social/technical/infrastructure/keeping-abuse-out/) covers
  the controls in front of account creation and sensitive endpoints.
- [Automation and operations](/tophhie-social/technical/infrastructure/automation-and-operations/)
  covers scheduled jobs, updates, email and incident history.

## The stack

| Layer | What runs |
| --- | --- |
| Edge | Cloudflare, in Full SSL mode |
| Reverse proxy | Caddy, terminating TLS at the origin |
| Endpoint protection | PDS Gatekeeper, in front of sensitive XRPC endpoints |
| Application | The reference `bluesky-social/pds`, on `localhost:3000` |
| Host | A single virtual machine on Microsoft Azure |
| Container updates | Watchtower |
| Scheduled jobs | Azure Automation runbooks, in PowerShell |

Nothing here is bespoke at the application layer. Tophhie Social runs the same reference
PDS implementation Bluesky publishes, and the interesting decisions are all in what
surrounds it.

## Design priorities

Three things shape the choices described in this section.

It is a personal-scale service, with 14 active repositories as of October 2025, but run to
production expectations: 99.9% uptime in September 2025, and published post-incident
reports when it fails.

Abuse resistance comes ahead of convenience. An open PDS with no invite codes is an
attractive target, and has been attacked. See
[Keeping abuse out](/tophhie-social/technical/infrastructure/keeping-abuse-out/).

Destructive actions keep a human in the loop. Account deletion is reviewed and executed by
a person, and automation handles the schedule rather than the judgement.

## Open source

The user-facing tooling around the PDS, meaning the dashboard, the migration tool and the
sign-up tool, derives from the [Witchcraft Systems](https://witchcraft.systems) PDS
tooling. Tophhie Cloud open-sourced its own code in September 2025.

## Sources

This section is assembled from Tophhie Cloud's published writing, primarily:

- [Tophhie Social: October 2025 Debrief](https://www.tophhie.cloud/tophhie-social-october-2025-debrief/)
- [Tophhie Social: Attack Report Oct 2025](https://www.tophhie.cloud/tophhie-social-attack-report-oct-2025/)
- [Increased Bot Activity & What We're Doing About It](https://www.tophhie.cloud/increased-bot-activity-what-were-doing-about-it/)
- [Post Incident Report: 23rd June 2026](https://www.tophhie.cloud/post-incident-report-tophhie-social-23rd-june-2026/)
- [Post Incident Report: Email Delivery Issues, 2nd Jan 2026](https://www.tophhie.cloud/pir-email-delivery-issues-2nd-jan-2026/)
- [Announcing our Repo Deletion Process](https://www.tophhie.cloud/announcing-our-repo-deletion-process/)
