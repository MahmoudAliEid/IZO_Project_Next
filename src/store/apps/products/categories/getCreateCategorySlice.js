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

export const fetchCreateCategory = createAsyncThunk('dashboard/fetchCreateCategory', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  try {
    const response = await axios.get(`${url}/app/react/category/create`, {
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
const getCreateCategorySlice = createSlice({
  name: 'fetchCreateCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCreateCategory.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchCreateCategory.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getCreateCategorySlice.reducer
