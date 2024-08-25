'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const getLastProduct = createAsyncThunk('Product/getLastProduct', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  let mainUrl = `${url}/app/react/opening-quantity/last-product`

  try {
    const response = await axios.get(`${mainUrl}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const getLastProductSlice = createSlice({
  name: 'get Last Product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLastProduct.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(getLastProduct.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(getLastProduct.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getLastProductSlice.reducer
