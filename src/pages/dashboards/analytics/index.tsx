
'use client'

import { useState, useEffect } from "react"
import Filter from "src/views/custom/Filter/Filter";
import React from 'react'

// ** MUI Imports
// import Grid from '@mui/material/Grid'
import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { fetchDataAnalytics } from 'src/store/apps/dashboard/dashboardSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

// ** Demo Component Imports
import AnalyticsOrder from 'src/views/dashboards/analytics/AnalyticsOrder'
import AnalyticsSales from 'src/views/dashboards/analytics/AnalyticsSales'
import AnalyticsCustomCard from 'src/views/dashboards/analytics/AnalyticsCustomCard'
import AnalyticsRevenue from 'src/views/dashboards/analytics/AnalyticsRevenue'
import AnalyticsPayments from 'src/views/dashboards/analytics/AnalyticsPayments'
import AnalyticsProfitReport from 'src/views/dashboards/analytics/AnalyticsProfitReport'
import AnalyticsTotalRevenue from 'src/views/dashboards/analytics/AnalyticsTotalRevenue'
import AnalyticsTransactions from 'src/views/dashboards/analytics/AnalyticsTransactions'
import AnalyticsTabsWithChart from 'src/views/dashboards/analytics/AnalyticsTabsWithChart'
import AnalyticsTabsWithTable from 'src/views/dashboards/analytics/AnalyticsTabsWithTable'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import AnalyticsOrderStatistics from 'src/views/dashboards/analytics/AnalyticsOrderStatistics'
import AnalyticsActivityTimeline from 'src/views/dashboards/analytics/AnalyticsActivityTimeline'
import RatingComponent from '../../../utils/RatingComponent.jsx'
import TableFilter from 'src/views/table/data-grid/TableFilter'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { DashboardAnalytics } from "src/types/apps/rooteState";

type NewLayout = Array<object>
const ResponsiveGridLayout = WidthProvider(Responsive);
type AnalyticsType =
  {
    Status: number
    Message: string
    Type: string
    Report: {
      Sale_section: {
        Sale: number
        Percent: number
      }
      Purchase_section: {
        Purchase: number
        Percent: number
      }
      Expense_section: {
        Expense: string
        Percent: number
      }
    }
    Currency: string
    Profit: {
      Profit: number
    }
  }


