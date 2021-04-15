import './Admin.css'
import { useHistory } from 'react-router-dom'
import * as API from '../API'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import ProductRow from '../components/ProductRow'


export const Cart = (order, products, productQuantityChange) => {
    const history = useHistory()


    // EVENTS //


    // ON LOAD //
    const productWithId = (productId) => {
        products.forEach(product => {
            if (product._id == productId) {
                return product
            }
        });
        return null
    }

    const getProducts = () => {
        let productsArray = []
        products.forEach(product => {
            if (product._id in order.products) {
                productsArray.push(
                    <ProductRow key={product._id} order={order} product={product} productQuantityChange={productQuantityChange}/>
                )
            }
        })
        return productsArray
    }
   

    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Cart
                </div>
            </div>
            {
                getProducts()
            }
        </div>
    )
}