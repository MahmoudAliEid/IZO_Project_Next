'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const token = getCookie('token')

// Async Thunk Action for storing user
export const postEditCustomerGroup = createAsyncThunk('dashboard/postEditCustomerGroup', async payload => {
  const { userData, itemId } = payload

  if (
    token !== undefined &&
    token !== null &&
    userData !== undefined &&
    userData !== null &&
    itemId !== null &&
    itemId !== undefined
  ) {
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      'Content-Type': 'application/json'
    }

    const dataToJSON = JSON.stringify(userData)
    const url = getCookie('apiUrl')

    const response = await axios.post(`${url}/app/react/customer-group/update/${itemId}`, dataToJSON, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postEditCustomerGroupSlice = createSlice({
  name: 'postEditCustomerGroup',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditCustomerGroup.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = []
      })
      .addCase(postEditCustomerGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true
        notify('Updated successfully', 'success')
      })
      .addCase(postEditCustomerGroup.rejected, state => {
        state.loading = false
        state.error = true
        state.success = false
        notify('There is an error try again later', 'error')
      })
  }
})

export default postEditCustomerGroupSlice.reducer
