'use client'

// hooks/useCreateUser.js
// import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchEditVariations } from 'src/store/apps/products/variations/getEditVariationsSlice'
import { fetchVariations } from 'src/store/apps/products/variations/getVariationsSlice'
import { postEditVariations } from 'src/store/apps/products/variations/postEditVariationsSlice'

// import { useSelector } from 'react-redux'

const useSubmitEdit = () => {
  // const [dataList, setDataList] = useState(null)
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const dispatch = useDispatch()

  // const store = useSelector(state => state.getEditVariations?.data?.value[0].list)

  // useEffect(() => {
  //   if (store) {
  //     setDataList(store)
  //   }
  // }, [store])

  const handleSubmitEdit = async (userData, id, datalist) => {
    console.log('id from handleSubmitEdit Variation', id)
    console.log('data list old from handleSubmitEdit Variation', datalist)
    console.log('userData from handleSubmitEdit Variation', userData)
    if (id) {
      dispatch(postEditVariations({ id, userData, oldList: datalist }))
        .then(() => {
          dispatch(fetchVariations(token, url))
          dispatch(fetchEditVariations({ itemId: id }))
        })
        .catch(error => {
          console.error('There is an Error try again later!', error)
        })
    }
  }

  return { handleSubmitEdit }
}

export default useSubmitEdit
