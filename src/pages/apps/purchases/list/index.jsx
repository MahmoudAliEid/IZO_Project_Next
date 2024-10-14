'use client'
import { useState, useEffect, Fragment } from 'react'

// ** Mui Import
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Data Grid
import { DataGrid } from '@mui/x-data-grid'

// ** Next Imports
import { getCookie } from 'cookies-next'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AttachFileIcon from '@mui/icons-material/AttachFile'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// **import axios
import axios from 'axios'

//TODO: Implement the UI for this page
//TODO: Filter
//TODO: Table
//TODO: Pagination

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import SupplierPurchasesPopUp from 'src/@core/components/purchases/SupplierPurchasesPopUp'
import ViewAttachment from 'src/@core/components/purchases/ViewAttachment'
import ListLoading from 'src/@core/Global/ListLoading'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchPurchases } from 'src/store/apps/purchases/getPurchasesSlice'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import { deletePurchase } from 'src/store/apps/purchases/postDeletePurchase'
import ViewPurchases from 'src/@core/components/purchases/ViewPurchases'
import AddPurchases from 'src/@core/components/purchases/AddPurchases'
import PurchaseEditPopUp from 'src/@core/components/purchases/edit/PurchaseEditPopUp'

const paymentStatus = {
  paid: { title: 'Paid', color: 'success' },
  due: { title: 'Due', color: 'info' },
  final: { title: 'Final', color: 'secondary' },
  partial: { title: 'Partial', color: 'warning' },
  overdue: { title: 'Overdue', color: 'error' },
  ordered: { title: 'Ordered', color: 'primary' }
}

// const receivedStatus = {
//   Recieved: { title: 'Received', color: 'success' },

//   Completed: { title: 'Completed', color: 'primary' }
// }

const purchaseStatus = {
  received: { title: 'Received', color: 'success' },
  final: { title: 'Final', color: 'secondary' },
  pending: { title: 'Pending', color: 'warning' },
  ordered: { title: 'Ordered', color: 'primary' }
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

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  // const [openViewAttachments, setOpenViewAttachments] = useState(false)
  const [setOpenEntry] = useState(false)

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

    dispatch(deletePurchase({ id }))
      .then(() => {
        dispatch(fetchPurchases(token))

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
      url: `${url}/app/react/purchase/print/${id}`,
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
  // const handleViewAttachments = () => {
  //   setOpenViewAttachments(!openViewAttachments)
  // }

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
        {/* View */}
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
        {/* Edit */}
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
        {/* <MenuItem
          onClick={() => {
            handleRowOptionsClose()
            setOpenViewAttachments(true)
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:paperclip' fontSize={20} />
          Attachments
        </MenuItem> */}
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
        {/* Delete */}
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
        {/* Map */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='iconamoon:eye-duotone' fontSize={20} />
          Map
        </MenuItem>
        {/* View Payment */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tdesign:money' fontSize={20} />
          View Payment
        </MenuItem>
        {/* Purchase Return */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='streamline:return-2' fontSize={20} />
          Purchase Return
        </MenuItem>
        {/* Update status */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:check-circle' fontSize={20} />
          Update Status
        </MenuItem>
      </Menu>

      {openDeleteAlert && (
        <DeleteGlobalAlert
          open={openDeleteAlert}
          close={() => setOpenDeleteAlert(!openDeleteAlert)}
          mainHandleDelete={handleDelete}
          name={'Purchase'}
        />
      )}
      {openView && <ViewPurchases open={openView} toggle={handleView} id={id} />}

      {openEdit && <PurchaseEditPopUp open={openEdit} toggle={handleEdit} id={id} />}
      {/*

      {openViewAttachments && (
        <AttachmentJournalVoucher open={openViewAttachments} toggle={handleViewAttachments} id={id} />
      )}

      {openEntry && <JournalEntry open={openEntry} toggle={setOpenEntry} itemId={id} />} */}
    </Fragment>
  )
}

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
        {getInitials(row?.contact ? row.contact : '!')}
      </CustomAvatar>
    )
  }
}

const Supplier = ({ row }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(row)}
      <Typography
        variant='subtitle1'
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: theme => theme.palette.primary.main
          }
        }}
        onClick={() => handleOpen()}
      >
        {row.contact}
      </Typography>

      {open && (
        <SupplierPurchasesPopUp
          id={row.id}
          open={open}
          toggle={handleOpen}
          Supplier={row.contact}
          total={row.final_total}
        />
      )}
    </Box>
  )
}

const Attachment = ({ row }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        cursor: 'pointer'
      }}
      onClick={() => {
        handleOpen()
      }}
    >
      <AttachFileIcon
        sx={{
          '&:hover': {
            color: theme => theme.palette.primary.main
          }
        }}
      />
      {open && <ViewAttachment open={open} toggle={handleOpen} id={row.id} />}
    </Box>
  )
}

