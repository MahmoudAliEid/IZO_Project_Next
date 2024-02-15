import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postEditUnit = createAsyncThunk('dashboard/postEditUnit', async payload => {
  const token = getCookie('token') // Get the token inside the async function
  const url = getCookie('apiUrl')
  const { itemId, userData } = payload

  if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
    const formData = new FormData()

    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key] || '')
      }
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/units/update/${itemId}`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postEditUnitSlice = createSlice({
  name: 'postEditUnit',
  initialState: {
    loading: true,
    error: false,
    success: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditUnit.pending, state => {
        state.loading = true
        state.error = false
        state.success = false

        state.data = []
      })
      .addCase(postEditUnit.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        console.log(action.payload)
        notify(action.payload.message, 'success')
      })
      .addCase(postEditUnit.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        if (action.payload && action.payload.message) {
          notify(action.payload.message, 'error')
        } else {
          notify('Their is an Error', 'error')
        }
      })
  }
})

export default postEditUnitSlice.reducer
