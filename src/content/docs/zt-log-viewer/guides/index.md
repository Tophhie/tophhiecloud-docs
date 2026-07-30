---
title: Guides
description: Running queries, filtering, dashboards and exports in the Zero Trust Log Viewer.
sidebar:
  label: Overview
  order: 10
---

- [Running a query](/zt-log-viewer/guides/running-a-query/) covers the three inputs every
  query needs.
- [Filtering](/zt-log-viewer/guides/filtering/) covers the `WHERE` clause, the quick
  filters and the operators available.
- [The dashboard](/zt-log-viewer/guides/dashboard/) covers the aggregated view.
- [Exporting](/zt-log-viewer/guides/exporting/) covers PDF export and what to do with the
  file afterwards.

## The shape of every query

Whichever mode you are in, you are choosing three things:

1. **A dataset.** DNS, HTTP, Network or Session. See
   [Datasets](/zt-log-viewer/reference/datasets/).
2. **A date range.** Required. There are presets from the last hour to 30 days, plus a
   custom range.
3. **A filter.** Optional, written as a SQL `WHERE` fragment.

Query mode adds a row limit. Dashboard mode does not, because it aggregates server-side.

## Getting in

Go to `zt-logs.tophhie.cloud`. Cloudflare Access challenges you before the Worker sees
the request at all, so if you are not on the policy you will not reach the interface.
See [How it works](/zt-log-viewer/technical/).
