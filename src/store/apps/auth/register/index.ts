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
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = action.payload

      state.status = 'success'
      console.log('from reducer register action:', action)
      notify('تم تسجيل الحساب بنجاج يمكن تسجيل الدخول الأن', 'success')
    })
    builder.addCase(register.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'rejected'
      console.error('Register rejected:', action)
      notify('هناك خطأ في عملية التجيل الرجاء ملئ البيانات بشكل صحيح', 'error')
    })
  }
})

export default registerSlice.reducer
