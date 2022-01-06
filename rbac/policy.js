const { RBAC } = require('rbac');
const policy = new RBAC({
    roles: ['viewer', 'editor'],
    permissions: {
        resource1: ['view', 'edit'],
        resource2: ['view', 'edit']
    },
    grants: {
        viewer: ['view_resource1', 'view_resource2'],
        editor: ['viewer', 'edit_resource1', 'edit_resource2'],
    },
});

module.exports = policy;