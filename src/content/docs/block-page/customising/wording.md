---
title: Wording
description: What a block page should say, and what it should not.
sidebar:
  order: 22
---

Three strings carry the whole message: `BLOCKED_HEADER`, `BLOCKED_TEXT` and
`BLOCKED_TEXT_NOMETA`. They are worth more thought than their size suggests, because they
are read by someone who has just been stopped from doing something and is not in a
receptive mood.

## Say what happened, then what to do

The default wording does both:

> **You can't access this destination!**
>
> Access to this webpage has been blocked. Please contact support or request access if you
> believe this is a mistake.

The second sentence is the useful half. A page that only says "blocked" leaves someone with
nowhere to go, and they will either give up or ring somebody. Naming the next step is what
turns the page from a dead end into a route.

## The two variants

`BLOCKED_TEXT` shows when Cloudflare passed details along. `BLOCKED_TEXT_NOMETA` shows when
it did not, and it needs to be different rather than a copy.

Without metadata there is nothing to show and nothing useful to put in an email, so
promising a details panel or telling someone to send their request through would be a lie.
The default acknowledges the gap:

> Access has been restricted. No website information has been supplied.

Keep that honesty. A no-metadata page that claims to have sent full details produces
support tickets containing nothing but a timestamp.

## Avoid accusation

The person seeing this page has usually done nothing wrong. They clicked a link, or a page
they opened pulled in a resource from a blocked domain, or a category filter caught
something harmless.

Wording that implies intent, anything along the lines of "you attempted to access
prohibited content", is wrong most of the time it is shown and makes people defensive when
they contact you. Describe the block, not the person.

## Do not explain the rule

It is tempting to say why the site was blocked. Resist it in the page text.

The reason lives in the policy, changes without the page changing, and differs per rule.
Wording that says "this site was blocked because it is categorised as social media" will be
wrong the first time a different rule fires. The details panel already carries the rule ID
and categories for anyone who needs specifics.

## Keep it short

This is not the place for policy. Someone in the middle of a task wants to know what
happened and how to get moving again, in about a sentence each. Put your acceptable use
policy behind `CONTACT_WEB` for the people who want it.
