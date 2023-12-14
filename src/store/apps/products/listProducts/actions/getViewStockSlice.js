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

export const fetchViewStockProduct = createAsyncThunk('dashboard/fetchViewStockProduct', async payload => {
  const { id } = payload
  const token = getCookie('token')

  console.log(token, id, 'from product view stock slice🤞')

  try {
    const response = await axios.get(`https://test.izocloud.net/api/app/react/products/view-stock/${id}`, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const getViewStockSlice = createSlice({
  name: 'fetchViewStockProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewStockProduct.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchViewStockProduct.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchViewStockProduct.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getViewStockSlice.reducer
