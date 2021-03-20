const experss = require('express')
const router = experss.Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/login', function (req, res, next) {
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

router.post('/create', async (req, res) => {
    req.body.password = await encryptPassword(req.body.password)
    const user = new User(req.body)
    user.save().then((user) => {
        const { password, ...returnUser } = user // exludes password
        res.json(returnUser)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

// HELPER //
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

module.exports = router