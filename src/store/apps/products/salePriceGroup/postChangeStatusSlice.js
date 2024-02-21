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
export const changeStatusSPGroup = createAsyncThunk('dashboard/changeStatusSPGroup', async payload => {
  const { id, token } = payload
  const url = getCookie('apiUrl')

  const response = await axios.post(
    `${url}/app/react/sales-price-group/active/${id}`,
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
const postChangeStatusSPGroupSlice = createSlice({
  name: 'changeStatusSPGroup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changeStatusSPGroup.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(changeStatusSPGroup.fulfilled, (state, action) => {
        notify('Status Changed Successfully.', 'success')
        state.data = action.payload
        state.loading = false
      })
      .addCase(changeStatusSPGroup.rejected, (state, action) => {
        notify('There was an error try again later!', 'error')
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postChangeStatusSPGroupSlice.reducer
