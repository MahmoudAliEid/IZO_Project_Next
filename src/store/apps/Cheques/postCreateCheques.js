import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const createCheques = createAsyncThunk('Cheques/createCheques', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values } = payload

  console.log(values, 'values from create Cheques')

  const formData = new FormData()
  // Extract the date components
  let yearWrite = values.write_date.getFullYear()
  let monthWrite = String(values.write_date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayWrite = String(values.write_date.getDate()).padStart(2, '0')

  // for due date
  let yearDue = values.due_date.getFullYear()
  let monthDue = String(values.due_date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayDue = String(values.due_date.getDate()).padStart(2, '0')

  // Format the date
  let formattedWriteDate = `${yearWrite}-${monthWrite}-${dayWrite}`
  let formattedDueDate = `${yearDue}-${monthDue}-${dayDue}`
  formData.append('cheque_no', values.cheque_no)
  formData.append('write_date', formattedWriteDate)
  formData.append('bank_id', values.bank_id)
  formData.append('cheque_type', values.cheque_type)
  formData.append('amount', values.amount)
  formData.append('amount_currency', values.amount_currency)
  formData.append('contact_id', values.contact)
  formData.append('account_id', values.account)
  formData.append('due_date', formattedDueDate)
  formData.append('note', values.note)
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

  formData.append('type', values.type)

  const response = await axios.post(`${url}/app/react/cheque/save`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, 'response.data form create Cheques')

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
const postCreateChequesSlice = createSlice({
  name: 'storeCheques',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCheques.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(createCheques.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Cheque successfully stored.', 'success')
      })
      .addCase(createCheques.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postCreateChequesSlice.reducer
