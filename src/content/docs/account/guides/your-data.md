---
title: Your data
description: Download a copy of your account data, see connected identities, and how deletion works.
sidebar:
  order: 17
---

## Downloading your data

The **Profile** page has a **Your data** section. Select **Download my data** and the
portal prepares a JSON file and downloads it to your device.

It contains:

- your profile, meaning the fields on the Profile page,
- your connected identities,
- your sign-in methods, where available,
- your recent sign-ins, where available.

"Where available" is doing real work in that list. Sign-in methods and sign-in history
depend on permissions your account may not have, so those sections can be absent from
the file. The rest is always included.

The file is JSON, which is meant for feeding into something else rather than reading
directly. Any text editor will open it.

:::note
The download is a copy taken at that moment. It does not keep updating, and generating
it changes nothing about your account.
:::

## Connected identities

Also on the Profile page, **Connected identities** lists every way you can sign in to
your account: an email and password, and any social accounts such as Apple, Google or
Microsoft.

It is a read-only list. Social and federated sign-ins are added and removed from the
Tophhie Cloud sign-in page, not the portal.

Worth checking occasionally. If something is connected that you do not recognise, treat
it the way you would an
[unrecognised sign-in](/account/guides/sign-in-activity/#if-you-see-something-you-do-not-recognise).

For the sign-in methods you *can* change from the portal, see
[Password and sign-in methods](/account/guides/password-and-sign-in-methods/#sign-in-methods).

## Deleting your account

Account deletion is not currently available in the portal. To have your account deleted,
email [help@tophhie.cloud](mailto:help@tophhie.cloud) from the address on the account.

Download your data first if you want to keep any of it. Deletion is permanent, and there
is no way to recover the account afterwards.

## What Tophhie Cloud holds about you

Your account itself lives in Microsoft Entra External ID. What is stored, and for how
long, is covered by the
[Tophhie Cloud privacy policy](https://trust.tophhie.cloud/) rather than by this page.

The portal itself keeps no copy of your data. Everything shown is fetched from Microsoft
when you load the page, which is why some of it can be a few hours out of date. See
[How it works](/account/technical/how-it-works/).
