import React from 'react'
import { useHistory } from 'react-router-dom'
import { CustomerForm } from './CustomerForm'
import * as API from '../API'

export const CustomerCreate = () => {

    // HOOKS //
    const history = useHistory()

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // EVENTS //
    const onSubmit = async (data) => {
        const customer = await API.createCustomer(data)
        alert('Created customer:\n' + JSON.stringify(customer))
        history.goBack()
    }

    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Create Customer
                </div>
            </div>
            <div className='formContainer'>
                <CustomerForm onSubmit={onSubmit} />
            </div>
            
        </div>
    )
}