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
const aws = require('aws-sdk')


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


// SIGNED IMAGE URL //
app.post('/getSignedImageURL', passport.authenticate('jwt', { session: false }), async (req, res) => {

    const fileName = req.body.fileName
    const fileType = req.body.fileType
    const s3Bucket = process.env.S3_BUCKET_NAME
    
    const credentials = new aws.Credentials({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    })
    const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-2',
        credentials: credentials
    })

    const s3Params = {
        Bucket: s3Bucket,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    };

    s3.getSigned
    const signedRequest = await s3.getSignedUrlPromise('putObject', s3Params);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${fileName}`;

    const resBody = {
        signedRequest: signedRequest,
        url: url
    }

    res.json(resBody)

})


// APP LISTEN //
app.listen(PORT, HOST, () => {
    console.log("Server is running on port: " + PORT)
})




