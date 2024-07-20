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
  BusinessName: '',
  FilterInitial: '',
  CurrencySymbolPlacement: '',
  DateFormat: '',
  DecimalFormat: 0,
  DefaultProfit: 0,
  fontStyle: 'none',
  FinancialYearStartMonth: null,
  StartDate: '',
  StockAccountingMethod: '',
  TimeFormat: '',
  TimeZone: '',
  TransactionEditDays: 0,

  error: null
}

// Define an async thunk action to handle login
export const login = createAsyncThunk('feature/login', async loginData => {
  try {
    const response = await axios.post('https://test.izocloud.com/api/app/react/login', loginData, {
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
        state.BusinessName = action.payload?.global_data[0]?.global_settings.BusinessName
        state.CurrencySymbolPlacement = action.payload?.global_data[0]?.global_settings.CurrencySymbolPlacement
        state.DateFormat = action.payload?.global_data[0]?.global_settings.DateFormat
        state.DecimalFormat = action.payload?.global_data[0]?.global_settings.DecimalFormat
        state.DefaultProfit = action.payload?.global_data[0]?.global_settings.DefaultProfit
        state.FinancialYearStartMonth = action.payload?.global_data[0]?.global_settings.FinancialYearStartMonth
        state.StartDate = action.payload?.global_data[0]?.global_settings.StartDate
        state.StockAccountingMethod = action.payload?.global_data[0]?.global_settings.StockAccountingMethod
        state.TimeFormat = action.payload?.global_data[0]?.global_settings.TimeFormat
        state.TimeZone = action.payload?.global_data[0]?.global_settings.TimeZone
        state.TransactionEditDays = action.payload?.global_data[0]?.global_settings.TransactionEditDays
        ;(state.fontStyle = action.payload?.global_data[0]?.global_settings.fontStyle),
          (state.FilterInitial = action.payload?.global_data[0]?.global_settings.FilterInitial)

        if (
          action.payload?.global_data &&
          action.payload?.global_data[0] &&
          action.payload?.global_data[0]?.global_settings
        ) {
          setCookie('BusinessName', action.payload?.global_data[0]?.global_settings.BusinessName)
          setCookie('CurrencySymbolPlacement', action.payload?.global_data[0]?.global_settings.CurrencySymbolPlacement)
          setCookie('DateFormat', action.payload?.global_data[0]?.global_settings.DateFormat)
          setCookie('DecimalFormat', action.payload?.global_data[0]?.global_settings.DecimalFormat)
          setCookie('DefaultProfit', action.payload?.global_data[0]?.global_settings.DefaultProfit)
          setCookie('FinancialYearStartMonth', action.payload?.global_data[0]?.global_settings.FinancialYearStartMonth)
          setCookie('StartDate', action.payload?.global_data[0]?.global_settings.StartDate)
          setCookie('StockAccountingMethod', action.payload?.global_data[0]?.global_settings.StockAccountingMethod)
          setCookie('TimeFormat', action.payload?.global_data[0]?.global_settings.TimeFormat)
          setCookie('TimeZone', action.payload?.global_data[0]?.global_settings.TimeZone)
          setCookie('TransactionEditDays', action.payload?.global_data[0]?.global_settings.TransactionEditDays)
          setCookie('fontStyle', action.payload?.global_data[0]?.global_settings.FontStyle)
          setCookie('FilterInitial', action.payload?.global_data[0]?.global_settings.FilterInitial)
        }

        if (action.payload.authorization) {
          // Ensure that authorization and token exist before assigning
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
