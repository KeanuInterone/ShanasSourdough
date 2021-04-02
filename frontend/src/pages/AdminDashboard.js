import './Admin.css'
import { useHistory } from 'react-router-dom'
import * as API from '../API'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'


export const AdminDashboard = () => {
    const history = useHistory()

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    const [items, setItems] = useState([])

    const [anchorEl, setAnchorEl] = useState(null);

    const menuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToProducts = () => {
        history.push('/products')
    }
    const goToCustomers = () => {
        history.push('/customers')
    }

    useEffect(() => {
        const fetchItems = async () => {
            const todos = await API.getTodos()
            setItems(todos)
        }

        fetchItems()
    }, [])


    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Dashboard
                </div>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={menuClick}
                    style={{
                        height: 40,
                        width: 40,
                        position: 'absolute',
                        top: '20px',
                        right: '10px'
                    }}>
                    <MenuIcon style={{
                        fill: '#ffffff',
                        height: 40,
                        width: 40
                    }} />
                </Button>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={goToCustomers}>Customers</MenuItem>
                <MenuItem onClick={goToProducts}>Products</MenuItem>
            </Menu>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(todo => (
                            <tr key={todo._id}>
                                <td>
                                    {todo.text}
                                </td>
                                <td>
                                    <Link to={`/edit/${todo._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}