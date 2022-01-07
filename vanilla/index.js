//Express app
const express = require('express');
const { resolveUserRoles } = require('../utils')
const roles = require('./roles')
const app = express();

app.use(express.json())

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    const userRoles = resolveUserRoles(user)

    const permissions = userRoles.reduce((perms, role) => {
      perms = roles[role] && roles[role][action] ? perms.concat(roles[role][action]) : perms.concat([])
      return perms
    }, [])

    const allowed = permissions.includes(resource)

    allowed ? next() : res.status(403).send('Forbidden').end()
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
