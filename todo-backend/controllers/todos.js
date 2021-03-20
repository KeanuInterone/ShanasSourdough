const experss = require('express')
const router = experss.Router()
const passport = require('passport')
const Todo = require('../models/Todo')



router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        Todo.find((err, todos) => {
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
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(todo)
        }
    })
})

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const todo = new Todo(req.body)
    todo.save().then((todo) => {
        res.json(todo)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
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

module.exports = router