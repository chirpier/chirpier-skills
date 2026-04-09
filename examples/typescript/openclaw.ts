import { createClient } from "@chirpier/chirpier-js";

const client = createClient({ key: process.env.CHIRPIER_API_KEY! });

await client.log({
  agent: "openclaw.main",
  event: "tool.errors.count",
  value: 1,
  meta: { tool_name: "browser.open" },
});

await client.flush();
await client.shutdown();
