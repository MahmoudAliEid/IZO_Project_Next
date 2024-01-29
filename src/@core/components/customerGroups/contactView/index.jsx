// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** MUI Imports
import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TotalTable from '../../totalTable/TotalTable'

import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Store Imports
import { useSelector } from 'react-redux'

// ** Third Party Components
import axios from 'axios'

const columns = [
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Date',
    headerName: 'Date',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.date ? new Date(row.date).toLocaleString() : 'No date available'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Source No.',
    headerName: 'Source No.',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Assuming renderClient is a function you've defined */}

        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.source_no ? row.source_no : 'Not available'}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Reference No',
    headerName: 'Reference No',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.reference_no ? row.reference_no : 'Not available'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{row?.type}</Box>
      </Box>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Debit',
    headerName: 'Debit',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.debit ? `${row.debit} AED` : 'No Data'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Credit',
    headerName: 'Credit',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.credit || row.credit === 0 ? `${row.credit} AED` : 'No Data'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'balance',
    headerName: 'Balance',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.amount ? `${row.amount}/${row.type}` : 'No Data'}
      </Typography>
    )
  },

  {
    flex: 0.25,
    minWidth: 140,
    field: 'Note',
    headerName: 'Note',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.note ? row.note : 'No Data'}
      </Typography>
    )
  }
]

// const columns = [
//   {
//     field: 'Date',
//     headerName: 'Date',
//     footerName: 'Total Date'
//   },
//   {
//     field: 'Source No.',
//     headerName: 'Source No.',
//     footerName: 'Total Source No.'
//   },
//   {
//     field: 'Reference No',
//     headerName: 'Reference No',
//     footerName: 'Total Reference No'
//   },
//   {
//     field: 'type',
//     headerName: 'Type',
//     footerName: 'Total Type'
//   },
//   {
//     field: 'Debit',
//     headerName: 'Debit',
//     footerName: 'Total Debit'
//   },
//   {
//     field: 'Credit',
//     headerName: 'Credit',
//     footerName: 'Total Credit'
//   },
//   {
//     field: 'balance',
//     headerName: 'Balance',
//     footerName: 'Total Balance'
//   }
// ]

