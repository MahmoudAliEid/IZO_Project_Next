import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async thunk for storing a receipt
export const createPurchase = createAsyncThunk('Purchases/createPurchase', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values } = payload

  // Extract the date components
  let yearTrans = values.transaction_date.getFullYear()
  let monthTrans = String(values.transaction_date.getMonth() + 1).padStart(2, '0')
  let dayTrans = String(values.transaction_date.getDate()).padStart(2, '0')
  let hoursTrans = String(values.transaction_date.getHours()).padStart(2, '0')
  let minutesTrans = String(values.transaction_date.getMinutes()).padStart(2, '0')
  let yearDue = values.due_date.getFullYear()
  let monthDue = String(values.due_date.getMonth() + 1).padStart(2, '0')
  let dayDue = String(values.due_date.getDate()).padStart(2, '0')
  let hoursDue = String(values.due_date.getHours()).padStart(2, '0')
  let minutesDue = String(values.due_date.getMinutes()).padStart(2, '0')

  // Format the date
  let formattedTransDate = `${yearTrans}-${monthTrans}-${dayTrans} ${hoursTrans}:${minutesTrans}`
  let formattedDueDate = `${yearDue}-${monthDue}-${dayDue} ${hoursDue}:${minutesDue}`

  const formData = new FormData()
  formData.append('contact_id', values.contact_id)
  formData.append('sup_refe', values.sup_refe)
  formData.append('location_id', 1)
  formData.append('exchange_rate', 1)
  formData.append('transaction_date', formattedTransDate)
  formData.append('pay_term_type', formattedDueDate)
  formData.append('status', values.status)
  formData.append('cost_center_id', values.cost_center_id)
  formData.append('currency_id', values.currency_id)
  formData.append('currency_id_amount', values.currency_id_amount)
  formData.append('store_id', values.store_id)
  formData.append('project_no', values.project_no)
  formData.append('dis_type', 1)
  formData.append('list_price', values.parent_price)
  formData.append('total_before_tax', values.sub_total)
  formData.append('total_before_tax_cur', values.sub_total_curr)
  formData.append('discount_type', values.discount_type)
  formData.append('discount_amount', values.discount_amount)
  formData.append('tax_id', values.tax)
  formData.append('shipping_details', values.shipping_details)
  formData.append('final_total', values.final_total)
  formData.append('final_total_hidden_', values.final_total)
  formData.append('additional_notes', values.additional_notes)
  formData.append('ADD_SHIP', values.additional_supplier_charges)
  formData.append('ADD_SHIP_', values.additional_cost_charges)
  formData.append('tax_amount', values.tax_final)
  formData.append('add_currency_id', values.expense_currency_id)
  formData.append('add_currency_id_amount', values.expense_currency_id_amount)

  if (values.expense && values.expense.length > 0) {
    values.expense.forEach((item, index) => {
      let yearShipping = item.date.getFullYear()
      let monthShipping = String(item.date.getMonth() + 1).padStart(2, '0')
      let dayShipping = String(item.date.getDate()).padStart(2, '0')

      const formattedShippingDate = `${yearShipping}-${monthShipping}-${dayShipping}`

      formData.append(`shipping_contact_id[${index}]`, item.supplier)
      formData.append(`shipping_amount[${index}]`, item.amount)
      formData.append(`shipping_vat[${index}]`, item.vat)
      formData.append(`shipping_total[${index}]`, item.total)
      formData.append(`shipping_total_curr[${index}]`, item.total_curr)
      formData.append(`shipping_vat_curr[${index}]`, item.vat_curr)
      formData.append(`shipping_amount_curr[${index}]`, item.amount_curr)
      formData.append(`shiping_text[${index}]`, item.note)
      formData.append(`shipping_account_id[${index}]`, item.debit)
      formData.append(`shipping_cost_center_id[${index}]`, item.cost_center)
      formData.append(`shipping_date[${index}]`, formattedShippingDate)
      formData.append(`line_currency_id[${index}]`, item.currency_id)
      formData.append(`line_currency_id_amount[${index}]`, item.currency_id_amount)
    })
  }

  if (values.currency_id) {
    formData.append('depending_curr', 'on')
    formData.append('dis_currency', 1)
  }

  if (values.items && values.items.length > 0) {
    values.items.forEach((item, index) => {
      const pp_with_tax_new_currency =
        Number(item.unit_price_before_dis_curr) + Number(item.unit_price_before_dis_curr) / Number(values.tax_value)
      const total_cost_dis_new_currency = Number(item.unit_price_after_dis_curr)
      const total_unit_cost_with_tax_new_currency =
        Number(item.unit_price_after_dis_curr) + Number(item.unit_price_after_dis_curr) / Number(values.tax_value)
      formData.append(`line_sort[${index}]`, item.line_sort)
      formData.append(`purchases[${index}][quantity]`, item.quantity)
      formData.append(`purchases[${index}][product_id]`, item.product_id)
      formData.append(`purchases[${index}][variation_id]`, item.variation_id)
      formData.append(`purchases[${index}][product_unit_id]`, item.unit_quantity)
      formData.append(`purchases[${index}][sub_unit_id]`, item.unit)
      formData.append(`purchases[${index}][pp_without_discount_s]`, item.unit_price_before_dis)
      formData.append(`purchases[${index}][pp_without_discount]`, item.unit_price_before_dis)
      formData.append(`purchases[${index}][list_price]`, item.child_price)
      formData.append(`purchases[${index}][purchase_note]`, item.description)
      formData.append(`purchases[${index}][pp_with_tax]`, item.unit_price_before_dis_include_vat)
      formData.append(`purchases[${index}][pp_new_currency]`, item.unit_price_before_dis_curr)
      formData.append(`purchases[${index}][pp_with_tax_new_currency]`, pp_with_tax_new_currency)
      formData.append(`purchases[${index}][discount_percent]`, item.amount_discount)
      formData.append(`purchases[${index}][purchase_price]`, item.unit_price_after_dis)
      formData.append(`purchases[${index}][unit_cost_after_tax]`, item.unit_price_after_dis_include_vat)
      formData.append(`purchases[${index}][total_cost_dis_new_currency]`, total_cost_dis_new_currency)
      formData.append(`purchases[${index}][item_tax]`, Number(values.tax))
      formData.append(`purchases[${index}][line_sort]`, item.line_sort)
      formData.append(`purchases[${index}][mfg_date]`, item.mfg_date)
      formData.append(`purchases[${index}][exp_date]`, item.exp_date)
      formData.append(
        `purchases[${index}][total_unit_cost_with_tax_new_currency]`,
        total_unit_cost_with_tax_new_currency
      )
    })
  }

  // ** files and media
  if (values.attachment && values.attachment.length > 0) {
    values.attachment.forEach((file, index) => {
      formData.append(`document[${index}]`, file)
    })
  }
  if (values.expense_attachment && values.expense_attachment.length > 0) {
    values.attachment.forEach((file, index) => {
      formData.append(`document_expense[${index}]`, file)
    })
  }

  try {
    const response = await axios.post(`${url}/app/react/purchase/save`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
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
const postCreatePurchaseSlice = createSlice({
  name: 'createPurchase',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createPurchase.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Purchase successfully stored.', 'success')
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.error = action.error.message
        notify('There is an error try again later', 'error')
      })
  }
})

export default postCreatePurchaseSlice.reducer
