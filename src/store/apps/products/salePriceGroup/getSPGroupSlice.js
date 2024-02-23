'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Next Imports
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchSPGroup = createAsyncThunk('dashboard/fetchSPGroup', async () => {
  const url = getCookie('apiUrl')
  const token = getCookie('token')

  const response = await axios.get(`${url}/app/react/sales-price-group/all`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getSPGroup = createSlice({
  name: 'fetchSPGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSPGroup.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchSPGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchSPGroup.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getSPGroup.reducer
