import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for deleting a warranty
export const deleteWarranty = createAsyncThunk('warranties/deleteWarranty', async id => {
  const token = getCookie('token')
  const urlToken = getCookie('apiUrl')

  const url = `${urlToken}/app/react/warranties/del/${id}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  return data
})

// Slice for warranty deletions
export const warrantyDeleteSlice = createSlice({
  name: 'warrantyDeletions',
  initialState: { entity: null, loading: false, error: false, success: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteWarranty.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(deleteWarranty.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.entity = action.payload
        notify('Warranty successfully deleted.', 'success')
      })
      .addCase(deleteWarranty.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        state.error = action.payload
        notify('There is an error try again later', 'error')
      })
  }
})

export default warrantyDeleteSlice.reducer
