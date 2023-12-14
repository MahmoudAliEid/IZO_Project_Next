import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postCreateProductUnit = createAsyncThunk('dashboard/postCreateProductUnit', async userData => {
  const token = getCookie('token') // Get the token inside the async function
  console.log(userData, '===> userData Post create product Unit slice')

  console.log(token, '===> token Post create product Unit slice')

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()

    formData.append('name', userData['name'] || '')
    formData.append('short_name', userData['short_name'] || '')
    formData.append('allow_decimal', userData['allow_decimal'] || 0)
    formData.append('parent_unit', userData['parent_unit'] || null)
    formData.append('sub_qty', userData['sub_qty'] || null)
    if (userData['multiple_unit'] === true) {
      formData.append('multiple_unit', userData['multiple_unit'])
    }
    console.log(formData, userData, '===> formData, userData product Unit  add slice')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post('https://test.izocloud.net/api/app/react/products/unit/save', formData, {
      headers // Pass the headers to the Axios request
    })

    console.log(response, '===> from post  product Unit slice ')

    return response.data
  }
})

// Define the user slice
const postCreateProductUnitSlice = createSlice({
  name: 'postCreateProductUnit',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postCreateProductUnit.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postCreateProductUnit.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        console.log(action.payload)
        notify(action.payload.message, 'success')
      })
      .addCase(postCreateProductUnit.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.message) {
          console.log(action.payload.message, 'form add unit')
          notify(action.payload.message, 'error')
        } else {
          console.log('Unknown error occurred in form add unit:', action.payload)
          notify('Their is an Error', 'error')
        }
      })
  }
})

export default postCreateProductUnitSlice.reducer
