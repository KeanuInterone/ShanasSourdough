import { Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import { TodoList } from './TodoList'
import { CreateTodo } from './CreateTodo'
import { EditTodo } from './EditTodo'
import { Login } from './pages/Login'
import Home from './pages/Home'


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateTodo} />
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
