//Express app

const express = require('express');
const AccessControl = require('accesscontrol');
const app = express();
const grantList = require('./grantlist');
const ac = new AccessControl(grantList);

app.use(express.json())

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    switch (action) {
      case 'read':
        if (!ac.can(user.role).readAny(resource).granted) {
          res.stats(403).send('Forbidden')
        }
        break;
      case 'update':
        if (!ac.can(user.role).updateAny(resource).granted) {
          res.stats(403).send('Forbidden')
        }
        break;
    }
    next()
  }
}

app.post('/api/view/:resource', hasPermission('read'), (req, res) => {
  res.send('Got Permission')
})

app.post('/api/edit/:resource', hasPermission('update'), (req, res) => {
  res.send('Got Permission')
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
