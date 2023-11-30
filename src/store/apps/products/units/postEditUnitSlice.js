import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postEditUnit = createAsyncThunk('dashboard/postEditUnit', async payload => {
  const token = getCookie('token') // Get the token inside the async function

  const { itemId, userData } = payload

  console.log(token, itemId, userData, '===> token ,itemId, userData  Post Edit Unit slice')

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()

    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key] || '')
      }
    }
    console.log(formData, userData, '===> formData, userData Unit add slice')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`https://test.izocloud.net/api/app/react/units/update/${itemId}`, formData, {
      headers // Pass the headers to the Axios request
    })

    console.log(response, '===> from edit Unit slice ')

    return response.data
  }
})

// Define the user slice
const postEditUnitSlice = createSlice({
  name: 'postEditUnit',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditUnit.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postEditUnit.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        console.log(action.payload)
        notify(action.payload.message, 'success')
      })
      .addCase(postEditUnit.rejected, (state, action) => {
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

export default postEditUnitSlice.reducer
