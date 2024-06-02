import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for fetching the data
export const fetchVouchers = createAsyncThunk('vouchers/fetchVouchers', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const response = await axios.get(`${url}/app/react/voucher/all`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  return response.data
})

// Initial state
const initialState = {
  brands: [],
  status: 'idle',
  error: null
}

// Slice
const getVouchersSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVouchers.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getVouchersSlice.reducer
