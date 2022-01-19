import express from 'express'
import { defineRulesFor } from './abilities.js'
import { ForbiddenError } from '@casl/ability'

const app = express();
app.use(express.json())
class Asset {
  constructor(id) {
    this.id = id
  }
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body
    const { asset: assetId } = req.params
    const ability = defineRulesFor(user);
    const asset = new Asset(assetId)
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, asset);
      next()
    }
    catch (error) {
      res.status(403).send('Forbidden').end()
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
