import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for updating a warranty
export const updateWarranty = createAsyncThunk('warranties/updateWarranty', async (payload, { rejectWithValue }) => {
  const { updateData, id } = payload
  try {
    const token = getCookie('token')
    const response = await axios.post(`https://test.izocloud.net/api/app/react/warranties/update/${id}`, updateData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    console.log(response.data, '===> response from updateWarranty 🙌🙌')

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// Slice for warranty updates
export const warrantyUpdateSlice = createSlice({
  name: 'warrantyUpdates',
  initialState: { entity: [], loading: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateWarranty.pending, state => {
        state.loading = 'loading'
      })
      .addCase(updateWarranty.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.entity = action.payload
        console.log(action.payload, '===> action.payload')
        notify('Warranty successfully updated.', 'success')
      })
      .addCase(updateWarranty.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
        console.log(action.payload, '===> action.payload')
        notify('There is an error try again later', 'error')
      })
  }
})

export default warrantyUpdateSlice.reducer
