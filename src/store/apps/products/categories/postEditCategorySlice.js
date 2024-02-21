import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postEditCategory = createAsyncThunk('dashboard/postEditCategory', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  const { userData, itemId } = payload

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()
    formData.append('name', userData.name || '')
    formData.append('parent_id', userData.parent_id || '')
    formData.append('woocommerce_cat_id', userData.woocommerce_cat_id || '')
    formData.append('category_type', userData.category_type || '')
    formData.append('description', userData.description || '')
    formData.append('slug', userData.slug || '')

    if (Array.isArray(userData.image)) {
      //  userData.image.forEach(item => {
      //    formData.append('image', item)
      //  })
      formData.append('image', userData.image[0] || '')
    } else {
      formData.append('image', userData.image || '')
    }

    formData.append('short_code', userData.short_code)

    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      'Content-Type': ' multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/category/update/${itemId}`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postEditCategorySlice = createSlice({
  name: 'postEditCategory',
  initialState: {
    loading: false,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditCategory.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = []
      })
      .addCase(postEditCategory.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = false
        state.success = true

        notify(action.payload.message, 'success')
      })
      .addCase(postEditCategory.rejected, state => {
        state.loading = false
        state.error = true
        state.success = false
        notify('Their is an Error try again later', 'error')
      })
  }
})

export default postEditCategorySlice.reducer
