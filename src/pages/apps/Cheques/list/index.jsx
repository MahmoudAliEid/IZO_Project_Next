// ** React Imports
import { useState, useEffect, Fragment } from 'react'
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
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
import { useTheme } from '@mui/material/styles'

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

// ** Date
// import addDays from 'date-fns/addDays'

// ** Custom Table Components Imports

import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import CustomDateRange from './CustomDateRange'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { fetchCheques } from 'src/store/apps/Cheques/getChequesSlice'
import VoucherAttachmentPopUp from 'src/@core/components/vouchers/VoucherAttachmentPopUp'
import EntryPopUp from 'src/@core/components/vouchers/EntryPopUp'
import ViewCheque from 'src/@core/components/cheques/ViewCheque'
import ChequeEdit from 'src/@core/components/cheques/ChequeEdit'
import { collect } from 'src/store/apps/Cheques/Actions/collect'
import { deleteCheques } from 'src/store/apps/Cheques/postDeleteChequesSlice'
import { unCollect } from 'src/store/apps/Cheques/Actions/unCollect'
import { refund } from 'src/store/apps/Cheques/Actions/refund'
// import notify from 'src/utils/notify'

const userStatusObj = {
  write: { title: 'Write', color: 'success' },
  collected: { title: 'collected', color: 'success' },
  unCollect: { title: 'un collect', color: 'secondary' },
  Refund: { title: 'REFUND', color: 'error' }
}

// const LinkStyled = styled(Box)(({ theme }) => ({
//   fontWeight: 400,
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

