// ** Create Custom Hook to fetching data
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchDataAnalytics } from 'src/store/apps/dashboard/dashboardSlice.js'

const useFetch = typeofData => {
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [dataAnalytics, setDataAnalytics] = useState(null)
  const dispatch = useDispatch()
  const data = useSelector(state => state.dashboardAnalytics.data)

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // ** Fetch data from redux
  useEffect(() => {
    if (token && url) {
      dispatch(fetchDataAnalytics({ token, url, typeofData }))
    }
  }, [token, url, typeofData, dispatch])

  useEffect(() => {
    setDataAnalytics(data)
  }, [data])

  return { dataAnalytics }
}

export default useFetch
