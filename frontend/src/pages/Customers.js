import './Admin.css'
import { useHistory } from 'react-router-dom'
import * as API from '../API'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'


export const Customers = () => {
    const history = useHistory()

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // STATES //
    const [customers, setCustomers] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    // EVENTS //
    const menuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToCustomerCreate = () => {
        history.push('/customers/create')
    }
    const editCustomer = (id) => {
        console.log('edit customer ' + id)
        history.push('/customers/edit/' + id)
    }

    // ON LOAD //
    useEffect(() => {
        const fetchItems = async () => {
            const customers = await API.getCustomers()
            setCustomers(customers)
        }
        fetchItems()
    }, [])


    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Customers
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
                <MenuItem onClick={goToCustomerCreate}>Create Customer</MenuItem>
            </Menu>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(customer => (
                            <tr key={customer._id} >
                                <td>
                                    {customer.first_name} {customer.last_name}
                                </td>
                                <td>
                                    <Button variant='contained' color='secondary' size='small' onClick={() => editCustomer(customer._id)}>
                                        edit
                                    </Button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}