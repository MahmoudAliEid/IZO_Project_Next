'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import { getCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import { fetchDataAnalytics } from 'src/store/apps/dashboard/dashboardSlice.js'
import Filter from 'src/views/custom/Filter/Filter'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Purchases = () => {
  const [dataAnalytics, setDataAnalytics] = useState(null)
  const [typeofData, setTypeofData] = useState('today')
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const data = useSelector(state => state.dashboardAnalytics.data)

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    //@ts-ignore
    setToken(token)

    //@ts-ignore
    setUrl(url)
  }, [token, url])

  // get data from redux
  useEffect(() => {
    if (token && url) {
      //@ts-ignore
      dispatch(fetchDataAnalytics({ token, url, typeofData }))
    }
  }, [token, url, typeofData, dispatch])

  useEffect(() => {
    setDataAnalytics(data)
  }, [data])

  const handleChangeTypeofData = e => {
    setTypeofData(e)
  }

  return (
    <ApexChartWrapper>
      <div style={{ paddingBottom: '20px' }}>
        <Filter handleOptionSelect={handleChangeTypeofData} />
      </div>

      {dataAnalytics !== null ? (
        <TableFilter UserData={dataAnalytics?.UserData} title='Purchase' />
      ) : (
        <ProgressCustomization />
      )}
    </ApexChartWrapper>
  )
}

export default Purchases
