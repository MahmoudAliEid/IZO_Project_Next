// ** React & Components
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import UnitsForm from 'src/@core/components/products/units/UnitsForm'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

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

// import * as Yup from 'yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { deleteUnit } from 'src/store/apps/products/units/postDeleteUnitSlice'
import { fetchUnits } from 'src/store/apps/products/units/getUnitsSlice'

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

    dispatch(deleteUnit({ id, token }))
      .then(() => {
        dispatch(fetchUnits(token, url))

        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting category:', error)

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
            handleDeleteAlert()
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {open && <UnitsForm type={'Edit'} open={open} setOpen={setOpen} itemId={id} />}
      {openAlert && (
        <DeleteGlobalAlert name='Unit' open={openAlert} close={handleDeleteAlert} mainHandleDelete={handleDelete} />
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
      <>
        {row.name === 'Loading...' ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '16px 0'
            }}
          >
            <ProgressCustomization />
          </Box>
        ) : (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.name !== undefined ? row.name.toString() : 'Not available'}
          </Typography>
        )}
      </>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'short_name',
    headerName: 'Short Name',
    renderCell: ({ row }) => (
      <>
        {row.short_name === 'Loading...' ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '16px 0'
            }}
          >
            <ProgressCustomization />
          </Box>
        ) : (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.short_name !== undefined ? row.short_name.toString() : 'Not available'}
          </Typography>
        )}
      </>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'allow_decimal',
    headerName: 'Allow Decimal',
    renderCell: ({ row }) => (
      <>
        {row.allow_decimal === 'Loading...' ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '16px 0'
            }}
          >
            <ProgressCustomization />
          </Box>
        ) : (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.allow_decimal === 0 ? 'No' : 'Yes'}
          </Typography>
        )}
      </>
    )
  }

  // {
  //   flex: 0.2,
  //   minWidth: 180,
  //   field: 'multiple_unit',
  //   headerName: 'Multiple Unit',
  //   renderCell: ({ row }) => (
  //     <>
  //       {row.multiple_unit === 'Loading...' ? (
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             margin: '16px 0'
  //           }}
  //         >
  //           <ProgressCustomization />
  //         </Box>
  //       ) : (
  //         <Typography noWrap sx={{ color: 'text.secondary' }}>
  //           {row.multiple_unit !== undefined ? row.multiple_unit.toString() : 'Not available'}
  //         </Typography>
  //       )}
  //     </>
  //   )
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 180,
  //   field: 'sub_qty',
  //   headerName: 'Sub Quantity',
  //   renderCell: ({ row }) => (
  //     <>
  //       {row.sub_qty === 'Loading...' ? (
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             margin: '16px 0'
  //           }}
  //         >
  //           <ProgressCustomization />
  //         </Box>
  //       ) : (
  //         <Typography noWrap sx={{ color: 'text.secondary' }}>
  //           {row.sub_qty !== undefined ? row.sub_qty.toString() : 'Not available'}
  //         </Typography>
  //       )}
  //     </>
  //   )
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 180,
  //   field: 'parent_unit',
  //   headerName: 'Parent Unit',
  //   renderCell: ({ row }) => (
  //     <>
  //       {row.parent_unit === 'Loading...' ? (
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             margin: '16px 0'
  //           }}
  //         >
  //           <ProgressCustomization />
  //         </Box>
  //       ) : (
  //         <Typography noWrap sx={{ color: 'text.secondary' }}>
  //           {row.parent_unit !== undefined ? row.parent_unit.toString() : 'Not available'}
  //         </Typography>
  //       )}
  //     </>
  //   )
  // }
]

const Units = () => {
  // ** State

  const [open, setOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [data, setData] = useState('')

  const newData = data && data.length ? data.map(item => ({ ...item, data, setData })) : []

  // const [dataForm, setDataForm] = useState(null)
  const title = 'Units List'

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Hooks
  const dispatch = useDispatch()

  // const { handleSubmitData } = useSubmitUser()

  const store = useSelector(state => state.getUnits?.data?.value)

  // const storeAddFormData = useSelector(state => state.getCreateVariations?.data?.value)

  useEffect(() => {
    setData(store)

    // setDataForm(storeAddFormData)
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
      dispatch(fetchUnits(token, url))

      // dispatch(fetchCreateVariations(token, url))
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

  // const onchangeHandle = event => {
  //   setValueToShow(event.target.value)
  // }

  return (
    <Grid container spacing={6}>
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

      <UnitsForm type={'Add'} open={open} setOpen={setOpen} />
    </Grid>
  )
}

export default Units
