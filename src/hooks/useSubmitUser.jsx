'use client'

// hooks/useCreateUser.js
import { useDispatch } from 'react-redux'
import { getCookie } from 'cookies-next'

const useSubmitUser = () => {
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const dispatch = useDispatch()

  const handleSubmitData = async (mainFunPost, mainFunGet, userData, itemId) => {
    console.log('itemId from handleSubmitData', itemId)
    if (itemId) {
      dispatch(mainFunPost({ userData, itemId }))
        .then(() => {
          dispatch(mainFunGet({ token, url }))
        })
        .catch(error => {
          console.error('There is an Error try again later!', error)
        })
    } else {
      dispatch(mainFunPost(userData))
        .then(() => {
          dispatch(mainFunGet({ token, url }))
        })
        .catch(error => {
          console.error('There is an Error try again later!', error)
        })
    }
  }

  return { handleSubmitData }
}

export default useSubmitUser
