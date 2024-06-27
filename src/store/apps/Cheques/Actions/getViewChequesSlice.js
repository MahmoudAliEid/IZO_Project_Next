import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for fetching the data
export const fetchViewCheque = createAsyncThunk('cheques/fetchViewCheque', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { itemId } = payload
  const response = await axios.get(`${url}/app/react/cheque/view/${itemId}`, {
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
const getViewSlice = createSlice({
  name: 'cheques view',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewCheque.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchViewCheque.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
      })
      .addCase(fetchViewCheque.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getViewSlice.reducer
