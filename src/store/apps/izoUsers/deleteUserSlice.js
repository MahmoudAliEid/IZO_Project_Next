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
export const postDeleteUser = createAsyncThunk('dashboard/postDeleteUser', async payload => {
  try {
    const { id } = payload
    const response = await axiosInstance.delete(`https://test.izocloud.net/api/app/react/users/del/${id}`)
    const data = response.data
    notify('The User has been deleted successfully', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const deleteUsersSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postDeleteUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(postDeleteUser.fulfilled, (state, action) => {
        console.log('payload action from delete', action)
        state.data = action.payload
        state.loading = false
      })
      .addCase(postDeleteUser.rejected, (state, action) => {
        console.log('rejected action from delete', action)
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default deleteUsersSlice.reducer
