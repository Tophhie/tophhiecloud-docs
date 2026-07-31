---
title: Styling
description: Changing how the page looks.
sidebar:
  order: 23
---

The page is a glass-style card centred on an illustrated background. Styling comes from two
stylesheets alongside the route, plus Tailwind for layout inside the component.

| File | What it holds |
| --- | --- |
| `src/routes/layout.css` | The page frame: background, the card, the modal staging |
| `src/routes/tophhie-cloud.css` | Tophhie Cloud's design tokens, the colours and type |

## Rebranding the look

Start with `tophhie-cloud.css`. It carries the palette and typography, so changing the
tokens there moves the whole page without touching layout. That is a much smaller job than
rewriting the component, and it keeps the card, spacing and animation intact.

Rename it while you are at it. A file called `tophhie-cloud.css` in your repository will
confuse whoever picks the project up after you.

`layout.css` is where the background illustration and card treatment live. Change it if you
want a plain background or a different card shape; leave it if the default suits.

## The dark card

The default is dark, which is why `HEADER_LOGO_URL` defaults to a white logo. If you switch
to a light card, swap the logo too or it will disappear. This is the single most common
thing to get wrong when rebranding, and it is invisible until someone is actually blocked.

## Motion

The details panel opens with a Svelte `slide` transition. It is short and does a real job,
signalling that the technical detail is an expansion of the page rather than a new one.

If your organisation honours reduced-motion preferences as a matter of policy, that
transition is the one thing to check, since it animates on interaction rather than on load.

## Keep it recognisable as yours

The purpose of replacing the default Cloudflare page is that people trust a page that looks
like it came from their own organisation. A block page that looks generic invites the
suspicion that something has gone wrong with the network, or that the page itself is a
phishing attempt.

Your logo, your colours, and a support link that goes somewhere on your own domain do more
for that than any amount of polish.
