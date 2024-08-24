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

export const fetchOpeningStock = createAsyncThunk('Product/fetchAddOpeningStock', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const { month, weak, day, startDate, endDate } = payload
  let mainUrl = `${url}/app/react/opening-quantity/all`

  if (startDate && endDate) {
    // ** Date format: YYYY-MM-DD
    let yearStart = String(startDate.getFullYear())
    let monthStart = String(startDate.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayStart = String(startDate.getDate()).padStart(2, '0')
    let yearEnd = String(endDate.getFullYear())
    let monthEnd = String(endDate.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayEnd = String(endDate.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedStart = `${yearStart}-${monthStart}-${dayStart}`
    let formattedEnd = `${yearEnd}-${monthEnd}-${dayEnd}`
    mainUrl = `${url}/app/react/opening-quantity/all?startDate=${formattedStart}&endDate=${formattedEnd}`
  } else if (month) {
    // ** Date format: YYYY-MM-DD

    let yearMonth = String(month.getFullYear())
    let monthMonth = String(month.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayMonth = String(month.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedMonth = `${yearMonth}-${monthMonth}-${dayMonth}`

    mainUrl = `${url}/app/react/opening-quantity/all?month=${formattedMonth}`
  } else if (weak) {
    // ** Date format: YYYY-MM-DD
    let yearWeak = String(weak.getFullYear())
    let monthWeak = String(weak.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayWeak = String(weak.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedWeak = `${yearWeak}-${monthWeak}-${dayWeak}`
    mainUrl = `${url}/app/react/opening-quantity/all?week=${formattedWeak}`
  } else if (day) {
    // ** Date format: YYYY-MM-DD
    let yearDay = String(day.getFullYear())
    let monthDay = String(day.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayDay = String(day.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedDay = `${yearDay}-${monthDay}-${dayDay}`
    mainUrl = `${url}/app/react/opening-quantity/all?day=${formattedDay}`
  }

  try {
    const response = await axios.get(`${mainUrl}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
})

// Create a Redux slice
const getListSlice = createSlice({
  name: 'opening quantity',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOpeningStock.pending, state => {
        state.loading = true
        state.error = null
        state.msg = 'pending'
      })
      .addCase(fetchOpeningStock.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.status = action.payload.status
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(fetchOpeningStock.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.msg = 'There is an Error fetching data'
        state.error = action.error.message
      })
  }
})

export default getListSlice.reducer
