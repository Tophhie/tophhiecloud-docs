---
title: Troubleshooting
description: What to try when something is not syncing or not appearing.
sidebar:
  order: 86
---

The iOS app keeps its repair tools in **Settings → Troubleshooting**, with the time of the
last full sync shown underneath them. Check that timestamp first: if it is recent, the
problem is probably not sync.

## Check the service first

**Settings → Service Status** shows whether Marvelist itself is having a problem. Worth
thirty seconds before you start resetting things on your own device, because none of the
tools below will fix an outage.

## The tools, in the order to try them

| Tool | What it does | When |
| --- | --- | --- |
| Resync All Tasks & Lists | Pulls everything down again from the server | Something is missing or stale on this device |
| Reset Offline Data | Clears the local copy and rebuilds it | Resyncing did not fix it |
| Clear All Downloaded Attachments | Removes cached attachment files | The app is using more space than you expect |
| Send Application Logs | Sends diagnostics to support | Support has asked for them |
| Clear Application Logs | Deletes the local log file | Housekeeping |

Work down the list rather than starting at the bottom. Resync is cheap and fixes most
things.

## Is it safe to reset offline data?

Yes, with one condition: anything you changed while offline and have not yet synced is
held locally until it can be sent. Resetting the local copy before that has happened
discards it.

So get online, give it a moment to catch up, and check the last-sync time has moved.
Then reset.

Attachments you have downloaded are cached copies. Clearing them frees space and does not
delete anything from your account; they download again when you next open them.

## When it is not sync

Some things that look like sync failures are not.

- A list you cannot see may be [archived](/marvelist/lists-and-tasks/archiving-and-tidying-up/)
  rather than missing.
- Tasks that vanished from a list may have been removed by
  [Tidy Up](/marvelist/lists-and-tasks/archiving-and-tidying-up/), which deletes rather
  than archives.
- A [locked list](/marvelist/lists-and-tasks/locked-lists/) on a new device needs its
  unlock method setting up again on that device.
- Missing notifications are usually the per-event switches in **Settings → Notifications**
  rather than a sync problem.

## Getting help

**Settings → Help & Support** has the support articles and **Contact App Support**. If you
are reporting something that looks like a bug, send the application logs first and say
that you have; it saves a round trip.
