/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const token = getCookie('token')

// Async Thunk Action for storing user
export const postEditCustomerGroup = createAsyncThunk('dashboard/postEditCustomerGroup', async payload => {
  const { userData, itemId } = payload

  console.log(userData, itemId, '===> userData  & itemId from postEditCustomerGroup ')
  try {
    console.log(token, itemId, '===> token & id from postEditCustomerGroup slice')
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

      const response = await axios.post(
        `https://test.izocloud.net/api/app/react/customer-group/update/${itemId}`,
        dataToJSON,
        {
          headers // Pass the headers to the Axios request
        }
      )

      console.log(response, '===>  from postEditCustomerGroup')

      return response.data
    }
  } catch (error) {
    console.log('Error form postEditCustomerGroup', error)
  }
})

// Define the user slice
const postEditCustomerGroupSlice = createSlice({
  name: 'postEditCustomerGroup',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditCustomerGroup.pending, state => {
        state.loading = true
        state.error = null
        state.data = null
      })
      .addCase(postEditCustomerGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        notify('Updated successfully', 'success')
      })
      .addCase(postEditCustomerGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        notify('There is an error try again later', 'error')
      })
  }
})

export default postEditCustomerGroupSlice.reducer
