import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postAddVariations = createAsyncThunk('dashboard/postAddVariations', async userData => {
  const token = getCookie('token') // Get the token inside the async function

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()
    formData.append('name', userData.name || '')

    // Append each item individually to the FormData
    if (userData.items && Array.isArray(userData.items)) {
      userData.items.forEach(item => {
        formData.append('items[]', item)
      })
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post('https://test.izocloud.net/api/app/react/variations/save', formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postAddVariationsSlice = createSlice({
  name: 'postAddVariations',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddVariations.pending, state => {
        state.loading = true
        state.error = false
        state.data = []
      })
      .addCase(postAddVariations.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true

        notify('Variations Added successfully', 'success')
      })
      .addCase(postAddVariations.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        if (action.payload && action.payload.message) {
          notify(action.payload.message, 'error')
        } else {
          notify('An unknown error occurred', 'error')
        }
      })
  }
})

export default postAddVariationsSlice.reducer
