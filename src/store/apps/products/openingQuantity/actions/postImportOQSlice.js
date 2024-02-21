import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postImportOQ = createAsyncThunk('dashboard/postImportOQ', async payload => {
  const token = getCookie('token') // Get the token inside the async function
  const url = getCookie('apiUrl')
  const { data } = payload

  if (token !== undefined && token !== null && data !== undefined && data !== null) {
    const formData = new FormData()

    formData.append('products_csv', data.file[0])

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/opening-quantity/import-file`, formData, {
      headers // Pass the headers to the Axios request
    })

    return response.data
  }
})

// Define the user slice
const postImportOQSlice = createSlice({
  name: 'postImportOQ',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postImportOQ.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postImportOQ.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        notify('Done Successfully', 'success')
      })
      .addCase(postImportOQ.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        notify('Their is an Error', 'error')
      })
  }
})

export default postImportOQSlice.reducer
