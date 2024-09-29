import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export const getLastSupplierAdded = createAsyncThunk('purchases/getLastSupplierAdded', async () => {
  const token = getCookie('token')
  const URL = getCookie('apiUrl')

  try {
    const response = await axios.get(`${URL}/app/react/purchase/supplier-last`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    return error
  }
})

const initialState = {
  data: [],
  status: null,
  error: null,
  loading: false,
  msg: null
}

const getLastSupplierAddedSlice = createSlice({
  name: 'purchase get last supplier added',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLastSupplierAdded.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(getLastSupplierAdded.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(getLastSupplierAdded.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getLastSupplierAddedSlice.reducer
