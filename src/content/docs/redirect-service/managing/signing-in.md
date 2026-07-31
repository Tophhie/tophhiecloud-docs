---
title: Signing in
description: Who can reach the admin portal, and what happens if you are refused.
sidebar:
  order: 21
---

The portal is at `redirect-admin.tophhie.cloud`. Opening it sends you to Microsoft Entra to
sign in with your Tophhie Cloud account, and back again once you have.

There is no separate portal password. If you can sign in to your Tophhie Cloud account you
have the credential; whether you are allowed in is a separate question.

## Who is allowed

Access can be restricted to a single Entra group. Where that restriction is on, signing in
successfully is not enough on its own: your account also has to be a member of the group.

If it is not, you get an **Access Denied** page naming the account you signed in as, and an
option to try a different one. That naming is useful, because the usual cause is having
signed in with the wrong account rather than genuinely lacking access.

## Sessions

A session lasts **8 hours**, then you sign in again.

Signing out ends it immediately. Worth doing on a shared or borrowed machine, since the
session lives in a cookie and closing the tab does not end it.

## If you are refused and think you should not be

Check which account you used first, then ask for the group membership. Nobody can grant
access from inside the portal, so there is nothing to try there.
