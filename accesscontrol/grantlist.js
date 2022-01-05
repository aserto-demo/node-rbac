const grantList = [
  { role: 'editor', resource: 'resource1', action: 'create:any' },
  { role: 'editor', resource: 'resource1', action: 'read:any' },
  { role: 'editor', resource: 'resource1', action: 'update:any' },
  { role: 'editor', resource: 'resource1', action: 'delete:any' },

  { role: 'viewer', resource: 'resource1', action: 'create:own' },
  { role: 'viewer', resource: 'resource1', action: 'read:any' },
  { role: 'viewer', resource: 'resource1', action: 'update:own' },
  { role: 'viewer', resource: 'resource1', action: 'delete:own' }
];

module.exports = grantList;