import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'
import axios from 'axios'

export const updateBrand = createAsyncThunk('brands/update', async brand => {
  const { updateData, id } = brand
  const token = getCookie('token')
  console.log('🌶 BRAND UPDATE DATA 🌶', updateData)
  console.log('🌶 BRAND UPDATE ID 🌶', id)
  console.log('😎 image from updateBrandSlice', updateData.image)

  //   type of image
  console.log('🌶 type of image 🌶', typeof updateData.image)
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

  // print the formData as an object
  // console.log(Object.fromEntries(formData))

  const response = await axios.post(`https://test.izocloud.net/api/app/react/brands/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  // console.log('��� response from updateBrandSlice', response)
  // console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀')

  return response.data
})

const updateBrandSlice = createSlice({
  name: 'brands',
  initialState: { data: [], loading: 'idle', status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateBrand.pending, state => {
      state.loading = 'loading'
    })
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.data = action.payload
      console.log(action.payload, '===> action.payload from updateBrand')
      notify('Brand updated successfully', 'success')
    })
    builder.addCase(updateBrand.rejected, state => {
      state.loading = 'failed'
    })
  }
})

export default updateBrandSlice.reducer
