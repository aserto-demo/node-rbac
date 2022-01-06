const express = require('express')
const users = require('../users')
const policy = require('./policy')

const app = express();

app.use(express.json())

const resolveUserRole = (user) => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user.id)
  return userWithRole.role
}

const hasPermission = (action) => {
  return async (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params
    const role = resolveUserRole(user)
    const can = await policy.can(role, action, resource);
    if (!can) {
      res.status(403).send('Forbidden').end()
    }
    else {
      next()
    }
  }
}

app.post('/api/view/:resource', hasPermission('view'), (req, res) => {
  res.send('Got Permission')
})

app.post('/api/edit/:resource', hasPermission('edit'), (req, res) => {
  res.send('Got Permission')
})

const main = async () => {
  await policy.init()
  app.listen(8080, () => {
    console.log('listening on port 8080')
  })
}

main()
