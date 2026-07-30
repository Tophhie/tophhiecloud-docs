---
title: Siri and Shortcuts
description: Add tasks, ask questions and tidy lists without opening the app.
sidebar:
  order: 92
---

Marvelist provides App Intents, which means Siri and the Shortcuts app can drive it
directly. There are eight, all available to Siri once the app is installed.

## What you can ask for

| Shortcut | What it does |
| --- | --- |
| Create a New Task | Adds a task, or a note, to a list you pick |
| Add item to shopping list | Adds an item to your default grocery list |
| Create a New List | Makes a new list, tasks or notes |
| Due Today | Reads back what is due today |
| Due in the next x days | Reads back what is due in a period you choose |
| Perform List Tidy Up | Deletes completed tasks older than a number of days you set |
| Ask Marvelist AI | Puts a question to [Marvelist AI](/marvelist/marvelist-ai/) |
| Notification Feed | Reads back your latest Marvelist notifications |

## Phrasing

Each one answers to several phrases, so you do not have to remember an exact form of
words. Some that work:

- "Create a new task in Marvelist", or "Add a Marvelist note"
- "Add something to my Marvelist shopping list"
- "What do I have due today in Marvelist?"
- "Get me upcoming tasks in Marvelist"
- "Tidy up my tasks in Marvelist"
- "What's the latest in Marvelist?"
- "Ask Marvelist AI"

The shopping list one earns its place. Realising you are out of something usually happens
with your hands full, which is the case Siri is actually good at.

## Set your default lists first

**Settings → Your Default Lists** sets a default Grocery List, Task List and Notes List.
Until those are set, a shortcut that adds an item has nowhere obvious to put it, which is
the usual reason "add to my shopping list" does not behave. There is a **Reset Defaults**
underneath if you want to start again.

## Tidy Up deletes, and respects content protection

**Perform List Tidy Up** asks which list and how old, then removes completed tasks older
than that many days. Active tasks are never touched.

It deletes rather than archives. If the list has
[content protection](/marvelist/lists-and-tasks/lists/#content-protection) turned on, the
shortcut refuses and says so, which is the protection working rather than a fault.

## Building your own

All eight are available in the Shortcuts app, so you can chain Marvelist with other apps
and with automations. A shortcut that reads back what is due today, attached to a morning
automation, is the one people keep.

## If a shortcut is not appearing

Open Marvelist once after installing or updating. Shortcuts are registered by the app, and
a fresh install has not run yet. **Settings → Configure Siri Shortcuts** is where to look
after that.
