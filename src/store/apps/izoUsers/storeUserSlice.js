'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

const token = getCookie('token')

// Async Thunk Action for storing user
export const storeUser = createAsyncThunk('user/storeUser', async (userData, { rejectWithValue }) => {
  console.log(userData, '===> userData from storeUser')

  // this function is used format the data to be sent to the server like this 1992-09-10
  const formatDate = (userData, key) => {
    if (userData[key] !== undefined && userData[key] !== null) {
      const date = userData[key]
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`

      return formattedDate
    } else {
      return ''
    }
  }

  const convertToStringArray = arr => {
    const newArr = JSON.stringify(arr).replace(/\d+/g, s => `"${s}"`)
    console.log(newArr, '===> newArr from convertToStringArray')

    return newArr
  }

  const formData = new FormData()

  // Add each field to the FormData object
  formData.append('business_id', userData.business_id || '')
  formData.append('surname', userData.prefix || '')
  formData.append('first_name', userData.firstName || '')
  formData.append('last_name', userData.lastName || '')
  formData.append('email', userData.email || '')
  formData.append('is_active', userData.isActive ? (userData.isActive === true ? '1' : '0') : '0')
  formData.append('user_visa_account_id', userData.visa || '')
  formData.append('user_agent_id', userData.agents || '')
  formData.append('user_cost_center_id', userData.cost_center || '')
  formData.append('user_store_id', userData.warehouse || '')
  formData.append('user_account_id', userData.accounts || '')
  formData.append('user_pattern_id', userData.userPattern || '')
  formData.append('allow_login', userData.allowlogin ? (userData.allowlogin === true ? '1' : '0') : '0')
  formData.append('username', userData.username || '') // username must be unique
  formData.append('password', userData.password || '')
  formData.append('confirm_password', userData.confirmPassword || '')
  formData.append('role', userData.roles || '1')
  if (userData.allLocations === true) {
    formData.append('access_all_locations', 'access_all_locations')
  }

  // userData.allLocations && formData.append('access_all_locations', 'access_all_locations')
  formData.append('location_permissions', userData.allLocations ? '[]' : JSON.stringify(userData.location_permissions))
  formData.append('cmmsn_percent', userData.salesCommission || '')
  formData.append('max_sales_discount_percent', userData.maxSalesDiscount || '')
  formData.append(
    'pattern_id',
    userData.patternList ? convertToStringArray(userData.patternList) : convertToStringArray([]) || '[]'
  )
  formData.append(
    'selected_contacts',
    userData.allowSlctdContacts ? (userData.allowSlctdContacts === true ? '1' : '0') : '0'
  )
  formData.append('selected_contact_ids', JSON.stringify(userData.selectedContact) || '[]')

  // send date in this format 1992-09-10
  formData.append('dob', formatDate(userData, 'dateOfBirth') || '')

  formData.append('gender', userData.gender || '')
  formData.append('marital_status', userData.marital || '')
  formData.append('blood_group', userData.bloodGroup || '')
  formData.append('contact_number', userData.mobileNumber || '')
  formData.append('alt_number', userData.alternativeMobileNumber || '')
  formData.append('family_number', userData.familyContactNumber || '')
  formData.append('fb_link', userData.facebookLink || '')
  formData.append('twitter_link', userData.twitterLink || '')
  formData.append('social_media_1', userData.socialMedia1 || '')
  formData.append('social_media_2', userData.socialMedia2 || '')
  formData.append('custom_field_1', userData.customField1 || '')
  formData.append('custom_field_2', userData.customField2 || '')
  formData.append('custom_field_3', userData.customField3 || '')
  formData.append('custom_field_4', userData.customField4 || '')
  formData.append('guardian_name', userData.guardianName || '')
  formData.append('id_proof_name', userData.idProofName || '')
  formData.append('id_proof_number', userData.idProofNumber || '')
  formData.append('permanent_address', userData.permanentAddress || '')
  formData.append('current_address', userData.currentAddress || '')
  formData.append('bank_details[account_holder_name]', userData.holderName || '')
  formData.append('bank_details[account_number]', userData.accountNumber || '')
  formData.append('bank_details[bank_name]', userData.bankName || '')
  formData.append('bank_details[bank_code]', userData.bankIdentifierCode || '')
  formData.append('bank_details[branch]', userData.bankBranchName || '')
  formData.append('bank_details[tax_payer_id]', userData.taxPayerId || '')
  formData.append('user_tax_id', userData.taxesItem || '')

  let object = Object.fromEntries(formData)
  console.log(object, '===> formData from as object 👀')

  console.log(formData, 'formData from  add  user slice')
  try {
    console.log(token, '===> token from STORE USER')
    if (token !== undefined && token !== null && userData !== undefined && userData !== null) {
      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json'
      }

      const response = await axios.post('https://test.izocloud.net/api/app/react/users/store', formData, {
        headers // Pass the headers to the Axios request
      })
      console.log(response, '===>  from STORE USER')
      if (response.status === 200) {
        notify('user created successfully', 'success')
      }

      return response.data
    }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// Define the user slice
const storeUserSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    data: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(storeUser.pending, state => {
        state.loading = true
        state.error = null
        state.data = null
      })
      .addCase(storeUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(storeUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        notify('There is an Error try again later', 'error')
      })
  }
})

export default storeUserSlice.reducer
