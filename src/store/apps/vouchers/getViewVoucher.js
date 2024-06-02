import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for fetching the data
export const fetchViewVoucher = createAsyncThunk('vouchers/fetchViewVoucher', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { itemId } = payload
  const response = await axios.get(`${url}/app/react/voucher/view/${itemId}`, {
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
const getViewVoucher = createSlice({
  name: 'vouchers view',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewVoucher.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchViewVoucher.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
      })
      .addCase(fetchViewVoucher.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getViewVoucher.reducer
