import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Next Imports
import { getCookie } from 'cookies-next'
// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchPurchases = createAsyncThunk('dashboard/fetchPurchases', async payload => {
  const url = getCookie('apiUrl')
  const { token, query } = payload

  if (query) {
    const response = await axios.get(`${url}${query}`, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })

    const data = response.data

    return data
  } else {
    const response = await axios.get(`${url}/app/react/purchase/all`, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      }
    })
    const data = response.data

    return data
  }
})

// Create a Redux slice
const getPurchasesSlice = createSlice({
  name: 'fetchPurchases',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPurchases.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getPurchasesSlice.reducer
