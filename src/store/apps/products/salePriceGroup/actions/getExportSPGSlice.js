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

export const fetchExportSPGroup = createAsyncThunk('dashboard/fetchExportSPGroup', async token => {
  const url = getCookie('apiUrl')
  console.log(token, url, '===> fetchExportSPGroup 🤖')

  const response = await axios.get(`${url}/app/react/sales-price-group/export`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getExportSPGSlice = createSlice({
  name: 'fetchExportSPGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExportSPGroup.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchExportSPGroup.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchExportSPGroup.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getExportSPGSlice.reducer
