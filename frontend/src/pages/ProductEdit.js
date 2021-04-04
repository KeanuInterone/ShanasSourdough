import React, { useState, useEffect } from 'react'
import { ProductForm } from './ProductForm'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"
import { v4 as uuidv4 } from 'uuid';
import * as API from '../API'


export const ProductEdit = () => {

    

    // HOOKS //
    const match = useRouteMatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

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
    const onSubmit = async (data, imageFile) => {
        setLoading(true)
        if (imageFile != null) {
            const fileName = uuidv4()
            const fileType = imageFile.type
            const sinedUrlResponse = await API.getSignedImageURL(fileName, fileType)
            await API.uploadImage(sinedUrlResponse.signedRequest, imageFile)
            data.imageURL = sinedUrlResponse.url
        }

        const updatedProduct = await API.editProduct(data, product._id)
        setLoading(false)
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
            {loading && (
                <div className='loading'>
                    <ClipLoader loading={loading} size={150} />
                </div>
            )}
            <div className='formContainer'>
                <ProductForm product={product} onSubmit={onSubmit} />
            </div>

        </div> : <div>Loading...</div>

}