import { AbilityBuilder, Ability } from '@casl/ability'
import express from 'express'

const app = express();


app.use(express.json())

const hasPermission = (req, res, next) => {
   next()   
}

app.post('/api/:resource', hasPermission, (req, res) => { 
    res.send("Got Permission")
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})
