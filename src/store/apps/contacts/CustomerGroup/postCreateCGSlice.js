/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const token = getCookie('token')

// Async Thunk Action for storing user
export const postAddCustomerGroup = createAsyncThunk('dashboard/postAddCustomerGroup', async userData => {
  try {
    console.log(userData, '===> userData  create customer group  ')
    console.log(token, '===> token Post create customer group slice')
    if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json'
      }
      const JSONData = JSON.stringify(userData)

      const response = await axios.post(`https://test.izocloud.net/api/app/react/customer-group/save`, JSONData, {
        headers // Pass the headers to the Axios request
      })

      console.log(response, '===>  from post create customer group')

      return response.data
    }
  } catch (error) {
    console.log('Error form create customer group', error)
  }
})

// Define the user slice
const postAddCustomerGroupSlice = createSlice({
  name: 'postAddCustomerGroup',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddCustomerGroup.pending, state => {
        state.loading = true
        state.error = null
        state.data = null
      })
      .addCase(postAddCustomerGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        notify('Customer Group Added successfully', 'success')
      })
      .addCase(postAddCustomerGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        notify('There is an error try again later', 'error')
      })
  }
})

export default postAddCustomerGroupSlice.reducer
