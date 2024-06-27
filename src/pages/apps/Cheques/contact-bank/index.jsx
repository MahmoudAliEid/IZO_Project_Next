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

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Table Components Imports
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

// ** Styled Component
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// ** Stores Import
import { deleteContactBank } from 'src/store/apps/Cheques/contactBank/postDeleteContactBank'
import { fetchContactBank } from 'src/store/apps/Cheques/contactBank/getContactBankSlice'
import { Button } from '@mui/material'
import ContactBankAdd from './ContactBankAdd'

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State

  const [anchorEl, setAnchorEl] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const type = 'Contact Bank'

  const rowOptionsOpen = anchorEl

  // ** Cookies

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    if (!id ) {
      console.log('Invalid id ')
      handleRowOptionsClose()

      return
    }

    dispatch(deleteContactBank({ id }))
      .then(() => {
        dispatch(fetchContactBank())

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
          <Icon icon='bx:trash' fontSize={20} />
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

      {openEdit && <ContactBankAdd open={openEdit} toggle={handleEdit} id={id} isEdit={true} />}
    </Fragment>
  )
}

const ContactBank = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const title = 'Contact Bank List'

  const columns = [
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} type={row.type} statusName={row.status_name} />
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'name ',
      headerName: 'Bank Name',
      renderCell: ({ row }) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {name ? name : 'Not available'}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'business_id ',
      headerName: 'Business Location',
      renderCell: ({ row }) => {
        const { business_id } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary' }}>
                {business_id ? business_id : 'Not available'}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  ]

  // ** Hooks
  const dispatch = useDispatch()

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const store = useSelector(state => state.getContactBank.brands?.value)

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
      dispatch(fetchContactBank({ token, url }))
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

  const handleAddClickOpen = () => {
    setOpenAdd(!openAdd)
  }

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
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <CardHeader title={title} />
            </Box>
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
      {openAdd && <ContactBankAdd open={openAdd} toggle={handleAddClickOpen} isEdit={false} />}
    </Grid>
  )
}

export default ContactBank
