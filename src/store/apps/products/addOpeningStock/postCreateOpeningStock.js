import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: false,
  success: false
}

export const createOpeningStock = createAsyncThunk('products/addOpeningStock/createOpeningStock', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { values } = payload

  // Extract the date components
  let year = values.date.getFullYear()
  let month = String(values.date.getMonth() + 1).padStart(2, '0')
  let day = String(values.date.getDate()).padStart(2, '0')

  // Format the date
  let formattedDate = `${year}/${month}/${day}`

  const dataToSubmit = {
    date: formattedDate,
    store: values?.store,
    list_price: values.parent_price,
    items: values?.items.map((item, index) => ({
      line_sorting: index,
      line_store: item.store ? item.store : values?.store,
      product_id: item.product_id,
      quantity: Number(item.quantity),
      price: Number(item.price),
      unit_id: item.unit,
      list_price: item.child_price
    }))
  }

  const response = await axios.post(`${url}/app/react/opening-quantity/save`, dataToSubmit, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  return response.data
})

const postCreateOpeningStock = createSlice({
  name: 'postCreateOpeningStock',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOpeningStock.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(createOpeningStock.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Successfully stored.', 'success')
      })
      .addCase(createOpeningStock.rejected, state => {
        state.loading = false
        state.success = false
        state.error = true
        notify('There is an error try again later', 'error')
      })
  }
})

export default postCreateOpeningStock.reducer
