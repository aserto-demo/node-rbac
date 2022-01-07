const express = require('express')
const { resolveUserRoles } = require('../utils')
const policy = require('./policy')

const app = express();

app.use(express.json())

const hasPermission = (action) => {
  return async (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    const userRoles = resolveUserRoles(user)

    const allowed = await userRoles.reduce(async (perms, role) => {
      const acc = await perms
      if (acc) return true

      const can = await policy.can(role, action, resource)
      if (can) return true
    }, false)

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

const main = async () => {
  await policy.init()
  app.listen(8080, () => {
    console.log('listening on port 8080')
  })
}

main()
