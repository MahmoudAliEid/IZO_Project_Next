import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const editJournalVoucher = createAsyncThunk('vouchers/editJournalVoucher', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values, id } = payload
  const formData = new FormData()
  // Extract the date components
  let year = values.date.getFullYear()
  let month = String(values.date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let day = String(values.date.getDate()).padStart(2, '0')

  // Format the date
  let formattedDate = `${year}-${month}-${day}`

  formData.append('date', formattedDate)
  formData.append('total_credit', values.total_credit)
  formData.append('total_debit', values.total_debit)
  formData.append('currency_id', values.currency_id)
  formData.append('currency_id_amount', values.currency_id_amount)

  if (values.table && values.table.length > 0) {
    values.table.forEach((item, index) => {
      if (item.status === 'old') {
        formData.append(`old_account_id[${index}]`, item.account_id)
        formData.append(`old_text[${index}]`, item.text)
        formData.append(`old_debit[${index}]`, item.debit)
        formData.append(`old_credit[${index}]`, item.credit)
        formData.append(`old_cost_center_id[${index}]`, item.cost_center_id)
        formData.append(`old_item[${index}]`, item.line_id)
      } else {
        formData.append(`account_id[${index}]`, item.account_id)
        formData.append(`text[${index}]`, item.text)
        formData.append(`debit[${index}]`, item.debit)
        formData.append(`credit[${index}]`, item.credit)
        formData.append(`cost_center_id[${index}]`, item.cost_center_id)
      }
    })
  }

  if (values.attachment && values.attachment.length > 0) {
    values.attachment.forEach((item, index) => {
      formData.append(`document_expense[${index}]`, item)
    })
  }

  const response = await axios.post(`${url}/app/react/journal-voucher/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, 'response.data form edit Journal Voucher')

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
const postEditJournalVoucher = createSlice({
  name: 'post edit journal voucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editJournalVoucher.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(editJournalVoucher.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Successfully stored.', 'success')
      })
      .addCase(editJournalVoucher.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postEditJournalVoucher.reducer
