import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for getting all warranties
export const getAllWarranties = createAsyncThunk('warranties/getAllWarranties', async (_, { rejectWithValue }) => {
  try {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    const response = await axios.get(`${url}/app/react/warranties/all`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// Slice for warranties
export const warrantySlice = createSlice({
  name: 'warranties',
  initialState: { entities: [], loading: 'idle', error: null, status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllWarranties.pending, state => {
        state.loading = 'loading'
      })
      .addCase(getAllWarranties.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.entities = action.payload
        state.status = action.payload.status
      })
      .addCase(getAllWarranties.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
  }
})

export default warrantySlice.reducer
