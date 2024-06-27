import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for fetching the data
export const fetchContactBank = createAsyncThunk('contactBank/fetchContactBank', async () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const response = await axios.get(`${url}/app/react/contact-bank/all`, {
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
const getContactBankSlice = createSlice({
  name: 'contactBank',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContactBank.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchContactBank.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
      })
      .addCase(fetchContactBank.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getContactBankSlice.reducer
