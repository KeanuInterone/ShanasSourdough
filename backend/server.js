const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/User')
const users = require('./controllers/users.js')
const todos = require('./controllers/todos.js')
const products = require('./controllers/products.js')
const customers = require('./controllers/customers.js')

// VARIABLES //
const PORT = 4000
const HOST = '0.0.0.0'


// CONNECT TO DATABASE //
mongoose.connect('mongodb://db:27017/todo', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log("Successful connection to db")
})

// EXPRESS SET UP //
const app = express()
app.use(cors())
app.use(express.json())

// PASSPORT SET UP //
app.use(passport.initialize())
var opts = {}
opts.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET;
// JWT Authentication
passport.use(new passportJWT.Strategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));
// Email and password Authentication
passport.use(new passportLocal.Strategy({ usernameField: 'email' },
    function (email, password, done) {
        User.findOne({ email: email }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            let validPassword = await comparePassword(password, user.password)
            if (!validPassword) { return done(null, false); }
            return done(null, user);
        });
    }
));
function comparePassword(password, hash) {
    return new Promise(resolve => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                resolve(result)
            }
        });
    })
}


// APP ROUTES //
app.get('/', (req, res) => {
    res.send('Welcome to the todo backend')
})

// PRODUCTS //
app.use('/products', products)

// CUSTOMERS //
app.use('/customers', customers)

// USERS //
app.use('/users', users)


// TODOS //
app.use('/todos', todos)


// APP LISTEN //
app.listen(PORT, HOST, () => {
    console.log("Server is running on port: " + PORT)
})




