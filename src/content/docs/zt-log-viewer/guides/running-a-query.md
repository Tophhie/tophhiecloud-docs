---
title: Running a query
description: Choose a dataset, a date range and a limit, and read the results.
sidebar:
  order: 11
---

## The three inputs

**Dataset.** Pick a tab: DNS, HTTP, Network or Session. Each returns different fields, so
this choice determines what you can filter and see. See
[Datasets](/zt-log-viewer/reference/datasets/).

**Date range.** Required, with no default. Presets cover the last hour, today, the last
24 hours, yesterday, 3 days, 7 days and 30 days, plus a custom range with explicit start
and end times.

**Limit.** Between 1 and 500 rows, defaulting to 100. Values outside that range are
rejected rather than silently clamped.

Then run the query.

## Reading the results

Results come back as a table of raw log rows, along with how long the query took and the
SQL that was actually run.

That SQL is worth looking at when a result surprises you. It shows exactly which columns
were selected and how your filter was combined with the date range, which usually
explains an unexpectedly empty or oversized result faster than guessing does.

## Narrowing down

The limit caps what comes back, not what is searched, so a 500-row result from a 30-day
range tells you nothing about whether you are seeing everything.

When results hit the limit, narrow the query rather than raising it:

- Shorten the date range first. It is the cheapest change and usually the most
  effective.
- Add a [filter](/zt-log-viewer/guides/filtering/) for the thing you actually care
  about.
- Use the [dashboard](/zt-log-viewer/guides/dashboard/) if you want the overall shape
  rather than individual rows, since it aggregates rather than truncating.

## When a query is slow

Log Explorer scans the range you give it, so a 30-day query across a busy dataset takes
noticeably longer than an hour of the same data. If a query feels slow, the date range is
almost always the reason.

Dashboard queries run several aggregations at once, batched to stay inside Log Explorer's
concurrency limit, so they take longer than a single query over the same range. That is
expected rather than a fault.

## If a query returns nothing

Work through these in order:

1. **Check the date range.** An empty result is most often a range with no traffic in it,
   particularly overnight or on a custom range with the wrong day.
2. **Check the field exists on that dataset.** Field names differ between datasets, and
   filtering on one that does not exist returns nothing rather than an error. `SrcIP` is
   DNS-only, for example, while HTTP and Network call it `SourceIP`.
3. **Check the value's case and form.** Most values are lower case, such as `block`
   rather than `Block`.
4. **Remove the filter entirely.** If rows appear, the filter is the problem rather than
   the range.
