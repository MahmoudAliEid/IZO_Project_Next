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
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Table Components Imports
import { deleteVoucher } from 'src/store/apps/vouchers/postDeleteVoucherSlice'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
// import CustomDateRange from './CustomDateRange'
import VoucherViewPopUp from 'src/@core/components/vouchers/VoucherViewPopUp'

// ** Styled Component
import { fetchVouchers } from 'src/store/apps/vouchers/getVouchersSlice'
import VouchersTransactionPopUp from 'src/@core/components/vouchers/VouchersTransactionPopUp'
import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import VoucherEditPopUp from 'src/@core/components/vouchers/VoucherEditPopUp'
import VoucherAttachmentPopUp from 'src/@core/components/vouchers/VoucherAttachmentPopUp'
import EntryPopUp from 'src/@core/components/vouchers/EntryPopUp'
import PageFilter from 'src/@core/Global/PageFilter'
import AddReceiptVoucherPopUp from './AddReceiptVoucherPopUp'
import FilterRangePage from 'src/@core/Global/FilterRangePopUp'

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
  const [openViewAttachments, setOpenViewAttachments] = useState(false)
  const [openEntry, setOpenEntry] = useState(false)

  const rowOptionsOpen = anchorEl

  // ** Cookies
  const transText = getCookie('fontStyle')
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

    dispatch(deleteVoucher({ id }))
      .then(() => {
        dispatch(fetchVouchers(token, url))

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

  const handlePrint = id => {
    // handle export to download file
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios({
      url: `${url}/app/react/voucher/print/${id}`,
      method: 'GET',
      headers: headers
    })
      .then(response => {
        if (response.data && response.data.value) {
          axios({
            url: response.data.value,
            method: 'GET',
            responseType: 'blob' // important
          })
            .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', 'voucher.pdf') //or any other extension
              document.body.appendChild(link)
              link.click()
            })
            .catch(error => {
              console.error('Error in second axios request:', error)
            })
        } else {
          console.error('Response data or info is undefined:', response)
        }
      })
      .catch(error => {
        console.error('Error in first axios request:', error)
      })
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
        sx={{ textTransform: transText }}
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
            handlePrint(id)
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
            setOpenViewAttachments(true)
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
            setOpenEntry(true)
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
      {openViewAttachments && (
        <VoucherAttachmentPopUp open={openViewAttachments} toggle={setOpenViewAttachments} itemId={id} />
      )}

      {openEdit && (
        <VoucherEditPopUp
          open={openEdit}
          toggle={handleEdit}
          itemId={id}
          type={type === 'Receipt Voucher' ? 'receipt' : 'payment'}
        />
      )}

      {openEntry && (
        <EntryPopUp open={openEntry} toggle={setOpenEntry} itemId={id} name={'getViewEntry'} type={'voucher'} />
      )}
    </Fragment>
  )
}

const RowOptionsTransactions = ({ row }) => {
  // ** State
  const [openTransaction, setOpenTransaction] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

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
            <LinkStyled>
              {item.transaction_id}{' '}
              {` ${
                item.amount
                  ? CurrencySymbolPlacement === 'after'
                    ? `(${Number(item.amount).toFixed(decimalFormat)} ${currency_code} )`
                    : `(${currency_code} ${Number(item.amount).toFixed(decimalFormat)} )`
                  : ''
              }`}
            </LinkStyled>
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
    flex: 0.5,
    minWidth: 200,
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

const ListReceiptVouchers = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const title = 'Receipt Vouchers List'

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const [openDateRange, setOpenDateRange] = useState(false)
  const transText = getCookie('fontStyle')
  const FilterInitial = getCookie('FilterInitial')
  // ** for BTN
  const [filterDate, setFilterDate] = useState({
    month: FilterInitial === 'month' ? new Date() : null,
    day: FilterInitial === 'day' ? new Date() : null,
    week: FilterInitial === 'week' ? new Date() : null,
    active: FilterInitial,
    startDate: null,
    endDate: null
  })

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              px: 6,
              gap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              textTransform: transText
            }}
          >
            <Box>
              <CardHeader sx={{ textTransform: transText }} title={title} />
            </Box>

            <PageFilter filterDate={filterDate} setFilterDate={setFilterDate} setOpenDateRange={setOpenDateRange} />

            <Box>
              <Button
                variant='contained'
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                  setOpenAdd(true)
                }}
              >
                Add
              </Button>
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
                  sx={{
                    '& .MuiDataGrid-cell': { textTransform: transText },
                    '& .MuiDataGrid-columnsContainer': {
                      textTransform: transText
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      // Corrected class name for header text
                      textTransform: transText
                    }
                  }}
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
      {
        // ** Date Range PopUp

        openDateRange && (
          <FilterRangePage
            open={openDateRange}
            setFilterDate={setFilterDate}
            filterDate={filterDate}
            popperPlacement={popperPlacement}
            handleClose={() => {
              setOpenDateRange(false)
            }}
          />
        )
      }
      {openAdd && (
        <AddReceiptVoucherPopUp
          open={openAdd}
          toggle={() => {
            setOpenAdd(false)
          }}
        />
      )}
    </Grid>
  )
}

export default ListReceiptVouchers
