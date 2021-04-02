import { Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import { TodoList } from './TodoList'
import { CreateTodo } from './CreateTodo'
import { EditTodo } from './EditTodo'
import { Login } from './pages/Login'
import { AdminDashboard } from './pages/AdminDashboard'
import { Home } from './pages/Home'
import{ Products } from './pages/Products'
import { ProductCreate } from './pages/ProductCreate'
import { ProductEdit } from './pages/ProductEdit'
import{ Customers } from './pages/Customers'
import { CustomerCreate } from './pages/CustomerCreate'
import { CustomerEdit } from './pages/CustomerEdit'


function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
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
