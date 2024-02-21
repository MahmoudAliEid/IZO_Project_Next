import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import notify from '../../../../utils/notify.jsx'

interface RegisterData {
  username: string
  password: string
  name: string
  alternate_number: number
  mobile: number
  currency_id: number
  surname: string
  first_name: string
  last_name: string
  email: string
  confirm_password: string
  language: string
}

export interface RegisterState {
  data: any[] // Define the type for your data
  userType: string
  token: string
  status: 'null' | 'pending' | 'success' | 'rejected'
  register: boolean
}

// Define an initial state for your reducer
const initialStateDate: RegisterState = {
  data: [],
  userType: '',
  token: '',
  status: 'null',
  register: false
}

export const register = createAsyncThunk('feature/register', async (registerData: RegisterData) => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'https://test.izocloud.net/api/app/react/register',
      registerData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  } catch (error) {
    // Handle network errors or other exceptions
    return error
  }
})

const registerSlice = createSlice({
  name: 'register',
  initialState: initialStateDate,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = action.payload
      state.status = 'success'
      state.register = true
      notify('Registered Successfully you can login in Now 🎉', 'success')
    })
    builder.addCase(register.pending, state => {
      state.status = 'pending'
      state.register = false
    })
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'rejected'
      state.register = false
      console.error('Register rejected:', action)
      notify('There is an Error Try again', 'error')
    })
  }
})

export default registerSlice.reducer
