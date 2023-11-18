// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { postDeleteUser } from 'src/store/apps/izoUsers/deleteUserSlice'

// ** Next Imports
import Link from 'next/link'
import { getCookie } from 'cookies-next'

// ** MUI Imports
import Box from '@mui/material/Box'

import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TotalTable from '../../totalTable/TotalTable'

// import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// import InputLabel from '@mui/material/InputLabel'
// import FormControl from '@mui/material/FormControl'
// import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers } from 'src/store/apps/contacts/getSuppliersSlice'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
// import { CardStatsType } from 'src/@fake-db/types'
// import { ThemeColor } from 'src/@core/layouts/types'
// import { UsersType } from 'src/types/apps/userTypes'
// import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
// import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import DialogAddSuppliers from 'src/views/apps/contacts/suppliers/DialogAddSuppliers'
import SidebarEditUser from 'src/views/apps/user/list/EditUserDrawer'

// ** Vars
// const userRoleObj = {
//   admin: { icon: 'bx:mobile-alt', color: 'error' },
//   author: { icon: 'bx:cog', color: 'warning' },
//   editor: { icon: 'bx:edit', color: 'info' },
//   maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
//   subscriber: { icon: 'bx:user', color: 'primary' }
// }

const userStatusObj = {
  active: { title: 'active', color: 'success' },
  pending: { title: 'pending', color: 'warning' },
  inactive: { title: 'inactive', color: 'secondary' }
}

// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontWeight: 600,
//   fontSize: '1rem',
//   cursor: 'pointer',
//   textDecoration: 'none',
//   color: theme.palette.text.secondary,
//   '&:hover': {
//     color: theme.palette.primary.main
//   }
// }))

// ** renders client column
const renderClient = row => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row?.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
      >
        {getInitials(row?.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const rowOptionsOpen = anchorEl

  // ** Cookies

  const token = getCookie('token')
  const url = getCookie('apiUrl')

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    if (!id || !token) {
      console.log('Invalid id or token')
      handleRowOptionsClose()

      return
    }

    dispatch(postDeleteUser({ id }))
      .then(() => {
        dispatch(fetchIzoUsers(token, url))
        console.log('User deleted id, token, url', id, token, url)
        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting user:', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }

  const handleEdit = () => {
    setEditUserOpen(!editUserOpen)
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='bx:dots-vertical-rounded' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/apps/contacts/view/${id}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit()
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:pencil' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:money' fontSize={20} />
          Pay
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:power-off' fontSize={20} />
          Deactivate
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mingcute:paper-line' fontSize={20} />
          Ledger
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='uiw:paper-clip' fontSize={20} />
          Documents & Notes
        </MenuItem>
      </Menu>
      {editUserOpen && <SidebarEditUser open={editUserOpen} toggle={handleEdit} itemId={id} />}
    </Fragment>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Date',
    headerName: 'Date',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.Date ? row.Date : 'No date available'}
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
        {renderClient(row)}
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
        {row?.Reference_no ? row.Reference_no : 'Not available'}
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
        {renderClient(row)}
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
        {row?.Debit ? row.Debit : 'No Mobile'}
      </Typography>
    ),
    footerName: 'Total Debit',
    footerRender: params => {
      const totalDebit = params.api.getDisplayedRows().reduce((sum, row) => sum + (row.data.Debit || 0), 0)

      return <Typography noWrap sx={{ color: 'text.secondary' }}>{`Total: ${totalDebit}`}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'Credit',
    headerName: 'Credit',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.Credit ? row.Credit : 'No Data'}
      </Typography>
    ),
    footerName: 'Total Credit',
    footerRender: params => {
      const totalCredit = params.api.getDisplayedRows().reduce((sum, row) => sum + (row.data.Credit || 0), 0)

      return <Typography noWrap sx={{ color: 'text.secondary' }}>{`Total: ${totalCredit}`}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'balance',
    headerName: 'Balance',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.balance ? `${row.balance} AED` : 'No Data'}
      </Typography>
    ),
    footerName: 'Total Balance',
    footerRender: params => {
      const totalBalance = params.api.getDisplayedRows().reduce((sum, row) => sum + (row.data.balance || 0), 0)

      return <Typography noWrap sx={{ color: 'text.secondary' }}>{`Total: ${totalBalance} AED`}</Typography>
    }
  },

  {
    flex: 0.25,
    minWidth: 140,
    field: 'Note',
    headerName: 'Note',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.Note ? row.Note : 'No Data'}
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

const LedgerTable = ({ title }) => {
  // ** States
  // const [addSupplierOpen, setSupplierOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const [data, setData] = useState(null)

  // ** Hooks
  const dispatch = useDispatch()

  // const store = useSelector(state => state.getSuppliers?.data?.contact)

  // useEffect(() => {
  //   setData(store)
  // }, [store])

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
    const filteredRows = data.filter(row => {
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
  const dummyData = [
    {
      id: 1,
      Date: '2023-01-01',
      'Source No.': 'ABC123',
      'Reference No': 'REF001',
      type: 'Type1',
      Debit: 100,
      Credit: 50,
      balance: 50,
      Note: 'Sample Note 1'
    },
    {
      id: 2,
      Date: '2023-01-02',
      'Source No.': 'XYZ789',
      'Reference No': 'REF002',
      type: 'Type2',
      Debit: 150,
      Credit: 75,
      balance: 75,
      Note: 'Sample Note 2'
    }
  ]
  const totalDebit = dummyData.reduce((sum, row) => sum + (row.Debit || 0), 0)
  const totalCredit = dummyData.reduce((sum, row) => sum + (row.Credit || 0), 0)
  const totalBalance = dummyData.reduce((sum, row) => sum + (row.balance || 0), 0)
  const totalData = [
    {
      name: 'Total Credit',
      value: totalCredit
    },
    {
      name: 'Total Debit',
      value: totalDebit
    },
    {
      name: 'Total Balance',
      value: totalBalance
    }
  ]
  const CustomFooter = ({ data }) => {
    const totalDebit = data.reduce((sum, row) => sum + (row.Debit || 0), 0)
    const totalCredit = data.reduce((sum, row) => sum + (row.Credit || 0), 0)
    const totalBalance = data.reduce((sum, row) => sum + (row.balance || 0), 0)

    return (
      <Box display='flex' justifyContent='flex-start' alignItems='center' padding={2}>
        <Typography color='textSecondary'>
          {`Total Debit: ${totalDebit} | Total Credit: ${totalCredit} | Total Balance: ${totalBalance}`}
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardHeader title={title} />
        <Divider sx={{ m: '0 !important' }} />

        {/* <Box
        sx={{
          p: 6,
          gap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button startIcon={<AddCircleOutlineIcon />} onClick={toggleAddSuppliersDrawer} variant='contained'>
            Add
          </Button>
        </Box>
      </Box>
      <Box> */}
        <>
          <div>
            <DataGrid
              sx={{ position: 'relative' }}
              autoHeight
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              slots={{ toolbar: QuickSearchToolbar }}
              onPaginationModelChange={setPaginationModel}
              rows={dummyData}
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
          </div>
          <TotalTable data={totalData} />
          {/* <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Total Credit</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Debit</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Balance</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>7657</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>7657</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>543</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
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
