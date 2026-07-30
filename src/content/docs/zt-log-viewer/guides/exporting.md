---
title: Exporting
description: Export query results to PDF, and how to handle the file afterwards.
sidebar:
  order: 14
---

Results can be exported to a PDF, which is rendered in the browser from what is on
screen.

## What you get

The PDF captures the current result view. What is not on screen is not in the file, so
the export is bounded by the row limit you ran the query with. A 100-row query exports
100 rows regardless of how many matched.

If you need everything, run the query again with a higher limit first, up to the maximum
of 500. See [Running a query](/zt-log-viewer/guides/running-a-query/).

## What is in it

Whatever the dataset returns, which for the Gateway datasets includes email addresses,
device names, source addresses and the domains or URLs that were requested.

:::caution
An exported PDF contains the same personal data as the logs, in a file that is no longer
behind Cloudflare Access. Once it is in your Downloads folder, the access control that
protects the tool no longer applies to it.

Treat exports as sensitive: keep them only as long as you need them, do not put them
somewhere shared by default, and delete them when the piece of work is done.
:::

## When to export rather than screenshot

Export when you need the evidence to be legible and complete: an incident write-up, a
support case, or anything that has to be read later by someone who was not there.

For a quick look at something you are about to act on, you probably do not need a file at
all, and not creating one is the easier way to handle it safely.
