import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for getting warranty details
export const getWarrantyDetails = createAsyncThunk(
  'warrantyDetails/getWarrantyDetails',
  async (id, { rejectWithValue }) => {
    try {
      const token = getCookie('token')
      const url = getCookie('apiUrl')
      const response = await axios.get(`${url}/app/react/warranties/edit/${id}`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      })

      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

// Slice for warranty details
export const warrantyDetailsSlice = createSlice({
  name: 'warrantyDetails',
  initialState: { entity: [], loading: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWarrantyDetails.pending, state => {
        state.loading = 'loading'
      })
      .addCase(getWarrantyDetails.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.entity = action.payload
      })
      .addCase(getWarrantyDetails.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
  }
})

export default warrantyDetailsSlice.reducer
