---
title: Types
description: Result, profile, update and event types returned by the framework.
sidebar:
  order: 23
---

## TophhieAuthResult

Returned by `signIn`, `acquireTokenSilent` and `acquireToken`.

```swift
public struct TophhieAuthResult: Sendable {
    public let accessToken: String
    public let idToken: String?
    public let expiresOn: Date?
    public let scopes: [String]
    public let accountIdentifier: String?
    public let username: String?
}
```

`idToken` is optional, so treat a missing one as a failure rather than force-unwrapping.
`scopes` reports what was actually granted, which can be less than you requested.

## TophhieCloudUserProfile

Returned by `getUserProfile` and `updateProfile`.

```swift
public struct TophhieCloudUserProfile: Codable, Sendable {
    public let id: String
    public let displayName: String?
    public let givenName: String?
    public let surname: String?
    public let userPrincipalName: String
    public let mail: String?
    public let jobTitle: String?
    public let streetAddress: String?
    public let city: String?
    public let state: String?
    public let postalCode: String?
    public let country: String?
    public let preferredLanguage: String?   // BCP-47, such as "en-GB"
}
```

Only `id` and `userPrincipalName` are guaranteed. Everything else depends on what the
account has set.

## TophhieProfileUpdate

Edits passed to `updateProfile`. Only non-nil fields are written.

```swift
public struct TophhieProfileUpdate: Sendable {
    public var displayName: String?
    public var givenName: String?
    public var surname: String?
    public var jobTitle: String?
    public var streetAddress: String?
    public var city: String?
    public var state: String?
    public var postalCode: String?
    public var country: String?
    public var preferredLanguage: String?
    public var hasChanges: Bool          // whether anything would be written
}
```

| Value | Effect |
| --- | --- |
| `nil` | Left untouched |
| `""` | Cleared |
| Anything else | Set |

An edit form that maps empty text fields to `""` will clear every field the user left
blank. Map untouched fields to `nil`.

## TophhieSignInEvent

Returned by `getSignInHistory`, newest first.

```swift
public struct TophhieSignInEvent: Codable, Sendable, Identifiable {
    public let id: String
    public let createdDateTime: Date          // UTC
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

## TophhieNativeSignInResult

Returned when a native flow completes.

```swift
public struct TophhieNativeSignInResult: Sendable {
    public let idToken: String?
    public let username: String?
    public let accountIdentifier: String?
}
```

Note this carries no access token, unlike `TophhieAuthResult`. Native flows give you an
ID token to exchange with your backend.

## RequiredAttribute

Describes a field the tenant wants during sign-up.

```swift
public struct RequiredAttribute: Sendable {
    public let name: String
    public let type: String
    public let required: Bool
    public let regex: String?
}
```

Build the sign-up form from these rather than hard-coding fields, and use `regex` to
validate before submitting.

## TophhieLanguages

A curated locale list used by the profile edit form, so users choose a language by name
instead of typing a BCP-47 tag. `TophhieLanguages.all` is the collection.
