const { RBAC } = require('rbac');
const policy = new RBAC({
    roles: ['user', 'editor', 'admin'],
    permissions: {
        asset1: ['read', 'edit', 'delete'],
        asset2: ['read', 'edit', 'delete']
    },
    grants: {
        user: ['read_asset1', 'read_asset2'],
        editor: ['user', 'edit_asset1', 'edit_asset2'],
        admin: ['editor', 'delete_asset1', 'delete_asset2'],
    },
});

module.exports = policy;