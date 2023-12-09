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

export const fetchEditSPGroup = createAsyncThunk('dashboard/fetchEditSPGroup', async payload => {
  const { itemId } = payload
  const token = getCookie('token')

  const response = await axios.get(`https://test.izocloud.net/api/app/react/sales-price-group/edit/${itemId}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getEditSPGroupSlice = createSlice({
  name: 'fetchEditSPGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEditSPGroup.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchEditSPGroup.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchEditSPGroup.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getEditSPGroupSlice.reducer
