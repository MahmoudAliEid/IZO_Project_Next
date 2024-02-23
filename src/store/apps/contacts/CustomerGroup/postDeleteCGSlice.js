// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: false,
  success: false
}

// Define an async thunk for deleting a user
export const postDeleteCustomerGroup = createAsyncThunk('dashboard/postDeleteCustomerGroup', async payload => {
  const token = getCookie('token')

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  const { id } = payload
  const url = getCookie('apiUrl')
  const response = await axiosInstance.post(`${url}/app/react/customer-group/del/${id}`)
  const data = response.data

  return data
})

// Create a Redux slice
const deleteCustomerGroupSlice = createSlice({
  name: 'deleteCustomerGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postDeleteCustomerGroup.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = []
      })
      .addCase(postDeleteCustomerGroup.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.error = false
        state.success = true
        notify('Deleted Successfully', 'success')
      })
      .addCase(postDeleteCustomerGroup.rejected, state => {
        state.loading = false
        state.success = false
        state.error = true
        notify('There is an Error', 'error')
      })
  }
})

export default deleteCustomerGroupSlice.reducer
