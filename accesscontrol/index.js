//Express app
const express = require('express');
const app = express();

app.use(express.json())

const hasPermission = (action) => {
    return (req, res, next) => {
        const { user } = req.body
        const { resource } = req.params

        next()
    }
}

app.post('/api/view/:resource', hasPermission, (req, res) => {
    res.send("Got Permission")
})

app.post('/api/edit/:resource', hasPermission, (req, res) => {
    res.send("Got Permission")
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})
