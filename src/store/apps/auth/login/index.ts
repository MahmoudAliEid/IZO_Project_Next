import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

// Define the interface for login data
interface LoginData {
  username: string
  password: string
  logout_other?: string
}

// Define the initial login data
// const initialLoginData: LoginData = {
//   username: 'admin',
//   password: '123456',
//   logout_other: '1'
// }

// Convert login data to JSON
// const loginDataJSON = JSON.stringify(initialLoginData)

// Define the initial login state
interface LoginState {
  data: any[]
  userType: string
  token: string
  status: 'idle' | 'success' | 'pending' | 'rejected'
  error: string | null
}

const initialState: LoginState = {
  data: [],
  userType: '',
  token: '',
  status: 'idle',
  error: null
}

// Define an async thunk action to handle login
export const login = createAsyncThunk('feature/login', async (loginData: LoginData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axios.post('https://test.izocloud.com/api/app/front/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    // Use rejectWithValue to pass the error message to the rejected action
    throw rejectWithValue(error.message) // Use throw to reject with an error
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
        state.error = action.payload as string // Store the error message
      })
  }
})

// Export actions and reducer
export const { getToken } = loginSlice.actions
export default loginSlice.reducer
