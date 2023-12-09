import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postAddSPGroup = createAsyncThunk('dashboard/postAddSPGroup', async userData => {
  const token = getCookie('token') // Get the token inside the async function

  console.log(token, '===> token Post create Sale Price Group slice')
  console.log(userData, '===> userData Post create Sale Price Group slice')

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()

    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key] || false)
      }
    }

    // if (userData.allow_decimal === 0) {
    //   formData.append('allow_decimal', 0)
    // } else {
    //   formData.append('allow_decimal', 1)
    // }
    console.log(formData, userData, '===> formData, userData add sale Price group slice')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post('https://test.izocloud.net/api/app/react/sales-price-group/save', formData, {
      headers // Pass the headers to the Axios request
    })

    console.log(response, '===> from post Sale Price group slice ')

    return response.data
  }
})

// Define the user slice
const postAddSPGroupSlice = createSlice({
  name: 'postAddSPGroup',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddSPGroup.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postAddSPGroup.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        console.log(action.payload)
        notify(action.payload.message, 'success')
      })
      .addCase(postAddSPGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.message) {
          console.log(action.payload.message, 'form add Sale Price group ')
          notify(action.payload.message, 'error')
        } else {
          console.log('Unknown error occurred in form add Sale Price Group :', action.payload)
          notify('Their is an Error', 'error')
        }
      })
  }
})

export default postAddSPGroupSlice.reducer