const ListPurchases = () => {
  // ** States
  // const [openAdd, setOpenAdd] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [transText, setTransText] = useState('')
  const [data, setData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)

  const currency_code = getCookie('currency_code')
  const decimalFormat = getCookie('DecimalFormat')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  // ** Store Vars
  const dispatch = useDispatch()
  const storeData = useSelector(state => state.getPurchases?.data?.value)

  useEffect(() => {
    // Fetching the cookie in client-side only
    const transTextValue = getCookie('fontStyle')
    setTransText(transTextValue || '')
  }, [])

  useEffect(() => {
    dispatch(fetchPurchases({ token: getCookie('token') }))
  }, [dispatch])

  useEffect(() => {
    if (storeData) {
      setData(storeData)
    }
  }, [storeData])

  // ** Cookies

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }
  // ** handle search function
  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data?.items.filter(row => {
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

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.2,
      align: 'center',
      minWidth: 90,
      renderCell: ({ row }) => <RowOptions id={row.id} />
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 0.55,
      align: 'center',
      minWidth: 200,
      renderCell: ({ row }) => <Typography variant='subtitle2'>{row.date}</Typography>
    },
    {
      field: 'source_reference',
      headerName: 'Source Reference',
      align: 'center',
      minWidth: 170,
      flex: 1,
      renderCell: ({ row }) => <Typography variant='subtitle1'>{row.source_reference}</Typography>
    },
    {
      field: 'reference_no',
      minWidth: 170,
      headerName: 'Reference No',
      align: 'center',
      flex: 1,
      renderCell: ({ row }) => <Typography variant='subtitle1'>{row.reference_no}</Typography>
    },
    {
      field: 'Attachment',
      headerName: 'Attachment',
      flex: 0.3,
      align: 'center',
      minWidth: 110,
      renderCell: ({ row }) => <>{row.attachment && row.attachment.length > 0 ? <Attachment row={row} /> : null}</>
    },

    {
      field: 'contact',
      headerName: 'Supplier',
      align: 'left',
      flex: 0.65,
      minWidth: 240,
      renderCell: ({ row }) => <Supplier row={row} />
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.35,
      align: 'center',
      minWidth: 150,

      renderCell: ({ row }) => {
        const status = purchaseStatus[row.status]

        return <Chip variant='outlined' label={status.title} color={status.color} />
      }
    },
    {
      field: 'payment_status',
      headerName: 'Payment Status',
      flex: 0.35,
      align: 'center',
      minWidth: 150,
      renderCell: ({ row }) => {
        const status = paymentStatus[row.payment_status]

        return <Chip variant='outlined' label={status.title} color={status.color} />
      }
    },
    {
      field: 'received_status',
      headerName: 'Received Status',
      flex: 1,
      align: 'center',
      minWidth: 140,
      renderCell: ({ row }) => {
        return <Typography variant='caption'>{row.recieved_status}</Typography>
      }
    },
    {
      field: 'store',
      headerName: 'Store',
      align: 'center',
      flex: 0.25,
      minWidth: 140,
      renderCell: ({ row }) => <Typography variant='subtitle1'>{row.store}</Typography>
    },
    {
      field: 'tax_amount',
      headerName: 'Tax Amount',
      flex: 1,
      align: 'center',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Typography variant='body1'>
          {CurrencySymbolPlacement === 'after'
            ? `${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
                Number(row.tax_amount).toFixed(decimalFormat)
              )} ${currency_code} `
            : `${currency_code} ${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
                Number(row.tax_amount).toFixed(decimalFormat)
              )} `}
        </Typography>
      )
    },
    {
      field: 'final_total',
      headerName: 'Grand Total',
      flex: 1,
      align: 'center',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Typography variant='body1'>
          {CurrencySymbolPlacement === 'after'
            ? `${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
                Number(row.final_total).toFixed(decimalFormat)
              )} ${currency_code} `
            : `${currency_code} ${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
                Number(row.final_total).toFixed(decimalFormat)
              )} `}
        </Typography>
      )
    },
    {
      field: 'payment_due',
      headerName: 'Payment Due',
      flex: 0.4,
      minWidth: 160,
      align: 'center',
      renderCell: ({ row }) => {
        return (
          <Typography variant='body1'>
            {CurrencySymbolPlacement === 'after'
              ? `${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
                  Number(row.payment_due).toFixed(decimalFormat)
                )} ${currency_code} `
              : `${currency_code} ${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
                  Number(row.payment_due).toFixed(decimalFormat)
                )} `}
          </Typography>
        )
      }
    },
    {
      field: 'created_by',
      align: 'center',
      headerName: 'Created By',
      flex: 1,
      minWidth: 140,
      renderCell: ({ row }) => <Typography variant='subtitle1'>{row.created_by}</Typography>
    }
  ]

  console.log('data of purchases', data)

  return (
    <Grid container spacing={3}>
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
              <CardHeader sx={{ textTransform: transText }} title={'List Purchases'} />
            </Box>

            {/* <PageFilter filterDate={filterDate} setFilterDate={setFilterDate} setOpenDateRange={setOpenDateRange} /> */}

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
          {data && data?.items && data.items?.length > 0 ? (
            <Box sx={{ px: 6 }}>
              <DataGrid
                autoHeight
                columns={columns}
                rows={filteredData.length ? filteredData : data.items ? data.items : []}
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
          ) : (
            <ListLoading />
          )}
        </Card>
      </Grid>
      {openAdd && (
        <AddPurchases
          open={openAdd}
          handleClose={() => {
            setOpenAdd(!openAdd)
          }}
        />
      )}
    </Grid>
  )
}

export default ListPurchases
