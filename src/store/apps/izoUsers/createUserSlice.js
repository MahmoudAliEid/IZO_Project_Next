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
  error: null
}

const token = getCookie('token')
const url = getCookie('apiUrl')

export const fetchCreateUsers = createAsyncThunk('users/fetchCreateUsers', async () => {
  try {
    if (token && url) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Send the token as a Bearer Token in the header
        }
      }

      const response = await axios.get(`${url}/app/react/users/create`, config)

      // console.log(response, '===> response')

      const data = response.data

      return data
    }
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const createUsersSlice = createSlice({
  name: 'createUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCreateUsers.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
      })
      .addCase(fetchCreateUsers.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchCreateUsers.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default createUsersSlice.reducer
