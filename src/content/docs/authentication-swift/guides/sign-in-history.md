---
title: Sign-in history
description: Read the signed-in user's own recent Entra sign-ins.
sidebar:
  order: 13
---

Reads the user's own sign-ins from Microsoft Graph `auditLogs/signIns`, newest first.

```swift
let history = try await TophhieAuth.shared.getSignInHistory(top: 50)

if let last = history.first {
    print("Last signed in:", last.createdDateTime, last.locationText ?? "", last.deviceText ?? "")
}
```

## Why this works without an audit role

`auditLogs/signIns` normally requires a tenant-wide audit role, which an ordinary user
does not have. The framework gets around that by filtering the request to the caller
with `$filter=userId eq '{your-oid}'`.

That self-filter engages Entra's "a user can read their own sign-in logs" carve-out. An
unfiltered request is treated as a tenant-wide query and returns
`403 Authentication_RequestFromUnsupportedUserRole` for ordinary users.

This is worth knowing because it explains why the feature works at all, and why you
cannot extend it to read anyone else's sign-ins without a proper role.

## Consent

The call needs `AuditLog.Read.All`. Add it to the scopes you request at sign-in, or pass
a presenting controller and let the SDK prompt on first use:

```swift
let history = try await TophhieAuth.shared.getSignInHistory(presenting: viewController)
```

The silent overload throws `.interactionRequired` if the scope has not been consented.

## Caveats worth designing around

**Tenant licence.** The sign-in logs API needs a premium-eligible tenant. One Graph
Explorer call is enough to confirm it on a given tenant.

**Retention window.** Only sign-ins inside Entra's retention period come back, typically
the last 7 to 30 days. An empty list is not necessarily a bug.

**Latency.** A new sign-in can take a few hours to appear. Do not build UI that expects
the current session to show up immediately, because it will look broken.

## What an event contains

```swift
public struct TophhieSignInEvent: Codable, Sendable, Identifiable {
    public let id: String
    public let createdDateTime: Date          // UTC, newest first in the list
    public let appDisplayName: String?
    public let ipAddress: String?
    public let clientAppUsed: String?
    public let isInteractive: Bool?
    public let status: Status                 // errorCode (0 is success), failureReason
    public let deviceDetail: DeviceDetail?    // displayName, operatingSystem, browser
    public let location: Location?            // city, state, countryOrRegion

    public var wasSuccessful: Bool            // status.errorCode == 0
    public var locationText: String?          // "City, Country"
    public var deviceText: String?            // "Safari on iOS"
}
```

`wasSuccessful`, `locationText` and `deviceText` are conveniences over the raw fields,
so you rarely need to touch `status` or assemble location strings yourself.

Failed sign-ins are included, which is the point of showing this to a user at all: a
run of failures from an unfamiliar location is exactly what you want them to notice.
