import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import notify from '../../../../utils/notify.jsx'
import { setCookie } from 'cookies-next'
import axios from 'axios'

const initialState = {
  data: [],
  userType: '',
  token: '',
  status: 'idle',
  login_first_time: null,
  apiUrl: '',
  imgUrl: '',
  userName: '',
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

    return response.data
  } catch (error) {
    return response.data
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
        console.log('from login fulfilled', state)
        state.data = action.payload
        state.login_first_time = action.payload.login_first_time
        state.imgUrl = action.payload.authorization?.user?.profile_photo_url
        state.userName = action.payload.authorization?.user?.first_name
        state.apiUrl = action.payload?.api_url

        // Ensure that authorization and token exist before assigning
        if (action.payload.authorization) {
          state.userType = action.payload.authorization?.type || ''
          state.token = action.payload.authorization?.token || ''
        }
        state.status = 'success'
        if (action.payload.authorization?.token) {
          setCookie('token', action.payload.authorization?.token)
        } else {
          setCookie('token', null)
        }
        notify('تم تسجيل الدخول بنجاح', 'success')
        setTimeout(() => {
          // router.replace('/dashboards/analytics/')
          window.location.href = '/dashboards/analytics/'
        }, 2000)
      })
      .addCase(login.pending, state => {
        console.log('from login pending', state)
        state.status = 'pending'
      })
      .addCase(login.rejected, state => {
        console.log('from login rejected', state)
        state.status = 'rejected'
        notify('يوجد خطأ في البريد الإلكتروني أو كلمة المرور', 'error')
      })
  }
})

// Export actions and reducer
export const { getToken } = loginSlice.actions
export default loginSlice.reducer
