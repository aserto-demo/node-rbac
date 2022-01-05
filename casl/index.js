import express from 'express'
import { defineRulesFor } from './abilities.js'
import { ForbiddenError } from '@casl/ability'

const app = express();

app.use(express.json())

class Resource {
  constructor(id) {
    this.id = id
  }
}

const hasPermission = (action) => {
  return (req, _, next) => {
    const { user } = req.body
    const ability = defineRulesFor(user);
    const { resource: resourceId } = req.params
    const resource = new Resource(resourceId)
    ForbiddenError.from(ability).throwUnlessCan(action, resource);

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
