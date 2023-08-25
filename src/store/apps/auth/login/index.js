import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: [],
  userType: '',
  token: '',
  status: 'idle',
  error: null
}

// Define an async thunk action to handle login
export const login = createAsyncThunk('feature/login', async loginData => {
  try {
    const response = await axios.post('https://test.izocloud.com/api/app/front/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status < 200 || response.status >= 300) {
      // Handle non-2xx status codes as errors
      throw new Error(response.data.message)
    }

    return response.data
  } catch (error) {
    // Use rejectWithValue to pass the error message to the rejected action

    return new Error(' Failed to Login:', error)
  }
})

// Create the login slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getToken: state => {
      state.token = localStorage.getItem('token') || ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload

        // Ensure that authorisation and token exist before assigning
        if (action.payload.authorisation) {
          state.userType = action.payload.authorisation.type || ''
          state.token = action.payload.authorisation.token || ''
        }

        state.status = 'success'
        localStorage.setItem('token', action.payload.authorisation?.token)
      })
      .addCase(login.pending, state => {
        state.status = 'pending'
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  }
})

// Export actions and reducer
export const { getToken } = loginSlice.actions
export default loginSlice.reducer
