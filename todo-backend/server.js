const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')

// VARIABLES //
const PORT = 4000
const HOST = '0.0.0.0'


// CONNECT TO DATABASE //
mongoose.connect('mongodb://todo-db:27017/todo', { useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log("Successful connection to db")
})


// EXPRESS SET UP //
const app = express()
app.use(cors())
app.use(express.json())


// APP ROUTES //
app.get('/', (req, res) => {
	res.send('Welcome to the todo backend')
})

app.get('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(todos)
        }
    })
})

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

