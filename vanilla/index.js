//Express app
const express = require('express');
const users = require('../users')
const roles = require('./roles')
const app = express();

app.use(express.json())

const resolveUserRole = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.role
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const role = resolveUserRole(user)
    const { resource } = req.params
    const hasPermission = roles[role] && roles[role][action] && roles[role][action].includes(resource) ? true : false

    if (hasPermission) {
      next()
    }
    else {
      res.status(403).send('Forbidden')
    }
  }
}

app.post('/api/view/:resource', hasPermission('view'), (req, res) => {
  res.send("Got Permission")
})

app.post('/api/edit/:resource', hasPermission('edit'), (req, res) => {
  res.send("Got Permission")
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
