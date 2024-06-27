import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for fetching the data
export const collect = createAsyncThunk('cheques/collect', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { id, account_id, date } = payload
  const response = await axios.get(`${url}/app/react/cheque/collect/${id}?account_id=${account_id}&data=${date}`, {
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
const getCollect = createSlice({
  name: 'collect',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(collect.pending, state => {
        state.status = 'loading'
      })
      .addCase(collect.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
        notify(' Cheques successfully collected.', 'success')
      })
      .addCase(collect.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify('There was an error, try again later!', 'error')
      })
  }
})

export default getCollect.reducer
