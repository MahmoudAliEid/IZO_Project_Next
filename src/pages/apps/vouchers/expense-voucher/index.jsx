// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Next Imports
import { getCookie } from 'cookies-next'

// ** MUI Imports
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Button, CardHeader, IconButton, Typography, MenuItem, Divider, Grid, Menu, Card, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/getExpenseVoucher'
import { deleteExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/postDeleteExpenseVoucher'

// ** Custom Table Components Imports
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

// ** Styled Component
import PageFilter from 'src/@core/Global/PageFilter'
import FilterRangePage from 'src/@core/Global/FilterRangePopUp'
import ListLoading from 'src/@core/Global/ListLoading'
import AddExpensePopUp from 'src/@core/components/vouchers/expenseVoucher/AddExpensePopUp'
import ExpenseEntry from 'src/@core/components/vouchers/expenseVoucher/ExpenseEntry'
import AttachmentExpense from 'src/@core/components/vouchers/expenseVoucher/AttatchmentExpense'
import ViewExpense from 'src/@core/components/vouchers/expenseVoucher/ViewExpense'
import EditExpensePopUp from 'src/@core/components/vouchers/expenseVoucher/EditExpensePopUp'

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
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

    dispatch(deleteExpenseVoucher({ id }))
      .then(() => {
        dispatch(fetchExpenseVoucher(token, url))

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
  const handleView = () => {
    setOpenView(!openView)
  }

  const handlePrint = id => {
    // handle export to download file
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios({
      url: `${url}/app/react/expense-voucher/print/${id}`,
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

  const handleViewAttachments = () => {
    setOpenViewAttachments(!openViewAttachments)
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
            handleView()
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
          name={'Expense Voucher'}
        />
      )}
      {openView && <ViewExpense open={openView} toggle={handleView} id={id} />}
      {openEdit && <EditExpensePopUp open={openEdit} handleClose={handleEdit} id={id} />}

      {openViewAttachments && <AttachmentExpense open={openViewAttachments} toggle={handleViewAttachments} id={id} />}

      {openEntry && <ExpenseEntry open={openEntry} toggle={setOpenEntry} itemId={id} />}
    </Fragment>
  )
}

const ExpenseVoucher = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const title = 'Expense Voucher List'

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const transText = getCookie('fontStyle')
  const FilterInitial = getCookie('FilterInitial')
  const currency_code = getCookie('currency_code')
  const decimalFormat = getCookie('DecimalFormat')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  // ** for BTN
  const [openDateRange, setOpenDateRange] = useState(false)
  const [filterDate, setFilterDate] = useState({
    month: FilterInitial === 'month' ? new Date() : null,
    day: FilterInitial === 'day' ? new Date() : null,
    week: FilterInitial === 'week' ? new Date() : null,
    active: FilterInitial || 'month',
    startDate: null,
    endDate: null
  })

  // ** Columns
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
      flex: 0.25,
      minWidth: 160,
      field: 'total',
      headerName: 'Amount',
      renderCell: ({ row }) => {
        return (
          <Typography variant='body2' color='textSecondary'>
            {CurrencySymbolPlacement === 'after'
              ? `${Number(row.total).toFixed(decimalFormat)} ${currency_code} `
              : `${currency_code} ${Number(row.total).toFixed(decimalFormat)} `}
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

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const store = useSelector(state => state.getExpenseVoucher?.data?.value)

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
    dispatch(
      fetchExpenseVoucher({
        month: filterDate.month,
        week: filterDate.week,
        day: filterDate.day,
        startDate: filterDate.startDate,
        endDate: filterDate.endDate
      })
    )
  }, [dispatch, filterDate])

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
              <ListLoading />
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
        <AddExpensePopUp
          open={openAdd}
          handleClose={() => {
            setOpenAdd(false)
          }}
        />
      )}
    </Grid>
  )
}

export default ExpenseVoucher
