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

export const fetchEditOpeningStock = createAsyncThunk('dashboard/fetchEditOpeningStock', async payload => {
  const { id } = payload
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  try {
    const response = await axios.get(`${url}/app/react/opening-quantity/edit/${id}`, {
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
const getEditOpeningStock = createSlice({
  name: 'fetchEditOpeningStock',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEditOpeningStock.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchEditOpeningStock.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchEditOpeningStock.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getEditOpeningStock.reducer
