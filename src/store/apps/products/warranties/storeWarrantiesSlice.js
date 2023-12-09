import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a warranty
export const storeWarranty = createAsyncThunk('warranties/storeWarranty', async (warranty, { rejectWithValue }) => {
  try {
    const token = getCookie('token')
    const response = await axios.post('https://test.izocloud.net/api/app/react/warranties/save', warranty, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })

    // console.log(response.data, '===> response from storeWarranty 🙌🙌')

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// Slice for warranties
export const warrantySlice = createSlice({
  name: 'warranties',
  initialState: { entities: [], loading: true, error: false, success: false, status: '' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(storeWarranty.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(storeWarranty.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.entities = action.payload
        state.status = action.payload.status
        notify('Warranty successfully stored.', 'success')
      })
      .addCase(storeWarranty.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.success = false
        state.status = action.payload.status

        // console.log(action.payload.status, '===> action.payload.status')
        notify('There is an error try again later', 'error')
      })
  }
})

export default warrantySlice.reducer
