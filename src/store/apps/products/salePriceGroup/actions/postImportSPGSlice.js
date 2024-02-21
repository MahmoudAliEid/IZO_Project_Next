import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postImportSPGroup = createAsyncThunk('dashboard/postImportSPGroup', async payload => {
  const token = getCookie('token') // Get the token inside the async function
  const url = getCookie('apiUrl')
  const { data } = payload

  if (token !== undefined && token !== null && data !== undefined && data !== null) {
    const formData = new FormData()

    formData.append('product_group_prices', data.file[0])

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`${url}/app/react/sales-price-group/import`, formData, {
      headers // Pass the headers to the Axios request
    })

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

        notify('Done Successfully', 'success')
      })
      .addCase(postImportSPGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload

        notify('Their is an Error', 'error')
      })
  }
})

export default postImportSPGSlice.reducer
