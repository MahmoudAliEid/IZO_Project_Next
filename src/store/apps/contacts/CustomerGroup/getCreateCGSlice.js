'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchCreateCustomerGroup = createAsyncThunk('dashboard/fetchCreateCustomerGroup', async token => {
  console.log(token)
  try {
    const response = await axios.get('https://test.izocloud.net/api/app/react/customer-group/create', {
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
const createCustomerGroupSlice = createSlice({
  name: 'fetchCreateCustomerGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCreateCustomerGroup.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchCreateCustomerGroup.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchCreateCustomerGroup.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default createCustomerGroupSlice.reducer
