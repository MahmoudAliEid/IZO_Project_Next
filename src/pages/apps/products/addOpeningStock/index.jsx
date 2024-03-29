// 'use client'

// // ** React Imports
// import { ChangeEvent, useState, useEffect, useRef, Fragment } from 'react'

// //** Redux Imports
// import { useDispatch, useSelector } from 'react-redux'

// // ** MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import { DataGrid, GridColDef } from '@mui/x-data-grid'
// import TextField from '@mui/material/TextField'
// import { Box, FormControl, InputLabel, Select, MenuItem, Chip, Button, Divider, Grid, Typography } from '@mui/material'
// import { useTheme } from '@mui/material/styles'

// // ** User Components
// import ProductVariable from '../productVariable/ProductVariable'

// const ProductPrices = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
//   // ** States
//   const [tax, setTax] = useState('')

//   const [filteredSubUnitsData, setFilteredSubUnitsData] = useState([])
//   const [productType, setProductType] = useState('')
//   const [unitsData, setUnitsData] = useState([])
//   const [subUnitsIds, setSubUnitsIds] = useState([])
//   const [taxValues, setTaxValues] = useState([])
//   const [unitId, setUnitId] = useState('')
//   const [subUnitsData, setSubUnitsData] = useState([])
//   const [showMore, setShowMore] = useState(false)
//   const [tableData, setTableData] = useState([
//     {
//       id: 1,
//       unit_id: unitId,
//       value: 'default_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 2,
//       unit_id: unitId,
//       value: 'whole_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 3,
//       unit_id: unitId,
//       value: 'retail_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 4,
//       unit_id: unitId,
//       value: 'minimum_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 5,
//       unit_id: unitId,
//       value: 'last_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 6,
//       unit_id: unitId,
//       value: 'ecm_before_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 7,
//       unit_id: unitId,
//       value: 'ecm_after_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 8,
//       unit_id: unitId,
//       value: 'custom_price_1',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 9,
//       unit_id: unitId,
//       value: 'custom_price_2',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 10,
//       unit_id: unitId,
//       value: 'custom_price_3',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 11,
//       unit_id: unitId,
//       value: 'custom_price_4',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     }
//   ])

//   const [tableDataChild1, setTableDataChild1] = useState([
//     {
//       id: 1,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'default_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 2,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'whole_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 3,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'retail_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 4,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'minimum_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 5,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'last_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 6,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'ecm_before_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 7,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'ecm_after_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 8,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'custom_price_1',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 9,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'custom_price_2',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 10,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'custom_price_3',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 11,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
//       value: 'custom_price_4',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     }
//   ])
//   const [tableDataChild2, setTableDataChild2] = useState([
//     {
//       id: 1,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'default_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 2,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'whole_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 3,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'retail_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 4,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'minimum_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 5,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'last_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 6,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'ecm_before_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 7,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'ecm_after_price',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 8,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'custom_price_1',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 9,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'custom_price_2',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 10,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'custom_price_3',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     },
//     {
//       id: 11,
//       unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
//       value: 'custom_price_4',
//       single_dpp: '',
//       single_dpp_in_tax: '',
//       profit_percent: '',
//       single_dsp: '',
//       single_dsp_inc_tax: ''
//     }
//   ])

//   // update the table data when tax changes 🔥
//   // useEffect(() => {
//   //   // update the table data
//   //   const updatedTableData = initialValues.tableData.map(item => {
//   //     return {
//   //       ...item,
//   //       ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax),
//   //       ['single_dsp_inc_tax']:
//   //         Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
//   //         Number(item.single_dpp) +
//   //         (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) * Number(tax)
//   //     }
//   //   })

//   //   // console.log(updatedTableData, 'updatedTableData 🔥')

//   //   setFieldValue('tableData', updatedTableData)
//   // }, [tax, setFieldValue, initialValues.tableData])

//   // ** for child 1
//   // useEffect(() => {
//   //   // update the table data
//   //   const updatedTableData = initialValues.tableDataChildOne.map(item => {
//   //     return {
//   //       ...item,
//   //       ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax),
//   //       ['single_dsp_inc_tax']:
//   //         Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
//   //         Number(item.single_dpp) +
//   //         (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) * Number(tax)
//   //     }
//   //   })

//   //   // console.log(updatedTableData, 'updatedTableData 🔥')

//   //   setFieldValue('tableDataChildOne', updatedTableData)
//   // }, [tax, setFieldValue, initialValues.tableDataChildOne])

