//Express app
const express = require('express');
const users = require('../users')
const roles = require('./roles')
const app = express();

app.use(express.json())

const resolveUserRoles = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.roles
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const userRoles = resolveUserRoles(user)
    const { resource } = req.params

    const permissions = userRoles.reduce((perms, role) => {
      perms = roles[role] && roles[role][action] ? perms.concat(roles[role][action]) : perms.concat([])
      return perms
    }, [])

    const allowed = permissions.includes(resource)

    if (allowed) {
      next()
    }
    else {
      res.status(403).send('Forbidden')
    }
  }
}

app.post('/api/read/:resource', hasPermission('read'), (req, res) => {
  res.send("Got Permission")
})

app.post('/api/edit/:resource', hasPermission('edit'), (req, res) => {
  res.send("Got Permission")
})

app.post('/api/delete/:resource', hasPermission('delete'), (req, res) => {
  res.send("Got Permission")
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
