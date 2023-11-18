'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchViewContact = createAsyncThunk('dashboard/fetchViewContact', async payload => {
  const { token, id } = payload
  console.log(token, id, 'from contact view slice')
  try {
    const response = await axios.get(`https://test.izocloud.net/api/app/react/contact/view/${id}`, {
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
const getViewContactSlice = createSlice({
  name: 'fetchViewContact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewContact.pending, state => {
        console.log('pending')
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchViewContact.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchViewContact.rejected, (state, action) => {
        console.log('action.error', action.error)
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getViewContactSlice.reducer
