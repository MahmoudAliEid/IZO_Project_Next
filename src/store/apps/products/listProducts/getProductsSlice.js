'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Next Imports
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchProducts = createAsyncThunk('dashboard/fetchProducts', async token => {
  const url = getCookie('apiUrl')

  console.log(token, url)

  const response = await axios.get(`${url}/app/react/products/all`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getProductsSlice = createSlice({
  name: 'fetchProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getProductsSlice.reducer
