---
title: Logging and privacy
description: What is recorded when a short link is followed.
sidebar:
  order: 33
---

Every request to the redirect service is logged, including the ones that fail. Logs are
written after the response has gone out, so logging never slows a redirect down.

## What is recorded

| | |
| --- | --- |
| Request ID | A unique id for the request |
| IP address | The address the request came from |
| User agent | The browser or client string |
| Platform | Derived from the user agent |
| Referrer | The page you came from, when the browser sends one |
| Short name | The name that was requested |
| Destination | Where the request was sent, when it resolved |
| Full URL | The complete URL that was requested |
| Method | `GET` or `HEAD` |
| Result | What happened, such as redirected or not found |
| Timestamp | When it happened |

Each link also carries a **usage count**, incremented on every successful redirect. That
count is visible in the admin portal and is not exposed publicly: the
[public index](/redirect-service/using/the-index/) returns titles and destinations, never
popularity.

## What this means if you are following a link

Opening a short link records your IP address, your browser's user agent and, where your
browser sends one, the page you came from. That is comparable to what any web server logs,
but it is worth stating plainly because a redirect feels like nothing happened.

Failures are logged too. A mistyped name is recorded as a not-found result, so the logs
show attempts as well as successes.

## What this means if you are sharing a link

Two things worth understanding before you use a short link somewhere sensitive.

**The referrer travels.** If someone clicks a short link from a private page, the address
of that page can be recorded in the referrer field. Where the page itself is confidential,
that is a leak in an unexpected place.

**Usage is measurable.** A link's usage count tells you how often it was followed, and the
logs record when and from where. Anyone with admin access can see that. If you are sharing
a link with one person, treat "was it opened" as visible information rather than private.

## Where the logs live

In a Cloudflare D1 database, separate from the MySQL database holding the links themselves.
Splitting them keeps the redirect path reading from one small table while the log grows
without getting in the way.

Handling of this data falls under the
[Tophhie Cloud privacy policy](https://trust.tophhie.cloud/policy/privacy).
