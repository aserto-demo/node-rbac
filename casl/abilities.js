import { AbilityBuilder, Ability } from "@casl/ability"

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // If no user, no rules
  if (!user) return new Ability(rules);

  switch (user.role) {
    case "editor":
      can("edit", "Resource", { id: 'resource1' });
      can("view", "Resource", { id: 'resource1' });
      can("edit", "Resource", { id: 'resource2' });
      can("view", "Resource", { id: 'resource2' });
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

