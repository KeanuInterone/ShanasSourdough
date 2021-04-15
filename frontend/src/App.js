import { Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import { TodoList } from './TodoList'
import { CreateTodo } from './CreateTodo'
import { EditTodo } from './EditTodo'
import { Login } from './pages/Login'
import { AdminDashboard } from './pages/AdminDashboard'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { ProductCreate } from './pages/ProductCreate'
import { ProductEdit } from './pages/ProductEdit'
import { Customers } from './pages/Customers'
import { CustomerCreate } from './pages/CustomerCreate'
import { CustomerEdit } from './pages/CustomerEdit'
import { Cart } from './pages/Cart.js'
import * as API from './API'
import { useState, useEffect } from 'react'



function App() {

  const [products, setProducts] = useState(null)
  const [order, setOrder] = useState({
    products: {}
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await API.getProducts()
      setProducts(products)
    }
    fetchProducts()
  }, [])

  const productQuantityChange = (productId, amount) => {
    if (productId in order.products) {
      order.products[productId] = order.products[productId] + amount
      if (order.products[productId] <= 0) {
        delete order.products[productId]
      }
    } else {
      order.products[productId] = amount
    }
    setOrder(Object.assign({}, order))
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => Home(order, products, productQuantityChange)} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/admin_dashboard" component={AdminDashboard} />
        <Route path="/products/create" component={ProductCreate} />
        <Route path="/products/edit/:id" component={ProductEdit} />
        <Route path="/products" component={Products} />
        <Route path="/customers/create" component={CustomerCreate} />
        <Route path="/customers/edit/:id" component={CustomerEdit} />
        <Route path="/customers" component={Customers} />
        <Route path="/cart" component={() => Cart(order, products, productQuantityChange)} />
      </Switch>
    </div>

  );
}

/*
<div>
      <nav className="navbar bg-light navbar-expand-lg navbar-light">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link className="nav-link" to="/">Todos</Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/create">Create</Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      </nav>
  </div>
*/

export default App;
