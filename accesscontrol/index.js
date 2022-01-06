//Express app
const express = require('express');
const AccessControl = require('accesscontrol');
const app = express();
const grantList = require('./grantlist');
const ac = new AccessControl(grantList);
const users = require('../users')
app.use(express.json())

const resolveUserRoles = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.roles
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    const userRoles = resolveUserRoles(user)
    const allowed = userRoles.reduce((perms, role) => {
      switch (action) {
        case 'read':
          if (ac.can(role).readAny(resource).granted) {
            perms = true
          }
          break;
        case 'edit':
          if (ac.can(role).updateAny(resource).granted) {
            perms = true
          }
          break;
        case 'delete':
          if (ac.can(role).deleteAny(resource).granted) {
            perms = true
          }
          break;
      }
      return perms
    }, false)

    if (!allowed) {
      res.status(403).send('Forbidden').end()
    } else {
      next()
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
