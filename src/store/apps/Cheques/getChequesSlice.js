import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk for fetching the data
export const fetchCheques = createAsyncThunk('Cheques/fetchCheques', async payload => {
  const { token, url, startWriteDate, endWriteDate, startDueDate, endDueDate } = payload

  // Extract the date components
  let yearStartWriteDate = startWriteDate.getFullYear()
  let monthStartWriteDate = String(startWriteDate.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayStartWriteDate = String(startWriteDate.getDate()).padStart(2, '0')

  let yearEndWriteDate = endWriteDate.getFullYear()
  let monthEndWriteDate = String(endWriteDate.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayEndWriteDate = String(endWriteDate.getDate()).padStart(2, '0')

  let yearStartDueDate = startDueDate.getFullYear()
  let monthStartDueDate = String(startDueDate.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayStartDueDate = String(startDueDate.getDate()).padStart(2, '0')

  let yearEndDueDate = endDueDate.getFullYear()
  let monthEndDueDate = String(endDueDate.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  let dayEndDueDate = String(endDueDate.getDate()).padStart(2, '0')

  // Format the date
  let formattedStartWriteDate = `${yearStartWriteDate}-${monthStartWriteDate}-${dayStartWriteDate}`
  let formattedEndWriteDate = `${yearEndWriteDate}-${monthEndWriteDate}-${dayEndWriteDate}`
  let formattedStartDueDate = `${yearStartDueDate}-${monthStartDueDate}-${dayStartDueDate}`
  let formattedEndDueDate = `${yearEndDueDate}-${monthEndDueDate}-${dayEndDueDate}`
  const mainUrl =
    startWriteDate && endWriteDate && startDueDate && endDueDate
      ? `${url}/app/react/cheque/all?writeDateFrom=${formattedStartWriteDate}&writeDateTo=${formattedEndWriteDate}&dueDateFrom=${formattedStartDueDate}&dueDateTo=${formattedEndDueDate}`
      : `${url}/app/react/cheque/all`

  console.log(mainUrl, 'mainUrl form cheques slice 😏🙄😶😑😐')

  const response = await axios.get(`${url}/app/react/cheque/all`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })

  console.log(response.data, 'response.data form cheques slice 😋😋😋')

  return response.data
})

// Initial state
const initialState = {
  brands: [],
  status: 'idle',
  error: null
}

// Slice
const getChequesSlice = createSlice({
  name: 'Cheques',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCheques.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCheques.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brands = action.payload
      })
      .addCase(fetchCheques.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getChequesSlice.reducer
