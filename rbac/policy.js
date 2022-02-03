const { RBAC } = require('rbac');
const policy = new RBAC({
    roles: ['clone', 'sidekick', 'evilGenius'],
    permissions: {
        megaSeeds: ['gather', 'consume', 'destroy'],
        timeCrystals: ['gather', 'consume', 'destroy']
    },
    grants: {
        clone: ['gather_megaSeeds', 'gather_timeCrystals'],
        sidekick: ['clone', 'consume_megaSeeds', 'consume_timeCrystals'],
        evilGenius: ['sidekick', 'destroy_megaSeeds', 'destroy_timeCrystals'],
    },
});

module.exports = policy;