const grantList = [
  { role: "evilGenius", resource: "megaSeeds", action: "delete:any" },
  { role: "evilGenius", resource: "timeCrystals", action: "delete:any" },
  { role: "evilGenius", resource: "megaSeeds", action: "read:any" },
  { role: "sidekick", resource: "megaSeeds", action: "update:any" },
  { role: "sidekick", resource: "timeCrystals", action: "update:any" },
  { role: "sidekick", resource: "megaSeeds", action: "read:any" },
  { role: "sidekick", resource: "timeCrystals", action: "read:any" },
  { role: "squanch", resource: "megaSeeds", action: "read:any", attributes: ["*", "!id"] },
  { role: "squanch", resource: "timeCrystals", action: "read:any", attributes: ["*", "!id"] },
  { role: "clone", resource: "megaSeeds", action: "read:any", attributes: ["*", "!id"] },
  { role: "clone", resource: "timeCrystals", action: "read:any", attributes: ["*", "!id"] },
];

module.exports = grantList;