const LedgerTable = ({ title, printData }) => {
  // ** States
  // const [addSupplierOpen, setSupplierOpen] = useState(false)
  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // const [token, setToken] = useState('')
  // const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const [dataRows, setDataRows] = useState(null)

  // ** Hooks
  // const dispatch = useDispatch()

  const dataFetch = useSelector(state => state.getViewContact?.data?.response.ledger.rows)

  useEffect(() => {
    if (dataFetch) {
      setDataRows(dataFetch)
    } else if (printData) {
      setDataRows(printData)
    }
  }, [dataFetch, printData])

  console.log(dataRows, ' dataRows')

  // ** Cookies
  // useEffect(() => {
  //   const token = getCookie('token')
  //   const url = getCookie('apiUrl')

  //   setToken(token)

  //   setUrl(url)
  // }, [token, url])

  // useEffect(() => {
  //   if (token && url) {
  //     dispatch(fetchSuppliers(token, url))
  //   }
  // }, [dispatch, token, url])

  // const handleFilter = useCallback((val: string) => {
  //   setValue(val)
  // }, [])

  // const handleRoleChange = useCallback((e: SelectChangeEvent) => {
  //   setRole(e.target.value)
  // }, [])

  // const handlePlanChange = useCallback((e: SelectChangeEvent) => {
  //   setPlan(e.target.value)
  // }, [])

  // const handleStatusChange = useCallback((e: SelectChangeEvent) => {
  //   setStatus(e.target.value)
  // }, [])

  // ** PDF
  // const generatePDF = useReactToPrint({

  //   content: () => componentPDF.current,
  //   documentTitle: "Suppliers",
  // })

  // const toggleAddSuppliersDrawer = () => setSupplierOpen(!addSupplierOpen)

  // ** handle search function
  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = dataRows.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  const formatLabel = property => {
    if (property === 'amount') return 'Balance'

    return property
  }
  const TotalData = () => {
    const salesProperties = ['debit', 'credit', 'amount']

    const total = salesProperties
      .map(property => {
        if (dataRows) {
          const value = dataRows.reduce((sum, row) => sum + (row[property] || 0), 0)

          if (value || value === 0) {
            return { name: 'Total' + ' ' + formatLabel(property), value }
          }

          return null
        }
      })
      .filter(item => item !== null)

    return total
  }

  const totalData = TotalData()

  // const dummyData = [
  //   {
  //     id: 1,
  //     Date: '2023-01-01',
  //     'Source No.': 'ABC123',
  //     'Reference No': 'REF001',
  //     type: 'Type1',
  //     Debit: 100,
  //     Credit: 50,
  //     balance: 50,
  //     Note: 'Sample Note 1'
  //   },
  //   {
  //     id: 2,
  //     Date: '2023-01-02',
  //     'Source No.': 'XYZ789',
  //     'Reference No': 'REF002',
  //     type: 'Type2',
  //     Debit: 150,
  //     Credit: 75,
  //     balance: 75,
  //     Note: 'Sample Note 2'
  //   }
  // ]
  // const totalDebit = dummyData.reduce((sum, row) => sum + (row.debit || 0), 0)
  // const totalCredit = dummyData.reduce((sum, row) => sum + (row.credit || 0), 0)
  // const totalBalance = dummyData.reduce((sum, row) => sum + (row.amount || 0), 0)
  // const totalData = [
  //   {
  //     name: 'Total Credit',
  //     value: totalCredit
  //   },
  //   {
  //     name: 'Total Debit',
  //     value: totalDebit
  //   },
  //   {
  //     name: 'Total Balance',
  //     value: totalBalance
  //   }
  // ]
  // const CustomFooter = ({ data }) => {
  //   const totalDebit = data.reduce((sum, row) => sum + (row.Debit || 0), 0)
  //   const totalCredit = data.reduce((sum, row) => sum + (row.Credit || 0), 0)
  //   const totalBalance = data.reduce((sum, row) => sum + (row.balance || 0), 0)

  //   return (
  //     <Box display='flex' justifyContent='flex-start' alignItems='center' padding={2}>
  //       <Typography color='textSecondary'>
  //         {`Total Debit: ${totalDebit} | Total Credit: ${totalCredit} | Total Balance: ${totalBalance}`}
  //       </Typography>
  //     </Box>
  //   )
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardHeader title={title} />
        <Divider sx={{ m: '0 !important' }} />
        {/* <Box sx={{ display: 'flex', padding: '10px 0', justifyContent: 'flex-start' }}>
          <Typography sx={{ color: 'text.secondary' }}>
            TEST 33002, Dubai,<br></br> Dubai Dubai, 00426
          </Typography>
        </Box>
        <Grid container spacing={6} sx={{ padding: '25px 0' }}>
          <Grid item xs={12} lg={6} md={12}>
            <CustomTable />
          </Grid>
          <Grid item xs={12} lg={6} md={12}>
            <CustomTable />
          </Grid>
        </Grid> */}

        <>
          {dataRows ? (
            <>
              <DataGrid
                sx={{ position: 'relative' }}
                autoHeight
                columns={columns}
                disableRowSelectionOnClick
                slots={{ toolbar: QuickSearchToolbar }}
                rows={filteredData.length ? filteredData : dataRows}
                slotProps={{
                  baseButton: {
                    variant: 'outlined'
                  },
                  toolbar: {
                    value: searchText,
                    clearSearch: () => handleSearch(''),
                    onChange: event => handleSearch(event.target.value)
                  }
                }}
              />
              <Grid container spacing={6}>
                <Grid item xs={12} lg={12} md={6}>
                  <TotalTable data={totalData} />
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}
              >
                <Box>
                  <ProgressCustomization />
                </Box>
              </Box>
            </Grid>
          )}
        </>
        {/* {data ? (

        ) : (
          <Grid>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <Box>
                <ProgressCustomization />
              </Box>
            </Box>
          </Grid>
        )} */}
      </Grid>
    </Grid>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/apps/users/stats')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default LedgerTable
