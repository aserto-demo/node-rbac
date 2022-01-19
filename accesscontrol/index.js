//Express app
const express = require('express');
const AccessControl = require('accesscontrol');
const { resolveUserRoles } = require('../utils')
const grantList = require('./grantlist');

const ac = new AccessControl(grantList);
ac.grant('admin').extend('editor')

const app = express();
app.use(express.json())

const assets = {
  'asset1': {
    id: 'asset1',
    content: 'This is asset 1'
  },
  'asset2': {
    id: 'asset2',
    content: 'This is asset 2'
  }
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const { asset } = req.params
    const userRoles = resolveUserRoles(user)
    const allowed = userRoles.reduce((perms, role) => {
      let permissions
      switch (action) {
        case 'read':
          permissions = ac.can(role).readAny(asset)
          if (permissions.granted) {
            perms = perms.concat(permissions)
          }
          break;
        case 'edit':
          permissions = ac.can(role).updateAny(asset)
          if (permissions.granted) {
            perms = perms.concat(permissions)
          }
          break;
        case 'delete':
          permissions = ac.can(role).deleteAny(asset)
          if (permissions.granted) {
            perms = perms.concat(permissions)
          }
          break;
      }
      return perms
    }, [])

    if (allowed.length) {
      const result = allowed.map(perm => {
        const data = assets[asset]
        return {
          data: perm.filter(data),
          asRole: perm._.role
        }
      })

      res.locals = result
      next()
    } else {
      res.status(403).send('Forbidden')
    }
  }
}

app.get('/api/:asset', hasPermission('read'), (req, res) => {
  res.send("Got Permission")
})

app.put('/api/:asset', hasPermission('edit'), (req, res) => {
  res.send("Got Permission")
})

app.delete('/api/:asset', hasPermission('delete'), (req, res) => {
  res.send("Got Permission")
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
