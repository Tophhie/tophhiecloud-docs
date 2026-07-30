---
title: Working together
description: Assignment, comments, live updates and presence.
sidebar:
  order: 32
---

## Assigning tasks

A task on a shared list can be assigned to a member. It then appears in their **Assigned**
[smart list](/marvelist/lists-and-tasks/smart-lists/), which is how work gets picked up
without a conversation about who is doing what.

Assignment is a signal rather than a lock. Anyone on the list can still complete the task.

## Comments

Every task has a comment thread, and comments can be liked. Keeping the discussion on the
task means the context is still there weeks later, which is the main advantage over
discussing it in a messaging app.

## Live updates

Changes made by anyone appear for everyone without a refresh. If two of you are working
through the same list, you see each other's ticks as they happen.

This is what makes a shared grocery list work in a shop, and a shared checklist work
during an event.

## Who is looking

Shared lists show avatars of the people currently viewing, so you can tell whether someone
else is in there before you start rearranging things.

## When two people change the same thing

Changes are applied in the order the server receives them, so where two people edit the
same field, the later edit is the one that sticks.

Your own edits are protected while they are in flight. An edit you have just made is not
overwritten by an incoming update from someone else until your change has been
acknowledged, so the thing you typed does not flicker back to the old value while you are
still looking at it.

In practice conflicts are rare, because people work on different tasks. The case to be
careful with is two people reordering or bulk-editing the same list at the same time, where
it is worth one of you waiting.

## Editing offline at the same time

If two of you are offline and both change the same task, neither knows about the other
until you reconnect. Changes are then sent in the order each of you made them, and the
later arrival wins.

Nothing is duplicated by a flaky connection: a change that has to be retried is applied
once, not twice. Anything created offline keeps its identity when it reaches the server, so
a task you added on a train is the same task everyone else then sees rather than a
duplicate.

If it matters who wins, [change history](/marvelist/lists-and-tasks/change-history/) shows
what happened and in what order.
