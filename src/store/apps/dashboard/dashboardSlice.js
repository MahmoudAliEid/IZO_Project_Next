// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { parseCookies } from 'cookies-next' // Import the parseCookies function

// Define the initial state
const initialState = {
  data: null,
  loading: false,
  error: null
}

// Define an async thunk to fetch data from the API
export const fetchDataAnalytics = createAsyncThunk('dashboard/fetchData', async (url, token, date) => {
  try {
    // const cookies = parseCookies()
    // const token = cookies.token // Retrieve the token from cookies
    console.log('token', token)
    const response = await fetch(`${url}/app/react/dashboard?token=${token}&date_type=${date}`)

    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
})

// ... (other code)

// Create a Redux slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDataAnalytics.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDataAnalytics.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchDataAnalytics.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default dashboardSlice.reducer
