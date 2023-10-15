// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  loading: false,
  error: null
}

const token = getCookie('token')

// Define an async thunk to fetch data from the API
export const fetchUsers = createAsyncThunk('users/fetchData', async () => {
  try {
    const response = await axios.get(`https://test.izocloud.net/api/app/react/get-user`, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })

    const data = await response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.error.message
      })
  }
})

export default usersSlice.reducer
