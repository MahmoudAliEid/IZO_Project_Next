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

export const fetchEditUsers = createAsyncThunk('dashboard/fetchEditUsers', async payload => {
  try {
    const { token, url, itemId } = payload

    if (token && url && itemId) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Send the token as a Bearer Token in the header
        }
      }

      const response = await axios.get(`${url}/app/react/users/edit/${itemId}`, config)

      const data = response.data

      return data
    }
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const editUsersSlice = createSlice({
  name: 'editUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEditUsers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEditUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchEditUsers.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default editUsersSlice.reducer
