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
export const postDeleteCustomerGroup = createAsyncThunk('dashboard/postDeleteCustomerGroup', async payload => {
  try {
    const { id } = payload
    const response = await axiosInstance.post(`https://test.izocloud.net/api/app/react/customer-group/del/${id}`)
    const data = response.data
    notify('The Customer Group deleted ', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
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
        state.error = null
      })
      .addCase(postDeleteCustomerGroup.fulfilled, (state, action) => {
        console.log('payload action from delete', action)
        state.data = action.payload
        state.loading = false
      })
      .addCase(postDeleteCustomerGroup.rejected, (state, action) => {
        console.log('rejected action from delete', action)
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default deleteCustomerGroupSlice.reducer
