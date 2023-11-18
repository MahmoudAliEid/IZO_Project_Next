import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { getCookie } from 'cookies-next'

// Step 2: Create an async thunk
export const fetchCreateContactData = createAsyncThunk('contact/fetchCreateContactData', async type => {
  const token = getCookie('token')
  console.log(token, '===> token from fetchSupplierData')
  const response = await axios.get('https://test.izocloud.net/api/app/react/contact/create?type=' + `${type}`, {
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
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    // Step 5: Define reducers
    builder
      .addCase(fetchCreateContactData.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCreateContactData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchCreateContactData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default contactCreateSlice.reducer
