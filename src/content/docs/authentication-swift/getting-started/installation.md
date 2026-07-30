---
title: Installation
description: Add TophhieCloudAuthentication to an iOS project.
sidebar:
  order: 2
---

## Requirements

| | |
| --- | --- |
| Platform | iOS 18 and later |
| Swift | 6.0 and later |
| Dependency | [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-objc) 2.6.0 and later |

MSAL comes in as a transitive dependency, so you do not add it yourself. You also do
not need to `import MSAL` anywhere in your app: the framework wraps the parts you need,
including forwarding the sign-in redirect.

## Add the package

In Xcode, use **File → Add Package Dependencies** and point it at the repository.

In a `Package.swift`:

```swift
dependencies: [
    .package(
        url: "https://github.com/Tophhie/TophhieCloudAuthentication-Swift.git",
        from: "1.0.0"
    )
]
```

Then add `TophhieCloudAuthentication` to your target's dependencies.

:::note
The repository is private, so Xcode and SwiftPM need a GitHub account with access to
it. If resolution fails with a not-found error, that is almost always the cause rather
than a bad URL.
:::

## What you get

One library, `TophhieCloudAuthentication`, containing both authentication stacks and
the SwiftUI account views. The SwiftUI layer is guarded by `#if canImport(SwiftUI)` and
adds no dependencies beyond SwiftUI and UIKit, so ignoring it costs you nothing.

## Building the package itself

```bash
swift build
```

The package targets iOS and depends on UIKit, so building from the command line on
macOS goes through the iOS toolchain. If you hit platform-availability errors, build
from Xcode instead, or:

```bash
xcodebuild -scheme TophhieCloudAuthentication -destination 'generic/platform=iOS'
```

There is currently no test target.
