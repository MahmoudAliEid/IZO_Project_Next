// ** Create Custom Hook to fetching data
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchViewUser } from 'src/store/apps/izoUsers/viewUserSlice'

const useFetchView = id => {
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const dataFetch = useSelector(state => state.viewUser.data)

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // ** Fetch data from redux
  useEffect(() => {
    if (token && url && id) {
      dispatch(fetchViewUser({ token, url, id }))
    }
  }, [token, url, id, dispatch])

  useEffect(() => {
    setData(dataFetch)
  }, [dataFetch])

  return { data }
}

export default useFetchView
