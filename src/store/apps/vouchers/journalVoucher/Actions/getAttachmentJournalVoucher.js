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

export const fetchAttachmentJournalVoucher = createAsyncThunk(
  'dashboard/vouchers/fetchAttachmentJournalVoucher',
  async payload => {
    const url = getCookie('apiUrl')
    const token = getCookie('token')
    const { id } = payload

    //? add new url for journal voucher
    const response = await axios.get(`${url}/app/react/journal-voucher/attach/${id}`, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })

    const data = response.data

    return data
  }
)

// Create a Redux slice
const getAttachmentJournalVoucher = createSlice({
  name: 'fetch Attachment Journal Voucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAttachmentJournalVoucher.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchAttachmentJournalVoucher.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
      })
      .addCase(fetchAttachmentJournalVoucher.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getAttachmentJournalVoucher.reducer
