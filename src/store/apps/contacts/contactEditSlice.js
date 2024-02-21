import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Initial state
const initialState = {
  contact: {},
  status: 'idle',
  error: null
}

// Async thunk action
export const fetchContactData = createAsyncThunk(
  'contactEdit/fetchContactData',
  async (contactId, { rejectWithValue }) => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    try {
      const response = await axios.get(`${url}/app/react/contact/edit/${contactId.itemId}`, {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })

      return response.data.response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Slice
export const contactEditSlice = createSlice({
  name: 'contactEdit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContactData.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.contact = action.payload
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default contactEditSlice.reducer
