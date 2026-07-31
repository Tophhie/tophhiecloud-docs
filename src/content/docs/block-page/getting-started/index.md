---
title: Getting started
description: Clone, run, build and deploy the block page.
sidebar:
  label: Overview
  order: 10
---

- [Running it locally](/block-page/getting-started/running-locally/) gets it on your
  machine.
- [Deploying](/block-page/getting-started/deploying/) puts it on Cloudflare and points
  Zero Trust at it.

## What you need

Node.js and a Cloudflare account. That is genuinely all: the page is a static site with no
server, no database and no API keys to arrange.

## The shape of the job

Cloning and branding it takes about ten minutes, because everything you are likely to want
to change lives in one file. Deployment is a `wrangler deploy`, and pointing Zero Trust at
it is one field in the Cloudflare dashboard.

The longest part is usually deciding what the page should say, which is
[worth some thought](/block-page/customising/wording/).
