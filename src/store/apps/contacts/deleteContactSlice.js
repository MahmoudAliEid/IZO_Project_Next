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

// Define an async thunk for deleting a user
export const postDeleteContact = createAsyncThunk('dashboard/postDeleteContact', async payload => {
  const { id, url } = payload
  const token = getCookie('token')

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const response = await axiosInstance.post(`${url}/app/react/contact/del/${id}`)
  const data = response.data

  return data
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
        state.data = action.payload
        state.loading = false
        notify('The contact has been deleted successfully', 'success')
      })
      .addCase(postDeleteContact.rejected, (state, action) => {
        notify('There was an error, try again later!', 'error')
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default deleteContactSlice.reducer
