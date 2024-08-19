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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { Button, ButtonGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/getJournalVoucherSlice'

// ** Custom Table Components Imports
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import AddPopUp from 'src/@core/components/vouchers/JournalVoucher/AddPopUp'
// ** Styled Component
import FilterRangePopUp from '../list/FilterRangePopUp'
import ViewPopUp from 'src/@core/components/vouchers/JournalVoucher/ViewPopUp'
import EditJournalVoucherPopUp from 'src/@core/components/vouchers/JournalVoucher/EditJournalVoucherPopUp'
import { deleteJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/postDeleteJournalVoucher'
import JournalEntry from 'src/@core/components/vouchers/JournalVoucher/JornalEntry'
import AttachmentJournalVoucher from 'src/@core/components/vouchers/JournalVoucher/AttachmentJournalVoucher'

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

    dispatch(deleteJournalVoucher({ id }))
      .then(() => {
        dispatch(fetchJournalVoucher(token, url))

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
      url: `${url}/app/react/journal-voucher/print/${id}`,
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
          name={'Journal Voucher'}
        />
      )}
      {openView && <ViewPopUp open={openView} toggle={handleView} id={id} />}
      {openEdit && <EditJournalVoucherPopUp open={openEdit} handleClose={handleEdit} id={id} />}

      {openViewAttachments && (
        <AttachmentJournalVoucher open={openViewAttachments} toggle={handleViewAttachments} id={id} />
      )}

      {openEntry && <JournalEntry open={openEntry} toggle={setOpenEntry} itemId={id} />}
    </Fragment>
  )
}

const JournalVoucher = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const title = 'Journal Voucher List'

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // ** Date Range
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [openDateRange, setOpenDateRange] = useState(false)
  const transText = getCookie('fontStyle')
  const FilterInitial = getCookie('FilterInitial')
  const currency_code = getCookie('currency_code')
  const decimalFormat = getCookie('DecimalFormat')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  // ** for BTN
  const [active, setActive] = useState(FilterInitial || 'month')
  const [btnValue, setBtnValue] = useState(FilterInitial || 'month')
  const [month, setMonth] = useState(FilterInitial === 'month' ? new Date() : null)
  const [day, setDay] = useState(FilterInitial === 'day' ? new Date() : null)
  const [week, setWeek] = useState(FilterInitial === 'week' ? new Date() : null)

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
      field: 'amount',
      headerName: 'Amount',
      renderCell: ({ row }) => {
        return (
          <Typography variant='body2' color='textSecondary'>
            {CurrencySymbolPlacement === 'after'
              ? `${Number(row.amount).toFixed(decimalFormat)} ${currency_code} `
              : `${currency_code} ${Number(row.amount).toFixed(decimalFormat)} `}
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

  const store = useSelector(state => state.getJournalVouchers?.data?.value)

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
    dispatch(fetchJournalVoucher())
  }, [dispatch])

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

  console.log('date ', week, day, month, startDate, endDate, active)

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
            <ButtonGroup variant='outlined' aria-label='Basic button group'>
              <Button
                onMouseEnter={() => {
                  setActive('month')
                }}
                onClick={() => {
                  setActive('month')
                  setBtnValue('month')
                  setMonth(new Date())
                  setStartDate(null)
                  setEndDate(null)

                  setWeek(null)
                  setDay(null)
                }}
                variant={btnValue === 'month' ? 'contained' : 'outlined'}
                sx={{ textTransform: transText }}
              >
                Month
              </Button>
              <Button
                variant={btnValue === 'week' ? 'contained' : 'outlined'}
                sx={{ textTransform: transText }}
                onMouseEnter={() => {
                  setActive('week')
                }}
                onClick={() => {
                  setActive('week')
                  setBtnValue('week')
                  setWeek(new Date())
                  setMonth(null)
                  setDay(null)
                  setStartDate(null)
                  setEndDate(null)
                }}
              >
                Week
              </Button>
              <Button
                onMouseEnter={() => {
                  setActive('day')
                }}
                variant={btnValue === 'day' ? 'contained' : 'outlined'}
                sx={{ textTransform: transText }}
                onClick={() => {
                  setActive('day')
                  setBtnValue('day')
                  setDay(new Date())
                  setMonth(null)
                  setWeek(null)
                  setStartDate(null)
                  setEndDate(null)
                }}
              >
                Day
              </Button>
              <Button
                onMouseEnter={() => {
                  setActive('range')
                }}
                variant={btnValue === 'range' ? 'contained' : 'outlined'}
                sx={{ textTransform: transText }}
                onClick={() => {
                  setActive('range')
                  setBtnValue('range')
                  setOpenDateRange(true)
                  setMonth(null)
                  setWeek(null)
                  setDay(null)
                  setStartDate(null)
                  setEndDate(null)
                }}
              >
                Range
              </Button>
            </ButtonGroup>
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
          <FilterRangePopUp
            open={openDateRange}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
            popperPlacement={popperPlacement}
            handleClose={() => {
              setStartDate(null)
              setEndDate(null)
              setOpenDateRange(false)
            }}
          />
        )
      }
      {openAdd && (
        <AddPopUp
          open={openAdd}
          handleClose={() => {
            setOpenAdd(false)
          }}
        />
      )}
    </Grid>
  )
}

export default JournalVoucher
