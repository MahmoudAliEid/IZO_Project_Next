import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const editContactBank = createAsyncThunk('ContactBank/editContactBank', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values, id } = payload
  const formData = new FormData()

  formData.append('location_id', values.location_id)
  formData.append('name', values.name)

  const response = await axios.post(`${url}/app/react/contact-bank/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, 'response.data form update ContactBank')

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
const postEditContactBankSlice = createSlice({
  name: 'updateContactBank',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editContactBank.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(editContactBank.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Contact Bank successfully updated.', 'success')
      })
      .addCase(editContactBank.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postEditContactBankSlice.reducer
