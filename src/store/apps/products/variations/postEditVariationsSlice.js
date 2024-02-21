import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postEditVariations = createAsyncThunk('dashboard/postEditVariations', async payload => {
  const token = getCookie('token') // Get the token inside the async function
  const { id, userData, oldList } = payload

  if (
    token !== undefined &&
    id !== null &&
    id !== undefined &&
    token !== null &&
    userData !== undefined &&
    userData !== null
  ) {
    const formData = new FormData()
    formData.append('name', userData.name || '')

    const arrOfOldVariations = []

    // Append each item individually to the FormData
    if (userData.items && Array.isArray(userData.items)) {
      userData.items.forEach(item => {
        formData.append('items[]', item)
      })
    }

    // Append each old item individually to the FormData
    if (Array.isArray(oldList) && oldList.length) {
      oldList.forEach(item => {
        formData.append(`old_items[${item.id}]`, item.name || '')
        arrOfOldVariations.push({ name: `old_items[${item.id}]`, item: item.name })
      })
    } else {
      formData.append(`old_items`, [])
    }

    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      'Content-Type': ' multipart/form-data'
    }

    const response = await axios.post(`https://test.izocloud.net/api/app/react/variations/update/${id}`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postEditVariationsSlice = createSlice({
  name: 'postEditVariations',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditVariations.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = []
      })
      .addCase(postEditVariations.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true

        notify('Variations Updated successfully', 'success')
      })
      .addCase(postEditVariations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
        state.error = true
        if (action.payload && action.payload.message) {
          notify(action.payload.message, 'error')
        } else {
          notify('An unknown error occurred', 'error')
        }
      })
  }
})

export default postEditVariationsSlice.reducer
