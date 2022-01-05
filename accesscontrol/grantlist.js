const grantList = [
    { role: 'editor', resource: 'resource1', action: 'create:any', attributes: '*, !views' },
    { role: 'editor', resource: 'resource1', action: 'read:any', attributes: '*' },
    { role: 'editor', resource: 'resource1', action: 'update:any', attributes: '*, !views' },
    { role: 'editor', resource: 'resource1', action: 'delete:any', attributes: '*' },

    { role: 'viewer', resource: 'resource1', action: 'create:own', attributes: '*, !rating, !views' },
    { role: 'viewer', resource: 'resource1', action: 'read:any', attributes: '*' },
    { role: 'viewer', resource: 'resource1', action: 'update:own', attributes: '*, !rating, !views' },
    { role: 'viewer', resource: 'resource1', action: 'delete:own', attributes: '*' }
];

export default grantList;