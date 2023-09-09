
"use client"
import { useState, useEffect } from "react"

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


// ** Demo Component Imports
import AnalyticsOrder from 'src/views/dashboards/analytics/AnalyticsOrder'
import AnalyticsSales from 'src/views/dashboards/analytics/AnalyticsSales'
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

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

type NewLayout = Array<object>


const ResponsiveGridLayout = WidthProvider(Responsive);

// ** MUI Imports






// type LayoutsType = [
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
//   { i: string, x: number, y: number, w: number, h: number },
// ]


const AnalyticsDashboard = () => {
  const defaultLayout = [

    { w: 3, h: 7, x: 0, y: 0, i: '1' },

    { w: 2, h: 6, x: 0, y: 18, i: '2' },

    { w: 1, h: 7, x: 3, y: 0, i: '3' },

    { w: 4, h: 11, x: 0, y: 7, i: '4' },

    { w: 2, h: 8, x: 0, y: 24, i: '5' },

    { w: 2, h: 6, x: 2, y: 18, i: '6' },

    { w: 2, h: 6, x: 0, y: 32, i: '7' },

    { w: 2, h: 14, x: 2, y: 24, i: '8' },

    { w: 2, h: 14, x: 0, y: 38, i: '9' },

    { w: 2, h: 14, x: 2, y: 38, i: '10' },

    { w: 2, h: 19, x: 0, y: 52, i: '11' },

    { w: 2, h: 19, x: 2, y: 52, i: '12' }
  ];

  // const [layout, setLayout] = useState([
  //   { i: '1', x: 0, y: 0, w: 6, h: 3 },
  //   { i: '2', x: 6, y: 0, w: 6, h: 6 },
  //   { i: '3', x: 0, y: 3, w: 4, h: 5 },
  //   { i: '4', x: 0, y: 8, w: 6, h: 7 },
  //   { i: '5', x: 6, y: 6, w: 6, h: 9 },
  //   { i: '6', x: 0, y: 15, w: 6, h: 7 },
  //   { i: '7', x: 6, y: 15, w: 6, h: 7 },
  //   { i: '8', x: 0, y: 22, w: 6, h: 8 },
  //   { i: '9', x: 6, y: 22, w: 6, h: 8 },
  //   { i: '10', x: 0, y: 30, w: 6, h: 8 },
  //   { i: '11', x: 0, y: 38, w: 6, h: 6 },
  //   { i: '12', x: 6, y: 38, w: 6, h: 6 },


  // ]);


  // Save layout to local storage whenever it changes
  const onLayoutChange = (newLayout: NewLayout) => {
    // localStorage.setItem('lyo-layout', JSON.stringify(newLayout));
    console.log("newLayouts:=>", newLayout)
  };

  useEffect(() => {
    // Listen for changes to local storage and update the layout when it changes

    //@ts-ignore
    const handleStorageChange = (e) => {
      if (e.key === 'lyo-layout') {
        const newLayout = JSON.parse(e.newValue);
        setLayout(newLayout);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);



  return (
    <ApexChartWrapper >
      <ResponsiveGridLayout
        className="layout"

        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        rowHeight={30}
        width={1200}
        isBounded={true}
        autoSize={true}
        cols={{ lg: 12, md: 4, sm: 2, xs: 1, xxs: 1 }}
      >
        <div key="1" data-grid={{ w: 3, h: 7, x: 0, y: 0, i: '1' }}>
          <AnalyticsCongratulations />
        </div>
        <div data-grid={{ w: 2, h: 6, x: 0, y: 18, i: '2' }} key="2">
          <AnalyticsOrder />
        </div>
        <div data-grid={{ w: 1, h: 7, x: 3, y: 0, i: '3' }} key="3">
          <AnalyticsSales />
        </div>
        <div key="4" data-grid={{ w: 4, h: 11, x: 0, y: 7, i: '4' }}  >
          <AnalyticsTotalRevenue />
        </div>
        <div key="5" data-grid={{ w: 2, h: 8, x: 0, y: 24, i: '5' }}  >
          <AnalyticsPayments />
        </div>
        <div key="6" data-grid={{ w: 2, h: 6, x: 2, y: 18, i: '6' }}  >
          <AnalyticsRevenue />
        </div>
        <div key="7" data-grid={{ w: 2, h: 6, x: 0, y: 32, i: '7' }} >
          <AnalyticsProfitReport />
        </div>
        <div key="8" data-grid={{ w: 2, h: 14, x: 2, y: 24, i: '8' }}  >
          <AnalyticsOrderStatistics />
        </div>
        <div key="9" data-grid={{ w: 2, h: 14, x: 0, y: 38, i: '9' }}>
          <AnalyticsTabsWithChart />
        </div>
        <div key="10" data-grid={{ w: 2, h: 14, x: 2, y: 38, i: '10' }} >
          <AnalyticsTransactions />
        </div>
        <div key="11" data-grid={{ w: 2, h: 19, x: 0, y: 52, i: '11' }} >
          <AnalyticsActivityTimeline />
        </div>
        <div key="12" data-grid={{ w: 2, h: 19, x: 2, y: 52, i: '12' }} >
          <AnalyticsTabsWithTable />
        </div>
      </ResponsiveGridLayout>
      {/* <Grid container spacing={6}>
        <Grid item xs={12} lg={8} sx={{ order: -1 }}>
          <AnalyticsCongratulations />
        </Grid>
        <Grid item xs={12} md={4} sx={{ order: -1 }}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={12} lg={6}>
              <AnalyticsOrder />
            </Grid>
            <Grid item xs={6} md={12} lg={6}>
              <AnalyticsSales />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <AnalyticsTotalRevenue />
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ order: [-1, -1, -1, 0] }}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <AnalyticsPayments />
            </Grid>
            <Grid item xs={6}>
              <AnalyticsRevenue />
            </Grid>
            <Grid item xs={12}>
              <AnalyticsProfitReport />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsOrderStatistics />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsTabsWithChart />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsTransactions />
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: [1, 1, 0] }}>
          <AnalyticsActivityTimeline />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnalyticsTabsWithTable />
        </Grid>
      </Grid> */}
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
