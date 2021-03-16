import React from 'react'
import { useHistory } from 'react-router-dom'
import { TodoForm } from './TodoForm'
import { createTodo } from './api'

export const CreateTodo = () => {
    const history = useHistory()

    const onSubmit = async (data) => {
        const todo = await createTodo(data)
        alert('Created todo:\n' + JSON.stringify(todo))
        history.push("/")
    }

    return (
        <div className="container">
            <div className="mt-3">
                <h3>Create Todo Item</h3>
                <TodoForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}