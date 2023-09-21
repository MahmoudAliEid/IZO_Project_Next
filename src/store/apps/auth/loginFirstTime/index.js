import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  data: [],
  userType: '',
  token: '',
  status: 'idle',
  error: null
}

// Define an async thunk action to handle loginFirstTime
export const loginFirstTime = createAsyncThunk('feature/loginFirstTime', async loginData => {
  try {
    const response = await axios.post('https://test.izocloud.net/api/app/front/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status < 200 || response.status >= 300) {
      // Handle non-2xx status codes as errors
      throw new Error(response.data.message)
    }

    return await response.data
  } catch (error) {
    // Use rejectWithValue to pass the error message to the rejected action

    return {
      message: 'Failed to Login for first time!!',
      stack: error.stack
    }
  }
})

// Create the loginFirstTime slice
export const loginFirstTimeSlice = createSlice({
  name: 'loginFirstTime',
  initialState,
  reducers: {
    getToken: state => {
      state.token = localStorage.getItem('token') || ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginFirstTime.fulfilled, (state, action) => {
        console.log('from login  action', action)
        state.data = action.payload
        state.status = 'success'
      })
      .addCase(loginFirstTime.pending, state => {
        state.status = 'pending'
      })
      .addCase(loginFirstTime.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  }
})

// Export actions and reducer
export const { getToken } = loginFirstTimeSlice.actions
export default loginFirstTimeSlice.reducer
