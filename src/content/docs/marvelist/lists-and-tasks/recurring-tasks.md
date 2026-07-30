---
title: Recurring tasks
description: Tasks that come back on a schedule.
sidebar:
  order: 14
---

A recurring task reappears on a schedule rather than being done once. Bins on a
Wednesday, a monthly invoice, a yearly renewal.

## Setting a repeat

Give the task a due date, then set how often it repeats.

The iOS editor is the fuller one. It handles patterns like "every month on day 5", not
just a plain frequency, and that is what a task's repeat will read as once set.

The web editor is deliberately simpler, offering **Daily**, **Weekly**, **Monthly** and
**Yearly**.

:::caution[Editing a detailed repeat on the web simplifies it]
Because the web picker only sets a frequency, changing the repeat there on a task set up
in more detail on iOS replaces the detailed rule with the plain one. "Every month on day
5" becomes simply "monthly".

Nothing breaks and the task keeps recurring, but the specific day is gone. If a task has a
repeat that matters, edit it on iOS.
:::

## How completing works

Completing a recurring task does not finish it for good. It marks that occurrence done
and schedules the next one.

That is the useful behaviour, but it catches people out in one situation: if you tick off
a recurring task by accident, the next occurrence has already moved. Change the due date
back rather than trying to undo the completion.

## Recurrence travels with the task

The schedule is stored on the task rather than on the device that set it, so it keeps
running wherever the task is opened, and on a [shared list](/marvelist/sharing/) anyone can
complete an occurrence.

## When not to use one

If a task genuinely changes each time, a recurring task will fight you, because the
detail and subtasks carry over to each occurrence. A recurring task is right when the
work is the same every time.
