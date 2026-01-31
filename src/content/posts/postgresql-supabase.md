---
title: "Getting started with PostgreSQL and Supabase"
date: "2025-04-01"
category: "backend"
resume: "Supabase provides a powerful open-source alternative to Firebase, built on top of PostgreSQL. Learn how to set up your first project and leverage its real-time capabilities."
cover_image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop"
---

## What is Supabase?

Supabase is an open-source Firebase alternative that provides a PostgreSQL database, authentication, instant APIs, and real-time subscriptions.

## Setting Up

Create a new project on supabase.com, then install the client library with `npm install @supabase/supabase-js`.

## Querying Data

```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false });
```
