import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for fetching the data
export const refund = createAsyncThunk('cheques/refund', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { itemId } = payload
  const response = await axios.get(`${url}/app/react/cheque/refund/${itemId}`, {
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
const getRefund = createSlice({
  name: 'refund',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(refund.pending, state => {
        state.status = 'loading'
      })
      .addCase(refund.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
        notify(' Cheques successfully Refund.', 'success')
      })
      .addCase(refund.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify('There was an error, try again later!', 'error')
      })
  }
})

export default getRefund.reducer
