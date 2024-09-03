import axios from 'axios'
import notify from 'src/utils/notify'
import { getCookie } from 'cookies-next'

// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const editExpenseVoucher = createAsyncThunk('/dashboard/vouchers/expense-voucher/edit', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values, id } = payload

  // Extract the date components
  let year = values.date.getFullYear()
  let month = String(values.date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let day = String(values.date.getDate()).padStart(2, '0')

  // Format the date
  let formattedDate = `${year}-${month}-${day}`

  const formData = new FormData()
  formData.append('main_account_id', values.main_credit)
  formData.append('main_credit', values.main_credit_check ? 1 : null)
  formData.append('total_credit', values.main_amount)
  formData.append('gournal_date', formattedDate)
  formData.append('currency_id', values.currency_id)
  formData.append('currency_id_amount', values.currency_id_amount)
  formData.append('cost_center_id', values.cost_center_id)
  formData.append('note_main', values.main_note)

  if (values.attachment && values.attachment.length > 0) {
    values.attachment.forEach((attachment, index) => {
      formData.append(`document_expense[${index}]`, attachment)
    })
  }

  if (values.table && values.table.length > 0) {
    values.table.forEach((row, index) => {
      if (!row?.status || row?.status !== 'old') {
        formData.append(`credit_account_id[${index}]`, row?.credit_id ? row.credit_id : values.main_credit)
        formData.append(`debit_account_id[${index}]`, row.debit_id)
        formData.append(`amount[${index}]`, row.amount)
        formData.append(`center_id[${index}]`, row.cost_center_id ? row.cost_center_id : values.cost_center_id)
        formData.append(`text[${index}]`, row.note)
        formData.append(`tax_percentage[${index}]`, row.tax)
        formData.append(`tax_amount[${index}]`, row.tax_amount)
        formData.append(`net_amount[${index}]`, row.net_amount)
      }
      if (row.status === 'old') {
        formData.append(`old_credit_account_id[${index}]`, row?.credit_id ? row.credit_id : values.main_credit)
        formData.append(`old_debit_account_id[${index}]`, row.debit_id)
        formData.append(`old_amount[${index}]`, row.amount)
        formData.append(`old_center_id[${index}]`, row.cost_center_id ? row.cost_center_id : values.cost_center_id)
        formData.append(`old_text[${index}]`, row.note)
        formData.append(`old_tax_percentage[${index}]`, row.tax)
        formData.append(`old_tax_amount[${index}]`, row.tax_amount)
        formData.append(`old_net_amount[${index}]`, row.net_amount)
        formData.append(`old_date[${index}]`, row.date)
      }
    })
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await axios.post(`${url}/app/react/expense-voucher/update/${id}`, formData, config)
    console.log(response.data, 'response.data form edit expense voucher')

    return response.data
  } catch (error) {
    notify('error', 'Error', error.response.data.message)

    return error.response.data
  }
})

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: false,
  success: false
}

// Slice
const postEditExpenseVoucher = createSlice({
  name: 'Edit Expense Voucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editExpenseVoucher.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(editExpenseVoucher.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Successfully updated', 'success')
      })
      .addCase(editExpenseVoucher.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postEditExpenseVoucher.reducer
