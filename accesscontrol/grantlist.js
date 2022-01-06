const grantList = [
  { role: 'editor', resource: 'resource1', action: 'read:any' },
  { role: 'editor', resource: 'resource2', action: 'read:any' },
  { role: 'editor', resource: 'resource1', action: 'update:any' },
  { role: 'editor', resource: 'resource2', action: 'update:any' },
  { role: 'viewer', resource: 'resource1', action: 'read:any' },
  { role: 'viewer', resource: 'resource1', action: 'update:own' }
];

module.exports = grantList;