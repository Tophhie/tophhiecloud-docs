---
title: Configuration
description: Every setting in config.ts.
sidebar:
  order: 21
---

`src/config.ts` holds every setting as a static string on a `Config` class.

| Setting | What it controls |
| --- | --- |
| `HEADER_LOGO_URL` | The logo at the top of the card |
| `CONTACT_EMAIL` | Where **Request access** sends the email |
| `CONTACT_WEB` | Where the floating support button goes |
| `BLOCKED_HEADER` | The headline |
| `BLOCKED_TEXT` | The explanation, when Cloudflare supplied details |
| `BLOCKED_TEXT_NOMETA` | The explanation, when it did not |
| `CONTACT_BUTTON_TXT` | The label on the request button |

## The logo

`HEADER_LOGO_URL` is a URL rather than a bundled file, so the image is fetched from
wherever you point it.

Host it somewhere that will still be up when your network is having a bad day. A block page
is often the first thing people see when something is broken, and a logo served from the
same infrastructure that is currently failing will leave a gap in the middle of the page.

The default is a **white** logo, because it sits on a dark card. A dark logo on the default
styling will be close to invisible, so either supply a light version or change the
[styling](/block-page/customising/styling/) to suit.

## The two contacts

`CONTACT_EMAIL` receives the generated access request. Point it at whatever queue actually
handles these, not an individual, since the whole benefit is that the details arrive
already written out.

`CONTACT_WEB` is the floating button. Send it somewhere that helps a blocked person
specifically: a page explaining your filtering policy beats a generic support home page,
because the question they have is "why can't I open this".

## Environment variables

The repository's README suggests you can drive these from `VITE_*` environment variables
instead. That is a suggestion rather than a feature: nothing in the source reads
`import.meta.env`, so setting those variables changes nothing on its own.

If you want it, it is a small change to `config.ts` along these lines:

```ts
static readonly CONTACT_EMAIL: string =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'help@example.com';
```

Worth doing only if you are deploying the same build to several organisations. For a single
deployment, editing the strings is simpler and there is less to go wrong.

:::note
These values are compiled into a static site, so they are public whichever route you take.
Environment variables are a convenience for building, not a way to keep anything secret.
Never put anything sensitive in `config.ts`.
:::
