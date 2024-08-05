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

export const fetchCreateOpeningStock = createAsyncThunk('dashboard/fetchCreateOpeningStock', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  try {
    const response = await axios.get(`${url}/app/react/opening-quantity/create`, {
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
const getCreateOpeningStock = createSlice({
  name: 'fetchCreateOpeningStock',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCreateOpeningStock.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchCreateOpeningStock.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchCreateOpeningStock.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getCreateOpeningStock.reducer
