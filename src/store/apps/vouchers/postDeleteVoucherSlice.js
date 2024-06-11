// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null
}

const token = getCookie('token')

// const apiUrl = getCookie('apiUrl')

// Create an Axios instance with common headers
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

// Define an async thunk for deleting a user
export const deleteVoucher = createAsyncThunk('dashboard/vouchers/deleteVoucher', async payload => {
  const url = getCookie('apiUrl')
  try {
    const { id } = payload

    const response = await axiosInstance.post(`${url}/app/react/voucher/del/${id}`)
    const data = response.data
    notify(' Voucher successfully deleted.', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const postDeleteVoucherSlice = createSlice({
  name: 'DeleteVoucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteVoucher.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeleteVoucherSlice.reducer
