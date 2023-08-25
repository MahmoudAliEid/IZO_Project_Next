import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

interface LoginData {
  username: string
  password: string
  logout_other: string
}

const loginData: LoginData = {
  username: 'admin',
  password: '123456',
  logout_other: '1'
}
const loginDataJSON = JSON.stringify(loginData)

// interface AuthData {
//   authorisation: {
//     type: string
//     token: string
//   }
// }

interface LoginState {
  data: any[]
  userType: string
  token: string
  status: 'null' | 'success' | 'pending' | 'rejected'
}

// Define your initial state
const initialState: LoginState = {
  data: [],
  userType: '',
  token: '',
  status: 'null'
}

// Define your API call as a thunk
export const login = createAsyncThunk('feature/login', async () => {
  try {
    const response: AxiosResponse = await axios.post('https://test.izocloud.com/api/app/front/login', loginDataJSON, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error: any) {
    return new Error(error)
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
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload)
      state.data = action.payload

      // state.userType = action.payload.authorisation.type || ''
      // state.token = action.payload.authorisation.token || ''
      state.status = 'success'
      localStorage.setItem('token', action.payload.authorisation?.token)
    })
    builder.addCase(login.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'rejected'
      console.error('Login rejected:', action.error)
    })
  }
})

// Export actions and reducer
export const { getToken } = loginSlice.actions
export default loginSlice.reducer