const RowOptions = ({ id, statusName, account_id }) => {
  // ** Hooks
  const dispatch = useDispatch()
  console.log('Status Name =>', statusName)

  const type = 'cheque'

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openViewAttachments, setOpenViewAttachments] = useState(false)
  const [openEntry, setOpenEntry] = useState(false)

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

  const handleCollect = () => {
    dispatch(collect({ id, account_id, date: '2024' })).then(res => {
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
        {statusName === 'write' || statusName === 'Un Collect' ? (
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => {
              handleRowOptionsClose()
              handleCollect()
            }}
          >
            <Icon icon='bx:collection' fontSize={20} />
            Collect
          </MenuItem>
        ) : null}

        {statusName === 'write' || statusName === 'Un Collect' ? (
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => {
              handleRowOptionsClose()
              handleRefund()
            }}
          >
            <Icon icon='ri:refund-2-fill' fontSize={20} />
            Refund
          </MenuItem>
        ) : null}
        {statusName === 'collected' && (
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => {
              handleRowOptionsClose()
              handelUnCollect()
            }}
          >
            <Icon icon='mdi:file-undo' fontSize={20} />
            UnCollect
          </MenuItem>
        )}
        {statusName === 'collected' && (
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => {
              handleRowOptionsClose()
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
            sx={{ '& svg': { mr: 2 } }}
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
        {statusName !== 'Refund' && statusName !== 'collected' ? (
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

      {openView && <ViewCheque open={openView} toggle={setOpenView} itemId={id} />}

      {openViewAttachments && (
        <VoucherAttachmentPopUp open={openViewAttachments} toggle={setOpenViewAttachments} itemId={id} />
      )}

      {openEdit && <ChequeEdit open={openEdit} toggle={handleEdit} itemId={id} type={type === 0 ? 'in' : 'out'} />}

      {openEntry && (
        <EntryPopUp open={openEntry} toggle={setOpenEntry} itemId={id} name={'getEntryCheques'} type={'cheque'} />
      )}
    </Fragment>
  )
}

// const RowOptionsTransactions = ({ row }) => {
//   // ** State
//   const [openTransaction, setOpenTransaction] = useState(false)
//   const [anchorEl, setAnchorEl] = useState(null)

//   const decimalFormat = getCookie('DecimalFormat')
//   const currency_code = getCookie('currency_code')
//   const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

//   const handleTransactionClick = () => {
//     setOpenTransaction(true)
//   }

//   const rowOptionsOpen = anchorEl

//   const handleRowOptionsClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleRowOptionsClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <Fragment>
//       <Button size='small' onClick={handleRowOptionsClick} sx={{ my: 3 }}>
//         Invoices
//       </Button>
//       <Menu
//         keepMounted
//         anchorEl={anchorEl}
//         open={rowOptionsOpen}
//         onClose={handleRowOptionsClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right'
//         }}
//         PaperProps={{ style: { minWidth: '8rem' } }}
//       >
//         {row.payments.map((item, index) => (
//           <MenuItem
//             key={index}
//             onClick={() => {
//               handleRowOptionsClose()
//               handleTransactionClick()
//             }}
//             sx={{ '& svg': { mr: 2 } }}
//           >
//             <Icon icon='bx:pencil' fontSize={20} />
//             <LinkStyled>
//               {item.transaction_id}{' '}
//               {` ${
//                 item.amount
//                   ? CurrencySymbolPlacement === 'after'
//                     ? `(${Number(item.amount).toFixed(decimalFormat)} ${currency_code} )`
//                     : `(${currency_code} ${Number(item.amount).toFixed(decimalFormat)} )`
//                   : ''
//               }`}
//             </LinkStyled>
//           </MenuItem>
//         ))}
//       </Menu>
//       {openTransaction && <VouchersTransactionPopUp open={openTransaction} toggle={setOpenTransaction} />}
//     </Fragment>
//   )
// }

const ChequesList = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const title = 'Cheques List'
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  const [startWriteDate, setStartWriteDate] = useState(new Date('2023-06-12'))
  const [endWriteDate, setEndWriteDate] = useState(new Date('2024-01-13'))
  const [startDueDate, setStartDueDate] = useState(new Date('2023-06-12'))
  const [endDueDate, setEndDueDate] = useState(new Date('2024-02-17'))
  const columns = [
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <RowOptions id={row.id} type={row.type} statusName={row.status_name} account_id={row.account_id} />
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
      field: 'payment_for',
      headerName: 'Payment For',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }} variant='caption'>
            {`${
              row.payment_for
                ? CurrencySymbolPlacement === 'after'
                  ? `${Number(row.payment_for).toFixed(decimalFormat)} ${currency_code} `
                  : `${currency_code} ${Number(row.payment_for).toFixed(decimalFormat)} `
                : 'Not available'
            }`}
          </Typography>
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
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {CurrencySymbolPlacement === 'after'
              ? `${Number(row.amount).toFixed(decimalFormat)} ${currency_code} `
              : `${currency_code} ${Number(row.amount).toFixed(decimalFormat)} `}
          </Typography>
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
      flex: 0.2,
      minWidth: 160,
      field: 'status_name',
      headerName: 'Status',
      renderCell: params => {
        const status =
          params.row.status_name === 'Un Collect' ? userStatusObj['unCollect'] : userStatusObj[params.row.status_name]

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={status?.color ? status.color : 'success'}
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

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const store = useSelector(state => state.getCheques.brands?.value?.value)

  useEffect(() => {
    setStartWriteDate(new Date('2023-06-12'))
    setEndWriteDate(new Date('2024-01-13'))
    setStartDueDate(new Date('2023-06-12'))
    setEndDueDate(new Date('2024-02-17'))
  }, [])

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
      dispatch(
        fetchCheques({
          token,
          url,
          startWriteDate,
          endWriteDate,
          startDueDate,
          endDueDate
        })
      )
    }
  }, [dispatch, token, url, , startWriteDate, endWriteDate, startDueDate, endDueDate])
  // useEffect(() => {
  //   if (token && url) {
  //     dispatch(fetchCheques({ token, url }))
  //   }
  // }, [dispatch, token, url])

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
  console.log('data of Cheques :', data)
  console.log('Write Date Range', startWriteDate, endWriteDate)
  console.log('Due Date Range', startDueDate, endDueDate)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* create filter component */}
        <Card>
          <CardHeader title='Filters' />
          <Divider />
          <Box sx={{ p: 6, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ p: 6 }}>
              <Typography variant='h6'> Write Date Range</Typography>
              <DatePickerWrapper>
                <CustomDateRange
                  popperPlacement={popperPlacement}
                  setStartDate={setStartWriteDate}
                  setEndDate={setEndWriteDate}
                  startDate={startWriteDate}
                  endDate={endWriteDate}
                />
              </DatePickerWrapper>
            </Box>
            <Box sx={{ p: 6 }}>
              <Typography variant='h6'> Due Date Range</Typography>
              <DatePickerWrapper>
                <CustomDateRange
                  popperPlacement={popperPlacement}
                  setStartDate={setStartDueDate}
                  setEndDate={setEndDueDate}
                  startDate={startDueDate}
                  endDate={endDueDate}
                />
              </DatePickerWrapper>
            </Box>
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
            <Box>
              <DataGrid
                autoHeight
                columns={columns}
                getRowHeight={() => 'auto'}
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
    </Grid>
  )
}

export default ChequesList
