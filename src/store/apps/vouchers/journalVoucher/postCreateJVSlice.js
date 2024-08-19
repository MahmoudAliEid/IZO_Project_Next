import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const createJournalVoucher = createAsyncThunk('vouchers/createJournalVoucher', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values } = payload
  const formData = new FormData()
  // Extract the date components
  let year = values.date.getFullYear()
  let month = String(values.date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let day = String(values.date.getDate()).padStart(2, '0')

  // Format the date
  let formattedDate = `${year}-${month}-${day}`
  

  const nonZeroRows =
    values.table && values.table.length > 0 ? values.table.filter(item => item.debit !== 0 || item.credit !== 0) : []

  formData.append('date', formattedDate)
  formData.append('total_credit', values.total_credit)
  formData.append('total_debit', values.total_debit)
  formData.append('currency_id', values.currency_id)
  formData.append('currency_id_amount', values.currency_id_amount)

  if (nonZeroRows.length > 0) {
    nonZeroRows.forEach((item, index) => {
      formData.append(`account_id[${index}]`, item.account_id)
      formData.append(`text[${index}]`, item.text)
      formData.append(`debit[${index}]`, item.debit)
      formData.append(`credit[${index}]`, item.credit)
      formData.append(`cost_center_id[${index}]`, item.cost_center_id)
    })
  }

  if (values.attachment && values.attachment.length > 0) {
    values.attachment.forEach((item, index) => {
      formData.append(`document_expense[${index}]`, item)
    })
  }

  const response = await axios.post(`${url}/app/react/journal-voucher/save`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, 'response.data form create Journal Voucher')

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
const postCreateJVSlice = createSlice({
  name: 'post create journal voucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createJournalVoucher.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(createJournalVoucher.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Successfully stored.', 'success')
      })
      .addCase(createJournalVoucher.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postCreateJVSlice.reducer
