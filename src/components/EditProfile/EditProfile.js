import React, { useState, useEffect } from 'react'
import axiosWithAuth from '../Auth/axiosWithAuth'
import { Link } from 'react-router-dom'
import './edit.css'

const storeUrl = 'https://shopping-cart-eu3-staging.herokuapp.com/api/store/'

const EditProfile = props => {
  const [store, setStore] = useState({
    ownerName: '',
    currency: '',
    storeName: '',
    imageUrl: ''
  })

  useEffect(() => {
    axiosWithAuth()
      .get(storeUrl)
      .then(res => {
        const { ownerName, currency, storeName } = res.data
        setStore({ ownerName, currency, storeName })
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }, [])

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setStore({ ...store, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrors({})
    axiosWithAuth()
      .put(storeUrl, store)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }

  const createStore = (
    <div>
      <p>You currently haven't created a store yet</p>
      <p>
        Click <Link to='/createstore'>here</Link> to create one
      </p>
    </div>
  )

  const editProfile = (
    <div className='edit-form'>
      <h2 className='header-text'>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className='label'>Owner name</label>
        <input
          name='ownerName'
          type='text'
          placeholder='Enter owner name'
          value={store.ownerName}
          onChange={handleChange}
        />
        {errors.ownerName && <p className='error-text'>{errors.ownerName}</p>}

        <label className='label'>Currency</label>
        <input
          name='currency'
          type='text'
          placeholder='Enter currency'
          value={store.currency}
          onChange={handleChange}
        />
        {errors.currency && <p className='error-text'>{errors.currency}</p>}

        <label className='label'>Store name</label>
        <input
          name='storeName'
          type='text'
          placeholder='Enter store name'
          value={store.storeName}
          onChange={handleChange}
        />
        {errors.storeName && <p className='error-text'>{errors.storeName}</p>}

        <input className='btn' type='submit' value='Update' />
        <input className='btn' type='button' value='Logout' />
        <button type='button' className='btn-del'>
          Delete account
        </button>
      </form>
    </div>
  )

  return errors.message ? createStore : editProfile
}

export default EditProfile