//   // ** for child 2
//   // useEffect(() => {
//   //   // update the table data
//   //   const updatedTableData = initialValues.tableDataChildTwo.map(item => {
//   //     return {
//   //       ...item,
//   //       ['single_dpp_in_tax']: Number(item.single_dpp) + Number(item.single_dpp) * Number(tax),
//   //       ['single_dsp_inc_tax']:
//   //         Number(item.single_dpp) * Number(item.profit_percent) * 0.01 +
//   //         Number(item.single_dpp) +
//   //         (Number(item.single_dpp) * Number(item.profit_percent) * 0.01 + Number(item.single_dpp)) * Number(tax)
//   //     }
//   //   })

//   //   // console.log(updatedTableData, 'updatedTableData 🔥')

//   //   setFieldValue('tableDataChildTwo', updatedTableData)
//   // }, [tax, setFieldValue, initialValues.tableDataChildTwo])

//   // update  unit_id when unit changes 🔥
//   useEffect(() => {
//     const updatedTableData = tableData.map(item => {
//       return {
//         ...item,
//         ['unit_id']: unitId
//       }
//     })

//     setFieldValue('tableData', updatedTableData)
//   }, [unitId, setFieldValue, tableData])

//   useEffect(() => {
//     if (showMore === true) {
//       setFieldValue('show_more_price', true)
//     } else {
//       setFieldValue('show_more_price', false)
//     }
//   }, [showMore, setFieldValue])

//   // Update First input
//   const updateFirstInput = (id, newValue, name, tableName) => {
//     console.log('tableName ============ 🌚', tableName)
//     const updatedTableData = initialValues[`${tableName}`].map(item => {
//       if (item.id === id + 1) {
//         return {
//           ...item,
//           [name]: Number(newValue),

//           // ['single_dpp']: Number(item.single_dpp),

//           ['single_dpp_in_tax']: Number(newValue) + Number(newValue) * Number(initialValues.tax),
//           ['single_dsp']: Number(newValue) * Number(item.profit_percent) * 0.01 + Number(newValue),
//           ['single_dsp_inc_tax']:
//             Number(newValue) * Number(item.profit_percent) * 0.01 +
//             Number(newValue) +
//             (Number(newValue) * Number(item.profit_percent) * 0.01 + Number(newValue)) * Number(initialValues.tax)
//         }
//       }

//       return item
//     })
//     setFieldValue(`${tableName}`, updatedTableData)
//   }

//   // ** update the table data when profit percent changes 🔥
//   const updateValue = (id, newValue, name, tableName) => {
//     console.log('tableName ============ 🌚', tableName)
//     const updatedTableData = initialValues[`${tableName}`].map(item => {
//       if (item.id === id + 1) {
//         return {
//           ...item,
//           [name]: Number(newValue),
//           ['single_dsp']: Number(item.single_dpp) * Number(newValue) * 0.01 + Number(item.single_dpp),
//           ['single_dsp_inc_tax']:
//             Number(item.single_dpp) * Number(newValue) * 0.01 +
//             Number(item.single_dpp) +
//             (Number(item.single_dpp) * Number(newValue) * 0.01 + Number(item.single_dpp)) * Number(initialValues.tax)
//         }
//       }

//       return item
//     })

//     setFieldValue(`${tableName}`, updatedTableData)
//   }

//   // **  function to update in single_dpp_in_tax
//   const updateSingleDppInTax = (id, newValue, name, tableName) => {
//     const updatedTableData = initialValues[`${tableName}`].map(item => {
//       const newValueCal = (Number(newValue) * 100) / (100 + Number(initialValues.tax) * 100)
//       if (item.id === id + 1) {
//         return {
//           ...item,
//           [name]: Number(newValue),
//           ['single_dpp']: newValueCal,
//           ['single_dsp']: newValueCal * Number(item.profit_percent) * 0.01 + newValueCal,
//           ['single_dsp_inc_tax']:
//             newValueCal * Number(item.profit_percent) * 0.01 +
//             newValueCal +
//             (newValueCal * Number(item.profit_percent) * 0.01 + newValueCal) * Number(initialValues.tax)
//         }
//       }

//       return item
//     })

//     setFieldValue(`${tableName}`, updatedTableData)
//   }

//   // ** update all fields when tax change

//   console.log('Tax each time 🤍🤍', initialValues.tax)

