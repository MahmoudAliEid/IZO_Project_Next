import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for deleting a brand
export const deleteBrand = createAsyncThunk('brands/delete', async payload => {
  const token = getCookie('token')

  const url = `https://test.izocloud.net/api/app/react/brands/del/${payload}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  if (data.status === 200) {
  }

  return data
})

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null
}

// Slice
const deleteBrandsSlice = createSlice({
  name: 'deleteBrands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteBrand.pending, state => {
        state.status = 'loading'
      })
      .addCase(deleteBrand.fulfilled, state => {
        state.status = 'succeeded'

        notify('Brand successfully deleted.', 'success')
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify("Sorry! You Can't Delete This Brand Because Used From Products", 'error')
      })
  }
})

export default deleteBrandsSlice.reducer
