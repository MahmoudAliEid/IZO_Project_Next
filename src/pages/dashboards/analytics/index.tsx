
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

const AnalyticsDashboard = () => {
  const defaultLayout = [
    { i: '1', x: 0, y: 0, w: 6, h: 3 },
    { i: '2', x: 6, y: 0, w: 6, h: 6 },
    { i: '3', x: 0, y: 3, w: 4, h: 5 },
    { i: '4', x: 0, y: 8, w: 6, h: 7 },
    { i: '5', x: 6, y: 6, w: 6, h: 9 },
    { i: '6', x: 0, y: 15, w: 6, h: 7 },
    { i: '7', x: 6, y: 15, w: 6, h: 7 },
    { i: '8', x: 0, y: 22, w: 6, h: 8 },
    { i: '9', x: 6, y: 22, w: 6, h: 8 },
    { i: '10', x: 0, y: 30, w: 6, h: 8 },
    { i: '11', x: 0, y: 38, w: 6, h: 6 },
    { i: '12', x: 6, y: 38, w: 6, h: 6 },


  ];

  const [layout, setLayout] = useState(() => {
    const localLayout = typeof window !== 'undefined' ? window.localStorage.getItem('lyo-layout') : undefined;

    return localLayout ? JSON.parse(localLayout) : defaultLayout;
  });


  // Save layout to local storage whenever it changes
  const onLayoutChange = (newLayout: NewLayout) => {
    localStorage.setItem('lyo-layout', JSON.stringify(newLayout));
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
    <ApexChartWrapper style={{ minHeight: 2500 }}>
      <ResponsiveGridLayout
        className="layout"
        onLayoutChange={onLayoutChange}
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        rowHeight={250}
        width={1200}
        autoSize={true}
        cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
      >
        <div style={{ backgroundColor: "red" }} key="1">
          1
        </div>
        <div style={{ backgroundColor: "blue" }} key="2">
          2
        </div>
        <div style={{ backgroundColor: "green" }} key="3">
          3
        </div>
        <div key="4" style={{ backgroundColor: "orange" }} >
          4
        </div>
        <div key="5" style={{ backgroundColor: "purple" }} >
          5
        </div>
        <div key="6" style={{ backgroundColor: "maroon" }} >
          6
        </div>
        <div key="7" style={{ backgroundColor: "black" }} >
          7
        </div>
        <div key="8" style={{ backgroundColor: "Navy" }} >
          8
        </div>
        <div key="9" style={{ backgroundColor: "brown" }} >
          9
        </div>
        <div key="10" style={{ backgroundColor: "Cyan" }} >
          10
        </div>
        <div key="11" style={{ backgroundColor: "yellow" }}>
          11
        </div>
        <div key="12" style={{ backgroundColor: "maroon" }}>
          12
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
