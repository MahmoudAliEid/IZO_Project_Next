'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const token = getCookie('token')

// Async Thunk Action for storing user
export const postAddCustomerGroup = createAsyncThunk('dashboard/postAddCustomerGroup', async userData => {
  const url = getCookie('apiUrl')
  console.log(userData, 'userData 🍕🍕🍕🍕')
  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      'Content-Type': 'application/json'
    }
    const JSONData = JSON.stringify(userData)

    const response = await axios.post(`${url}/app/react/customer-group/save`, JSONData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postAddCustomerGroupSlice = createSlice({
  name: 'postAddCustomerGroup',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddCustomerGroup.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = []
      })
      .addCase(postAddCustomerGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true
        notify('Customer Group Added successfully', 'success')
      })
      .addCase(postAddCustomerGroup.rejected, state => {
        state.loading = false
        state.success = false
        state.error = true
        notify('There is an error try again later', 'error')
      })
  }
})

export default postAddCustomerGroupSlice.reducer
