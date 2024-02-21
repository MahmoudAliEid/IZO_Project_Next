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

export const fetchViewUser = createAsyncThunk('Users/fetchViewUser', async payload => {
  try {
    const { token, url, id } = payload

    if (token && url && id) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Send the token as a Bearer Token in the header
        }
      }
      const response = await axios.get(`${url}/app/react/users/view/${id}`, config)

      const data = response.data

      return data
    }
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const viewUserSlice = createSlice({
  name: 'viewUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchViewUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchViewUser.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default viewUserSlice.reducer
