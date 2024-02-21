import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postAddSPGroup = createAsyncThunk('dashboard/postAddSPGroup', async userData => {
  const token = getCookie('token') // Get the token inside the async function
  const url = getCookie('apiUrl')
  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()

    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key] || false)
      }
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/sales-price-group/save`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postAddSPGroupSlice = createSlice({
  name: 'postAddSPGroup',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddSPGroup.pending, state => {
        state.loading = true
        state.error = false
        state.success = false

        state.data = []
      })
      .addCase(postAddSPGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true

        notify(action.payload.message, 'success')
      })
      .addCase(postAddSPGroup.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        if (action.payload && action.payload.message) {
          notify(action.payload.message, 'error')
        } else {
          notify('Their is an Error', 'error')
        }
      })
  }
})

export default postAddSPGroupSlice.reducer
