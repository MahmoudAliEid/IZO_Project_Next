/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// hooks/useCreateUser.js
import { useDispatch } from 'react-redux'
import { storeUser } from 'src/store/apps/izoUsers/storeUserSlice.js'

const useCreateUser = () => {
  const dispatch = useDispatch()
  const storeNewUser = async userData => {
    dispatch(storeUser(userData))
  }

  return { storeNewUser }
}

export default useCreateUser
