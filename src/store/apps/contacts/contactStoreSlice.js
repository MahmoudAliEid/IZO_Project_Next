import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'
import { fetchCreateContactData } from './contactCreateSlice'

// Initial state
const initialState = {
  contact: {},
  status: 'idle',
  error: null
}

const formatDate = dateString => {
  let date = new Date(dateString)
  let day = ('0' + date.getDate()).slice(-2)
  let month = ('0' + (date.getMonth() + 1)).slice(-2)
  let year = date.getFullYear()
  console.log(year + '-' + month + '-' + day, '🔥🔥🔥🔥🔥🔥🔥🔥🔥')

  return year + '-' + month + '-' + day
}

// Async thunk action
export const saveNewContact = createAsyncThunk('contactStore/saveNewContact', async (contact, { rejectWithValue }) => {
  const token = getCookie('token')
  console.log(contact, 'contact from contactStoreSlice')
  try {
    // change date of object contact
    const newContact = {
      ...contact,
      dob: formatDate(contact.dob)
    }

    console.log(newContact, 'newContact from contactStoreSlice ✨✨')

    const response = await axios.post('https://test.izocloud.net/api/app/react/contact/save', newContact, {
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    // Assuming fetchCreateContactData is an async function that returns a Promise
    async function updateContactCreateSlice(contact) {
      const response = await fetchCreateContactData(contact)
      if (response.status === 200) {
        await fetchCreateContactData(contact)
      }
    }

    updateContactCreateSlice(contact)
    console.log(response.data, 'response.data from contactStoreSlice')

    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// Slice
export const contactStoreSlice = createSlice({
  name: 'contactStore',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveNewContact.pending, state => {
        state.status = 'loading'
      })
      .addCase(saveNewContact.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.contact = action.payload
        notify('Contact created successfully', 'success')
      })
      .addCase(saveNewContact.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        notify('There is an Error try again later', 'error')
      })
  }
})

export default contactStoreSlice.reducer
