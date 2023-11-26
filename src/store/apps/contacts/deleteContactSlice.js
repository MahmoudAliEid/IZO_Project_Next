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
export const postDeleteContact = createAsyncThunk('dashboard/postDeleteContact', async payload => {
  try {
    const { id, url } = payload
    const response = await axiosInstance.post(`${url}/app/react/contact/del/${id}`)
    const data = response.data
    notify('The contact has been deleted successfully', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const deleteContactSlice = createSlice({
  name: 'deleteContact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postDeleteContact.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(postDeleteContact.fulfilled, (state, action) => {
        console.log('payload action from delete', action)
        state.data = action.payload
        state.loading = false
      })
      .addCase(postDeleteContact.rejected, (state, action) => {
        console.log('rejected action from delete', action)
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default deleteContactSlice.reducer
