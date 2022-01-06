const express = require('express')
const users = require('../users')
const policy = require('./policy')

const app = express();

app.use(express.json())

const resolveUserRoles = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.roles
}

const hasPermission = (action) => {
  return async (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    const userRoles = resolveUserRoles(user)

    const allowed = await userRoles.reduce(async (perms, role) => {
      const acc = await perms
      const can = await policy.can(role, action, resource)
      const result = can ? acc.concat(can) : acc.concat([])
      return result
    }, Promise.resolve([]))

    if (!allowed.length > 0) {
      res.status(403).send('Forbidden').end()
    }
    else {
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

const main = async () => {
  await policy.init()
  app.listen(8080, () => {
    console.log('listening on port 8080')
  })
}

main()
