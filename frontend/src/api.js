const baseURL = 'http://localhost:4000'
let JWT

export async function login(email, password) {

    let res = await fetch(baseURL + '/users/login', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    });
    if (res.status == 200) {
        let json =  await res.json()
        JWT = json.jwt
        return true
    } else {
        return false
    }
}

export function isLoggedIn() {
    return JWT != null
}


// PRODUCTS //
export async function getProducts() {
    let res = await fetch(baseURL + '/products/', {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + JWT
        }
    })
    if (res.status == 200) {
        let products = await res.json()
        return products
    } else {
        return null
    }
    
}

export async function createProduct(product) {

    let res = await fetch(baseURL + '/products/create', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JWT
        },
        body: JSON.stringify(product)
    });

    if (res.status == 200) {
        return await res.json()
    } else {
        return false
    }
}

export async function getProduct(id) {
    let res = await fetch(baseURL + '/products/' + id, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + JWT
        }
    })
    if (res.status == 200) {
        let product = await res.json()
        return product
    } else {
        return null
    }
    
}

export async function editProduct(product, id) {

    let res = await fetch(baseURL + '/products/edit/' + id, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JWT
        },
        body: JSON.stringify(product)
    });

    if (res.status == 200) {
        return await res.json()
    } else {
        return false
    }
}




// CUSTOMERS //
export async function getCustomers() {
    let res = await fetch(baseURL + '/customers/', {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + JWT
        }
    })
    if (res.status == 200) {
        return await res.json()
    } else {
        return null
    }
    
}

export async function createCustomer(customer) {

    let res = await fetch(baseURL + '/customers/create', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JWT
        },
        body: JSON.stringify(customer)
    });

    if (res.status == 200) {
        return await res.json()
    } else {
        return false
    }
}

export async function getCustomer(id) {
    let res = await fetch(baseURL + '/customers/' + id, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + JWT
        }
    })
    if (res.status == 200) {
        return await res.json()
    } else {
        return null
    }
    
}

export async function editCustomer(customer, id) {

    let res = await fetch(baseURL + '/customers/edit/' + id, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JWT
        },
        body: JSON.stringify(customer)
    });

    if (res.status == 200) {
        return await res.json()
    } else {
        return false
    }
}


export async function getTodos() {
    let res = await fetch(baseURL + '/todos/', {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + JWT
        }
    })
    if (res.status == 200) {
        let todos = await res.json()
        return todos
    } else {
        return null
    }
    
}


export async function getTodo(id) {
    let res = await fetch(baseURL + '/todo/' + id, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + JWT
        }
    })
    if (res.status == 200) {
        let todos = await res.json()
        return todos
    } else {
        return null
    }
    
}

export async function createTodo(todo) {

    let res = await fetch(baseURL + '/todos/create', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JWT
        },
        body: JSON.stringify(todo)
    });

    if (res.status == 200) {
        return await res.json();
    } else {
        return false;
    }
}

export async function editTodo(todo, id) {

    let res = await fetch(baseURL + '/todos/edit/' + id, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JWT
        },
        body: JSON.stringify(todo)
    });

    if (res.status == 200) {
        return await res.json()
    } else {
        return false
    }
}