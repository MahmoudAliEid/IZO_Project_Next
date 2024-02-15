import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postAddUnit = createAsyncThunk('dashboard/postAddUnit', async userData => {
  const token = getCookie('token') // Get the token inside the async function
  const url = getCookie('apiUrl')

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

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/units/save`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postAddUnitSlice = createSlice({
  name: 'postAddUnit',
  initialState: {
    loading: true,
    error: false,
    success: false,

    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postAddUnit.pending, state => {
        state.loading = true
        state.success = false
        state.error = false
        state.error = null
        state.data = []
      })
      .addCase(postAddUnit.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload

        notify(action.payload.message, 'success')
      })
      .addCase(postAddUnit.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        state.error = action.payload
        if (action.payload && action.payload.message) {
          console.log(action.payload.message, 'form add unit')
          notify(action.payload.message, 'error')
        } else {
          notify('Their is an Error', 'error')
        }
      })
  }
})

export default postAddUnitSlice.reducer
