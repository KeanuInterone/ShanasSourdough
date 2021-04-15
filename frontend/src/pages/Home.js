import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from 'react'
import ProductCell from '../components/ProductCell'
import styles from './Home.module.css'
import { useHistory } from 'react-router-dom';
import * as API from '../API'
import ClipLoader from "react-spinners/ClipLoader"




export const Home = (order, products, productQuantityChange) => {

    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    var [orderCount, setOrderCount] = useState(0)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        history.push('/login')
    }

    const goToCart = () => {
        history.push('/cart')
    }

    const getOrderCount = (order) => {
        let count = 0
        Object.keys(order.products).forEach(productId => {
            count += order.products[productId]
        })
        return count
    }


    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>
                        Shana's Sourdough
                    </h1>
                </div>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{
                        height: 60,
                        width: 60,
                        position: 'absolute',
                        top: '10px',
                        right: '10px'
                    }}>
                    <MenuIcon style={{
                        fill: '#ffffff',
                        height: 60,
                        width: 60
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
            </Menu>
            {
                products ?
                    (<div className={styles.breadCellGrid}>
                        {
                            products.map(product => {
                                return (
                                    <ProductCell key={product._id} order={order} product={product} productQuantityChange={productQuantityChange} />
                                )
                            })
                        }
                    </div>)
                    :
                    (<ClipLoader loading={true} size={150} />)
            }
            {getOrderCount(order) > 0 && (
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={goToCart}
                    style={{
                        height: 60,
                        width: 60,
                        position: 'fixed',
                        bottom: '10px',
                        right: '15px'
                    }}>
                    <Badge badgeContent={getOrderCount(order)} color="secondary">
                        <ShoppingCartIcon style={{
                            fill: '#444444',
                            height: 60,
                            width: 60
                        }} />
                    </Badge>
                </Button>
            )}

        </div>
    )
}

export default Home