import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postAddVariations = createAsyncThunk('dashboard/postAddVariations', async userData => {
  const token = getCookie('token') // Get the token inside the async function

  console.log(token, '===> token Post create variations slice')

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()
    formData.append('name', userData.name || '')

    // Append each item individually to the FormData
    if (userData.items && Array.isArray(userData.items)) {
      userData.items.forEach(item => {
        formData.append('items[]', item)
        console.log(item, 'item form new items variations')
      })
    }

    console.log(formData, userData, '===> formData, userData variations add slice')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post('https://test.izocloud.net/api/app/react/variations/save', formData, {
      headers // Pass the headers to the Axios request
    })

    console.log(response, '===> from post variations slice ')

    return response.data
  }
})

// Define the user slice
const postAddVariationsSlice = createSlice({
  name: 'postAddVariations',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddVariations.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postAddVariations.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        console.log(action.payload)
        notify('Variations Added successfully', 'success')
      })
      .addCase(postAddVariations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.message) {
          console.log(action.payload.message, 'form add variation')
          notify(action.payload.message, 'error')
        } else {
          console.log('Unknown error occurred in form add variation:', action.payload)
          notify('An unknown error occurred', 'error')
        }
      })
  }
})

export default postAddVariationsSlice.reducer