const AnalyticsDashboard = () => {
  // ** Declare variables
  const [token, setToken] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [typeofData, setTypeofData] = useState<string>("today")
  const [dataAnalytics, setDataAnalytics] = useState<AnalyticsType>()
  const dispatch = useDispatch()
  const defaultLayout = [{ "w": 8, "h": 5, "x": 0, "y": 0, "i": "1", "moved": false, "static": false }, { "w": 2, "h": 5, "x": 8, "y": 22, "i": "2", "moved": false, "static": false }, { "w": 2, "h": 5, "x": 8, "y": 0, "i": "3", "moved": false, "static": false }, { "w": 7, "h": 12, "x": 3, "y": 40, "i": "4", "moved": false, "static": false }, { "w": 2, "h": 5, "x": 10, "y": 22, "i": "5", "moved": false, "static": false }, { "w": 2, "h": 5, "x": 10, "y": 0, "i": "6", "moved": false, "static": false }, { "w": 4, "h": 5, "x": 0, "y": 22, "i": "7", "moved": false, "static": false }, { "w": 4, "h": 13, "x": 8, "y": 27, "i": "8", "moved": false, "static": false }, { "w": 4, "h": 13, "x": 0, "y": 27, "i": "9", "moved": false, "static": false }, { "w": 4, "h": 13, "x": 4, "y": 22, "i": "10", "moved": false, "static": false }, { "w": 7, "h": 12, "x": 0, "y": 52, "i": "11", "moved": false, "static": false }, { "w": 12, "h": 13, "x": 0, "y": 64, "i": "12", "moved": false, "static": false }, { "w": 11, "h": 17, "x": 0, "y": 5, "i": "13", "moved": false, "static": false }]
  const [layout, setLayout] = useState(defaultLayout);
  const data = useSelector((state: DashboardAnalytics) => state.dashboardAnalytics.data)
  const [showRating, setShowRating] = useState(false);

  // create function to handle change typeofData
  const handleChangeTypeofData = (e: any) => {
    setTypeofData(e)
  }


  // ** use Effects
  useEffect(() => {
    if (data) {
      setDataAnalytics(data);
    }
  }, [data]);

  useEffect(() => {
    const layout = localStorage.getItem("layout");
    const savedLayout = layout ? JSON.parse(layout) : null;
    if (savedLayout) {
      setLayout(savedLayout);
    }
  }, []);

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




  const handleLayoutChange = (newLayout: NewLayout) => {
    console.log(JSON.stringify(newLayout))
    localStorage.setItem("layout", JSON.stringify(newLayout));
  };

  setTimeout(() => {
    setShowRating(true);
  }, 2000);


  return (
    <React.Fragment>
      {showRating && <RatingComponent />}
      <ApexChartWrapper >
        <Filter handleOptionSelect={handleChangeTypeofData} />
        <ResponsiveGridLayout
          className="layout"
          rowHeight={30}
          isBounded={false}
          autoSize={true}
          onLayoutChange={handleLayoutChange}

          // @ts-ignore
          layouts={{ lg: (typeof localStorage !== 'undefined' && localStorage.getItem("layout")) ? JSON.parse(localStorage.getItem("layout")) : layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          measureBeforeMount={true}
          isDraggable={true}
          isResizable={true}
          allowOverlap={false}
        >

          <div key="1">
            <AnalyticsCongratulations />
          </div>
          <div key="2" >
            <AnalyticsOrder />
          </div>
          <div key="3" >
            {/* @ts-ignore */}
            <AnalyticsSales data={dataAnalytics?.Report?.Sale_section} handleOptionSelect={handleChangeTypeofData} />
          </div>
          <div key="4"   >
            <AnalyticsTotalRevenue />
          </div>
          <div key="5"  >
            {/* @ts-ignore */}
            <AnalyticsPayments Purchase={dataAnalytics?.Report?.Purchase_section?.Purchase} Percent={dataAnalytics?.Report?.Purchase_section?.Percent} handleOptionSelect={handleChangeTypeofData} />
          </div>
          <div key="6" >
            <AnalyticsRevenue />
          </div>
          <div key="7" >
            {/* @ts-ignore */}
            <AnalyticsProfitReport profitData={dataAnalytics?.Profit} />
          </div>
          <div key="8"  >
            <AnalyticsOrderStatistics />
          </div>
          <div key="9" >
            <AnalyticsTabsWithChart />
          </div>
          <div key="10"  >
            {/* @ts-ignore */}
            <AnalyticsTransactions UserData={dataAnalytics?.Accounts.cash} title="Cash" />
          </div>
          <div key="11"  >
            <AnalyticsActivityTimeline />
          </div>
          <div key="12"  >
            <AnalyticsTabsWithTable />
          </div>
          <div key="13" >
            {/* @ts-ignore */}
            <TableFilter UserData={dataAnalytics?.UserData} title="Sale" />
          </div>
          <div key="14" >
            {/* @ts-ignore */}
            <TableFilter UserData={dataAnalytics?.UserData} title="Purchase" />
          </div>
          <div key="15" >
            {/* @ts-ignore */}
            <AnalyticsTransactions UserData={dataAnalytics?.Accounts.bank} title="Bank" />
          </div>
          <div key="16" >
            {/* @ts-ignore */}
            <AnalyticsCustomCard data={dataAnalytics?.Report?.Expense_section} handleOptionSelect={handleChangeTypeofData} title={"Expense"} avatar={'/images/cards/wallet.png'} />
          </div>
        </ResponsiveGridLayout>
      </ApexChartWrapper>
    </React.Fragment>
  )
}

export default AnalyticsDashboard
