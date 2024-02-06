'use client'

// ** React Imports
import { useState, useEffect } from 'react'

//** Redux Imports
import { useSelector } from 'react-redux'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import { Box, FormControl, InputLabel, Select, MenuItem, Chip, Button, Divider, Grid } from '@mui/material'

// ** formik
import { FieldArray } from 'formik'

// ** User Components
import ProductVariable from '../productVariable/ProductVariable'
import ProductPriceCell from './ProductPricesCell'
import CompoProduct from '../compoProduct/CompoProduct'

const ProductPrices = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  // ** States
  const [filteredSubUnitsData, setFilteredSubUnitsData] = useState([])
  const [unitsData, setUnitsData] = useState([])
  const [subUnitsIds, setSubUnitsIds] = useState([])
  const [taxValues, setTaxValues] = useState([])
  const [subUnitsData, setSubUnitsData] = useState([])
  const [showMore, setShowMore] = useState(false)

  // update the table data when tax changes 🔥
  // useEffect(() => {
  //   // update the table data
  //   const updatedTableData = initialValues.tableData.map(item => {
  //     return {
  //       ...item,
  //       ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax),
  //       ['single_dsp_inc_tax']:
  //         Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
  //         Number(item.single_dpp) +
  //         (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) * Number(tax)
  //     }
  //   })

  //   // console.log(updatedTableData, 'updatedTableData 🔥')

  //   setFieldValue('tableData', updatedTableData)
  // }, [tax, setFieldValue, initialValues.tableData])

  // ** for child 1
  // useEffect(() => {
  //   // update the table data
  //   const updatedTableData = initialValues.tableDataChildOne.map(item => {
  //     return {
  //       ...item,
  //       ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax),
  //       ['single_dsp_inc_tax']:
  //         Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
  //         Number(item.single_dpp) +
  //         (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) * Number(tax)
  //     }
  //   })

  //   // console.log(updatedTableData, 'updatedTableData 🔥')

  //   setFieldValue('tableDataChildOne', updatedTableData)
  // }, [tax, setFieldValue, initialValues.tableDataChildOne])

  // ** for child 2
  // useEffect(() => {
  //   // update the table data
  //   const updatedTableData = initialValues.tableDataChildTwo.map(item => {
  //     return {
  //       ...item,
  //       ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax),
  //       ['single_dsp_inc_tax']:
  //         Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
  //         Number(item.single_dpp) +
  //         (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) * Number(tax)
  //     }
  //   })

  //   // console.log(updatedTableData, 'updatedTableData 🔥')

  //   setFieldValue('tableDataChildTwo', updatedTableData)
  // }, [tax, setFieldValue, initialValues.tableDataChildTwo])

  // update  unit_id when unit changes 🔥
  // useEffect(() => {
  //   const updatedTableData = tableData.map(item => {
  //     return {
  //       ...item,
  //       ['unit_id']: unitId
  //     }
  //   })

  //   setFieldValue('tableData', updatedTableData)
  // }, [unitId, setFieldValue, tableData])

  useEffect(() => {
    if (showMore === true) {
      setFieldValue('show_more_price', true)
    } else {
      setFieldValue('show_more_price', false)
    }
  }, [showMore, setFieldValue])

  console.log('Tax each time 🤍🤍', initialValues.tax)

  // ** Grid columns
  const columns = [
    {
      field: 'value',
      headerName: 'Header',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <Box>
            <p
              style={{
                textTransform: 'capitalize'
              }}
            >
              {params.row.value.replace(/_/g, ' ')}
            </p>
          </Box>
        </div>
      )
    },
    {
      field: 'single_dpp',
      headerName: 'Default Purchase Price',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <ProductPriceCell
              name={`tableData.${params.row.id - 1}.single_dpp`}
              value={params.row.single_dpp}
              onChange={e => {
                handleChange(e)
                const newSingleDpp = parseFloat(Number(e.target.value))
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dpp_in_tax`,
                  Number(newSingleDpp * taxValue).toFixed(2)
                )
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dsp`,
                  Number(newSingleDpp * (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100)).toFixed(
                    2
                  )
                )
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    newSingleDpp * taxValue * (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <ProductPriceCell
              name={`tableData.${params.row.id - 1}.single_dpp_in_tax`}
              value={params.row.single_dpp_in_tax}
              onChange={e => {
                handleChange(e)
                const newSingleDppInTax = parseFloat(Number(e.target.value))
                const taxValue = Number(1 + initialValues.tax)
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dpp`,
                  Number(newSingleDppInTax / taxValue).toFixed(2)
                )
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dsp`,
                  Number(
                    (newSingleDppInTax / taxValue) *
                      (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    newSingleDppInTax * (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'xmargin',
      headerName: 'X Margin(%)',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            height: '85%',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: 'column'
            }}
          >
            <p>Margin: {params.row.profit_percent}%</p>

            <ProductPriceCell
              name={`tableData.${params.row.id - 1}.profit_percent`}
              value={params.row.profit_percent}
              onChange={e => {
                handleChange(e)
                const newProfitPercent = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax //1 + 0.05

                if (typeof newProfitPercent === 'number' && !isNaN(newProfitPercent)) {
                  setFieldValue(
                    `tableData.${params.row.id - 1}.single_dsp`,
                    (initialValues.tableData[params.row.id - 1].single_dpp * (1 + newProfitPercent / 100)).toFixed(2) // 1+25/100
                  )
                  setFieldValue(
                    `tableData.${params.row.id - 1}.single_dsp_inc_tax`,
                    (
                      initialValues.tableData[params.row.id - 1].single_dpp *
                      taxValue *
                      (1 + newProfitPercent / 100)
                    ).toFixed(2)
                  )
                } else {
                  setFieldValue(`tableData.${params.row.id - 1}.single_dsp`, 0)
                  setFieldValue(`tableData.${params.row.id - 1}.single_dsp_inc_tax`, 0)
                }
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'defaultSalesPrice',
      headerName: 'Default Sales Price',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>

            <ProductPriceCell
              name={`tableData.${params.row.id - 1}.single_dsp`}
              value={params.row.single_dsp}
              onChange={e => {
                handleChange(e)
                const newSingleDsp = parseFloat(Number(e.target.value))
                const taxValue = Number(1 + initialValues.tax) //1+0.05

                // setFieldValue(
                //   `tableData.${params.row.id - 1}.single_dpp`,
                //   (newSingleDsp / (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100)).toFixed(2)
                // )
                // setFieldValue(
                //   `tableData.${params.row.id - 1}.single_dpp_in_tax`,
                //   (
                //     newSingleDsp /
                //     (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100) /
                //     taxValue
                //   ).toFixed(2)
                // )
                if (typeof newSingleDsp === 'number' && !isNaN(newSingleDsp)) {
                  setFieldValue(
                    `tableData.${params.row.id - 1}.single_dsp_inc_tax`,
                    (newSingleDsp * taxValue).toFixed(2)
                  )
                  setFieldValue(`tableData.${params.row.id - 1}.profit_percent`, 0)
                } else {
                  setFieldValue(`tableData.${params.row.id - 1}.single_dsp_inc_tax`, 0)
                  setFieldValue(`tableData.${params.row.id - 1}.profit_percent`, 0)
                }
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>

            <ProductPriceCell
              name={`tableData.${params.row.id - 1}.single_dsp_inc_tax`}
              value={params.row.single_dsp_inc_tax}
              onChange={e => {
                handleChange(e)
                const newSingleDspIncTax = parseFloat(Number(e.target.value))
                const taxValue = Number(1 + initialValues.tax)

                // setFieldValue(
                //   `tableData.${params.row.id - 1}.single_dpp`,
                //   (
                //     newSingleDspIncTax /
                //     (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100) /
                //     taxValue
                //   ).toFixed(2)
                // )
                // setFieldValue(
                //   `tableData.${params.row.id - 1}.single_dpp_in_tax`,
                //   (newSingleDspIncTax / (1 + initialValues.tableData[params.row.id - 1].profit_percent / 100)).toFixed(
                //     2
                //   )
                // )
                setFieldValue(
                  `tableData.${params.row.id - 1}.single_dsp`,
                  Number(newSingleDspIncTax / taxValue).toFixed(2)
                )
                setFieldValue(`tableData.${params.row.id - 1}.profit_percent`, 0)
              }}
            />
          </Box>
        </div>
      )
    }
  ]

  const columnsChildOne = [
    {
      field: 'value',
      headerName: 'Header',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <Box>
            <p
              style={{
                textTransform: 'capitalize'
              }}
            >
              {params.row.value.replace(/_/g, ' ')}
            </p>
          </Box>
        </div>
      )
    },
    {
      field: 'single_dpp',
      headerName: 'Default Purchase Price',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <ProductPriceCell
              name={`tableDataChildOne.${params.row.id - 1}.single_dpp`}
              value={params.row.single_dpp}
              onChange={e => {
                handleChange(e)
                const newSingleDpp = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dpp_in_tax`,
                  Number(newSingleDpp * taxValue).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp`,
                  Number(
                    newSingleDpp * (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    newSingleDpp *
                      taxValue *
                      (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <ProductPriceCell
              name={`tableDataChildOne.${params.row.id - 1}.single_dpp_in_tax`}
              value={params.row.single_dpp_in_tax}
              onChange={e => {
                handleChange(e)
                const newSingleDppInTax = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dpp`,
                  Number(newSingleDppInTax / taxValue).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp`,
                  Number(
                    (newSingleDppInTax / taxValue) *
                      (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    newSingleDppInTax * (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'xmargin',
      headerName: 'X Margin(%)',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            height: '85%',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: 'column'
            }}
          >
            <p>Margin: {params.row.profit_percent}%</p>
            <ProductPriceCell
              name={`tableDataChildOne.${params.row.id - 1}.profit_percent`}
              value={params.row.profit_percent}
              onChange={e => {
                handleChange(e)
                const newProfitPercent = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp`,
                  Number(
                    initialValues.tableDataChildOne[params.row.id - 1].single_dpp * (1 + newProfitPercent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    initialValues.tableDataChildOne[params.row.id - 1].single_dpp *
                      taxValue *
                      (1 + newProfitPercent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'defaultSalesPrice',
      headerName: 'Default Sales Price',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <ProductPriceCell
              name={`tableDataChildOne.${params.row.id - 1}.single_dsp`}
              value={params.row.single_dsp}
              onChange={e => {
                handleChange(e)
                const newSingleDsp = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax

                // setFieldValue(
                //   `tableDataChildOne.${params.row.id - 1}.single_dpp`,
                //   (newSingleDsp / (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100)).toFixed(2)
                // )
                // setFieldValue(
                //   `tableDataChildOne.${params.row.id - 1}.single_dpp_in_tax`,
                //   (
                //     newSingleDsp /
                //     (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100) /
                //     taxValue
                //   ).toFixed(2)
                // )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(newSingleDsp * taxValue).toFixed(2)
                )
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <ProductPriceCell
              name={`tableDataChildOne.${params.row.id - 1}.single_dsp_inc_tax`}
              value={params.row.single_dsp_inc_tax}
              onChange={e => {
                handleChange(e)
                const newSingleDspIncTax = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax

                // setFieldValue(
                //   `tableDataChildOne.${params.row.id - 1}.single_dpp`,
                //   (
                //     newSingleDspIncTax /
                //     (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100) /
                //     taxValue
                //   ).toFixed(2)
                // )
                // setFieldValue(
                //   `tableDataChildOne.${params.row.id - 1}.single_dpp_in_tax`,
                //   (newSingleDspIncTax / (1 + initialValues.tableDataChildOne[params.row.id - 1].profit_percent / 100)).toFixed(
                //     2
                //   )
                // )
                setFieldValue(
                  `tableDataChildOne.${params.row.id - 1}.single_dsp`,
                  Number(newSingleDspIncTax / taxValue).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    }
  ]

  const columnsChildTwo = [
    {
      field: 'value',
      headerName: 'Header',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <Box>
            <p
              style={{
                textTransform: 'capitalize'
              }}
            >
              {params.row.value.replace(/_/g, ' ')}
            </p>
          </Box>
        </div>
      )
    },
    {
      field: 'single_dpp',
      headerName: 'Default Purchase Price',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <ProductPriceCell
              name={`tableDataChildTwo.${params.row.id - 1}.single_dpp`}
              value={params.row.single_dpp}
              onChange={e => {
                handleChange(e)
                const newSingleDpp = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dpp_in_tax`,
                  Number(newSingleDpp * taxValue).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp`,
                  Number(
                    newSingleDpp * (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    newSingleDpp *
                      taxValue *
                      (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <ProductPriceCell
              name={`tableDataChildTwo.${params.row.id - 1}.single_dpp_in_tax`}
              value={params.row.single_dpp_in_tax}
              onChange={e => {
                handleChange(e)
                const newSingleDppInTax = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dpp`,
                  Number(newSingleDppInTax / taxValue).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp`,
                  Number(
                    (newSingleDppInTax / taxValue) *
                      (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    newSingleDppInTax * (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'xmargin',
      headerName: 'X Margin(%)',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            height: '85%',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: 'column'
            }}
          >
            <p>Margin: {params.row.profit_percent}%</p>
            <ProductPriceCell
              name={`tableDataChildTwo.${params.row.id - 1}.profit_percent`}
              value={params.row.profit_percent}
              onChange={e => {
                handleChange(e)
                const newProfitPercent = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp`,
                  Number(
                    initialValues.tableDataChildTwo[params.row.id - 1].single_dpp * (1 + newProfitPercent / 100)
                  ).toFixed(2)
                )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(
                    initialValues.tableDataChildTwo[params.row.id - 1].single_dpp *
                      taxValue *
                      (1 + newProfitPercent / 100)
                  ).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'defaultSalesPrice',
      headerName: 'Default Sales Price',
      width: 200,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <ProductPriceCell
              name={`tableDataChildTwo.${params.row.id - 1}.single_dsp`}
              value={params.row.single_dsp}
              onChange={e => {
                handleChange(e)
                const newSingleDsp = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax

                // setFieldValue(
                //   `tableDataChildTwo.${params.row.id - 1}.single_dpp`,
                //   (newSingleDsp / (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100)).toFixed(2)
                // )
                // setFieldValue(
                //   `tableDataChildTwo.${params.row.id - 1}.single_dpp_in_tax`,
                //   (
                //     newSingleDsp /
                //     (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100) /
                //     taxValue
                //   ).toFixed(2)
                // )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp_inc_tax`,
                  Number(newSingleDsp * taxValue).toFixed(2)
                )
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <ProductPriceCell
              name={`tableDataChildTwo.${params.row.id - 1}.single_dsp_inc_tax`}
              value={params.row.single_dsp_inc_tax}
              onChange={e => {
                handleChange(e)
                const newSingleDspIncTax = parseFloat(e.target.value)
                const taxValue = 1 + initialValues.tax

                // setFieldValue(
                //   `tableDataChildTwo.${params.row.id - 1}.single_dpp`,
                //   (
                //     newSingleDspIncTax /
                //     (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100) /
                //     taxValue
                //   ).toFixed(2)
                // )
                // setFieldValue(
                //   `tableDataChildTwo.${params.row.id - 1}.single_dpp_in_tax`,
                //   (newSingleDspIncTax / (1 + initialValues.tableDataChildTwo[params.row.id - 1].profit_percent / 100)).toFixed(
                //     2
                //   )
                // )
                setFieldValue(
                  `tableDataChildTwo.${params.row.id - 1}.single_dsp`,
                  Number(newSingleDspIncTax / taxValue).toFixed(2)
                )
              }}
            />
          </Box>
        </div>
      )
    }
  ]

  // ** Selectors
  const taxes = useSelector(state => state.getCreateProduct?.data?.value.taxes)
  const units = useSelector(state => state.getCreateProduct?.data?.value.units)
  const sub_units = useSelector(state => state.getCreateProduct?.data?.value.sub_units)

  // ** useEffect
  useEffect(() => {
    if (sub_units) {
      setSubUnitsData(sub_units)
    }
  }, [sub_units])
  useEffect(() => {
    setUnitsData(units)
  }, [units])

  // ** filter sub units
  useEffect(() => {
    if (initialValues.sub_unit_id) {
      setSubUnitsIds(initialValues.sub_unit_id)
    }
  }, [subUnitsData, initialValues.sub_unit_id])

  useEffect(() => {
    try {
      setTaxValues(taxes)
    } catch (error) {
      console.error('Failed to set tax values:', error)
    }
  }, [taxes])

  // ** filter sub units
  useEffect(() => {
    const filteredSubUnits = subUnitsData.filter(subUnit => subUnit.parent_id === initialValues.unit_id)
    setFilteredSubUnitsData(filteredSubUnits.length ? filteredSubUnits : [])
  }, [subUnitsData, initialValues.unit_id])

  // ** to update value of initialValue.tax each item  initialValue.tax_id
  // useEffect(() => {
  //   if (taxValues) {
  //     const tax = taxValues.find(tax => tax.id === initialValues.tax_id)
  //     if (tax) {
  //       setFieldValue('tax', tax.value)
  //     }
  //   }
  // }, [initialValues.tax_id, taxValues, setFieldValue])

  console.log('tax Values 🤍🤍', taxValues)
  console.log('taxes selector 💦🤍', taxes)

  if (initialValues.product_type) {
    return (
      <Card style={{ height: '100%', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, spacing: 2 }}>
          <CardHeader title='Product Prices' />
          <Divider sx={{ m: '0 !important' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            width: '100%',
            padding: '0px 1rem'
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Applicable Tax</InputLabel>
            <Select
              value={initialValues.tax_id}
              onChange={e => {
                handleChange(e)
                const tax = taxValues.find(tax => tax.id === e.target.value)
                if (tax) {
                  setFieldValue('tax', tax.value)
                }
                const updatedTableData = initialValues.tableData.map(item => {
                  return {
                    ...item,
                    ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax.value),
                    ['single_dsp_inc_tax']:
                      Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
                      Number(item.single_dpp) +
                      (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) *
                        Number(tax.value)
                  }
                })
                setFieldValue('tableData', updatedTableData)
                const updatedTableDataOne = initialValues.tableDataChildOne.map(item => {
                  return {
                    ...item,
                    ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax.value),
                    ['single_dsp_inc_tax']:
                      Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
                      Number(item.single_dpp) +
                      (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) *
                        Number(tax.value)
                  }
                })
                setFieldValue('tableDataChildOne', updatedTableDataOne)
                const updatedTableDataTwo = initialValues.tableDataChildTwo.map(item => {
                  return {
                    ...item,
                    ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax.value),
                    ['single_dsp_inc_tax']:
                      Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
                      Number(item.single_dpp) +
                      (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) *
                        Number(tax.value)
                  }
                })
                setFieldValue('tableDataChildTwo', updatedTableDataTwo)
                const update_product_variations = initialValues.product_variation.map(pItem => {
                  return {
                    ...pItem,

                    ['variations']: pItem.variations.map(item => {
                      return {
                        ...item,
                        ['dpp_inc_tax']:
                          Number(item.default_purchase_price) + Number(item.default_purchase_price) * Number(tax.value),
                        ['sell_price_inc_tax']:
                          Number(item.default_purchase_price) * Number(item.profit_percent) * 0.01 +
                          Number(item.default_purchase_price) +
                          (Number(item.default_purchase_price) * Number(item.profit_percent) * 0.01 +
                            Number(item.default_purchase_price)) *
                            Number(tax.value)
                      }
                    })
                  }
                })
                setFieldValue(`product_variation`, update_product_variations)

                const update_product_compo = initialValues.product_compo.map(pItem => {
                  const newSellingPrice =
                    Number(pItem.item_level_purchase_price_total) *
                    Number(1 + pItem.profit_percent / 100) *
                    Number(1 + tax.value)

                  return {
                    ...pItem,

                    ['selling_price_inc_tax']: newSellingPrice
                  }
                })
                setFieldValue(`product_compo`, update_product_compo)
              }}
              label='Applicable Tax'
              name='tax_id'
            >
              <MenuItem value=''>Please Select</MenuItem>
              {taxValues &&
                taxValues?.length > 0 &&
                taxValues.map(tax => (
                  <MenuItem key={tax.id} value={tax.id}>
                    {tax.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Product Type</InputLabel>
            <Select value={initialValues.product_type} onChange={handleChange} label='Product Type' name='product_type'>
              <MenuItem value={'single'}>Single</MenuItem>
              <MenuItem value={'variable'}>Variable</MenuItem>
              <MenuItem value={'combo'}>Combo</MenuItem>
            </Select>
          </FormControl>
          {initialValues.product_type === 'single' ? (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
              <Select
                value={initialValues.unit_id}
                onChange={handleChange}
                required
                name='unit_id'
                id='demo-simple-select'
                label='Unit'
                fullWidth
                onBlur={handleBlur}
                disabled={true}
                error={touched.unit_id && !!errors.unit_id}
              >
                {unitsData.map(unit => (
                  <MenuItem key={unit.id} value={unit.id} disabled={initialValues.unit_id === unit.id ? false : true}>
                    {unit.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Box>
        {initialValues.product_type === 'single' && (
          <Box padding={2}>
            <FieldArray name='tableData'>
              {() => <DataGrid autoHeight columns={columns} rowHeight={120} rows={initialValues.tableData} />}
            </FieldArray>
            {subUnitsIds.length > 0 && (
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  setShowMore(!showMore)
                }}
              >
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Box>
        )}

        {showMore &&
          subUnitsIds.length > 0 &&
          subUnitsIds.map((subUnit, index) => (
            <FieldArray name='tableData' key={`${index} ${subUnit}`}>
              {() => (
                <Box
                  key={index}
                  sx={{
                    marginTop: '1rem',
                    padding: '1rem',
                    border: '1px solid ',
                    borderRadius: '10px',
                    borderColor: theme => theme.palette.divider
                  }}
                >
                  <Grid item xs={6} sx={{ my: 5 }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Sub Unit</InputLabel>
                      <Select
                        value={initialValues.sub_unit_id}
                        onChange={handleChange}
                        multiple
                        name='sub_unit_id'
                        id='demo-simple-select'
                        label='Sub Unit'
                        fullWidth
                        renderValue={selected =>
                          filteredSubUnitsData && filteredSubUnitsData.length > 0 ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              <Chip
                                label={
                                  filteredSubUnitsData.find(subUnit => subUnit.id === selected[index])?.name || null
                                }
                                onDelete={() => {
                                  const updatedSubUnitIds = initialValues.sub_unit_id.filter(
                                    item => item !== selected[index]
                                  )
                                  setFieldValue('sub_unit_id', updatedSubUnitIds)
                                  setFilteredSubUnitsData(
                                    filteredSubUnitsData.filter(item => item.id !== selected[index])
                                  )
                                }}
                              />
                            </Box>
                          ) : null
                        }
                        onBlur={handleBlur}
                        disabled={true}
                      >
                        {initialValues.sub_unit_id.length >= 2 && (
                          <MenuItem value='' disabled>
                            <em>You can select only up to two sub units</em>
                          </MenuItem>
                        )}
                        {filteredSubUnitsData.map(subUnit => (
                          <MenuItem
                            key={subUnit.id}
                            value={subUnit.id}
                            disabled={!initialValues.sub_unit_id.includes(subUnit.id)}
                          >
                            {subUnit.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <DataGrid
                    autoHeight
                    columns={index === 0 ? columnsChildOne : columnsChildTwo}
                    rowHeight={120}
                    rows={index === 0 ? initialValues.tableDataChildOne : initialValues.tableDataChildTwo}
                  />
                </Box>
              )}
            </FieldArray>
          ))}
        {initialValues.product_type === 'variable' && (
          <ProductVariable
            initialValues={initialValues}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        )}
        {initialValues.product_type === 'combo' && (
          <CompoProduct
            initialValues={initialValues}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        )}
      </Card>
    )
  }
}

export default ProductPrices
