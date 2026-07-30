---
title: Filtering
description: Narrow a query with a WHERE clause, quick filters and operators.
sidebar:
  order: 12
---

The filter is a SQL `WHERE` fragment, applied on top of the date range. You write the
condition only, without the `WHERE` keyword.

```sql
ResolverDecision = 'block'
```

## Quick filters

Each dataset offers one-click filters for the conditions you reach for most often. They
write the clause for you, and they are a good way to learn the field names.

**DNS**

| Filter | Clause |
| --- | --- |
| Blocked | `ResolverDecision LIKE 'block'` |
| Allowed | `ResolverDecision LIKE 'allow'` |
| No policy | `ResolverDecision = 'allowedOnNoPolicyMatch'` |
| Redirected | `RedirectTargetURI IS NOT NULL` |
| Unknown user | `UserID IS NULL` |

**HTTP**

| Filter | Clause |
| --- | --- |
| Blocked | `Action LIKE 'block'` |
| Allowed | `Action LIKE 'allow'` |
| Bypassed | `Action = 'bypass'` |
| HTTP | `DestinationPort = 80` |
| HTTPS | `DestinationPort = 443` |
| Exclude Global Policies | `PolicyName NOT LIKE 'Global Policy'` |

**Network**

| Filter | Clause |
| --- | --- |
| Blocked | `Action LIKE 'block'` |
| Allowed | `Action LIKE 'allow'` |
| TCP | `Transport = 'tcp'` |
| UDP | `Transport = 'udp'` |

**Session**

| Filter | Clause |
| --- | --- |
| TCP | `Protocol = 'tcp'` |
| UDP | `Protocol = 'udp'` |
| TLS 1.3 | `ClientTLSVersion = 'TLSv1.3'` |
| TLS 1.2 | `ClientTLSVersion = 'TLSv1.2'` |
| Reused connections | `ConnectionReuse = true` |

## Writing your own

Combine conditions with `AND` and `OR`, and quote string values with single quotes:

```sql
DeviceName = 'iPhone' AND ResolverDecision = 'block'
```

```sql
Action = 'block' AND HTTPHost LIKE '%facebook%'
```

```sql
Email = 'someone@tophhie.cloud' AND DestinationPort != 443
```

`LIKE` with `%` on both sides is the usual way to search inside a value, which is how you
find a domain without knowing the exact hostname.

Numbers are unquoted. `DestinationPort = 443`, not `'443'`.

## Operators

`=` · `!=` · `LIKE` · `NOT LIKE` · `IS NULL` · `IS NOT NULL`

`IS NULL` and `IS NOT NULL` take no value, which is how the "Redirected" and "Unknown
user" quick filters work.

## Field names differ between datasets

This is the single most common reason a filter silently returns nothing. The same idea
often has a different name depending on the dataset:

| Idea | DNS | HTTP | Network |
| --- | --- | --- | --- |
| Source address | `SrcIP` | `SourceIP` | `SourceIP` |
| Decision | `ResolverDecision` | `Action` | `Action` |
| What was requested | `QueryName` | `URL`, `HTTPHost` | `SNI` |

A filter on a field the dataset does not have returns an empty result rather than an
error, so an unexpectedly empty table is worth checking against
[Datasets](/zt-log-viewer/reference/datasets/) before you conclude there is no traffic.

## Filters apply to the dashboard too

The [dashboard](/zt-log-viewer/guides/dashboard/) takes the same filter, so you can
narrow to one user or one policy and see the aggregate picture for just that slice.
