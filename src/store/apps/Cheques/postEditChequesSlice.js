import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const editCheques = createAsyncThunk('Cheques/editCheques', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { id, values } = payload
  const formData = new FormData()
  // Extract the date components
  let yearWrite = values.write_date.getFullYear()
  let monthWrite = String(values.write_date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayWrite = String(values.write_date.getDate()).padStart(2, '0')

  let yearDue = values.due_date.getFullYear()
  let monthDue = String(values.due_date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayDue = String(values.due_date.getDate()).padStart(2, '0')

  // Format the date
  let formattedDateWrite = `${yearWrite}-${monthWrite}-${dayWrite}`
  let formattedDateDue = `${yearDue}-${monthDue}-${dayDue}`

  formData.append('amount', values.amount)
  formData.append('cheque_no', values.cheque_no)
  formData.append('bank_id', values.bank_id)
  formData.append('amount_currency', values.amount_currency)
  formData.append('contact_id', values.contact)
  formData.append('account_id', values.account)
  formData.append('write_date', formattedDateWrite)
  formData.append('due_date', formattedDateDue)
  formData.append('text', values.note)
  formData.append('currency_id', values.currencies)
  formData.append('currency_id_amount', values.currency_value)

  if (values.attachment && values.attachment.length > 0) {
    values.attachment.forEach((attachment, index) => {
      formData.append(`document_expense[${index}]`, attachment)
    })
  }
  if (values.bill_id && values.bill_id.length > 0) {
    values.bill_id.forEach((bill_id, index) => {
      formData.append(`bill_id[${index}]`, bill_id)
    })
  }

  // if bill_amount is not empty else do nothing
  if (values.bill_amount && values.bill_amount.length > 0) {
    values.bill_amount.forEach((bill_amount, index) => {
      formData.append(`bill_amount[${index}]`, bill_amount)
    })
  }
  if (values.old_bill_id && values.old_bill_id.length > 0) {
    values.old_bill_id.forEach((old_bill_id, index) => {
      formData.append(`old_bill_id[${index}]`, old_bill_id)
    })
  }

  // if bill_amount is not empty else do nothing
  if (values.old_bill_amount && values.old_bill_amount.length > 0) {
    values.old_bill_amount.forEach((old_bill_amount, index) => {
      formData.append(`old_bill_amount[${index}]`, old_bill_amount)
    })
  }
  // if bill_amount is not empty else do nothing
  if (values.payment_id && values.payment_id.length > 0) {
    values.payment_id.forEach((payment_id, index) => {
      formData.append(`payment_id[${index}]`, payment_id)
    })
  }

  formData.append('type', values.type)

  const response = await axios.post(`${url}/app/react/cheque/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, 'response.data form edit cheques')

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
const postEditChequesSlice = createSlice({
  name: 'editCheques',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editCheques.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(editCheques.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Cheque successfully updated.', 'success')
      })
      .addCase(editCheques.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postEditChequesSlice.reducer
