import './Admin.css'
import { useHistory } from 'react-router-dom'
import * as API from '../API'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'


export const Products = () => {
    const history = useHistory()

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // STATES //
    const [products, setProducts] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    // EVENTS //
    const menuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToProductCreate = () => {
        history.push('/products/create')
    }
    const editProduct = (id) => {
        console.log('edit product ' + id)
        history.push('/products/edit/' + id)
    }

    // ON LOAD //
    useEffect(() => {
        const fetchItems = async () => {
            const products = await API.getProducts()
            setProducts(products)
        }
        fetchItems()
    }, [])


    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Products
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
                <MenuItem onClick={goToProductCreate}>Create Product</MenuItem>
            </Menu>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr key={product._id} >
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.price}
                                </td>
                                <td>
                                    <Button variant='contained' color='secondary' size='small' onClick={() => editProduct(product._id)}>
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