import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'
import axios from 'axios'

export const updateBrand = createAsyncThunk('brands/update', async brand => {
  const { updateData, id } = brand
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const formData = new FormData()
  formData.append('name', updateData.name)
  formData.append('description', updateData.description)
  formData.append('use_for_repair', updateData.use_for_repair)

  //   check if image is start with http
  if (typeof updateData.image === 'string') {
    formData.append('image', updateData.image)
  } else {
    formData.append('image', updateData.image[0])
  }

  const response = await axios.post(`${url}/app/react/brands/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
})

const updateBrandSlice = createSlice({
  name: 'brands',
  initialState: { data: [], loading: false, error: false, success: false },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateBrand.pending, state => {
      state.loading = true
      state.error = false
      state.success = false
      state.data = null
    })
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = false
      state.success = true
      notify('Brand updated successfully', 'success')
    })
    builder.addCase(updateBrand.rejected, state => {
      state.loading = false
      state.error = true
      state.success = false
      notify('There is an error try again later', 'error')
    })
  }
})

export default updateBrandSlice.reducer
