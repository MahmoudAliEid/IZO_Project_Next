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

export const fetchCreateProductUnit = createAsyncThunk('dashboard/fetchCreateProductUnit', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  console.log(`'Create Product' , URL: ${url} 🎇 and Token: ${token} 🐰`)

  const response = await axios.get(`https://test.izocloud.net/api/app/react/products/unit/create`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data
  console.log(data, 'from get create product')

  return data
})

// Create a Redux slice
const getCreateProductUnitSlice = createSlice({
  name: 'fetchCreateProductUnit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCreateProductUnit.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchCreateProductUnit.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchCreateProductUnit.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getCreateProductUnitSlice.reducer
