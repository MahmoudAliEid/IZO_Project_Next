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
export const deleteContactBank = createAsyncThunk('dashboard/contactBank/deleteContactBank', async payload => {
  const url = getCookie('apiUrl')
  try {
    const { id } = payload

    const response = await axiosInstance.post(`${url}/app/react/contact-bank/del/${id}`)
    const data = response.data
    notify(' Contact Bank successfully deleted.', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const postDeleteContactBankSlice = createSlice({
  name: 'DeleteContactBank',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteContactBank.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteContactBank.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteContactBank.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeleteContactBankSlice.reducer
