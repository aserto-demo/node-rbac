import { AbilityBuilder, Ability } from "@casl/ability"
import { resolveUserRoles } from '../utils.js'

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // If no user, no rules
  if (!user) return new Ability(rules);
  const roles = resolveUserRoles(user)

  roles.forEach(role => {
    switch (role) {
      case 'viewer':
        can('read', 'Resource', { id: 'resource1' });
        can('read', 'Resource', { id: 'resource2' });
        break;
      case 'editor':
        can('read', 'Resource', { id: 'resource1' });
        can('read', 'Resource', { id: 'resource2' });
        can('edit', 'Resource', { id: 'resource2' });
        can('edit', 'Resource', { id: 'resource1' });
        break;
      case 'admin':
        can('manage', 'all')
        break;
      default:
        // anonymous users can't do anything
        can();
        break;
    }
  });

  return new Ability(rules);
}

