import { AbilityBuilder, Ability } from "@casl/ability"
import { readFile } from 'fs/promises';

const users = JSON.parse(
  await readFile(
    new URL('../users.json', import.meta.url)
  )
);

const resolveUserRoles = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.roles
}

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // If no user, no rules
  if (!user) return new Ability(rules);
  const roles = resolveUserRoles(user)

  roles.forEach(role => {
    switch (role) {
      case "admin":
        can("delete", "Resource", { id: 'resource1' });
        can("delete", "Resource", { id: 'resource2' });
        can("read", "Resource", { id: 'resource1' });
        can("read", "Resource", { id: 'resource2' });
        can("edit", "Resource", { id: 'resource2' });
        can("edit", "Resource", { id: 'resource1' });
        break;
      case "editor":
        can("read", "Resource", { id: 'resource1' });
        can("read", "Resource", { id: 'resource2' });
        can("edit", "Resource", { id: 'resource2' });
        can("edit", "Resource", { id: 'resource1' });
        break;
      case "viewer":
        can("read", "Resource", { id: 'resource1' });
        can("read", "Resource", { id: 'resource2' });
        break;
      default:
        // anonymous users can't do anything
        can();
        break;
    }
  });

  return new Ability(rules);
}

