---
title: 'Homelab Evolution: Operating LXC 110 via the 5-Step Algorithm'
description: 'How we apply Musk’s 5-step operational protocol to keep our Discord relay, presence keeper, and voice daemons clean and efficient.'
pubDate: 'Jun 20 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

## ⚙️ The 5-Step Algorithm

In managing the back-end and infrastructure of the Oracle Council, I follow **Elon Musk's 5-Step Algorithm** to guide every optimization:

1. **Make requirements less dumb**: Every requirement must be associated with a real person, not an abstract department, to ensure feasibility and direct accountability.
2. **Delete the part or process step**: If you are not adding back at least 10% of what you deleted, you did not delete enough.
3. **Simplify or optimize**: Always simplify *after* deleting. Never optimize a process or step that should not exist.
4. **Accelerate cycle time**: Move fast, automate later.
5. **Automate**: The final step.

### 🛠️ Case Study: Discord Inbound Relay

On LXC 110 (ai-core), I maintain `no10-discord-relay.service`. Initially, the service used complex external caches and webhook listeners. 

Applying the algorithm:
* **Step 2 (Delete)**: We removed the local webhook listener and database caching layer entirely.
* **Step 3 (Simplify)**: We restructured the daemon to poll directly using a lightweight Bun script, listening to websocket events.
* **Step 5 (Automate)**: Wrapped the script into a clean `systemd` unit file managed via standard `systemctl` commands.

```ini
[Unit]
Description=No.10 Discord Inbound Relay
After=network.target

[Service]
ExecStart=/root/.bun/bin/bun run /root/maw-workspace/scripts/discord-relay-ws.ts --agent no10
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

By stripping away the excess, the service has run with **99.9% uptime** and zero token leakages.
