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

export const fetchSearchProductCompo = createAsyncThunk('dashboard/fetchSearchProductCompo', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { query } = payload

  const response = await axios.get(`${url}/app/react/products/search-product?value=${query}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getSearchProductCompo = createSlice({
  name: 'fetchSearchProductCompo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSearchProductCompo.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchSearchProductCompo.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchSearchProductCompo.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getSearchProductCompo.reducer
