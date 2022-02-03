import { AbilityBuilder, Ability } from "@casl/ability"
import { resolveUserRoles } from '../utils.js'

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // If no user, no rules
  if (!user) return new Ability(rules);
  const roles = resolveUserRoles(user)

  roles.forEach(role => {
    switch (role) {
      case 'clone':
        can('gather', 'Asset', { id: 'megaSeeds' });
        can('gather', 'Asset', { id: 'timeCrystals' });
        break;
      case 'sidekick':
        can('gather', 'Asset', { id: 'megaSeeds' });
        can('gather', 'Asset', { id: 'timeCrystals' });
        can('consume', 'Asset', { id: 'timeCrystals' });
        can('consume', 'Asset', { id: 'megaSeeds' });
        break;
      case 'evilGenius':
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

