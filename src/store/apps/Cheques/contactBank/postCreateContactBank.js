import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const createContactBank = createAsyncThunk('ContactBank/createContactBank', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values } = payload
  const formData = new FormData()

  formData.append('location_id', values.location_id)
  formData.append('name', values.name)

  const response = await axios.post(`${url}/app/react/contact-bank/save`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, 'response.data form create ContactBank')

  return response.data
})

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: false,
  success: false
}

// Slice
const postCreateContactBankSlice = createSlice({
  name: 'storeContactBank',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createContactBank.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(createContactBank.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Contact Bank successfully stored.', 'success')
      })
      .addCase(createContactBank.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postCreateContactBankSlice.reducer
