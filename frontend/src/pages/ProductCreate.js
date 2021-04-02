import React from 'react'
import { useHistory } from 'react-router-dom'
import { ProductForm } from './ProductForm'
import * as API from '../API'

export const ProductCreate = () => {

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // HOOKS //
    const history = useHistory()

    // EVENTS //
    const onSubmit = async (data) => {
        const product = await API.createProduct(data)
        alert('Created product:\n' + JSON.stringify(product))
        history.goBack()
    }

    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Create Product
                </div>
            </div>
            <div className='formContainer'>
                <ProductForm onSubmit={onSubmit} />
            </div>
            
        </div>
    )
}