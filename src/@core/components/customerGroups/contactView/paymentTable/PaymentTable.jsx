// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import CustomProgress from 'src/@core/components/customProgress/CustomProgress'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// import { postDeleteUser } from 'src/store/apps/izoUsers/deleteUserSlice'
// import CustomTable from './customTable/CustomTable'

// ** Next Imports
import Link from 'next/link'

// import { getCookie } from 'cookies-next'

// ** MUI Imports
// import Box from '@mui/material/Box'

import Menu from '@mui/material/Menu'

// import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// import Paper from '@mui/material/Paper'
// import Table from '@mui/material/Table'
// import TableRow from '@mui/material/TableRow'
// import TableHead from '@mui/material/TableHead'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
import TotalTable from 'src/@core/components/totalTable/TotalTable'

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
// useDispatch,
import { useSelector } from 'react-redux'

// import { fetchSuppliers } from 'src/store/apps/contacts/getSuppliersSlice'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
// import axios from 'axios'

// ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
// import { CardStatsType } from 'src/@fake-db/types'
// import { ThemeColor } from 'src/@core/layouts/types'
// import { UsersType } from 'src/types/apps/userTypes'
// import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
// import TableHeader from 'src/views/apps/user/list/TableHeader'
// import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
// import DialogAddSuppliers from 'src/views/apps/contacts/suppliers/DialogAddSuppliers'
// import SidebarEditUser from 'src/views/apps/user/list/EditUserDrawer'
// import { display } from '@mui/system'

// ** Vars
// const userRoleObj = {
//   admin: { icon: 'bx:mobile-alt', color: 'error' },
//   author: { icon: 'bx:cog', color: 'warning' },
//   editor: { icon: 'bx:edit', color: 'info' },
//   maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
//   subscriber: { icon: 'bx:user', color: 'primary' }
// }

// const statusObj = {
//   paid: { title: 'Paid', color: 'success' },
//   due: { title: 'Due', color: 'warning' },
//   inactive: { title: 'inactive', color: 'secondary' }
// }

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
// const renderClient = row => {
//   if (row?.avatar?.length) {
//     return <CustomAvatar src={row?.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row?.avatarColor || 'primary'}
//         sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
//       >
//         {getInitials(row?.name ? row.name : '!')}
//       </CustomAvatar>
//     )
//   }
// }

const RowOptions = ({ id }) => {
  // ** Hooks
  // const dispatch = useDispatch()

  // ** State
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const rowOptionsOpen = anchorEl

  // ** Cookies

  // const token = getCookie('token')
  // const url = getCookie('apiUrl')

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    console.log('Handle Delete')

    // if (!id || !token) {
    //   console.log('Invalid id or token')
    //   handleRowOptionsClose()

    //   return
    // }

    // dispatch(postDeleteUser({ id }))
    //   .then(() => {
    //     dispatch(fetchIzoUsers(token, url))
    //     console.log('User deleted id, token, url', id, token, url)
    //     handleRowOptionsClose()
    //   })
    //   .catch(error => {
    //     console.error('Error deleting user:', error)

    //     // Handle the error as needed
    //     handleRowOptionsClose()
    //   })
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
      {/* {editUserOpen && <SidebarEditUser open={editUserOpen} toggle={handleEdit} itemId={id} />} */}
    </Fragment>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 160,
    field: 'Paid on',
    headerName: 'Paid on',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.paid_on ? new Date(row.paid_on).toLocaleString() : 'No date available'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 160,
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
    minWidth: 160,
    field: 'Amount',
    headerName: 'Amount',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.amount ? `${row.amount} AED` : 'No Data'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 160,
    field: 'Payment Method',
    headerName: 'Payment Method',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.payment_method ? row.payment_method : 'Not available'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 160,
    field: 'Payment For',
    headerName: 'Payment For',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.payment_for ? row.payment_for : 'Not available'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const PaymentTable = () => {
  // ** States

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const [dataRows, setDataRows] = useState(null)

  // ** Hooks
  const dataFetch = useSelector(state => state.getViewContact?.data?.response.payment)

  useEffect(() => {
    setDataRows(dataFetch)
  }, [dataFetch])

  console.log(dataRows, ' dataRows')

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

  const formatLabel = property => {
    // Remove hyphens and capitalize the first letter of each word
    // const formattedProperty = property.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, match => match.toUpperCase())

    // return formatted Property
    if (property === 'sub_total') return 'Total Amount'
    if (property === 'paid_total') return 'Total Paid'
    if (property === 'total') return 'Total Sell Due'
    if (property === 'sell_return_due') return 'Total Sell Return Due'

    // If none of the conditions match, return the original property
    return property
  }
  const TotalData = () => {
    const salesProperties = ['sub_total', 'paid_total', 'total', 'sell_return_due']

    const total = salesProperties
      .map(property => {
        if (dataRows) {
          const value = dataRows.reduce((sum, row) => sum + (row[property] || 0), 0)

          if (value) {
            return { name: formatLabel(property), value }
          }

          return null
        }
      })
      .filter(item => item !== null)

    return total
  }

  const totalData = TotalData()

  console.log(totalData, 'Total Data')
  console.log(dataRows, 'payment Data')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardHeader title='Payments' />
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
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                slots={{ toolbar: QuickSearchToolbar }}
                onPaginationModelChange={setPaginationModel}
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
                <Grid item xs={12} lg={12} md={2}>
                  <TotalTable data={totalData} />
                </Grid>
              </Grid>
            </>
          ) : (
            <CustomProgress />
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

export default PaymentTable
