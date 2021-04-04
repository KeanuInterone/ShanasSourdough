import React, { useState, useEffect } from 'react'
import { CustomerForm } from './CustomerForm'
import { useHistory, useRouteMatch } from 'react-router-dom'
import * as API from '../API'


export const CustomerEdit = () => {

    

    // HOOKS //
    const match = useRouteMatch()
    const history = useHistory()

    // Check to see if user logged in
    if (!API.isLoggedIn()) {
        history.push('/login')
    }

    // STATES //
    const [customer, setCustomer] = useState()
    

    // ON LOAD //
    useEffect(() => {
        const fetchCustomer = async (id) => {
            const customer = await API.getCustomer(id)
            setCustomer(customer)
        }
        fetchCustomer(match.params.id)
    }, [])

    // EVENTS //
    const onSubmit = async (data) => {
        const updatedCustomer = await API.editCustomer(data, customer._id)
        alert('Updated customer:\n' + JSON.stringify(updatedCustomer))
        history.goBack()
    }

    return customer ?
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Edit Customer
                </div>
            </div>
            <div className='formContainer'>
                <CustomerForm customer={customer} onSubmit={onSubmit} />
            </div>

        </div> : <div>Loading...</div>

}