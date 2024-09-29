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
export const deletePurchase = createAsyncThunk('dashboard/purchase/deletePurchase', async payload => {
  const url = getCookie('apiUrl')
  try {
    const { id } = payload

    const response = await axiosInstance.post(`${url}/app/react/purchase/del/${id}`)
    const data = response.data
    notify(' Purchase successfully deleted.', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const postDeletePurchase = createSlice({
  name: 'DeletePurchase',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deletePurchase.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePurchase.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(deletePurchase.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeletePurchase.reducer
