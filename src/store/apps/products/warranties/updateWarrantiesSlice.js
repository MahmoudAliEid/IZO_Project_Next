import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for updating a warranty
export const updateWarranty = createAsyncThunk('warranties/updateWarranty', async (payload, { rejectWithValue }) => {
  const { updateData, id } = payload
  try {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    const response = await axios.post(`${url}/app/react/warranties/update/${id}`, updateData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// Slice for warranty updates
export const warrantyUpdateSlice = createSlice({
  name: 'warrantyUpdates',
  initialState: { entity: [], loading: false, error: false, success: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateWarranty.pending, state => {
        state.loading = true
      })
      .addCase(updateWarranty.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.entity = action.payload

        notify('Warranty successfully updated.', 'success')
      })
      .addCase(updateWarranty.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.error = action.payload

        notify('There is an error try again later', 'error')
      })
  }
})

export default warrantyUpdateSlice.reducer
