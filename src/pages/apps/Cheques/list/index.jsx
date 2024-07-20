// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Next Imports
import { getCookie } from 'cookies-next'

// ** MUI Imports
import {
  Box,
  Card,
  Menu,
  Grid,
  Divider,
  MenuItem,
  IconButton,
  Typography,
  CardHeader,
  Button,
  ButtonGroup
} from '@mui/material'

// ** Styles
import { useTheme } from '@mui/material/styles'
// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'
// ** Axios
import axios from 'axios'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import VoucherAttachmentPopUp from 'src/@core/components/vouchers/VoucherAttachmentPopUp'
import EntryPopUp from 'src/@core/components/vouchers/EntryPopUp'
import ViewCheque from 'src/@core/components/cheques/ViewCheque'
import ChequeEdit from 'src/@core/components/cheques/ChequeEdit'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import DateRangePopUp from './DateRangePopUp'
import DropDownAccounts from './DropDownAccounts'

// ** Number Format
import { NumericFormat } from 'react-number-format'
// import { TextField } from '@mui/material'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Store & Actions
import { fetchCheques } from 'src/store/apps/Cheques/getChequesSlice'
import { collect } from 'src/store/apps/Cheques/Actions/collect'
import { deleteCheques } from 'src/store/apps/Cheques/postDeleteChequesSlice'
import { unCollect } from 'src/store/apps/Cheques/Actions/unCollect'
import { refund } from 'src/store/apps/Cheques/Actions/refund'
import { deleteCollect } from 'src/store/apps/Cheques/Actions/postDeleteCollectSlice'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ------------------- ** Cheques List Elements ** -------------------
const StatusObj = {
  write: { title: 'Write', color: 'success' },
  collected: { title: 'collected', color: 'success' },
  unCollect: { title: 'un collect', color: 'secondary' },
  Refund: { title: 'REFUND', color: 'error' }
}

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
        {getInitials(row.contactText ? String(row.contactText) : 'John Doe')}
      </CustomAvatar>
    )
  }
}

// ** Row options

