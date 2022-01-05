const express = require('express')
const app = express();
const { RBAC } = require('rbac');

app.use(express.json())

const policy = new RBAC({
  roles: ['viewer', 'editor'],
  permissions: {
    resource1: ['view', 'edit'],
    resource2: ['view', 'edit']
  },
  grants: {
    viewer: ['view_resource1', 'view_resource2'],
    editor: ['viewer', 'edit_resource1', 'edit_resource2'],
  },
});

const hasPermission = (action) => {
  return async (req, res, next) => {
    const { user } = req.body
    const { resource } = req.params

    const can = await policy.can(user.role, action, resource);
    if (!can) {
      res.status(403).end()
    }
    next()
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
