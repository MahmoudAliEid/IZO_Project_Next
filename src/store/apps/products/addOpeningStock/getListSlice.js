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

export const fetchOpeningStock = createAsyncThunk('Product/fetchAddOpeningStock', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  try {
    const response = await axios.get(`${url}/app/react/opening-quantity/all`, {
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
const getListSlice = createSlice({
  name: 'opening quantity',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOpeningStock.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchOpeningStock.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchOpeningStock.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getListSlice.reducer
