// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null
}

// Define an async thunk for deleting a user
export const deleteSPGroup = createAsyncThunk('dashboard/deleteSPGroup', async payload => {
  const { id, token } = payload
  const url = getCookie('apiUrl')

  const response = await axios.post(
    `${url}/app/react/sales-price-group/del/${id}`,
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
const postDeleteSPGroupSlice = createSlice({
  name: 'deleteSPGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteSPGroup.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteSPGroup.fulfilled, (state, action) => {
        notify('Sale Price Group successfully deleted.', 'success')
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteSPGroup.rejected, (state, action) => {
        notify('There was an error try again later!', 'error')
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeleteSPGroupSlice.reducer
