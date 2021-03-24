import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getTodo, editTodo } from './api'


export const EditTodo = () => {

    const match = useRouteMatch()
    const [todo, setTodo] = useState()
    const history = useHistory()

    useEffect(() => {
        const fetchTodo = async (id) => {
            const todo = await getTodo(id)
            setTodo(todo)
        }
        fetchTodo(match.params.id)
    }, [])

    const onSubmit = async (data) => {
        const updatedTodo = await editTodo(data, todo._id)
        alert('Created todo:\n' + JSON.stringify(updatedTodo))
        history.push("/")
    }

    return todo ?
        <div className="container">
            <div className="mt-3">
                <h3>Edit Todo Item</h3>
                <TodoForm todo={todo} onSubmit={onSubmit} />
            </div>
        </div> : <div>Loading...</div>

}