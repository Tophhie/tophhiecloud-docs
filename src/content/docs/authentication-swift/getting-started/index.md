---
title: Getting started
description: Install TophhieCloudAuthentication, register your app, and configure the SDK.
sidebar:
  label: Overview
  order: 1
---

Three steps take you from an empty project to a working sign-in.

1. [Installation](/authentication-swift/getting-started/installation/) adds the
   package and states the platform requirements.
2. [Tenant and app setup](/authentication-swift/getting-started/tenant-and-app-setup/)
   covers the app registration, the URL scheme, and forwarding the redirect.
3. [Configuration](/authentication-swift/getting-started/configuration/) is the one
   call you make at launch.

Then read [Sign-in and tokens](/authentication-swift/guides/sign-in-and-tokens/).

## Before you start

You need a client ID from an app registration in the Tophhie Cloud external tenant.
The repository is private and so is the tenant, so ask
[help@tophhie.cloud](mailto:help@tophhie.cloud) if you do not have either.

:::note
Native authentication, which covers password reset, in-app sign-up and in-app MFA,
needs extra settings enabled on both the tenant and the app registration. If you only
need ordinary sign-in you can skip that. It is called out where it applies.
:::
