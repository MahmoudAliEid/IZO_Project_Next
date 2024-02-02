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

  console.log(`'fetch Search Product Compo' , URL: ${url} 🎇 and Token: ${token} 🐰, query :${query}`)

  const response = await axios.get(`https://test.izocloud.net/api/app/react/products/search-product?value=${query}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data
  console.log(data, 'from get search product compo')

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
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchSearchProductCompo.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchSearchProductCompo.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getSearchProductCompo.reducer
