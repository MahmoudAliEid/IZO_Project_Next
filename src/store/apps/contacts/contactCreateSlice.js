import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { getCookie } from 'cookies-next'

// Step 2: Create an async thunk
export const fetchCreateContactData = createAsyncThunk('contact/fetchCreateContactData', async type => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const response = await axios.get(`${url}/app/react/contact/create?type=` + `${type}`, {
    headers: {
      Authorization: 'Bearer ' + `${token}`
    }
  })

  return response.data.response
})

// Step 3: Create a slice
const contactCreateSlice = createSlice({
  name: 'createContact',

  // Step 4: Define the initial state
  initialState: {
    data: {},
    loading: false,
    error: false,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    // Step 5: Define reducers
    builder
      .addCase(fetchCreateContactData.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(fetchCreateContactData.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
      })
      .addCase(fetchCreateContactData.rejected, state => {
        state.loading = false
        state.success = false
        state.error = true
      })
  }
})

export default contactCreateSlice.reducer
