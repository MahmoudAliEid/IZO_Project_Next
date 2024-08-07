// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null
}
const token = getCookie('token')

// Create an Axios instance with common headers
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

// Define an async thunk for deleting a user
export const deleteOpeningStock = createAsyncThunk('dashboard/deleteOpeningStock', async payload => {
  const { id } = payload

  const apiUrl = getCookie('apiUrl')
  const response = await axiosInstance.post(`${apiUrl}/app/react/opening-quantity/del/${id}`)
  const data = response.data

  return data
})

// Create a Redux slice
const postDeleteOpeningStock = createSlice({
  name: 'deleteOpeningStock',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteOpeningStock.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteOpeningStock.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        notify(action.payload.message, 'success')
        notify('Successfully Deleted', 'success')
      })
      .addCase(deleteOpeningStock.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        notify(action.payload.message, 'error')
        notify(action.error.message, 'error')
        notify('There an Error', 'error')
      })
  }
})

export default postDeleteOpeningStock.reducer
