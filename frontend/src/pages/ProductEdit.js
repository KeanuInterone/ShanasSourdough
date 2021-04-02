import React, { useState, useEffect } from 'react'
import { ProductForm } from './ProductForm'
import { useHistory, useRouteMatch } from 'react-router-dom'
import * as API from '../API'


export const ProductEdit = () => {

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // HOOKS //
    const match = useRouteMatch()
    const history = useHistory()

    // STATES //
    const [product, setProduct] = useState()
    

    // ON LOAD //
    useEffect(() => {
        const fetchProduct = async (id) => {
            const product = await API.getProduct(id)
            setProduct(product)
        }
        fetchProduct(match.params.id)
    }, [])

    // EVENTS //
    const onSubmit = async (data) => {
        const updatedProduct = await API.editProduct(data, product._id)
        alert('Updated product:\n' + JSON.stringify(updatedProduct))
        history.goBack()
    }

    return product ?
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Edit Product
                </div>
            </div>
            <div className='formContainer'>
                <ProductForm product={product} onSubmit={onSubmit} />
            </div>

        </div> : <div>Loading...</div>

}