// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Next Imports

import { getCookie } from 'cookies-next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { useTheme, styled } from '@mui/material/styles'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers } from 'src/store/apps/contacts/getSuppliersSlice'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Table Components Imports
import { postDeleteContact } from 'src/store/apps/contacts/deleteContactSlice'
import DialogAddSuppliers from 'src/views/apps/contacts/suppliers/DialogAddSuppliers'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import CustomDateRange from './CustomDateRange'
import VoucherViewPopUp from 'src/@core/components/vouchers/VoucherViewPopUp'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { fetchVouchers } from 'src/store/apps/vouchers/getVouchersSlice'
import VouchersTransactionPopUp from 'src/@core/components/vouchers/VouchersTransactionPopUp'
import { Button } from '@mui/material'
import VoucherEditPopUp from 'src/@core/components/vouchers/VoucherEditPopUp'

// const userStatusObj = {
//   receipt_voucher: { title: 'Receipt Voucher', color: 'success' },
//   pending: { title: 'pending', color: 'warning' },
//   payment_voucher: { title: 'Payment Voucher', color: 'secondary' }
// }

const LinkStyled = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
      >
        {getInitials(row.contact_id ? String(row.contact_id) : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id, type }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

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

    dispatch(postDeleteContact({ id, url }))
      .then(() => {
        dispatch(fetchSuppliers(token, url))

        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting user:', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }

  const handleEdit = () => {
    setOpenEdit(!openEdit)
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
          sx={{ '& svg': { mr: 2 } }}
          onClick={() => {
            setOpenView(true)
            handleRowOptionsClose()
          }}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit()
            setOpenEdit(true)
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:pencil' fontSize={20} />
          Edit
        </MenuItem>

        {/* print */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='mingcute:print-line' fontSize={20} />
          Print
        </MenuItem>

        {/* attachments */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:paperclip' fontSize={20} />
          Attachments
        </MenuItem>

        {/* entry */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon={'bx:file'} fontSize={20} />
          Entry
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpenDeleteAlert(true)
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      {openDeleteAlert && (
        <DeleteGlobalAlert
          open={openDeleteAlert}
          close={() => setOpenDeleteAlert(!openDeleteAlert)}
          mainHandleDelete={handleDelete}
          name={type.charAt(0).toUpperCase() + type.slice(1)}
        />
      )}
      {openView && <VoucherViewPopUp open={openView} toggle={setOpenView} itemId={id} />}

      {openEdit && <VoucherEditPopUp open={openEdit} toggle={handleEdit} itemId={id} />}
    </Fragment>
  )
}

const RowOptionsTransactions = ({ row }) => {
  // ** State
  const [openTransaction, setOpenTransaction] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleTransactionClick = () => {
    setOpenTransaction(true)
  }

  const rowOptionsOpen = anchorEl

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Button size='small' onClick={handleRowOptionsClick} sx={{ my: 3 }}>
        Invoices
      </Button>
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
        {row.payments.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleRowOptionsClose()
              handleTransactionClick()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:pencil' fontSize={20} />
            <LinkStyled>{item.transaction_id}</LinkStyled>
          </MenuItem>
        ))}
      </Menu>
      {openTransaction && <VouchersTransactionPopUp open={openTransaction} toggle={setOpenTransaction} />}
    </Fragment>
  )
}

const columns = [
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} type={row.type} />
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'ref_no ',
    headerName: 'Ref No',
    renderCell: ({ row }) => {
      const { ref_no } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {ref_no ? ref_no : 'Not available'}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 1,
    minWidth: 300,
    field: 'contact_id',
    headerName: 'Contact',
    renderCell: ({ row }) => {
      const { contact_id } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', fontSize: '12px' }}>
            {contact_id}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'account_id',
    headerName: 'Account',
    renderCell: ({ row }) => {
      const { account_id } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{account_id}</Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 160,
    field: 'text',
    headerName: 'Text',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }} variant={'caption'}>
          {row.text ? row.text : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 160,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.amount ? 'AED ' + Number(row.amount).toFixed(2) : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 170,
    field: 'payments',
    headerName: 'Bill Amount',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ p: 1 }}>
          <Typography noWrap sx={{ color: 'text.secondary', pb: 1 }}>
            {row.payments
              ? 'AED ' +
                row.payments
                  .map(item => Number(item.amount))
                  .reduce((acc, curr) => acc + curr, 0)
                  .toFixed(2)
              : 'Not available'}
          </Typography>
          {row.payments && row.payments.length ? <RowOptionsTransactions row={row} /> : null}
        </Box>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 180,
    field: 'type',
    headerName: 'Type',
    renderCell: params => {
      // const status = userStatusObj[params.row.type]

      return (
        <CustomChip rounded size='small' skin='light' color={'success'} label={params.row.type} />
        // <Typography noWrap sx={{ color: 'text.secondary' }}>
        //   {params.row.type}
        // </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'date',
    headerName: 'Date',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.date ? row.date : 'Not available'}
        </Typography>
      )
    }
  }
]

const VouchersList = () => {
  // ** States
  const [addSupplierOpen, setSupplierOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const title = 'Vouchers List'

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  //create dammy data for testing
  // const dammyData = [
  //   {
  //     id: 1,
  //     Ref_No: 'Ref No 1',
  //     contact: 'John Doe',
  //     amount: '1000',
  //     bill_amount: '2000',
  //     account: 'Account 1',
  //     type: 'receipt_voucher',
  //     date: '12/12/2021'
  //   },
  //   {
  //     id: 2,
  //     Ref_No: 'Ref No 2',
  //     contact: 'John Doe',
  //     amount: '1000',
  //     bill_amount: '2000',
  //     account: 'Account 2',
  //     type: 'payment_voucher',
  //     date: '12/12/2021'
  //   }
  // ]

  const store = useSelector(state => state.getVouchers.brands.value)

  useEffect(() => {
    setData(store)
  }, [store])

  // ** Cookies
  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    setToken(token)

    setUrl(url)
  }, [token, url])

  useEffect(() => {
    if (token && url) {
      dispatch(fetchVouchers(token, url))
    }
  }, [dispatch, token, url])

  const toggleAddSuppliersDrawer = () => setSupplierOpen(!addSupplierOpen)

  // ** handle search function

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        const fieldValue = row[field]

        return fieldValue !== null && fieldValue !== undefined && searchRegex.test(fieldValue.toString())
      })
    })

    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  // see if data is available
  console.log('data of Vouchers :', data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* create filter component */}
        <Card>
          <CardHeader title='Filters' />
          <Divider />
          <Box sx={{ p: 6 }}>
            <DatePickerWrapper>
              <CustomDateRange popperPlacement={popperPlacement} />
            </DatePickerWrapper>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              px: 6,
              gap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <CardHeader title={title} />
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box>
            {data ? (
              <>
                <DataGrid
                  autoHeight
                  columns={columns}
                  getRowHeight={() => 'auto'}
                  disableRowSelectionOnClick
                  pageSizeOptions={[10, 25, 50]}
                  paginationModel={paginationModel}
                  slots={{ toolbar: QuickSearchToolbar }}
                  onPaginationModelChange={setPaginationModel}
                  rows={filteredData.length ? filteredData : data}
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
          </Box>
        </Card>
      </Grid>

      <DialogAddSuppliers open={addSupplierOpen} toggle={toggleAddSuppliersDrawer} isEdit={false} contact='supplier' />
    </Grid>
  )
}

export default VouchersList