'use client'

// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Define the initial state
const initialState = {
  data: null,
  status: '',
  loading: false,
  msg: '',
  error: null
}

export const fetchViewContact = createAsyncThunk('dashboard/fetchViewContact', async payload => {
  const { token, id, startDate, endDate } = payload

  function convertDateFormat(inputDate) {
    // Split the input date using '/'
    var dateParts = inputDate.split('/')

    // Extract day, month, and year
    var day = dateParts[1]
    var month = dateParts[0]
    var year = dateParts[2]

    // Ensure single-digit month and day have leading zeros
    if (month.length === 1) {
      month = '0' + month
    }

    if (day.length === 1) {
      day = '0' + day
    }

    // Form the converted date string in the desired format
    var convertedDate = year + '-' + month + '-' + day

    return convertedDate
  }
  const start_date = convertDateFormat(startDate)
  const end_date = convertDateFormat(endDate)

  try {
    const url = getCookie('apiUrl')
    const response = await axios.get(
      `${url}/app/react/contact/view/${id}?start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      }
    )

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const getViewContactSlice = createSlice({
  name: 'fetchViewContact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchViewContact.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchViewContact.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchViewContact.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getViewContactSlice.reducer
