const { newEnforcer } = require('casbin');
const express = require('express');
const app = express();

app.use(express.json())


const hasPermission = (action) => {
  return async (req, res, next) => {
    const e = await newEnforcer('./rbac_model.conf', './rbac_policy.csv');
    const { user } = req.body
    const { resource } = req.params
    const allowed = await e.enforce(user.name, resource, action)
    if (!allowed) {
      res.status(403).end()
    }
    next()
  }
}

app.post('/api/view/:resource', hasPermission("view"), (req, res) => {
  res.send("Got Permission")
})

app.post('/api/edit/:resource', hasPermission("edit"), (req, res) => {
  res.send("Got Permission")
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
