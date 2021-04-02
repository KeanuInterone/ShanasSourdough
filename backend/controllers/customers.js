const experss = require('express')
const router = experss.Router()
const passport = require('passport')
const Customer = require('../models/Customer')



router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Customer.find((err, todos) => {
            if (err) {
                res.status(500).send(err.message)
            } else {
                res.json(todos)
            }
        })
    }
);

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    Customer.findById(id, (err, todo) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(todo)
        }
    })
})

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const customer = new Customer(req.body)
    customer.save().then((customer) => {
        res.json(customer)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    Customer.findById(id, (err, customer) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (!customer) {
            res.status(400).send('Customer was not found')
        } else {

            if (req.body.first_name != undefined) {
                customer.first_name = req.body.first_name
            }
            if (req.body.last_name != undefined) {
                customer.last_name = req.body.last_name
            }
            if (req.body.email != undefined) {
                customer.email = req.body.email
            }
            if (req.body.phone != undefined) {
                customer.phone = req.body.phone
            }
            if (req.body.address != undefined) {
                customer.address = req.body.address
            }
            
            customer.save().then((customer) => {
                res.json(customer)
            }).catch((err) => {
                res.status(500).send(err.message)
            })
        }
    })
})

module.exports = router