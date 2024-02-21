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
export const deleteVariations = createAsyncThunk('dashboard/deleteVariations', async payload => {
  const url = getCookie('apiUrl')
  try {
    const { id } = payload
    const response = await axiosInstance.post(`${url}/app/react/variations/del/${id}`)
    const data = response.data
    notify('Variation successfully deleted.', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const deleteVariationsSlice = createSlice({
  name: 'deleteVariation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteVariations.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVariations.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteVariations.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default deleteVariationsSlice.reducer
