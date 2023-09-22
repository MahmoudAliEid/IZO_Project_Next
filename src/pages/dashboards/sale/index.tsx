'use client'
import { useState, useEffect } from "react"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardAnalytics } from "src/types/apps/rooteState";
import TableFilter from 'src/views/table/data-grid/TableFilter'

import { fetchDataAnalytics } from 'src/store/apps/dashboard/dashboardSlice.js'

const index = () => {
    const [dataAnalytics, setDataAnalytics] = useState(null);
    const [typeofData, setTypeofData] = useState<string>("today")

    const dispatch = useDispatch()
    const data = useSelector((state: DashboardAnalytics) => state.dashboardAnalytics.data)

    // get data from redux
    useEffect(() => {
        dispatch(fetchDataAnalytics({ typeofData }))
    }, [typeofData, dispatch]);

    useEffect(() => {
        setDataAnalytics(data)
    }, [data]);

    return (
        <div>
            {
                dataAnalytics !== null ? <TableFilter UserData={dataAnalytics?.UserData} title="Sale" /> : null
            }
        </div>
    )
}

export default index