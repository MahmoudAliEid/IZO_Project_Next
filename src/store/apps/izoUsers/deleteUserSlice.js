'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'

import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null
}

const token =getCookie('token')

// const url = getCookie('apiUrl')

export const postDeleteUser = createAsyncThunk('dashboard/postDeleteUser', async payload => {
  try {
    const { id } = payload

    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Send the token as a Bearer Token in the header
      }
    }

    const response = await axios.post(`https://test.izocloud.net/api/app/react/users/del/${id}`, config)

    console.log('response delete', response)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const deleteUsersSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postDeleteUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(postDeleteUser.fulfilled, (state, action) => {
        console.log('action from delete', action)
        state.data = action.payload
        state.loading = false
        state.error = null
        notify('The User has been deleted successfully', 'success')
      })
      .addCase(postDeleteUser.rejected, (state, action) => {
        console.log('action.error from delete', action.error)
        state.loading = false
        state.data = null
        state.error = action.error.message
        notify('There was an error try again later!', 'error')
      })
  }
})

export default deleteUsersSlice.reducer
