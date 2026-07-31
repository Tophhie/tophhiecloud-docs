---
title: Following a link
description: What happens when you open a short link, and what the errors mean.
sidebar:
  order: 11
---

Open `https://aka.tophhie.cloud/<name>` and you are sent to the address behind it. The
service answers with a **302**, so your browser follows it immediately and the address bar
ends up showing the real destination.

`aka.tophhie.dev` serves the same links. Either host works, and both go to the same place.

## What a short name can contain

Letters, numbers, hyphens and underscores, and exactly one path segment.

`aka.tophhie.cloud/devops` is a short name. `aka.tophhie.cloud/team/devops` is not, and
neither is anything with a space or a slash in it.

Names are matched case-insensitively when they are created, so you do not need to worry
about capitals when typing one from a slide.

## When it does not work

Every failure comes back as JSON with a status code rather than an HTML error page, because
short links are read by scripts as often as by people.

| What you see | Status | What happened |
| --- | --- | --- |
| `Shortname not found` | 404 | No such link, or the link has been turned off |
| `Invalid shortname format` | 400 | The name contains characters that are not allowed |
| `Too many URL segments. Please provide only one.` | 400 | You used a path with a slash in it |
| `Invalid redirect target` | 400 | The link exists but its destination is not a usable URL |
| `Too many requests.` | 429 | You have hit the [rate limit](/redirect-service/technical/rate-limits/) |
| `Method not allowed` | 405 | Only `GET` and `HEAD` are accepted |
| `Service temporarily unavailable` | 503 | The service could not reach its database |

### A 404 does not always mean "never existed"

This is the one worth knowing. A link that has been turned off returns exactly the same
404 as a name that was never registered. From outside there is no way to tell the two
apart, which is deliberate: a disabled link should not advertise that it once worked.

So if a link used to work and now 404s, it has probably been retired rather than mistyped.
Ask whoever gave it to you.

### `Invalid redirect target`

Rare, and worth reporting if you see it. It means the link exists and is enabled, but the
address stored against it is not something the service can send you to. That is a fault in
the link rather than in what you typed.

## The root

Opening `https://aka.tophhie.cloud/` with no name redirects to
[the index](/redirect-service/using/the-index/).
