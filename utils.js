const users = require('./users')
const resolveUserRoles = (user) => {
    //Would query DB
    const userWithRole = users.find(u => u.id === user.id)
    return userWithRole.roles
}

module.exports = {
    resolveUserRoles
}