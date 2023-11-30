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
export const deleteUnit = createAsyncThunk('dashboard/deleteUnit', async payload => {
  const { id, token } = payload

  console.log('payload from delete', payload)
  const response = await axios.post(
    `https://test.izocloud.net/api/app/react/units/del/${id}`,
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
        state.error = null
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        console.log('payload action from delete', action)
        notify('Unit successfully deleted.', 'success')
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        console.log('rejected action from delete', action)
        notify('There was an error try again later!', 'error')
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeleteUnitSlice.reducer
