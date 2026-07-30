---
title: The dashboard
description: Aggregated charts over the same dataset, range and filter.
sidebar:
  order: 13
---

The dashboard runs the same query as
[Query mode](/zt-log-viewer/guides/running-a-query/) but aggregates it into charts rather
than returning rows. Same dataset, same date range, same filter.

Use it when you want the shape of the traffic. Use query mode when you need the
individual events.

## What it shows

Panels vary by dataset. Across the Gateway datasets you get some combination of:

- **Decision or action breakdown**, showing allowed against blocked.
- **Top queried domains** for DNS, and top hosts for HTTP.
- **Top threat categories** and **top applications**.
- **Top devices** and **top users by query count**.
- **Top policies matched**, which is the quickest way to see which rule is doing the
  work.
- **Top Gateway locations** and **traffic by colo**.
- **Protocol, record type, HTTP method and HTTP version** breakdowns.

Session data also charts upload and download volume over time, which the row-based view
cannot show you usefully.

Most panels are top-10. Threat categories go deeper, since the long tail is the
interesting part there.

## Reading it honestly

**Top-10 hides the tail.** A domain sitting eleventh does not appear at all. If you are
asking "does anything reach X", filter for X rather than looking for it in a chart.

**Counts are of log rows, not people or visits.** One page load produces many DNS queries
and many HTTP requests, so a device at the top of a chart is not necessarily doing
anything unusual. It may just be chatty.

**The filter still applies.** A dashboard that looks surprisingly empty is often a filter
left over from a previous query.

## Speed

Dashboard mode runs several aggregations at once, batched to stay within Log Explorer's
concurrency limit, so it is slower than a single query over the same range. A 30-day
dashboard on a busy dataset takes a while. Shorten the range if you are iterating.

## Going from a chart to the rows

There is no click-through from a chart to the underlying events. To investigate something
you have spotted, switch to query mode and write the filter yourself. The chart labels
are the values to filter on, so a policy name or device name from a chart can be pasted
straight into a `WHERE` clause. See [Filtering](/zt-log-viewer/guides/filtering/).
