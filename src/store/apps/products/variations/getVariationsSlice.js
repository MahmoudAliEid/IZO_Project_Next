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
  msg: '',
  error: null
}

export const fetchVariations = createAsyncThunk('dashboard/fetchVariations', async payload => {
  const { token } = payload

  try {
    const url = getCookie('apiUrl')
    const cookieToken = getCookie('token')
    const response = await axios.get(`${url}/app/react/variations/all`, {
      headers: {
        Authorization: 'Bearer ' + `${token || cookieToken}`
      }
    })

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const variationsSlice = createSlice({
  name: 'fetchVariations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVariations.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchVariations.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchVariations.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default variationsSlice.reducer
