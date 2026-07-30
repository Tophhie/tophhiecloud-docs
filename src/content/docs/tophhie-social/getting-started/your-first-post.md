---
title: Your first post
description: Post, find people, and the Tophhie Social settings worth changing early.
sidebar:
  order: 4
---

Once you are signed in, posting works exactly as it does on any AT Protocol account.
Being hosted here does not change how the network sees you.

## Posting and being seen

Write a post in your app and it is saved to your repository on this server, then
picked up by the wider network. People on Bluesky and on other servers can follow,
reply to and quote you as normal, and you can follow them.

Your handle is what people search for and mention. That it ends in `.tophhie.social`
rather than `.bsky.social` makes no difference to who can see or interact with your
posts.

:::note
A brand-new account and its first posts can take a short while to show up in
searches and feeds elsewhere on the network. That is the rest of the network catching
up with you rather than a problem with your account.
:::

## Add alt text to images

If you post images, describe them. Alt text is what makes a post usable by someone
using a screen reader, and every AT Protocol client has a field for it.

Tophhie Social measures how consistently accounts do this. Each account has an
Accessibility Score from 0 to 100:

```
Accessibility Score = (image coverage % × 0.8) + (post coverage % × 0.2)
```

Image coverage is the share of all your images that have alt text. Post coverage is
the share of your image posts where every image has alt text, which is why a post
with one described image and one undescribed image costs you more than it might look.

Scores for accounts hosted here are recalculated daily, at roughly midnight, and can
be read at `https://tophhie.social/accessibilityScore?did=<your-did>`. You can opt
out of scoring, as below.

## Settings worth knowing about

A few settings are specific to Tophhie Social, so they do not appear in Bluesky's app
or in third-party clients. They live at
[profile.tophhie.social](https://profile.tophhie.social/):

| Setting | What it controls |
| --- | --- |
| Accessibility scoring | Whether your account takes part in the Accessibility Score |
| Homepage visibility | Whether your account can be shown on the Tophhie Social homepage |
| Marketing email | Opt out of marketing email. Security and account email is not affected and cannot be turned off |

These preferences are stored in your own repository under the
`social.tophhie.profile` lexicon, so they travel with your account instead of sitting
in a separate database here. See
[Your account and your data](/tophhie-social/technical/how-it-works/your-account-and-data/).

:::note
Some parts of the platform are still being updated to respect these preferences. If a
setting does not appear to take effect, that is worth reporting to
[help@tophhie.cloud](mailto:help@tophhie.cloud).
:::

## Where next

If you own a domain, you can use it as your handle instead of the one you signed up
with. See [Use your own domain](/tophhie-social/getting-started/use-your-own-domain/).

For how any of this actually works, read
[How it works](/tophhie-social/technical/how-it-works/). If you are thinking about
leaving or moving elsewhere later, that is a supported thing to do and is covered in
[Leaving or moving on](/tophhie-social/technical/how-it-works/leaving-or-moving-on/).
