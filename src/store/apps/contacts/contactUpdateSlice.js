import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const initialState = {
  data: null,
  status: 'idle',
  error: null
}

export const updateContact = createAsyncThunk('contactUpdate/updateContact', async (payload, { rejectWithValue }) => {
  const { updateData, id } = payload
  console.log(updateData, 'updateData from contactUpdateSlice 👀')
  console.log(id, 'id from contactUpdateSlice 👍')
  try {
    // rest of your code
    const token = getCookie('token')
    const response = await axios.post(`https://test.izocloud.net/api/app/react/contact/update/${id}`, updateData, {
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
        state.status = 'loading'
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        notify('Contact updated successfully', 'success')
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify('There is an Error try again later', 'error')
      })
  }
})

export default contactUpdateSlice.reducer
