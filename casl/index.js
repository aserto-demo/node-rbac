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
  return (req, res, next) => {
    const { user } = req.body
    const { resource: resourceId } = req.params
    const ability = defineRulesFor(user);
    const resource = new Resource(resourceId)
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, resource);
      next()
    }
    catch (error) {
      res.status(403).send('Forbidden').end()
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

app.listen(8080, () => {
  console.log('listening on port 8080')
})
