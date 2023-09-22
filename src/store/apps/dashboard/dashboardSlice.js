'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
  TypeOfFilter: null
}

export const fetchDataAnalytics = createAsyncThunk('dashboard/fetchData', async payload => {
  try {
    // const { typeofData } = payload
    const { url, token, typeofData } = payload

    // console.log('typeofData', typeofData, 'token', token, 'url', url)
    const response = await axios.get(`${url}/app/react/dashboard?token="${token}"&date_type=${typeofData}`)
    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDataAnalytics.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDataAnalytics.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.error = null
        state.TypeOfFilter = action.payload.Type
      })
      .addCase(fetchDataAnalytics.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default dashboardSlice.reducer