const RowOptions = ({ id, statusName, document, dueDate, editType }) => {
  // ** Hooks
  const dispatch = useDispatch()
  console.log('Status Name =>', statusName)
  const transText = getCookie('fontStyle')

  const type = 'cheque'

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openViewAttachments, setOpenViewAttachments] = useState(false)
  const [openEntry, setOpenEntry] = useState(false)
  const [openCollect, setOpenCollect] = useState(false)
  const [openDeleteCollect, setOpenDeleteCollect] = useState(false)
  const [openUnCollectAlert, setOpenUnCollectAlert] = useState(false)
  const [openRefundAlert, setOpenRefundAlert] = useState(false)

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

    dispatch(deleteCheques({ id }))
      .then(() => {
        dispatch(
          fetchCheques({
            token,
            url,
            startWriteDate: new Date('2023-06-12'),
            endWriteDate: new Date('2024-01-13'),
            startDueDate: new Date('2023-06-12'),
            endDueDate: new Date('2024-02-17')
          })
        )

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
      url: `${url}/app/react/cheque/print/${id}`,
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

  const handleCollect = ({ id, account_id, date }) => {
    dispatch(collect({ id, account_id, date })).then(res => {
      try {
        if (res.payload.status === 200) {
          dispatch(
            fetchCheques({
              token,
              url,
              startWriteDate: new Date('2023-06-12'),
              endWriteDate: new Date('2024-01-13'),
              startDueDate: new Date('2023-06-12'),
              endDueDate: new Date('2024-02-17')
            })
          )
        } else {
          console.error('Failed to collect:', res)
        }
      } catch (error) {
        console.error('Error in handleCollect:', error)
      }
    })
  }

  const handelUnCollect = async () => {
    await dispatch(unCollect({ itemId: id })).then(res => {
      if (res.payload.status == 200) {
        dispatch(
          fetchCheques({
            token,
            url,
            startWriteDate: new Date('2023-06-12'),
            endWriteDate: new Date('2024-01-13'),
            startDueDate: new Date('2023-06-12'),
            endDueDate: new Date('2024-02-17')
          })
        )
      }
      console.log('UnCollect: res=>', res)
    })
  }

  const handleRefund = () => {
    dispatch(refund({ itemId: id })).then(res => {
      if (res.payload.status == 200) {
        dispatch(
          fetchCheques({
            token,
            url,
            startWriteDate: new Date('2023-06-12'),
            endWriteDate: new Date('2024-01-13'),
            startDueDate: new Date('2023-06-12'),
            endDueDate: new Date('2024-02-17')
          })
        )
      }
      console.log('Refund: res=>', res)
    })
  }

  const handleDeleteCollect = () => {
    console.log('Delete Collect:', id)
    dispatch(deleteCollect({ id }))
      .then(() => {
        dispatch(
          fetchCheques({
            token,
            url,
            startWriteDate: new Date('2023-06-12'),
            endWriteDate: new Date('2024-01-13'),
            startDueDate: new Date('2023-06-12'),
            endDueDate: new Date('2024-02-17')
          })
        )

        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting :', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }

  console.log('type', type)

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
          sx={{ '& svg': { mr: 2 }, textTransform: transText }}
          onClick={() => {
            setOpenView(true)
            handleRowOptionsClose()
          }}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem>
        {statusName === 'write' || statusName === 'Un Collect' ? (
          <MenuItem
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
            onClick={() => {
              handleRowOptionsClose()

              setOpenCollect(true)
            }}
          >
            <Icon icon='bx:collection' fontSize={20} />
            Collect
          </MenuItem>
        ) : null}

        {statusName === 'write' || statusName === 'Un Collect' ? (
          <MenuItem
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
            onClick={() => {
              handleRowOptionsClose()
              setOpenRefundAlert(true)
            }}
          >
            <Icon icon='ri:refund-2-fill' fontSize={20} />
            Refund
          </MenuItem>
        ) : null}
        {statusName === 'collected' && (
          <MenuItem
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
            onClick={() => {
              handleRowOptionsClose()
              setOpenUnCollectAlert(true)
            }}
          >
            <Icon icon='mdi:file-undo' fontSize={20} />
            UnCollect
          </MenuItem>
        )}
        {statusName === 'collected' && (
          <MenuItem
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
            onClick={() => {
              handleRowOptionsClose()
              setOpenDeleteCollect(true)
            }}
          >
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete collect
          </MenuItem>
        )}
        {statusName !== 'Refund' && statusName !== 'collected' ? (
          <MenuItem
            onClick={() => {
              handleEdit()
              setOpenEdit(true)
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
          >
            <Icon icon='bx:pencil' fontSize={20} />
            Edit
          </MenuItem>
        ) : null}

        {/* print */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
            handlePrint(id)
          }}
          sx={{ '& svg': { mr: 2 }, textTransform: transText }}
        >
          <Icon icon='mingcute:print-line' fontSize={20} />
          Print
        </MenuItem>

        {/* attachments */}
        {document && document.length > 0 ? (
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
              setOpenViewAttachments(true)
            }}
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
          >
            <Icon icon='bx:paperclip' fontSize={20} />
            Attachments
          </MenuItem>
        ) : null}

        {/* entry */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
            setOpenEntry(true)
          }}
          sx={{ '& svg': { mr: 2 }, textTransform: transText }}
        >
          <Icon icon={'bx:file'} fontSize={20} />
          Entry
        </MenuItem>
        {statusName !== 'Refund' && statusName !== 'collected' ? (
          <MenuItem
            onClick={() => {
              setOpenDeleteAlert(true)
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 }, textTransform: transText }}
          >
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete
          </MenuItem>
        ) : null}
      </Menu>

      {openDeleteAlert && (
        <DeleteGlobalAlert
          open={openDeleteAlert}
          close={() => setOpenDeleteAlert(!openDeleteAlert)}
          mainHandleDelete={handleDelete}
          name={type.charAt(0).toUpperCase() + type.slice(1)}
        />
      )}
      {openDeleteCollect && (
        <DeleteGlobalAlert
          open={openDeleteCollect}
          close={() => setOpenDeleteCollect(!openDeleteCollect)}
          mainHandleDelete={handleDeleteCollect}
          name={"Cheque's Collect"}
        />
      )}
      {openUnCollectAlert && (
        <DeleteGlobalAlert
          open={openUnCollectAlert}
          close={() => setOpenUnCollectAlert(!openUnCollectAlert)}
          mainHandleDelete={handelUnCollect}
          customName={'UnCollect Cheque'}
          customDescription={'Are you sure you want to UnCollect this cheque?'}
          nameOfAction={'UnCollect'}
        />
      )}
      {openRefundAlert && (
        <DeleteGlobalAlert
          open={openRefundAlert}
          close={() => setOpenRefundAlert(!openRefundAlert)}
          mainHandleDelete={handleRefund}
          customName={'Refund Cheque'}
          customDescription={'Are you sure you want to Refund this cheque?'}
          nameOfAction={'Refund'}
        />
      )}

      {openView && <ViewCheque open={openView} toggle={setOpenView} itemId={id} />}

      {openViewAttachments && (
        <VoucherAttachmentPopUp
          open={openViewAttachments}
          toggle={setOpenViewAttachments}
          itemId={id}
          type={'cheque'}
        />
      )}

      {openEdit && (
        <ChequeEdit open={openEdit} toggle={handleEdit} itemId={id} type={editType === '0' ? 'in' : 'out'} />
      )}

      {openEntry && (
        <EntryPopUp open={openEntry} toggle={setOpenEntry} itemId={id} name={'getEntryCheques'} type={'cheque'} />
      )}
      {openCollect && (
        <DropDownAccounts
          open={openCollect}
          dueDate={dueDate}
          handleClose={() => setOpenCollect(false)}
          handleCollect={handleCollect}
          id={id}
        />
      )}
    </Fragment>
  )
}

