/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// hooks/useCreateUser.js
import { useDispatch } from 'react-redux'
import { storeUser } from 'src/store/apps/izoUsers/storeUserSlice.js'
import { fetchIzoUsers } from 'src/store/apps/izoUsers/izoUsersSlice'
import { getCookie } from 'cookies-next'

const useCreateUser = () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const dispatch = useDispatch()
  const storeNewUser = async userData => {
    dispatch(storeUser(userData))
      .then(() => {
        dispatch(fetchIzoUsers(token, url))
      })
      .catch(error => {
        console.error('Error adding user:', error)
      })
  }

  return { storeNewUser }
}

export default useCreateUser
