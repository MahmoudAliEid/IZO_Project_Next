import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

// Async thunk for fetching brand details
export const fetchBrandDetails = createAsyncThunk('brandDetails/fetch', async payload => {
  console.log(payload, '===> payload from fetchBrandDetails')
  const token = getCookie('token')
  const response = await fetch('https://test.izocloud.net/api/app/react/brands/edit/' + payload, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  console.log(data, '===> response from fetchBrandDetails')

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
