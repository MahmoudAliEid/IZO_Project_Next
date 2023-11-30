// ** React & Components
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// import CategoriesTree from 'src/@core/components/products/categories/CategoriesTree'
// import CategoriesForm from 'src/@core/components/products/categories/CategoriesForm/CategoriesForm'
// import CategoriesEditForm from 'src/@core/components/products/categories/CategoriesForm/CategoriesEditForm'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import FormProduct from 'src/@core/components/products/listProduct/forms/FormProduct'

// ** Next Imports
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'

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
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from 'src/store/apps/products/categories/deleteCategorySlice'
import { fetchCategories } from 'src/store/apps/products/categories/getCategoriesSlice'
import { fetchCategoriesTree } from 'src/store/apps/products/categories/getCategoriesTreeSlice'
import { FormControl, Select, InputLabel } from '@mui/material'

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
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/apps/contacts/view/${id}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
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
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:plus-circle' fontSize={20} />
          More Barcode
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:coin-stack' fontSize={20} />
          View Opening Stock
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:history' fontSize={20} />
          Product History
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:duplicate' fontSize={20} />
          Duplicate Product
        </MenuItem>
      </Menu>

      {open && (
        <FormProduct
          isEdit={true}
          open={open}
          toggle={() => {
            setOpen((prev = !prev))
          }}
          itemId={id}
        />
      )}
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
    minWidth: 310,

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
                    width={300}
                    height={300}
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
  },
  {
    flex: 0.25,
    minWidth: 220,
    field: 'name',
    headerName: 'Product Name',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.name ? row.name : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'product_type',
    headerName: 'Product Type',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.product_type ? row.product_type : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'locations',
    headerName: 'Business Location ',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.locations ? row.locations : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'unit_const_pice',
    headerName: 'Unit Cost Price',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.unit_const_pice ? row.unit_const_pice + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.26,
    minWidth: 210,
    field: 'unit_sale_pice',
    headerName: 'Unit Sale Price Exc.Vat',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.unit_const_pice ? row.unit_const_pice + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
    field: 'sale_pice',
    headerName: 'Sale Price',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.sale_pice ? row.sale_pice + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
    field: 'current_stock',
    headerName: 'Current Stock',
    renderCell: ({ row }) => {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ color: 'text.secondary' }}>{row.stock ? row.stock : 'Not available'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' size='small' color='primary'>
              View Stock
            </Button>
          </Grid>
        </Grid>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 220,
    field: 'category',
    headerName: 'Category ',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.category ? row.category : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 220,
    field: 'brand',
    headerName: 'Brand ',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.brand ? row.brand : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'tax',
    headerName: 'Tax',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.tax ? row.tax : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'code',
    headerName: 'Item Code',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.code ? row.code : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'created_by',
    headerName: 'Created By',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.created_by ? row.created_by : 'Not available'}
        </Typography>
      )
    }
  }
]

const ListProducts = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [withImage, setWithImage] = useState(1)
  const [TabValue, setTabValue] = useState('1')

  // const [dataTree, setDataTree] = useState(null)

  // ** Constants
  const newData = data && data.length ? data.map(item => ({ ...item, data, setData })) : []
  const title = 'Categories List'
  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Selectors
  const store = useSelector(state => state.getCategories?.data?.value)

  // ** Hooks
  const dispatch = useDispatch()
  useEffect(() => {
    setData(store)
  }, [store])

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

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleOnChangeWithImage = event => {
    setWithImage(event.target.value)
    if (event.target.value === 0) {
      const filteredRows = data.filter(row => {
        return Object.keys(row).some(field => {
          const fieldValue = row[field]

          return fieldValue !== null && fieldValue !== undefined && fieldValue.toString() !== 'Not available'
        })
      })
      setFilteredData(filteredRows)
    } else {
      const filteredRows = data.filter(row => {
        return Object.keys(row).some(field => {
          const fieldValue = row[field]

          return fieldValue !== null && fieldValue !== undefined && fieldValue.toString() === 'Not available'
        })
      })
      setFilteredData(filteredRows)
    }
  }

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
          <CardHeader title='Filters' />
          <Divider sx={{ m: '0 !important' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Image</InputLabel>
                <Select
                  value={withImage}
                  onChange={handleOnChangeWithImage}
                  id='demo-simple-select'
                  label='Image'
                  fullWidth
                >
                  <MenuItem value={0}>With Image</MenuItem>
                  <MenuItem value={1}>Without Image</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
            <TabsWrapper panelTopRound='both'>
              <TabContext value={TabValue}>
                <TabList centered onChange={handleChangeTabValue} aria-label='icon tabs example'>
                  <Tab value='1' label='All Products' icon={<Icon icon='system-uicons:cubes' />} />
                  <Tab value='2' label='Inventory Report' icon={<Icon icon='material-symbols:inventory:heart' />} />
                </TabList>
                <TabPanel value='1'>
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
                </TabPanel>
                <TabPanel value='2'>
                  <Typography>
                    Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes.
                    Chupa chups sesame snaps halvah.
                  </Typography>
                </TabPanel>
              </TabContext>
            </TabsWrapper>
          </Box>
        </Card>
      </Grid>

      <FormProduct
        isEdit={false}
        open={open}
        toggle={() => {
          setOpen(prev => !prev)
        }}
      />
    </Grid>
  )
}

export default ListProducts
