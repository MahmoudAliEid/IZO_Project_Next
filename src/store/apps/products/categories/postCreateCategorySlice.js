import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postCreateCategory = createAsyncThunk('dashboard/postCreateCategory', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { userData } = payload

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()
    formData.append('name', userData.name || '')
    formData.append('parent_id', userData.parent_id || '')
    formData.append('woocommerce_cat_id', userData.woocommerce_cat_id || '')
    formData.append('category_type', userData.category_type || '')
    formData.append('description', userData.description || '')
    formData.append('slug', userData.slug || '')
    formData.append('image', userData.image[0] || '')

    formData.append('short_code', userData.short_code)

    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      'Content-Type': ' multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/category/save`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postCreateCategorySlice = createSlice({
  name: 'postCreateCategory',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postCreateCategory.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = []
      })
      .addCase(postCreateCategory.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true
        notify(action.payload.message, 'success')
      })
      .addCase(postCreateCategory.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.payload
        notify('Their is an Error try again later', 'error')
      })
  }
})

export default postCreateCategorySlice.reducer
