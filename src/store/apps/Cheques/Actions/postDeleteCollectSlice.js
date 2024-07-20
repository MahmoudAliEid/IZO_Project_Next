// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notify from 'src/utils/notify'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null
}

// Define an async thunk for deleting a user
export const deleteCollect = createAsyncThunk('dashboard/cheques/deleteCollect', async payload => {
  const url = getCookie('apiUrl')
  const token = getCookie('token')

  try {
    const { id } = payload

    const response = await axios.get(
      `${url}/app/react/cheque/delete-collect/${id}`,

      {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      }
    )
    const data = response.data
    notify(' Cheques successfully deleted.', 'success')

    return data
  } catch (error) {
    notify('There was an error, try again later!', 'error')
    throw error
  }
})

// Create a Redux slice
const postDeleteCollectSlice = createSlice({
  name: 'DeleteCollect',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteCollect.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCollect.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(deleteCollect.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default postDeleteCollectSlice.reducer
