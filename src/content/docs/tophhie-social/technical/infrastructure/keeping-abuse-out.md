---
title: Keeping abuse out
description: The controls protecting account creation and sensitive endpoints on Tophhie Social.
sidebar:
  order: 22
---

An open PDS with no invite codes is a standing offer to anyone who wants free accounts on a
federated network. Tophhie Social has been attacked and has had bot sign-up waves, and most
of the controls below were added in response to specific incidents rather than designed up
front.

## The controls

| Control | Protects | Added |
| --- | --- | --- |
| Email-based 2FA, via PDS Gatekeeper | Sign-in and sensitive actions | Since launch |
| Rate limiting on `com.atproto.server.createAccount` | Account creation | Tightened after October 2025 |
| ASN and IP blocking | Account creation | October 2025 onward |
| hCaptcha on the sign-up form | Account creation | March 2026 |
| Cloudflare DDoS mitigation and WAF rules | Everything | Ongoing |
| Human review of account deletion | Destructive actions | Policy |

## PDS Gatekeeper

The reference PDS exposes administrative and sensitive XRPC endpoints. PDS Gatekeeper sits
in front of them, and is also what provides email-based two-factor authentication for every
account.

The pattern is worth noting. Rather than forking the reference PDS to add authentication
requirements, the protection is a separate service in the request path, so the PDS stays
stock and upgradeable.

## The October 2025 attack

A DDoS aimed squarely at `com.atproto.server.createAccount`: 282 accounts created in 60
seconds, from varying US ISPs and hosting providers. The server was overwhelmed and became
unavailable.

There were two failures, and the second was worse than the first. Rate limiting existed but
did not work, because the logic failed to block repeated `createAccount` calls, and a
control that is present but ineffective buys false confidence. Automated recovery then did
not fire either: workflow logic flaws meant the incident response never triggered, and
restoration was manual.

No data was compromised. The attack targeted availability rather than confidentiality.

Afterwards the rate-limit thresholds were lowered and the logic fixed, and network security
rules were added to block traffic matching known bot and attacker patterns.

## The March 2026 bot wave

A rise in bot account creation, addressed with a different tool. hCaptcha was added to
account creation, and the stated effect is that programmatic account creation is no longer
possible, whether by calling the endpoint directly or going through the API.

Alongside it, rate limits were tightened further so fewer requests are allowed and lockouts
last longer, an entire ASN was blocked along with specific IP addresses, and the Tophhie
Cloud API's sign-up endpoint was retired.

That last one is the most transferable decision here. Two ways to create an account means
two sets of controls to keep in sync, and the second one is always the one that gets
forgotten. Removing the path is stronger than defending it.

## Moderation

Account review and deletion happen through an admin web interface, at
`admin.tophhie.social`.

The stated position is that account deletion should always be reviewed and executed by a
human being, and bot accounts are not auto-deleted on detection. The reasoning is
straightforward: a false positive in an automated deletion pipeline destroys a real person's
account, and getting that wrong costs more than having a human look first.

## Invite codes

Sign-ups are open. `describeServer` reports `inviteCodeRequired: false`, and the trade-off is
accepted knowingly, because openness is what makes the controls above necessary.
