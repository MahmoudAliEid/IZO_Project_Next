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

export const viewOpeningStock = createAsyncThunk('dashboard/viewOpeningStock', async payload => {
  const url = getCookie('apiUrl')
  const token = getCookie('token')
  const { id } = payload
  const response = await axios.get(`${url}/app/react/opening-quantity/view/${id}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getViewOpeningStock = createSlice({
  name: 'viewOpeningStock',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(viewOpeningStock.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(viewOpeningStock.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(viewOpeningStock.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getViewOpeningStock.reducer