//   // ** Grid columns
//   const columns = [
//     {
//       field: 'value',
//       headerName: 'Header',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p
//               style={{
//                 textTransform: 'capitalize'
//               }}
//             >
//               {params.row.value.replace(/_/g, ' ')}
//             </p>
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'single_dpp',
//       headerName: 'Default Purchase Price',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p>Exc. tax:</p>
//             <TextField
//               type='text'
//               value={params.row.single_dpp ? Number(params.row.single_dpp) : ''}
//               onChange={event => {
//                 const id = params.row.id - 1
//                 const newValue = event.target.value
//                 updateFirstInput(id, newValue, 'single_dpp', 'tableData')
//               }}
//             />
//           </Box>
//           <Box>
//             <p>Inc. tax: </p>
//             <TextField
//               type='text'
//               value={params.row.single_dpp_in_tax ? Number(params.row.single_dpp_in_tax) : ''}
//               onChange={event => {
//                 const id = params.row.id - 1
//                 const newValue = event.target.value
//                 updateSingleDppInTax(id, newValue, 'single_dpp_in_tax', 'tableData')
//               }}
//             />
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'xmargin',
//       headerName: 'X Margin(%)',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'end',
//             height: '85%',
//             width: '100%'
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'start',
//               flexDirection: 'column'
//             }}
//           >
//             <p>Margin: {params.row.profit_percent}%</p>
//             <TextField
//               type='text'
//               value={params.row.profit_percent}
//               onChange={e => {
//                 const value = e.target.value
//                 const id = params.row.id - 1
//                 updateValue(id, value, 'profit_percent', 'tableData')
//               }}
//             />
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'defaultSalesPrice',
//       headerName: 'Default Sales Price',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p>Exc. tax:</p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                     Number(params.row.single_dpp)
//                   : ''
//               }
//             />
//           </Box>
//           <Box>
//             <p>Inc. tax: </p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                     Number(params.row.single_dpp) +
//                     (Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                       Number(params.row.single_dpp)) *
//                       Number(initialValues.tax)
//                   : ''
//               }
//             />
//           </Box>
//         </div>
//       )
//     }
//   ]

//   const columnsChildOne = [
//     {
//       field: 'value',
//       headerName: 'Header',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p
//               style={{
//                 textTransform: 'capitalize'
//               }}
//             >
//               {params.row.value.replace(/_/g, ' ')}
//             </p>
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'single_dpp',
//       headerName: 'Default Purchase Price',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p>Exc. tax:</p>
//             <TextField
//               type='text'
//               value={params.row.single_dpp ? Number(params.row.single_dpp) : ''}
//               onChange={event => {
//                 const id = params.row.id - 1
//                 const newValue = event.target.value
//                 updateFirstInput(id, newValue, 'single_dpp', 'tableDataChildOne')
//               }}
//             />
//           </Box>
//           <Box>
//             <p>Inc. tax: </p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) + Number(params.row.single_dpp) * Number(initialValues.tax)
//                   : ''
//               }
//             />
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'xmargin',
//       headerName: 'X Margin(%)',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'end',
//             height: '85%',
//             width: '100%'
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'start',
//               flexDirection: 'column'
//             }}
//           >
//             <p>Margin: {params.row.profit_percent}%</p>
//             <TextField
//               type='text'
//               value={params.row.profit_percent}
//               onChange={e => {
//                 const value = e.target.value
//                 const id = params.row.id - 1
//                 updateValue(id, value, 'profit_percent', 'tableDataChildOne')
//               }}
//             />
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'defaultSalesPrice',
//       headerName: 'Default Sales Price',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p>Exc. tax:</p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                     Number(params.row.single_dpp)
//                   : ''
//               }
//             />
//           </Box>
//           <Box>
//             <p>Inc. tax: </p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                     Number(params.row.single_dpp) +
//                     (Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                       Number(params.row.single_dpp)) *
//                       Number(initialValues.tax)
//                   : ''
//               }
//             />
//           </Box>
//         </div>
//       )
//     }
//   ]
//   const columnsChildTwo = [
//     {
//       field: 'value',
//       headerName: 'Header',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p
//               style={{
//                 textTransform: 'capitalize'
//               }}
//             >
//               {params.row.value.replace(/_/g, ' ')}
//             </p>
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'single_dpp',
//       headerName: 'Default Purchase Price',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p>Exc. tax:</p>
//             <TextField
//               type='text'
//               value={params.row.single_dpp ? Number(params.row.single_dpp) : ''}
//               onChange={event => {
//                 const id = params.row.id - 1
//                 const newValue = event.target.value
//                 updateFirstInput(id, newValue, 'single_dpp', 'tableDataChildTwo')
//               }}
//             />
//           </Box>
//           <Box>
//             <p>Inc. tax: </p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) + Number(params.row.single_dpp) * Number(initialValues.tax)
//                   : ''
//               }
//             />
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'xmargin',
//       headerName: 'X Margin(%)',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'end',
//             height: '85%',
//             width: '100%'
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'start',
//               flexDirection: 'column'
//             }}
//           >
//             <p>Margin: {params.row.profit_percent}%</p>
//             <TextField
//               type='text'
//               value={params.row.profit_percent}
//               onChange={e => {
//                 const value = e.target.value
//                 const id = params.row.id - 1
//                 updateValue(id, value, 'profit_percent', 'tableDataChildTwo')
//               }}
//             />
//           </Box>
//         </div>
//       )
//     },
//     {
//       field: 'defaultSalesPrice',
//       headerName: 'Default Sales Price',
//       width: 200,
//       renderCell: params => (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '1rem'
//           }}
//         >
//           <Box>
//             <p>Exc. tax:</p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                     Number(params.row.single_dpp)
//                   : ''
//               }
//             />
//           </Box>
//           <Box>
//             <p>Inc. tax: </p>
//             <TextField
//               type='text'
//               value={
//                 params.row.single_dpp
//                   ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                     Number(params.row.single_dpp) +
//                     (Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
//                       Number(params.row.single_dpp)) *
//                       Number(initialValues.tax)
//                   : ''
//               }
//             />
//           </Box>
//         </div>
//       )
//     }
//   ]

