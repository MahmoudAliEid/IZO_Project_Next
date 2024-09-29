import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export const fetchExpenseVoucher = createAsyncThunk('expenseVoucher/fetchExpenseVoucher', async payload => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  const { month, week, day, startDate, endDate } = payload
  let mainUrl = `${url}/app/react/expense-voucher/all`

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
    mainUrl = `${url}/app/react/expense-voucher/all?startDate=${formattedStart}&endDate=${formattedEnd}`
  } else if (month) {
    // ** Date format: YYYY-MM-DD

    let yearMonth = String(month.getFullYear())
    let monthMonth = String(month.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayMonth = String(month.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedMonth = `${yearMonth}-${monthMonth}-${dayMonth}`

    mainUrl = `${url}/app/react/expense-voucher/all?month=${formattedMonth}`
  } else if (week) {
    // ** Date format: YYYY-MM-DD
    let yearWeek = String(week.getFullYear())
    let monthWeek = String(week.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayWeek = String(week.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedWeek = `${yearWeek}-${monthWeek}-${dayWeek}`
    mainUrl = `${url}/app/react/expense-voucher/all?week=${formattedWeek}`
  } else if (day) {
    // ** Date format: YYYY-MM-DD
    let yearDay = String(day.getFullYear())
    let monthDay = String(day.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    let dayDay = String(day.getDate()).padStart(2, '0')

    // ** Normal Format
    let formattedDay = `${yearDay}-${monthDay}-${dayDay}`
    mainUrl = `${url}/app/react/expense-voucher/all?day=${formattedDay}`
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
// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null
}
const getExpenseVoucher = createSlice({
  name: 'expenseVoucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExpenseVoucher.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchExpenseVoucher.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchExpenseVoucher.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getExpenseVoucher.reducer
