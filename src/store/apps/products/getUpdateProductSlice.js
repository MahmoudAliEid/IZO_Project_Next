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

export const fetchUpdateProduct = createAsyncThunk('dashboard/fetchUpdateProduct', async payload => {
  const { id } = payload
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  const response = await axios.get(`${url}/app/react/products/edit/${id}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getUpdateProductSlice = createSlice({
  name: 'fetchUpdateProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUpdateProduct.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getUpdateProductSlice.reducer
