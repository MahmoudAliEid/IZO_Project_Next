import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for fetching the data
export const fetchViewPurchase = createAsyncThunk('purchase/fetchViewPurchase', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { id } = payload
  const response = await axios.get(`${url}/app/react/purchase/view/${id}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  return response.data
})

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null
}

// Slice
const getViewPurchase = createSlice({
  name: 'purchase view',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewPurchase.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchViewPurchase.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchViewPurchase.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getViewPurchase.reducer
