const baseURL = 'http://localhost:4000/'

export const getTodos = () => fetch(baseURL + 'todos').then(res => res.json())

export const getTodo = (id) => fetch(baseURL + 'todo/' + id).then(res => res.json())

export const createTodo = (todo) => fetch(baseURL + 'todo/create', {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
}).then(res => res.json())

export const editTodo = (todo, id) => fetch(baseURL + 'todo/edit/' + id, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
}).then(res => res.json())