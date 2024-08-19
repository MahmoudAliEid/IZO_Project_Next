// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Next Imports
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  error: null
}

export const fetchAttachmentCheques = createAsyncThunk('dashboard/fetchAttachmentCheques', async payload => {
  const url = getCookie('apiUrl')
  const token = getCookie('token')
  const { id } = payload
  const response = await axios.get(`${url}/app/react/cheque/attach/${id}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  const data = response.data

  return data
})

// Create a Redux slice
const getAttachmentCheques = createSlice({
  name: 'fetch Attachment Cheques',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAttachmentCheques.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchAttachmentCheques.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(fetchAttachmentCheques.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getAttachmentCheques.reducer
