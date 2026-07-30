---
title: TophhieAuth
description: The interactive authentication stack, covering sign-in, tokens, profile and history.
sidebar:
  order: 21
---

The interactive stack, built on `MSALPublicClientApplication`. It presents Microsoft's
web UI for sign-in and sign-out, and handles the Microsoft Graph calls.

```swift
TophhieAuth.shared
```

## Properties

| Member | Description |
| --- | --- |
| `static let shared` | Singleton instance |
| `var isConfigured: Bool` | Whether `configure` has succeeded |
| `var currentAccount: MSALAccount?` | The signed-in account, if any |

## Configuration

| Member | Description |
| --- | --- |
| `configure(clientId:redirectUri:tenantSubdomain:restoreCachedAccount:) throws` | One-time setup |
| `restoreCachedAccount() throws -> MSALAccount?` | Loads a cached account into `currentAccount` |
| `static func handleRedirect(_:sourceApplication:)` | Forwards the sign-in redirect into MSAL |

```swift
public func configure(
    clientId: String,
    redirectUri: String,
    tenantSubdomain: String = TophhieAuth.defaultTenantSubdomain,  // "tophhiecustomers"
    restoreCachedAccount: Bool = true
) throws
```

See [Configuration](/authentication-swift/getting-started/configuration/).

## Sign-in and tokens

| Member | Description |
| --- | --- |
| `signIn(presenting:scopes:prompt:loginHint:extraQueryParameters:) async throws -> TophhieAuthResult` | Interactive sign-in. `@MainActor` |
| `acquireTokenSilent(scopes:) async throws -> TophhieAuthResult` | Silent token for the current or cached account |
| `acquireToken(presenting:scopes:) async throws -> TophhieAuthResult` | Silent, falling back to interactive. `@MainActor` |
| `signOut(presenting:) async throws` | Signs out and clears local state. `@MainActor` |

See [Sign-in and tokens](/authentication-swift/guides/sign-in-and-tokens/).

## Profile

| Member | Description |
| --- | --- |
| `getUserProfile(scopes:) async throws -> TophhieCloudUserProfile` | Microsoft Graph `/me`, with an explicit `$select` |
| `updateProfile(_:) async throws -> TophhieCloudUserProfile` | Edit own profile via delegated `PATCH /me`, silent |
| `updateProfile(presenting:_:) async throws -> TophhieCloudUserProfile` | As above, prompting for consent if needed. `@MainActor` |

Editing requires `User.ReadWrite` and, for member and admin accounts,
`Directory.AccessAsUser.All`, which needs admin consent. See
[User profile](/authentication-swift/guides/user-profile/).

## Sign-in history

| Member | Description |
| --- | --- |
| `getSignInHistory(top:) async throws -> [TophhieSignInEvent]` | The user's own sign-ins from Graph `auditLogs/signIns`, silent |
| `getSignInHistory(presenting:top:) async throws -> [TophhieSignInEvent]` | As above, prompting for `AuditLog.Read.All` if needed. `@MainActor` |

See [Sign-in history](/authentication-swift/guides/sign-in-history/).

## PromptType

Controls what Microsoft's sign-in UI does when a session already exists.

`.selectAccount` · `.login` · `.consent` · `.default`
