'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  error: null
}

export const postUpdateUser = createAsyncThunk('dashboard/postUpdateUser', async payload => {
  try {
    const { token, url, id } = payload

    if (token && url) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Send the token as a Bearer Token in the header
        }
      }

      const response = await axios.get(`${url}/app/react/users/update/${id}`, config)

      const data = response.data

      return data
    }
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const updateUsersSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postUpdateUser.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
      })
      .addCase(postUpdateUser.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(postUpdateUser.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default updateUsersSlice.reducer
