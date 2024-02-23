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

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

// Define an async thunk for deleting a user
export const postDeleteUser = createAsyncThunk('dashboard/postDeleteUser', async payload => {
  try {
    const url = getCookie('apiUrl')
    const { id } = payload
    const response = await axiosInstance.post(`${url}/app/react/users/del/${id}`)
    const data = response.data

    return data
  } catch (error) {
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
        state.data = action.payload
        state.loading = false
        notify('The User deleted successfully', 'success')
      })
      .addCase(postDeleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        notify('There was an error, try again later!', 'error')
      })
  }
})

export default deleteUsersSlice.reducer
