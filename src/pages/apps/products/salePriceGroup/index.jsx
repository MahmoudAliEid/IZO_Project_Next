/*eslint-disable*/
// ** React & Components
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import SalePriceGroupForm from 'src/@core/components/products/salePriceGroup/SalePriceGroupForm'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import SPGImport from 'src/@core/components/products/salePriceGroup/SPGImport'

// ** Next Imports
import { getCookie } from 'cookies-next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { deleteSPGroup } from 'src/store/apps/products/salePriceGroup/postDeleteSPGroupSlice'
import { fetchSPGroup } from 'src/store/apps/products/salePriceGroup/getSPGroupSlice'
import { changeStatusSPGroup } from 'src/store/apps/products/salePriceGroup/postChangeStatusSlice'

// ** Status obj
const statusObj = {
  0: { title: 'inactive', color: 'warning' },
  1: { title: 'active', color: 'success' }
}

const RowOptions = ({ id, data, setData }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const rowOptionsOpen = anchorEl

  // ** Cookies

  const token = getCookie('token')
  const url = getCookie('apiUrl')

  // ** Function to handle row options click

  const handleChangeStatus = () => {
    dispatch(changeStatusSPGroup({ id, token }))
      .then(() => {
        dispatch(fetchSPGroup(token, url))
      })
      .catch(error => {
        console.error('Error changing status of Sale Price Group:', error)
      })
  }

  function removeObjectById(arr, idToRemove) {
    const newArray = arr.filter(item => item.id !== idToRemove)

    return newArray
  }
  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    console.log('handleDelete id category', id)
    handleRowOptionsClose()

    if (!id) {
      console.log('Invalid id or token')
      handleRowOptionsClose()

      return
    }

    //front delete
    const frontData = removeObjectById(data, id)
    setData(frontData)

    dispatch(deleteSPGroup({ id, token }))
      .then(() => {
        dispatch(fetchSPGroup(token, url))

        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting Sale Price Group:', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }
  const handleDeleteAlert = () => {
    setOpenAlert(prev => !prev)
  }
  const handleEdit = () => {
    setOpen(true)
    console.log(id)
  }

  return (
    <>
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
          onClick={() => {
            handleEdit()
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:pencil' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChangeStatus()
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='fluent-mdl2:sync-status' fontSize={20} />
          Change Status
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteAlert()
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {open && <SalePriceGroupForm type={'Edit'} open={open} setOpen={setOpen} itemId={id} />}
      {openAlert && (
        <DeleteGlobalAlert
          name='Sale Price Group'
          open={openAlert}
          close={handleDeleteAlert}
          mainHandleDelete={handleDelete}
        />
      )}
    </>
  )
}

const columns = [
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} data={row.data} setData={row.setData} />
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.name ? row.name.toString() : 'Not available'}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.description ? row.description.toString() : 'Not available'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'is_active',
    headerName: 'Status',

    renderCell: ({ row }) => {
      const status = statusObj[row.is_active]

      return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    }
  }
]

const SalePriceGroup = () => {
  // ** State

  const [open, setOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState(null)
  const newData = data && data.length ? data.map(item => ({ ...item, data, setData })) : []

  const title = 'Sale Price Group List'
  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Selector
  const store = useSelector(state => state.getSPGroup?.data?.value)

  // ** Hooks
  const dispatch = useDispatch()
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
      dispatch(fetchSPGroup(token, url))
    }
  }, [dispatch, token, url])

  const handleAddClickOpen = () => setOpen(true)

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
      <Grid item xs={12} lg={12} md={12} sm={12}>
        <SPGImport />
      </Grid>
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader title={title} />
          <Divider sx={{ m: '0 !important' }} />
          <Box
            sx={{
              p: 6,
              gap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddClickOpen} variant='contained'>
                Add
              </Button>
            </Box>
          </Box>
          <Box>
            {newData ? (
              <DataGrid
                autoHeight
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                slots={{ toolbar: QuickSearchToolbar }}
                onPaginationModelChange={setPaginationModel}
                rows={filteredData.length ? filteredData : newData}
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
            ) : (
              <Grid>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '16px 0'
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

      <SalePriceGroupForm type={'Add'} open={open} setOpen={setOpen} />
    </Grid>
  )
}

export default SalePriceGroup
