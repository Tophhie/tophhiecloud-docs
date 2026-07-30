---
title: Datasets
description: Every dataset the Zero Trust Log Viewer queries, and the fields each returns.
sidebar:
  order: 21
---

Four datasets, each with its own fields. Field names are what you use in a
[filter](/zt-log-viewer/guides/filtering/), and they are not consistent between datasets.

| Dataset | What it records |
| --- | --- |
| DNS | DNS queries inspected by Cloudflare Gateway |
| HTTP | HTTP requests inspected by Cloudflare Gateway |
| Network | Network sessions inspected by Cloudflare Gateway |
| Session | Zero Trust network sessions from WARP and private network access |

## DNS

Decisions live in `ResolverDecision`, and the queried name is `QueryName`. Note this is
the only dataset that calls the source address `SrcIP` rather than `SourceIP`.

`ColoCode` · `Datetime` · `DeviceName` · `Email` · `Location` · `PolicyID` ·
`PolicyName` · `Protocol` · `QueryApplicationNames` · `QueryCategoryNames` · `QueryID` ·
`QueryName` · `QueryTypeName` · `RCode` · `RedirectTargetURI` · `ResolvedIPs` ·
`ResolverDecision` · `ResponseTimeMS` · `SrcIP`

## HTTP

The richest dataset. Decisions live in `Action`, and you have both the full `URL` and the
`HTTPHost` if you only want the domain.

`Action` · `ApplicationNames` · `CategoryNames` · `Datetime` · `DestinationIP` ·
`DestinationPort` · `DeviceName` · `Email` · `HTTPHost` · `HTTPMethod` ·
`HTTPStatusCode` · `HTTPVersion` · `PolicyID` · `PolicyName` · `RedirectTargetURI` ·
`Referer` · `RequestID` · `SessionID` · `SourceInternalIP` · `SourceIP` · `SourcePort` ·
`URL` · `UserAgent` · `UserID` · `VirtualNetworkName`

## Network

Traffic that is not HTTP. There is no URL here, so `SNI` is usually the closest thing to
"what was it talking to".

`Action` · `ApplicationNames` · `CategoryNames` · `Datetime` · `DestinationIP` ·
`DestinationPort` · `DetectedProtocol` · `DeviceName` · `Email` · `PolicyID` ·
`PolicyName` · `SessionID` · `SNI` · `SourceInternalIP` · `SourceIP` · `SourcePort` ·
`Transport` · `VirtualNetworkName`

## Session

Zero Trust network sessions, with far more connection detail than the Gateway datasets
and the only byte counts anywhere in the tool. Timestamps are `SessionStartTime` and
`SessionEndTime` rather than `Datetime`, which matters when you write a filter.

**Identity and timing**
`SessionStartTime` · `SessionEndTime` · `Email` · `DeviceName` · `UserID` · `DeviceID` ·
`RegistrationID` · `SessionID`

**Source and destination**
`SourceIP` · `SourceInternalIP` · `SourcePort` · `OriginIP` · `OriginPort` ·
`InitialOriginIP` · `ResolvedFQDN` · `SNI`

**Protocol and volume**
`Protocol` · `DetectedProtocol` · `BytesSent` · `BytesReceived` · `ConnectionReuse` ·
`ConnectionCloseReason`

**TLS**
`ClientTLSVersion` · `ClientTLSCipher` · `ClientTLSHandshakeDurationMs` ·
`ClientTCPHandshakeDurationMs` · `OriginTLSVersion` · `OriginTLSCipher` ·
`OriginTLSHandshakeDurationMs` · `OriginTLSCertificateIssuer` ·
`OriginTLSCertificateValidationResult`

**Routing**
`EgressColoName` · `IngressColoName` · `EgressIP` · `EgressPort` · `OffRamp` ·
`DestinationTunnelID` · `VirtualNetworkID` · `RuleEvaluationDurationMs`

## Fields that are not where you expect

| Looking for | DNS | HTTP | Network | Session |
| --- | --- | --- | --- | --- |
| Timestamp | `Datetime` | `Datetime` | `Datetime` | `SessionStartTime` |
| Source address | `SrcIP` | `SourceIP` | `SourceIP` | `SourceIP` |
| Allowed or blocked | `ResolverDecision` | `Action` | `Action` | Not recorded |
| Destination name | `QueryName` | `HTTPHost`, `URL` | `SNI` | `ResolvedFQDN`, `SNI` |

Filtering on a field a dataset does not have returns an empty result rather than an
error, which is why an unexpectedly empty table is usually a field-name problem rather
than an absence of traffic.
