// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
  data: null,
  loading: false,
  error: null
}

// Define an async thunk to fetch data from the API
export const fetchData = createAsyncThunk('dashboard/fetchData', async token => {
  try {
    const response = await fetch(`https://test.izocloud.com/api/app/react/dashboard?token=${token}&date_type=year`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default dashboardSlice.reducer
