'use client'
import { useState } from 'react'
import React from 'react'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import Filter from 'src/views/custom/Filter/Filter'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import useFetch from 'src/utils/useFetch'

const Purchases = () => {
  const [typeofData, setTypeofData] = useState('today')
  const { dataAnalytics } = useFetch(typeofData)

  const handleChangeTypeofData = e => {
    setTypeofData(e)
    console.log(e, 'e from purchases')
  }

  return (
    <ApexChartWrapper>
      <div style={{ paddingBottom: '20px' }}>
        <Filter handleOptionSelect={handleChangeTypeofData} typeofData={typeofData} />
      </div>

      {dataAnalytics !== null ? <TableFilter title='Purchase' TableData={dataAnalytics} /> : <ProgressCustomization />}
    </ApexChartWrapper>
  )
}

export default Purchases