const ChequesList = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  // ** Date Range
  const [startWriteDate, setStartWriteDate] = useState(null)
  const [endWriteDate, setEndWriteDate] = useState(null)
  const [startDueDate, setStartDueDate] = useState(null)
  const [endDueDate, setEndDueDate] = useState(null)

  const [openDateRange, setOpenDateRange] = useState(false)

  // ** Cookies
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  // ** Constants
  const title = 'Cheques List'
  const transText = getCookie('fontStyle')
  const FilterInitial = getCookie('FilterInitial')
  const columns = [
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <RowOptions
          id={row.id}
          editType={row.type}
          statusName={row.status_name}
          account_id={row.account_id}
          document={row.document}
          dueDate={row.due_date}
        />
      )
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
      minWidth: 180,
      field: 'cheque_no ',
      headerName: 'Cheque No',
      renderCell: ({ row }) => {
        const { cheque_no } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {cheque_no ? cheque_no : 'Not available'}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 160,
      field: 'status_name',
      headerName: 'Status',
      renderCell: params => {
        const status =
          params.row.status_name === 'Un Collect' ? StatusObj['unCollect'] : StatusObj[params.row.status_name]

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            title='Light Chip'
            sx={{
              '& .MuiChip-label': { textTransform: transText }
            }}
            color={status?.color ? status.color : 'warning'}
            label={status?.title ? status.title : params.row.status_name}
          />
          // <Typography noWrap sx={{ color: 'text.secondary' }}>
          //   {params.row.type}
          // </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 160,
      field: 'payment_for',
      headerName: 'Payment For',
      renderCell: ({ row }) => {
        const value = row.payment_for ? Number(row.payment_for) : null

        return (
          <>
            {row.payment_for ? (
              <Typography noWrap sx={{ color: 'text.secondary' }} variant='caption'>
                {CurrencySymbolPlacement === 'after' ? (
                  <>
                    <NumericFormat
                      value={value}
                      isNumericString={true}
                      displayType={'text'}
                      disabled
                      customInput={Typography}
                      variant='standard'
                      thousandSeparator
                    />

                    {currency_code}
                  </>
                ) : (
                  <>
                    {currency_code}

                    <NumericFormat
                      value={value}
                      isNumericString={true}
                      displayType={'text'}
                      disabled
                      customInput={Typography}
                      variant='standard'
                      thousandSeparator
                    />
                  </>
                )}
              </Typography>
            ) : (
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                Not available
              </Typography>
            )}
          </>
        )
      }
    },
    {
      flex: 1,
      minWidth: 300,
      field: 'contactText',
      headerName: 'Contact',
      renderCell: ({ row }) => {
        const { contactText } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', fontSize: '12px' }}>
              {contactText}
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'accountText',
      headerName: 'Account',
      renderCell: ({ row }) => {
        const { accountText } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{accountText}</Box>
          </Box>
        )
      }
    },

    {
      flex: 0.25,
      minWidth: 160,
      field: 'note',
      headerName: 'Note',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }} variant={'caption'}>
            {row.note ? row.note : 'Not available'}
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
        const value = row.amount ? Number(row.amount).toFixed(decimalFormat) : null

        return (
          <>
            {row.amount ? (
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {CurrencySymbolPlacement === 'after' ? (
                  <>
                    <NumericFormat
                      value={value}
                      isNumericString={true}
                      displayType={'text'}
                      disabled
                      customInput={Typography}
                      variant='outlined'
                      thousandSeparator
                    />
                    {` ${currency_code}`}
                  </>
                ) : (
                  <>
                    {`${currency_code} `}
                    <NumericFormat
                      value={value}
                      isNumericString={true}
                      displayType={'text'}
                      disabled
                      customInput={Typography}
                      variant='outlined'
                      thousandSeparator
                    />
                  </>
                )}
              </Typography>
            ) : (
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                Not available
              </Typography>
            )}
          </>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 200,
      minHeight: 70,
      field: 'collectAccountText',
      headerName: 'Collecting Account',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ p: 1 }}>
            <Typography noWrap sx={{ color: 'text.secondary', pb: 1 }} variant='caption'>
              {row.collectAccountText ? row.collectAccountText : 'Not available'}
            </Typography>
          </Box>
        )
      }
    },

    {
      flex: 0.25,
      minWidth: 140,
      field: 'write_date',
      headerName: 'Write Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.write_date ? row.write_date : 'Not available'}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 140,
      field: 'due_date',
      headerName: 'Due Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.due_date ? row.due_date : 'Not available'}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'collecting_date',
      headerName: 'Collecting Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary', py: 2 }}>
            {row.collecting_date ? row.collecting_date : 'Not available'}
          </Typography>
        )
      }
    }
  ]
  // ** for BTN
  const [active, setActive] = useState(FilterInitial || 'month')
  const [btnValue, setBtnValue] = useState(FilterInitial || 'month')
  const [month, setMonth] = useState(FilterInitial === 'month' ? new Date() : null)
  const [day, setDay] = useState(FilterInitial === 'day' ? new Date() : null)
  const [weak, setWeak] = useState(FilterInitial === 'weak' ? new Date() : null)

  // ** Hooks & Dispatch
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Selectors
  const store = useSelector(state => state.getCheques.brands?.value?.value)

  // // ** useEffect
  // useEffect(() => {
  //   setStartWriteDate(new Date('2023-06-12'))
  //   setEndWriteDate(new Date('2024-01-13'))
  //   setStartDueDate(new Date('2023-06-12'))
  //   setEndDueDate(new Date('2024-02-17'))
  // }, [])

  useEffect(() => {
    setData(store)
  }, [store])

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    setToken(token)

    setUrl(url)
  }, [token, url])

  useEffect(() => {
    if (token && url) {
      dispatch(
        fetchCheques({
          token,
          url,
          startWriteDate,
          endWriteDate,
          startDueDate,
          endDueDate,
          month,
          day,
          weak
        })
      )
    }
  }, [dispatch, token, url, , startWriteDate, endWriteDate, startDueDate, endDueDate, month, day, weak])

  // ** Functions
  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

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

  // ** see if data is available
  console.log('data of Cheques :', data)
  console.log('Write Date Range', startWriteDate, endWriteDate)
  console.log('Due Date Range', startDueDate, endDueDate)
  console.log('Active:', active)
  console.log('Month:', month)
  console.log('Day:', day)
  console.log('Weak:', weak)

  return (
    <Grid container spacing={6}>
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
                  setStartWriteDate(null)
                  setEndWriteDate(null)
                  setStartDueDate(null)
                  setEndDueDate(null)
                  setWeak(null)
                  setDay(null)
                }}
                variant={btnValue === 'month' ? 'contained' : 'outlined'}
                sx={{ textTransform: transText }}
              >
                Month
              </Button>
              <Button
                variant={btnValue === 'weak' ? 'contained' : 'outlined'}
                sx={{ textTransform: transText }}
                onMouseEnter={() => {
                  setActive('weak')
                }}
                onClick={() => {
                  setActive('weak')
                  setBtnValue('weak')
                  setWeak(new Date())
                  setMonth(null)
                  setDay(null)
                  setStartWriteDate(null)
                  setEndWriteDate(null)
                  setStartDueDate(null)
                  setEndDueDate(null)
                }}
              >
                Weak
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
                  setWeak(null)
                  setStartWriteDate(null)
                  setEndWriteDate(null)
                  setStartDueDate(null)
                  setEndDueDate(null)
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
                  setWeak(null)
                  setDay(null)
                  setStartWriteDate(null)
                  setEndWriteDate(null)
                  setStartDueDate(null)
                  setEndDueDate(null)
                }}
              >
                Range
              </Button>
            </ButtonGroup>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box>
            <Box>
              <DataGrid
                autoHeight
                columns={columns}
                getRowHeight={() => 'auto'}
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
                columnHeaderHeight={50}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                slots={{ toolbar: QuickSearchToolbar }}
                onPaginationModelChange={setPaginationModel}
                rows={filteredData.length ? filteredData : data ? data : []}
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
            </Box>
          </Box>
        </Card>
      </Grid>
      {openDateRange && (
        <DateRangePopUp
          endDueDate={endDueDate}
          endWriteDate={endWriteDate}
          startDueDate={startDueDate}
          startWriteDate={startWriteDate}
          setEndDueDate={setEndDueDate}
          setEndWriteDate={setEndWriteDate}
          handleClose={() => setOpenDateRange(false)}
          open={openDateRange}
          setStartDueDate={setStartDueDate}
          setStartWriteDate={setStartWriteDate}
          popperPlacement={popperPlacement}
        />
      )}
    </Grid>
  )
}

export default ChequesList
