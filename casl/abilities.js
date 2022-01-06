import { AbilityBuilder, Ability } from "@casl/ability"
import { readFile } from 'fs/promises';

const users = JSON.parse(
  await readFile(
    new URL('../users.json', import.meta.url)
  )
);

const resolveUserRole = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.role
}

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // If no user, no rules
  if (!user) return new Ability(rules);
  const role = resolveUserRole(user)

  switch (role) {
    case "editor":
      can("view", "Resource", { id: 'resource1' });
      can("view", "Resource", { id: 'resource2' });
      can("edit", "Resource", { id: 'resource2' });
      can("edit", "Resource", { id: 'resource1' });
      break;
    case "viewer":
      can("view", "Resource", { id: 'resource1' });
      can("view", "Resource", { id: 'resource2' });
      break;
    default:
      // anonymous users can't do anything
      can();
      break;
  }

  return new Ability(rules);
}

