// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: [],
  loading: true,
  error: false,
  success: false
}

// Define an async thunk for deleting a user
export const deleteUnit = createAsyncThunk('dashboard/deleteUnit', async payload => {
  const { id, token } = payload
  const url = getCookie('apiUrl')

  const response = await axios.post(
    `${url}/app/react/units/del/${id}`,
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
const postDeleteUnitSlice = createSlice({
  name: 'deleteVariation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteUnit.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        notify('Unit successfully deleted.', 'success')
        state.data = action.payload
        state.loading = false
        state.error = false
        state.success = true
      })
      .addCase(deleteUnit.rejected, state => {
        notify('There was an error try again later!', 'error')
        state.loading = false
        state.success = false
        state.error = true
      })
  }
})

export default postDeleteUnitSlice.reducer
