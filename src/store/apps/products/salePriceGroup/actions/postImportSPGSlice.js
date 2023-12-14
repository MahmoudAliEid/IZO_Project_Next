import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postImportSPGroup = createAsyncThunk('dashboard/postImportSPGroup', async data => {
  const token = getCookie('token') // Get the token inside the async function
  const url = getCookie('apiUrl')

  console.log(token, '===> token Post import Sale Price Group slice')
  console.log(data, '===> data Post import Sale Price Group slice')
  console.log(url, '===> url Post import Sale Price Group slice')
  console.log(data.file[0], '===> data.file[0] Post import Sale Price Group slice')
  if (token !== undefined && token !== null && data !== undefined && data !== null) {
    const formData = new FormData()

    formData.append('product_group_prices', data.file[0])

    console.log(formData, data, '===> formData, data add sale Price group slice')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post('https://test.izocloud.net/api/app/react/sales-price-group/import', formData, {
      headers // Pass the headers to the Axios request
    })

    console.log(response, '===> from import Sale Price group slice ')

    return response.data
  }
})

// Define the user slice
const postImportSPGSlice = createSlice({
  name: 'postImportSPGroup',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postImportSPGroup.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postImportSPGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        console.log(action.payload.message, 'form import Sale Price group ')
        notify('Done Successfully', 'success')
      })
      .addCase(postImportSPGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        console.log('Unknown error occurred  :', action.payload)
        notify('Their is an Error', 'error')
      })
  }
})

export default postImportSPGSlice.reducer
