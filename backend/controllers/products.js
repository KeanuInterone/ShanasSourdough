const experss = require('express')
const router = experss.Router()
const passport = require('passport')
const Product = require('../models/Product')
const aws = require('aws-sdk')


router.get('/', (req, res) => {
    Product.find((err, todos) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(todos)
        }
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id, (err, product) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(product)
        }
    })
})

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const product = new Product(req.body)
    product.save().then((product) => {
        res.json(product)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    Product.findById(id, (err, product) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (!product) {
            res.status(400).send('Product was not found')
        } else {

            if (req.body.name != undefined) {
                product.name = req.body.name
            }
            if (req.body.description != undefined) {
                product.description = req.body.description
            }
            if (req.body.price != undefined) {
                product.price = req.body.price
            }
            if (req.body.imageURL != undefined) {
                product.imageURL = req.body.imageURL
                // also delete the old image in s3
            }


            product.save().then((product) => {
                res.json(product)
            }).catch((err) => {
                res.status(500).send(err.message)
            })
        }
    })
})

module.exports = router