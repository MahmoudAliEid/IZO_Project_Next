import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// Async Thunk Action for storing user
export const postEditVariations = createAsyncThunk('dashboard/postEditVariations', async payload => {
  const token = getCookie('token') // Get the token inside the async function
  const { id, userData, oldList } = payload
  console.log(token, id, userData, oldList, '===> token, id,userData,oldList, Post Edit variations slice')

  if (
    token !== undefined &&
    id !== null &&
    id !== undefined &&
    token !== null &&
    userData !== undefined &&
    userData !== null
  ) {
    const formData = new FormData()
    formData.append('name', userData.name || '')

    const arrOfOldVariations = []

    // Append each item individually to the FormData
    if (userData.items && Array.isArray(userData.items)) {
      userData.items.forEach(item => {
        formData.append('items[]', item)
        console.log(item, 'item form new items variations')
      })
    }

    // Append each old item individually to the FormData
    if (Array.isArray(oldList) && oldList.length) {
      oldList.forEach(item => {
        formData.append(`old_items[${item.id}]`, item.name || '')
        arrOfOldVariations.push({ name: `old_items[${item.id}]`, item: item.name })
      })
    } else if (!oldList && oldList.length === 0 && oldList === null && oldList === '') {
      formData.append(`old_items[]`, [])
    }

    console.log(
      formData,
      userData,
      arrOfOldVariations,
      '===> formData, userData ,arrOfOldVariations variations Edit slice'
    )

    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      'Content-Type': ' multipart/form-data'
    }

    const response = await axios.post(`https://test.izocloud.net/api/app/react/variations/update/${id}`, formData, {
      headers // Pass the headers to the Axios request
    })

    console.log(response, '===> from post Edit variations slice ')

    return response.data
  }
})

// Define the user slice
const postEditVariationsSlice = createSlice({
  name: 'postEditVariations',
  initialState: {
    loading: false,
    error: null,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postEditVariations.pending, state => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(postEditVariations.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        console.log(action.payload)
        notify('Variations Updated successfully', 'success')
      })
      .addCase(postEditVariations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        if (action.payload && action.payload.message) {
          console.log(action.payload.message, 'form update variation')
          notify(action.payload.message, 'error')
        } else {
          console.log('Unknown error occurred in form Update variation:', action.payload)
          notify('An unknown error occurred', 'error')
        }
      })
  }
})

export default postEditVariationsSlice.reducer
