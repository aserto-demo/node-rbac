//Express app
const express = require('express');
const AccessControl = require('accesscontrol');
const app = express();
const grantList = require('./grantlist');
const ac = new AccessControl(grantList);
const users = require('../users')
app.use(express.json())

const resolveUserRole = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.role
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    const role = resolveUserRole(user)
    switch (action) {
      case 'read':
        if (!ac.can(role).readAny(resource).granted) {
          res.status(403).send('Forbidden')
        } else {
          next()
        }
        break;
      case 'edit':
        if (!ac.can(role).updateAny(resource).granted) {
          res.status(403).send('Forbidden')
        } else {
          next()
        }
        break;
      default:
        res.status(403).send('Forbidden')
    }
  }
}

app.post('/api/view/:resource', hasPermission('read'), (req, res) => {
  res.send('Got Permission')
})

app.post('/api/edit/:resource', hasPermission('edit'), (req, res) => {
  res.send('Got Permission')
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
