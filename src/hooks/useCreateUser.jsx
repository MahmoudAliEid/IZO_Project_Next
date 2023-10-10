/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// hooks/useCreateUser.js
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeUser } from 'src/store/apps/izoUsers/storeUserSlice.js'

// type UserData = {
//     surname: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//     is_active: number;
//     user_visa_account_id: number;
//     user_agent_id: number;
//     user_cost_center_id: number;
//     user_store_id: number;
//     user_account_id: number;
//     user_pattern_id: number;
//     allow_login: number;
//     username: string;
//     password: string;
//     confirm_password: string;
//     role: number;
//     access_all_locations: number;
//     location_permissions: number[];
//     cmmsn_percent: number;
//     max_sales_discount_percent: number;
//     pattern_id: number | null;
//     selected_contacts: number;
//     selected_contact_ids: number;
//     dob: string;
//     gender: string;
//     marital_status: string;
//     blood_group: string;
//     contact_number: string;
//     alt_number: string;
//     family_number: string;
//     fb_link: string;
//     twitter_link: string;
//     social_media_1: number;
//     social_media_2: number;
//     custom_field_1: number;
//     custom_field_2: number;
//     custom_field_3: number;
//     custom_field_4: number;
//     guardian_name: string;
//     id_proof_name: string;
//     id_proof_number: string;
//     permanent_address: string;
//     current_address: string;
//     bank_details: {
//         account_holder_name: string;
//         account_number: string;
//         bank_name: string;
//         bank_code: string;
//         branch: string;
//         tax_payer_id: string;
//     };
// };

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const dispatch = useDispatch()
  const data = useSelector(state => state.storeUser.data)

  const storeNewUser = async userData => {
    dispatch(storeUser(userData))
  }

  return { isLoading, error, responseData, storeNewUser }
}

export default useCreateUser
