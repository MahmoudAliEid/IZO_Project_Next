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

const Sales = () => {
  const [dataAnalytics, setDataAnalytics] = useState(null)
  const [typeofData, setTypeofData] = useState('today')

  const dispatch = useDispatch()
  const data = useSelector(state => state.dashboardAnalytics.data)

  // get data from redux
  useEffect(() => {
    dispatch(fetchDataAnalytics({ typeofData }))
  }, [typeofData, dispatch])

  useEffect(() => {
    setDataAnalytics(data)

    // console.log('user data from purchase', data)
  }, [data])

  const handleChangeTypeofData = e => {
    setTypeofData(e)
    console.log(e, 'e from purchases')
  }

  return (
    <ApexChartWrapper>
      <div style={{ paddingBottom: '20px' }}>
        <Filter handleOptionSelect={handleChangeTypeofData} teypeofData={typeofData} />
      </div>

      {dataAnalytics !== null ? (
        <TableFilter UserData={dataAnalytics?.UserData} title='Sale' TableData={dataAnalytics} />
      ) : (
        <ProgressCustomization />
      )}
    </ApexChartWrapper>
  )
}

export default Sales
