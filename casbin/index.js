const { newEnforcer } = require('casbin');
const express = require('express');
const { resolveUserRoles } = require('../utils')
const app = express();

app.use(express.json())

const hasPermission = (action) => {
  return async (req, res, next) => {
    const { user } = req.body
    const { asset } = req.params
    const userRoles = resolveUserRoles(user)

    const e = await newEnforcer('./rbac_model.conf', './rbac_policy.csv');

    const allowed = await userRoles.reduce(async (perms, role) => {
      const acc = await perms
      if (acc) return true
      const can = await e.enforce(role, asset, action)
      if (can) return true
    }, false)

    allowed ? next() : res.status(403).send('Forbidden').end()
  }
}

app.post('/api/read/:asset', hasPermission('read'), (req, res) => {
  res.send("Got Permission")
})

app.post('/api/edit/:asset', hasPermission('edit'), (req, res) => {
  res.send("Got Permission")
})

app.post('/api/delete/:asset', hasPermission('delete'), (req, res) => {
  res.send("Got Permission")
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
