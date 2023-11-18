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
const token = getCookie('token')

export const fetchEditVariations = createAsyncThunk('dashboard/fetchEditVariations', async payload => {
  const { itemId } = payload
  try {
    const response = await axios.get(`https://test.izocloud.net/api/app/react/variations/edit/${itemId}`, {
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
const editVariationsSlice = createSlice({
  name: 'fetchEditVariations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEditVariations.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchEditVariations.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchEditVariations.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default editVariationsSlice.reducer
