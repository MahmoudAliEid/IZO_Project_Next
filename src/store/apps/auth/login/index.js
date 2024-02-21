import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import notify from '../../../../utils/notify.jsx'
import { setCookie } from 'cookies-next'
import axios from 'axios'

const initialState = {
  data: [],
  userType: '',
  token: '',
  status: 'idle',
  login_first_time: false,
  apiUrl: '',
  imgUrl: '',
  userName: '',
  currency_id: '',
  currency_code: '',
  authorization: {},
  error: null
}

// Define an async thunk action to handle login
export const login = createAsyncThunk('feature/login', async loginData => {
  try {
    const response = await axios.post('https://test.izocloud.net/api/app/react/login', loginData, {
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
        state.data = action.payload
        state.login_first_time = action.payload.login_first_time
        state.imgUrl = action.payload.authorization?.user?.profile_photo_url
        state.userName = action.payload.authorization?.user?.first_name
        state.apiUrl = action.payload?.api_url
        state.authorization = action.payload?.authorization
        state.currency_id = action.payload?.currency.id
        state.currency_code = action.payload?.currency.code

        // Ensure that authorization and token exist before assigning
        if (action.payload.authorization) {
          state.userType = action.payload.authorization?.type || ''
          state.token = action.payload.authorization?.token || ''
        }
        state.status = 'success'

        //adding to cookies
        if (action.payload.authorization?.token) {
          setCookie('token', action.payload.authorization?.token)
        } else {
          setCookie('token', null)
        }

        if (action.payload.authorization?.user?.profile_photo_url) {
          setCookie('imgUrl', action.payload.authorization?.user?.profile_photo_url)
        } else {
          setCookie('imgUrl', null)
        }

        if (action.payload.authorization?.user?.first_name) {
          setCookie('userName', action.payload.authorization?.user?.first_name)
        } else {
          setCookie('userName', null)
        }
        if (action.payload?.api_url) {
          setCookie('apiUrl', action.payload?.api_url)
        } else {
          setCookie('apiUrl', null)
        }
        if (action.payload?.currency.id) {
          setCookie('currency_id', action.payload?.currency.id)
        } else {
          setCookie('currency_id', null)
        }
        if (action.payload?.currency.code) {
          setCookie('currency_code', action.payload?.currency.code)
        } else {
          setCookie('currency_code', null)
        }
        notify('Login Successfully', 'success')

        // setTimeout(() => {
        //   // router.replace('/dashboards/analytics/')
        //   window.location.href = '/dashboards/analytics/'
        // }, 2000)
      })
      .addCase(login.pending, state => {
        state.status = 'pending'
      })
      .addCase(login.rejected, state => {
        state.status = 'rejected'
        notify(' Error, check and try again', 'error')
      })
  }
})

// Export actions and reducer
export const { getToken } = loginSlice.actions
export default loginSlice.reducer
