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

export const fetchEditUnit = createAsyncThunk('dashboard/fetchEditUnit', async payload => {
  const { itemId } = payload
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  const response = await axios.get(`${url}/app/react/units/edit/${itemId}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getEditUnitSlice = createSlice({
  name: 'fetchEditUnit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEditUnit.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchEditUnit.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchEditUnit.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getEditUnitSlice.reducer
