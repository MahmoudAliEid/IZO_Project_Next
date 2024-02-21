import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

// Async thunk for fetching brand details
export const fetchBrandDetails = createAsyncThunk('brandDetails/fetch', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const response = await fetch(`${url}/app/react/brands/edit/` + payload, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  return data
})

// Slice for brand details
const getbrandDetailsSlice = createSlice({
  name: 'brandDetails',
  initialState: { brand: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBrandDetails.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchBrandDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brand = action.payload
      })
      .addCase(fetchBrandDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getbrandDetailsSlice.reducer
