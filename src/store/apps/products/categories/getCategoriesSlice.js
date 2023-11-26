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

export const fetchCategories = createAsyncThunk('dashboard/fetchCategories', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  try {
    const response = await axios.get(`${url}/app/react/category/all`, {
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
const getCategoriesSlice = createSlice({
  name: 'fetchCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getCategoriesSlice.reducer
