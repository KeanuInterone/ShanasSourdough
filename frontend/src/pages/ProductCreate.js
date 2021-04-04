import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductForm } from './ProductForm'
import * as API from '../API'
import { v4 as uuidv4 } from 'uuid';
import ClipLoader from "react-spinners/ClipLoader"

export const ProductCreate = () => {

    // HOOKS //
    const history = useHistory()
    const [loading, setLoading] = useState(false)


    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // EVENTS //
    const onSubmit = async (data, imageFile) => {
        setLoading(true)
        if (imageFile != null) {
            const fileName = uuidv4()
            const fileType = imageFile.type
            const sinedUrlResponse = await API.getSignedImageURL(fileName, fileType)
            await API.uploadImage(sinedUrlResponse.signedRequest, imageFile)
            data.imageURL = sinedUrlResponse.url
        }
        
        const product = await API.createProduct(data)
        setLoading(false)
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
            {loading && (
                <div className='loading'>
                    <ClipLoader loading={loading} size={150} />
                </div>
            )}
            <div className='formContainer'>
                <ProductForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}