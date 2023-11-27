import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a brand
export const storeBrand = createAsyncThunk('brands/store', async brand => {
  const token = getCookie('token')
  const formData = new FormData()
  console.log(brand, 'brand')
  formData.append('name', brand.name)
  formData.append('description', brand.description)
  formData.append('use_for_repair', brand.use_for_repair)
  formData.append('image', brand.image[0])
  console.log(brand.image[0], 'image brand')

  // print the formData as an object
  console.log(Object.fromEntries(formData))

  const response = await axios.post('https://test.izocloud.net/api/app/react/brands/save', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response, '===>  from STORE BRAND')

  return response.data
})

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null
}

// Slice
const storeBrandSlice = createSlice({
  name: 'storeBrand',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(storeBrand.pending, state => {
        state.status = 'loading'
      })
      .addCase(storeBrand.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        notify('Brand successfully stored.', 'success')
      })
      .addCase(storeBrand.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default storeBrandSlice.reducer
