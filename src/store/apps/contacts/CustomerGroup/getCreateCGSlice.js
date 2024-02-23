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

export const fetchCreateCustomerGroup = createAsyncThunk('dashboard/fetchCreateCustomerGroup', async () => {
  try {
    const url = getCookie('apiUrl')
    const cookieToken = getCookie('token')
    const response = await axios.get(`${url}/app/react/customer-group/create`, {
      headers: {
        Authorization: 'Bearer ' + `${cookieToken}`
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
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchCreateCustomerGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchCreateCustomerGroup.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default createCustomerGroupSlice.reducer
