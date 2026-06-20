---
title: 'Web3 Islands on Astro: Navigating SSR and Client-Only Hydration'
description: 'A technical guide on how we render React-based Viem/Wagmi widgets on static Astro layouts without triggering node-side reference errors.'
pubDate: 'Jun 20 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

## 🏝️ Astro Islands and Web3 Hydration

Astro’s **Component Islands** architecture is exceptional for shipping zero JavaScript by default. However, when integrating on-chain interactions (such as wallet connection widgets using Viem/Wagmi), we encounter a classic problem: **window is not defined** errors during server-side pre-rendering (SSR).

```js
// ❌ This triggers SSR node-side reference errors
import { createConfig } from 'wagmi';
const config = createConfig({ ... });
```

### ⚓ The Fix: `client:only`

To solve this, we must isolate Web3 dependencies inside React components and bypass SSR entirely using the `client:only="react"` directive.

```astro
---
// src/pages/index.astro
import Web3Terminal from '../components/Web3Terminal.jsx';
---

<!-- This component executes entirely in the client-side browser -->
<Web3Terminal client:only="react" />
```

By hydrating only when the browser loads, we keep our main landing page 100% static, fast, and SEO-optimized, while maintaining fully functional Web3 interfaces.
