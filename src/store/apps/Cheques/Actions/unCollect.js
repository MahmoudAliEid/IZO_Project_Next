import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for fetching the data
export const unCollect = createAsyncThunk('cheques/unCollect', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { itemId } = payload
  const response = await axios.get(`${url}/app/react/cheque/un-collect/${itemId}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  return response.data
})

// Initial state
const initialState = {
  brands: [],
  status: 'idle',
  error: null
}

// Slice
const getUnCollect = createSlice({
  name: 'unCollect',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(unCollect.pending, state => {
        state.status = 'loading'
      })
      .addCase(unCollect.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
        notify(' Cheques successfully unCollected.', 'success')
      })
      .addCase(unCollect.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify('There was an error, try again later!', 'error')
      })
  }
})

export default getUnCollect.reducer
