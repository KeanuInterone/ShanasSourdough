const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const User = require('./models/User')

// VARIABLES //
const PORT = 4000
const HOST = '0.0.0.0'


// CONNECT TO DATABASE //
mongoose.connect('mongodb://todo-db:27017/todo', { useNewUrlParser: true })
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


// APP ROUTES //
app.get('/', (req, res) => {
    res.send('Welcome to the todo backend')
})

app.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) { return next(err); }
        if (!user) { return res.status(404).send('Incorrect email or password'); }
        req.logIn(user, () => {
            const jwtBody = { id: user._id, email: user.email }
            const token = jwt.sign(jwtBody, process.env.JWT_SECRET)
            return res.json({ jwt: token })
        });
    })(req, res, next);
});

app.post('/user/create', async (req, res) => {
    req.body.password = await encryptPassword(req.body.password)
    const user = new User(req.body)
    user.save().then((user) => {
        const { password, ...returnUser } = user // exludes password
        res.json(returnUser)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})


app.get('/todos', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        Todo.find((err, todos) => {
            if (err) {
                res.status(500).send(err.message)
            } else {
                res.json(todos)
            }
        })
    }
);

app.get('/todo/:id', (req, res) => {
    const id = req.params.id
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(todo)
        }
    })
})

app.post('/todo/create', (req, res) => {
    const todo = new Todo(req.body)
    todo.save().then((todo) => {
        res.json(todo)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

app.post('/todo/edit/:id', (req, res) => {
    const id = req.params.id
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (!todo) {
            res.status(400).send('Todo was not found')
        } else {
            todo.text = req.body.text

            todo.save().then((todo) => {
                res.json(todo)
            }).catch((err) => {
                res.status(500).send(err.message)
            })
        }
    })
})


// APP LISTEN //
app.listen(PORT, HOST, () => {
    console.log("Server is running on port: " + PORT)
})



// HELPER FUNCTIONS //
function encryptPassword(password) {
    return new Promise(resolve => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                console.log(err)
            } else {
                resolve(hash)
            }
        });
    })
}

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