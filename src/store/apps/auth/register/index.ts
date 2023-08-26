import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

interface RegisterData {
  username: string
  password: string
  name: string
  alternate_number: string
  mobile: string
  currency_id: string
  surname: string
  first_name: string
  last_name: string
  email: string
  confirm_password: string
  language: string
}

interface RegisterState {
  data: any[] // Define the type for your data
  userType: string
  token: string
  status: 'null' | 'pending' | 'success' | 'rejected'
}

// Define an initial state for your reducer
const initialState: RegisterState = {
  data: [],
  userType: '',
  token: '',
  status: 'null'
}

export const register = createAsyncThunk('feature/register', async (registerData: RegisterData) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'https://test.izocloud.com/api/app/react/register',
      registerData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (response.status < 200 || response.status >= 300) {
      // Handle non-2xx status codes as errors
      throw new Error(response.data.message)
    }

    return response.data
  } catch (error) {
    // Handle network errors or other exceptions
    console.log('errrrrrrrr' + error)
    throw new Error('Failed to register. Please try again later.')
  }
})

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = action.payload
      if (action.payload.authorisation) {
        state.userType = action.payload.authorisation.type
        state.token = action.payload.authorisation.token
      }
      state.status = 'success'
      localStorage.setItem('token', JSON.stringify(action.payload.authorisation.token))
      console.log('from reducer register action:', action)
    })
    builder.addCase(register.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'rejected'
      console.error('Register rejected:', action)
    })
  }
})

export default registerSlice.reducer
