import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a brand
export const storeBrand = createAsyncThunk('brands/store', async brand => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const formData = new FormData()

  formData.append('name', brand.name)
  formData.append('description', brand.description)
  formData.append('use_for_repair', brand.use_for_repair)
  formData.append('image', brand.image[0])

  const response = await axios.post(`${url}/app/react/brands/save`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
})

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: false,
  success: false
}

// Slice
const storeBrandSlice = createSlice({
  name: 'storeBrand',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(storeBrand.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(storeBrand.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Brand successfully stored.', 'success')
      })
      .addCase(storeBrand.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default storeBrandSlice.reducer
