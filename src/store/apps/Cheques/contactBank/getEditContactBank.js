// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Next Imports
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,

  error: null
}

export const fetchEditContactBank = createAsyncThunk('dashboard/fetchEditContactBank', async payload => {
  const url = getCookie('apiUrl')
  const token = getCookie('token')
  const { itemId } = payload
  const response = await axios.get(`${url}/app/react/contact-bank/edit/${itemId}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Edit a Redux slice
const getEditContactBank = createSlice({
  name: 'fetchEditContactBank',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEditContactBank.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchEditContactBank.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(fetchEditContactBank.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getEditContactBank.reducer
