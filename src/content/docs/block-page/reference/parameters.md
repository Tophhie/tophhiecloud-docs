---
title: Parameters
description: Every query parameter the block page reads.
sidebar:
  order: 31
---

Cloudflare appends these to the block page URL. The page reads thirteen, and shows each as
a labelled row in the details panel.

| Parameter | Shown as |
| --- | --- |
| `cf_user_email` | User Email |
| `cf_site_uri` | Site |
| `cf_request_category_names` | Categories |
| `cf_referer` | Referer |
| `cf_rule_id` | Rule ID |
| `cf_source_ip` | Source IP |
| `cf_device_id` | Device ID |
| `cf_application_names` | App |
| `cf_filter` | Filter |
| `cf_account_id` | Account ID |
| `cf_query_id` | Query ID |
| `cf_connection_id` | Connection ID |
| `cf_request_id` | Request ID |

A **Date/Time** row is added by the page itself from the browser clock. It is the local time
the page was opened, not the time of the block, though in practice they are a second apart.

:::caution[The README's list is slightly wrong]
The repository README lists `cf_application_name`, singular. The code reads
`cf_application_names`, plural, and the singular form is ignored. The README also omits
`cf_referer`, which the page does read.

Go by this table or by `src/routes/+page.svelte`, not the README.
:::

## Categories can repeat

`cf_request_category_names` is read with `getAll`, so Cloudflare can send it more than once
and every value is collected. They are joined with commas into one row.

Every other parameter is read once, and a repeated one keeps only the first value.

## Missing values disappear

A row is only rendered if its parameter arrived with something in it. Empty strings count as
missing, so you never see a label with nothing next to it.

That means the details panel varies in length depending on the policy that fired. Do not
assume any given field will be there.

## When nothing arrives

If the only row left is Date/Time, the page treats that as having no metadata: it shows
`BLOCKED_TEXT_NOMETA` instead of `BLOCKED_TEXT`, and there is no details panel to open.

This is what you see opening the page directly, which makes it easy to check while
developing. Add any real parameter to the URL to see the full version.

## What ends up in the email

**Request access** builds a `mailto:` link to `CONTACT_EMAIL` with the subject
`Cloudflare Zero Trust - Blocked Request`, and every visible row as `Label: value` on its
own line in the body.

So the email contains exactly what the details panel shows, which is the point: the person
does not have to retype or describe anything.

Two consequences worth knowing. The body includes the user's email address, source IP and
device ID, so these requests carry identifying information into whatever inbox receives
them. And because it is a `mailto:` link, it depends on the device having a mail client
configured; on a machine without one, the button appears to do nothing.
