const express = require('express')
const CanCan = require('cancan');

const cancan = new CanCan();
const {allow, can} = cancan;

class User {}
class Product {}

allow(User, 'view', Product);
const user = new User();
const product = new Product();

can(user, 'view', product);
//=> true

console.log(can(user, 'edit', product))

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
