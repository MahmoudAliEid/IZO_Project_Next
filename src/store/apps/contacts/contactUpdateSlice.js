import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const initialState = {
  data: null,
  loading: false,
  error: false,
  success: false
}

export const updateContact = createAsyncThunk('contactUpdate/updateContact', async (payload, { rejectWithValue }) => {
  const { updateData, id } = payload

  try {
    // rest of your code
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    const response = await axios.post(`${url}/app/react/contact/update/${id}`, updateData, {
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const contactUpdateSlice = createSlice({
  name: 'contactUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateContact.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.data = null
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = false
        state.data = action.payload
        notify('Contact updated successfully', 'success')
      })
      .addCase(updateContact.rejected, state => {
        state.loading = false
        state.error = true
        state.success = false
        notify('There is an Error try again later', 'error')
      })
  }
})

export default contactUpdateSlice.reducer