//   // ** Hooks
//   const cardRef = useRef(null)
//   const theme = useTheme()

//   // ** Selectors
//   const taxes = useSelector(state => state.getCreateProduct?.data?.value.taxes)
//   const units = useSelector(state => state.getCreateProduct?.data?.value.units)
//   const sub_units = useSelector(state => state.getCreateProduct?.data?.value.sub_units)

//   // ** useEffect
//   useEffect(() => {
//     setUnitsData(units)
//     if (sub_units) {
//       setSubUnitsData(sub_units)
//     }
//   }, [units, sub_units])

//   // ** filter sub units
//   useEffect(() => {
//     if (initialValues.sub_unit_id) {
//       setSubUnitsIds(initialValues.sub_unit_id)
//     }
//   }, [subUnitsData, initialValues.sub_unit_id])

//   useEffect(() => {
//     try {
//       setTaxValues(taxes)
//     } catch (error) {
//       console.error('Failed to set tax values:', error)
//     }
//   }, [taxes])

//   // ** filter unit_id
//   useEffect(() => {
//     if (initialValues.unit_id) {
//       setUnitId(initialValues.unit_id)
//     }
//   }, [initialValues.unit_id])

//   // ** filter sub units
//   useEffect(() => {
//     const filteredSubUnits = subUnitsData.filter(subUnit => subUnit.parent_id === initialValues.unit_id)
//     setFilteredSubUnitsData(filteredSubUnits.length ? filteredSubUnits : [])
//   }, [subUnitsData, initialValues.unit_id])

//   // ** to update value of initialvalue.tax each item  initialvalue.tax_id
//   useEffect(() => {
//     if (taxValues) {
//       const tax = taxValues.find(tax => tax.id === initialValues.tax_id)
//       if (tax) {
//         setFieldValue('tax', tax.value)
//         setFieldValue('my_fav_per', 'محمد صلى الله عليه وسلم')
//       }
//     }
//   }, [initialValues.tax_id, taxValues, setFieldValue])

//   console.log('tax Values 🤍🤍', taxValues)
//   console.log('taxes selector 💦🤍', taxes)

