// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// ** Next Imports
import { getCookie } from 'cookies-next'

// ** MUI Imports
import { Box, Card, Menu, Grid, Divider, MenuItem, IconButton, Typography, CardHeader, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchOpeningStock } from 'src/store/apps/products/addOpeningStock/getListSlice'
import { deleteOpeningStock } from 'src/store/apps/products/addOpeningStock/postDeleteOpeningStock'
import { fetchEditOpeningStock } from 'src/store/apps/products/addOpeningStock/getEditOpeningStockSlice'

// ** Custom Table Components Imports
import OpeningStockPopUp from 'src/@core/components/products/addOpeningStock/add/OpeningStockPopUp'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import ViewOpeningStock from 'src/@core/components/products/addOpeningStock/view/ViewOpeningStock'
import PageFilter from 'src/@core/Global/PageFilter'
import FilterRangePage from 'src/@core/Global/FilterRangePopUp'
import ListLoading from 'src/@core/Global/ListLoading'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const rowOptionsOpen = anchorEl

  // ** Cookies
  const transText = getCookie('fontStyle')
  const token = getCookie('token')

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
          name={'Opening Stock'}
        />
      )}
      {openView && <ViewOpeningStock open={openView} toggle={() => setOpenView(!openView)} id={id} />}

      {openEdit && <OpeningStockPopUp open={openEdit} handleClose={() => setOpenEdit(false)} edit={true} id={id} />}
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
  const [triggerLoadingList, setTriggerLoadingList] = useState(true)
  const title = 'Opening Stock'

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const direction = theme.direction
  const { settings } = useSettings()
  const { searchFilter } = settings

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const transText = getCookie('fontStyle')
  const FilterInitial = getCookie('FilterInitial')
  // ** for BTN
  const [openDateRange, setOpenDateRange] = useState(false)
  const [filterDate, setFilterDate] = useState({
    month: searchFilter === 'month' ? new Date() : FilterInitial === 'month' ? new Date() : null,
    day: searchFilter === 'day' ? new Date() : FilterInitial === 'day' ? new Date() : null,
    week: searchFilter === 'week' ? new Date() : FilterInitial === 'week' ? new Date() : null,
    active: searchFilter ? searchFilter : FilterInitial,
    startDate: null,
    endDate: null
  })

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
      dispatch(
        fetchOpeningStock({
          token,
          url,
          month: filterDate.month || '',
          day: filterDate.day || '',
          weak: filterDate.week || '',
          startDate: filterDate.startDate || '',
          endDate: filterDate.endDate || ''
        })
      )
    }
  }, [dispatch, token, url, filterDate])

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

  // ** handle loading list
  useEffect(() => {
    setTimeout(() => {
      setTriggerLoadingList(!triggerLoadingList)
    }, 4000)

    // return () => clearTimeout(timer)
  }, [triggerLoadingList])

  // see if data is available
  console.log('data of add opening stock :', data)
  console.log('filtered data of add opening stock :', filterDate)

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
            <PageFilter setFilterDate={setFilterDate} setOpenDateRange={setOpenDateRange} />
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
      {openAdd && <OpeningStockPopUp open={openAdd} handleClose={() => setOpenAdd(false)} />}
    </Grid>
  )
}

export default AddOpeningStock
