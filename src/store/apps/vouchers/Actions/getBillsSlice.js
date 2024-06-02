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

export const fetchBills = createAsyncThunk('dashboard/fetchBills', async payload => {
  const url = getCookie('apiUrl')
  const token = getCookie('token')
  const { id, type } = payload
  const response = await axios.get(`${url}/app/react/voucher/bills/${id}?type=${type}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getBillsSlice = createSlice({
  name: 'fetchBills',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBills.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getBillsSlice.reducer
