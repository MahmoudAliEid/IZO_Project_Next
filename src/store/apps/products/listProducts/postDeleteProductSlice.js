// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null
}

// Define an async thunk for deleting a user
export const deleteProduct = createAsyncThunk('dashboard/deleteProduct', async payload => {
  const { id, token } = payload

  console.log('payload from delete', payload)
  const response = await axios.post(
    `https://test.izocloud.net/api/app/react/products/del/${id}`,
    {}, // pass an empty object as the second argument if no data is being sent in the request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
  const data = response.data

  return data
})

// Create a Redux slice
const postDeleteProductSlice = createSlice({
  name: 'deleteProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteProduct.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log('payload action from delete', action)
        notify('Unit successfully deleted.', 'success')
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log('rejected action from delete', action)
        notify('There was an error try again later!', 'error')
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeleteProductSlice.reducer
