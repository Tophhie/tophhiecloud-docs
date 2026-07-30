---
title: How it works
description: What the AT Protocol is, what a PDS does, and where your data lives.
sidebar:
  label: Overview
  order: 11
---

Written for people with a Tophhie Social account who want to understand what they have
actually signed up to. There is no server administration here. For that, see
[Infrastructure](/tophhie-social/technical/infrastructure/).

- [The AT Protocol](/tophhie-social/technical/how-it-works/the-at-protocol/) covers the
  network and where a PDS sits in it.
- [Your account and your data](/tophhie-social/technical/how-it-works/your-account-and-data/)
  covers DIDs, handles, repositories, records and blobs.
- [Leaving or moving on](/tophhie-social/technical/how-it-works/leaving-or-moving-on/)
  covers deactivation, deletion, and taking your account elsewhere.

## The short version

Tophhie Social runs a Personal Data Server. It stores your account and your posts, and
signs them as yours. It is not itself a social network. The network is what happens
when many servers publish to shared infrastructure that assembles feeds from all of
them.

Three things follow, and they are the reason the AT Protocol is built this way. Who
hosts you is separable from who you are, because your identity is a DID rather than a
hostname. Your data is one addressable thing that can be exported, copied and moved.
And leaving is a supported operation rather than an export-and-start-again.