//   if (initialValues.product_type) {
//     return (
//       <Card style={{ height: '100%', width: '100%' }} ref={cardRef}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, spacing: 2 }}>
//           <CardHeader title='Product Prices' />
//           <Divider sx={{ m: '0 !important' }} />
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '1rem',
//             marginBottom: '1rem',
//             width: '100%',
//             padding: '0px 1rem'
//           }}
//         >
//           <FormControl fullWidth>
//             <InputLabel>Applicable Tax:</InputLabel>
//             <Select value={initialValues.tax_id} onChange={handleChange} label='Applicable Tax' name='tax_id'>
//               <MenuItem value=''>Please Select</MenuItem>
//               {taxValues.length > 0 &&
//                 taxValues.map(tax => (
//                   <MenuItem key={tax.id} value={tax.id}>
//                     {tax.name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Product Type</InputLabel>
//             <Select value={initialValues.product_type} onChange={handleChange} label='Product Type' name='product_type'>
//               <MenuItem value={'single'}>Single</MenuItem>
//               <MenuItem value={'variable'}>Variable</MenuItem>
//               <MenuItem value={'combo'}>Combo</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
//             <Select
//               value={initialValues.unit_id}
//               onChange={handleChange}
//               required
//               name='unit_id'
//               id='demo-simple-select'
//               label='Unit'
//               fullWidth
//               onBlur={handleBlur}
//               disabled={true}
//               error={touched.unit_id && !!errors.unit_id}
//             >
//               {unitsData.map(unit => (
//                 <MenuItem key={unit.id} value={unit.id} disabled={initialValues.unit_id === unit.id ? false : true}>
//                   {unit.value}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         {initialValues.product_type === 'single' && (
//           <Box padding={2}>
//             <DataGrid autoHeight columns={columns} rowHeight={120} rows={initialValues.tableData} />
//             {subUnitsIds.length > 0 && (
//               <Button
//                 variant='contained'
//                 color='primary'
//                 onClick={() => {
//                   setShowMore(!showMore)
//                 }}
//               >
//                 {showMore ? 'Show Less' : 'Show More'}
//               </Button>
//             )}
//           </Box>
//         )}

//         {showMore &&
//           subUnitsIds.length > 0 &&
//           subUnitsIds.map((subUnit, index) => (
//             <Box
//               key={index}
//               sx={{
//                 marginTop: '1rem',
//                 padding: '1rem',
//                 border: '1px solid ',
//                 borderRadius: '10px',
//                 borderColor: theme => theme.palette.divider
//               }}
//             >
//               <Grid item xs={6} sx={{ my: 5 }}>
//                 <FormControl fullWidth>
//                   <InputLabel id='demo-simple-select-label'>Sub Unit</InputLabel>
//                   <Select
//                     value={initialValues.sub_unit_id}
//                     onChange={handleChange}
//                     multiple
//                     name='sub_unit_id'
//                     id='demo-simple-select'
//                     label='Sub Unit'
//                     fullWidth
//                     renderValue={selected =>
//                       filteredSubUnitsData && filteredSubUnitsData.length > 0 ? (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                           <Chip
//                             label={filteredSubUnitsData.find(subUnit => subUnit.id === selected[index])?.name || null}
//                             onDelete={() => {
//                               const updatedSubUnitIds = initialValues.sub_unit_id.filter(
//                                 item => item !== selected[index]
//                               )
//                               setFieldValue('sub_unit_id', updatedSubUnitIds)
//                               setFilteredSubUnitsData(filteredSubUnitsData.filter(item => item.id !== selected[index]))
//                             }}
//                           />
//                         </Box>
//                       ) : null
//                     }
//                     onBlur={handleBlur}
//                     disabled={true}
//                   >
//                     {initialValues.sub_unit_id.length >= 2 && (
//                       <MenuItem value='' disabled>
//                         <em>You can select only up to two sub units</em>
//                       </MenuItem>
//                     )}
//                     {filteredSubUnitsData.map(subUnit => (
//                       <MenuItem
//                         key={subUnit.id}
//                         value={subUnit.id}
//                         disabled={!initialValues.sub_unit_id.includes(subUnit.id)}
//                       >
//                         {subUnit.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <DataGrid
//                 autoHeight
//                 columns={index === 0 ? columnsChildOne : columnsChildTwo}
//                 rowHeight={120}
//                 rows={index === 0 ? initialValues.tableDataChildOne : initialValues.tableDataChildTwo}
//               />
//             </Box>
//           ))}
//         {initialValues.product_type === 'variable' && <ProductVariable />}
//         {initialValues.product_type === 'combo' && <Typography>Under Developments</Typography>}
//       </Card>
//     )
//   }

//   // if (initialValues.product_type === 'variable') {
//   //   return <Typography>Under Developments</Typography>
//   // }
// }

// export default ProductPrices

const AddOpeningStock = () => {
  return (
    <div>
      <h1>Add Opening Stock 🎉</h1>
    </div>
  )
}

export default AddOpeningStock
