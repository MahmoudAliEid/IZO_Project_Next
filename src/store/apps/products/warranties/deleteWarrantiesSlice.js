import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for deleting a warranty
export const deleteWarranty = createAsyncThunk('warranties/deleteWarranty', async id => {
  const token = getCookie('token')

  const url = `https://test.izocloud.net/api/app/react/warranties/del/${id}`

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
  initialState: { entity: null, loading: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteWarranty.pending, state => {
        state.loading = 'loading'
      })
      .addCase(deleteWarranty.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.entity = action.payload
        notify('Warranty successfully deleted.', 'success')
      })
      .addCase(deleteWarranty.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
        notify('There is an error try again later', 'error')
      })
  }
})

export default warrantyDeleteSlice.reducer
