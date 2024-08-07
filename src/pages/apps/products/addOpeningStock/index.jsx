// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// ** Next Imports
import { getCookie } from 'cookies-next'

// ** MUI Imports
import { Box, Card, Menu, Grid, Divider, MenuItem, IconButton, Typography, CardHeader, Button } from '@mui/material'
// import { useTheme, styled } from '@mui/material/styles'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'
// import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchOpeningStock } from 'src/store/apps/products/addOpeningStock/getListSlice'
import { deleteOpeningStock } from 'src/store/apps/products/addOpeningStock/postDeleteOpeningStock'
import { fetchEditOpeningStock } from 'src/store/apps/products/addOpeningStock/getEditOpeningStockSlice'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Table Components Imports
import OpeningStockPopUp from 'src/@core/components/products/addOpeningStock/add/OpeningStockPopUp'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

// const userStatusObj = {
//   receipt_voucher: { title: 'Receipt Voucher', color: 'success' },
//   pending: { title: 'pending', color: 'warning' },
//   payment_voucher: { title: 'Payment Voucher', color: 'secondary' }
// }

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
// const renderClient = row => {
//   if (row.avatar?.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row.avatarColor || 'primary'}
//         sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
//       >
//         {getInitials(row.contact_id ? String(row.contact_id) : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

const RowOptions = ({ id, type }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  // const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const rowOptionsOpen = anchorEl

  // ** Cookies
  const transText = getCookie('fontStyle')
  const token = getCookie('token')
  // const url = getCookie('apiUrl')

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

    dispatch(deleteOpeningStock({ id }))
      .then(() => {
        dispatch(fetchOpeningStock())

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
    dispatch(fetchEditOpeningStock({ id }))
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

      {openEdit && <OpeningStockPopUp open={openEdit} handleClose={() => setOpenEdit(false)} edit={true} id={id} />}
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

const columns = [
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.tran_id} type={row.type} />
  },
  {
    flex: 0.25,
    minWidth: 120,
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
    minWidth: 130,
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

const AddOpeningStock = () => {
  // ** States
  // const [addSupplierOpen, setSupplierOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const title = 'Add Opening Stock'

  // ** Hooks
  const dispatch = useDispatch()
  // const theme = useTheme()
  // const direction = theme.direction

  // const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // ** Date Range
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)

  // const [openDateRange, setOpenDateRange] = useState(false)
  const transText = getCookie('fontStyle')
  // const FilterInitial = getCookie('FilterInitial')
  // ** for BTN
  // const [active, setActive] = useState(FilterInitial || 'month')
  // const [btnValue, setBtnValue] = useState(FilterInitial || 'month')
  // const [month, setMonth] = useState(FilterInitial === 'month' ? new Date() : null)
  // const [day, setDay] = useState(FilterInitial === 'day' ? new Date() : null)
  // const [week, setWeek] = useState(FilterInitial === 'week' ? new Date() : null)

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const store = useSelector(state => state.getOpeningStock?.data?.value)

  useEffect(() => {
    setData(store)
  }, [store])

  // ** Cookies
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  useEffect(() => {
    if (token && url) {
      dispatch(fetchOpeningStock(token, url))
    }
  }, [dispatch, token, url])

  // const toggleAddSuppliersDrawer = () => setSupplierOpen(!addSupplierOpen)

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
  console.log('data of add opening stock :', data)

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
            {/* <ButtonGroup variant='outlined' aria-label='Basic button group'>
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
            </ButtonGroup> */}
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
              <Button sx={{ textTransform: transText }} color='primary' variant='contained'>
                Filter
              </Button>
              <Button
                startIcon={<AddCircleOutlineIcon />}
                // onClick={toggleAddSuppliersDrawer}
                sx={{ textTransform: transText }}
                color='primary'
                onClick={() => setOpenAdd(true)}
                variant='contained'
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
                  getRowId={row => row.tran_id}
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
      {/* {
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
      } */}
      {openAdd && <OpeningStockPopUp open={openAdd} handleClose={() => setOpenAdd(false)} />}

      {/* <DialogAddSuppliers open={addSupplierOpen} toggle={toggleAddSuppliersDrawer} isEdit={false} contact='supplier' /> */}
    </Grid>
  )
}

export default AddOpeningStock

// pages/index.js
// import React, { useState } from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material'

// const initialRows = [
//   { id: '1', name: 'one' },
//   { id: '2', name: 'two' }
// ]

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)

//   return result
// }

// export default function Home() {
//   const [rows, setRows] = useState(initialRows)

//   const onDragEnd = result => {
//     if (!result.destination) {
//       return
//     }

//     const reorderedRows = reorder(rows, result.source.index, result.destination.index)

//     setRows(reorderedRows)
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>#</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Checkbox</TableCell>
//             </TableRow>
//           </TableHead>
//           <Droppable droppableId='droppable'>
//             {provided => (
//               <TableBody {...provided.droppableProps} ref={provided.innerRef}>
//                 {rows.map((row, index) => (
//                   <Draggable key={row.id} draggableId={row.id} index={index}>
//                     {provided => (
//                       <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                         <TableCell>{index + 1}</TableCell>
//                         <TableCell>{row.name}</TableCell>
//                         <TableCell>
//                           <Checkbox defaultChecked />
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </TableBody>
//             )}
//           </Droppable>
//         </Table>
//       </TableContainer>
//     </DragDropContext>
//   )
// }
