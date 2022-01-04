//Express app
const express = require('express');
const users = require('./users')
const roles = require('./roles')
const app = express();

app.use(express.json())

const hasPermission = (req, res, next) => {
    const { user } = req.body
    const userWithRoles = users.find(u => u.id === user.id)
    const { roles : userRoles } = userWithRoles
    const { resource } = req.params
    const permissions = userRoles.reduce((acc, role) => {        
        return acc.concat(roles[role])
    }, [])

    if (permissions && permissions.includes(resource)) {
        next()
    }
    else {
        res.status(403).send('Forbidden')
    }    
}

app.post('/api/:resource', hasPermission, (req, res) => { 
    res.send("Got Permission")
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})
