'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchIzoUsers = createAsyncThunk('dashboard/fetchIzoUsers', async payload => {
  const { token, url } = payload

  try {
    const response = await axios.get(`${url}/app/react/users`, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const izoUsersSlice = createSlice({
  name: 'izoUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIzoUsers.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchIzoUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchIzoUsers.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default izoUsersSlice.reducer
