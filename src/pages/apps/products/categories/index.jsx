// ** React & Components
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import CategoriesTree from 'src/@core/components/products/categories/CategoriesTree'
import CategoriesForm from 'src/@core/components/products/categories/CategoriesForm/CategoriesForm'
import CategoriesEditForm from 'src/@core/components/products/categories/CategoriesForm/CategoriesEditForm'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

// ** Next Imports
import { getCookie } from 'cookies-next'
import Image from 'next/image'

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

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from 'src/store/apps/products/categories/deleteCategorySlice'
import { fetchCategories } from 'src/store/apps/products/categories/getCategoriesSlice'
import { fetchCategoriesTree } from 'src/store/apps/products/categories/getCategoriesTreeSlice'

const RowOptions = ({ id, data, setData }) => {
  console.log(data, setData)

  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const rowOptionsOpen = anchorEl

  // ** Functions
  // function removeObjectById(arr, idToRemove) {
  //   const newArray = arr.filter(item => item.id !== idToRemove)

  //   return newArray
  // }
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
    // const frontData = removeObjectById(data, id)
    // setData(frontData)

    dispatch(deleteCategory({ id }))
      .then(() => {
        dispatch(fetchCategories())
        dispatch(fetchCategoriesTree())
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
      {open && <CategoriesEditForm type={'Edit'} open={open} setOpen={setOpen} catId={id} />}
      {openAlert && (
        <DeleteGlobalAlert name='Category' open={openAlert} close={handleDeleteAlert} mainHandleDelete={handleDelete} />
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
    flex: 0.25,
    minWidth: 220,
    field: 'name',
    headerName: 'Category',
    renderCell: ({ row }) => {
      return (
        <>
          {row.name === 'Loading...' ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0',
                width: '25px',
                paddingY: '5px'
              }}
            >
              <ProgressCustomization />
            </Box>
          ) : (
            <Typography sx={{ color: 'text.secondary' }}>{row.name ? row.name : 'Not available'}</Typography>
          )}
        </>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'short_code',
    headerName: 'Category Code',
    renderCell: ({ row }) => {
      return (
        <>
          {row.short_code === 'Loading...' ? (
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
          ) : (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.short_code ? row.short_code : 'Not available'}
            </Typography>
          )}
        </>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }) => {
      return (
        <>
          {row.description === 'Loading...' ? (
            <Box
              sx={{
                padding: '5px 0',
                color: 'text.secondary',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
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
            </Box>
          ) : (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.description ? row.description : 'Not available'}
            </Typography>
          )}
        </>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'created_by',
    headerName: 'Created By',
    renderCell: ({ row }) => {
      return (
        <>
          {row.created_by === 'Loading...' ? (
            <Box
              sx={{
                padding: '5px 0',
                color: 'text.secondary',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '20px 0'
                    }}
                  >
                    <ProgressCustomization />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.created_by ? row.created_by : 'Not available'}
            </Typography>
          )}
        </>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,

    // minHeight: 200,
    field: 'image_url',
    headerName: 'Image',
    renderCell: ({ row }) => {
      return (
        <Box
          sx={{
            padding: '5px 0',
            color: 'text.secondary',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {row.image_url ? (
            <div className='file-details'>
              <div className='file-preview'>
                {/* <img width={38} height={38} alt={'Category Image'} src={row.image_url} /> */}
                {row.image_url === 'Loading...' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '20px 0'
                    }}
                  >
                    <Box>
                      <ProgressCustomization />
                    </Box>
                  </Box>
                ) : (
                  <Image
                    alt={'Category Image'}
                    src={row.image_url}
                    width={48}
                    height={48}
                    style={{
                      margin: '3px 0',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            'No Image'
          )}
        </Box>
      )
    }
  }
]

const Categories = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState(null)
  const [dataTree, setDataTree] = useState(null)

  // ** Constants
  const newData = data && data.length ? data.map(item => ({ ...item, data, setData })) : []
  const title = 'Categories List'
  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Selectors
  const store = useSelector(state => state.getCategories?.data?.value)
  const storeTree = useSelector(state => state.getCategoriesTree?.data?.value)

  // ** Hooks
  const dispatch = useDispatch()
  useEffect(() => {
    setData(store)
  }, [store])

  useEffect(() => {
    setDataTree(storeTree)
  }, [storeTree])

  useEffect(() => {
    // ** Cookies
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  useEffect(() => {
    if (token && url) {
      dispatch(fetchCategories())
      dispatch(fetchCategoriesTree())
    }
  }, [dispatch, token, url])

  // ** Functions
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
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader title='Categories Tree' />
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
            <CategoriesTree data={dataTree} />
          </Box>
        </Card>
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

      <CategoriesForm type={'Add'} open={open} setOpen={setOpen} setData={setData} />
    </Grid>
  )
}

export default Categories
