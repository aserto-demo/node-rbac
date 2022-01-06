const { RBAC } = require('rbac');
const policy = new RBAC({
    roles: ['viewer', 'editor', 'admin'],
    permissions: {
        resource1: ['read', 'edit', 'delete'],
        resource2: ['read', 'edit', 'delete']
    },
    grants: {
        viewer: ['read_resource1', 'read_resource2'],
        editor: ['viewer', 'edit_resource1', 'edit_resource2'],
        admin: ['editor', 'delete_resource1', 'delete_resource2'],
    },
});

module.exports = policy;