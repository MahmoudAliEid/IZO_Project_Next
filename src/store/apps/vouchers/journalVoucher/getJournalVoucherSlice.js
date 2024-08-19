import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export const fetchJournalVoucher = createAsyncThunk('journalVoucher/fetchJournalVoucher', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const response = await axios.get(`${url}/app/react/journal-voucher/all`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  return response.data

  return response.data
})
// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null
}
const getJournalVoucherSlice = createSlice({
  name: 'journalVoucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJournalVoucher.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchJournalVoucher.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchJournalVoucher.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getJournalVoucherSlice.reducer
