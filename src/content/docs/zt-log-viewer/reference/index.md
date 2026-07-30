---
title: Reference
description: Datasets, fields and the query API.
sidebar:
  label: Overview
  order: 20
---

- [Datasets](/zt-log-viewer/reference/datasets/) lists every dataset and the fields it
  returns.

## Query limits

| | |
| --- | --- |
| Row limit | 1 to 500, default 100 |
| Date range | Required, no default |
| Filter | Optional SQL `WHERE` fragment |

## API

The Worker exposes a small API alongside the interface. It is same-origin and sits behind
the same Cloudflare Access policy, so it is not usable from anywhere else.

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Liveness check |
| `GET /api/me` | The identity Access resolved for the current request |
| `GET /api/datasets` | Dataset list with labels, descriptions and columns |
| `POST /api/query` | Run a query and return rows |
| `POST /api/dashboard` | Run the aggregations for a dashboard |

`POST /api/query` takes a dataset, `dateFrom` and `dateTo`, an optional `filter`, and an
optional `limit` and `offset`. It returns the rows, a count, the elapsed time and the SQL
that was run.
