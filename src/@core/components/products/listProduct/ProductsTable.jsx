/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React & Components
import { useState, useEffect, Fragment } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import FormProduct from 'src/@core/components/products/listProduct/forms/FormProduct'
import ProductView from 'src/@core/components/products/listProduct/productView/ProductView'

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
import { FormControl, Select, InputLabel, FormControlLabel, Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from 'src/store/apps/products/listProducts/getProductsSlice'
import { deleteProduct } from 'src/store/apps/products/listProducts/postDeleteProductSlice'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.2)} !important`
}))

const ViewInventory = ({ row }) => {
  // ** state
  const [openViewMain, setOpenViewMain] = useState(false)

  const handleView = () => {
    setOpenViewMain(prev => !prev)
  }

  return (
    <Grid container spacing={2} sx={{ margin: '5px 0', mb: 5 }}>
      <Grid item xs={12}>
        <Typography sx={{ color: 'text.secondary' }}>{row.stock ? row.stock : 'Not available'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <StyledButton variant='outlined' onClick={handleView} size='small'>
          View Stock
        </StyledButton>
      </Grid>
      {openViewMain && <ProductView open={openViewMain} setOpen={setOpenViewMain} id={row.id} />}
    </Grid>
  )
}

const RowOptions = ({ id, setOpenViewMain }) => {
  // console.log(data, setData)

  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')

  const rowOptionsOpen = anchorEl

  // ** Functions
  // function removeObjectById(arr, idToRemove) {
  //   const newArray = arr.filter(item => item.id !== idToRemove)

  //   return newArray
  // }

  useEffect(() => {
    // ** Cookies
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  const toggle = () => {
    setOpen(prev => !prev)
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
    // const frontData = removeObjectById(data, id)
    // setData(frontData)

    dispatch(deleteProduct({ id, token }))
      .then(() => {
        dispatch(fetchProducts(token))

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

  //handle view
  const handleView = () => {
    setOpenView(prev => !prev)
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
            handleRowOptionsClose()
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='bx:pencil' fontSize={20} />
          Edit
        </MenuItem>

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

      {open && <FormProduct isEdit={true} open={open} toggle={toggle} itemId={id} />}
      {openAlert && (
        <DeleteGlobalAlert name='Category' open={openAlert} close={handleDeleteAlert} mainHandleDelete={handleDelete} />
      )}
      {openView && <ProductView open={openView} setOpen={setOpenView} id={id} />}
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
    renderCell: ({ row }) => <RowOptions id={row.id} data={row.data} setData={row.setData} />
  },
  {
    flex: 0.25,
    minWidth: 310,

    minHeight: 310,
    field: 'image',
    headerName: 'Image',
    renderCell: ({ row }) => {
      return (
        <>
          {row.image ? (
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
              <Image
                alt={'Product Image'}
                src={row.image}
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
            </Box>
          ) : (
            'No Image'
          )}
        </>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
    field: 'name',
    headerName: 'Product Name',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.name ? row.name : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
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
    minWidth: 190,
    field: 'location',
    headerName: 'Business Location ',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.location ? row.location : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
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
    minHeight: 150,
    field: 'current_stock',
    headerName: 'Current Stock',
    renderCell: ({ row }) => {
      return <ViewInventory row={row} />
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
    field: 'category',
    headerName: 'Category ',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.category ? row.category : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
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

// const columnsInventoryReport = [
//   {
//     flex: 0.1,
//     minWidth: 90,
//     sortable: false,
//     field: 'action',
//     headerName: 'Action',
//     renderCell: ({ row }) => <RowOptions id={row.id} />
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'product',
//     headerName: 'Product Name',
//     renderCell: ({ row }) => {
//       return <Typography sx={{ color: 'text.secondary' }}>{row.product ? row.product : 'Not available'}</Typography>
//     }
//   },
//   {
//     flex: 0.2,
//     minWidth: 150,
//     field: 'sku',
//     headerName: 'SKU',
//     renderCell: ({ row }) => {
//       return <Typography sx={{ color: 'text.secondary' }}>{row.sku ? row.sku : 'Not available'}</Typography>
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'location',
//     headerName: 'Business Location',
//     renderCell: ({ row }) => {
//       return <Typography sx={{ color: 'text.secondary' }}>{row.location ? row.location : 'Not available'}</Typography>
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 150,
//     field: 'unit_price',
//     headerName: 'Unit Price',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.unit_price ? row.unit_price + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 210,
//     field: 'current_stock_value_individual_price',
//     headerName: 'Current Stock Value (At the individual price to buy)',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.current_stock_value_individual_price
//             ? row.current_stock_value_individual_price + ' ' + 'AED'
//             : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 210,
//     field: 'current_stock_value_purchase_price',
//     headerName: 'Current Stock Value (By purchase price)',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.current_stock_value_purchase_price
//             ? row.current_stock_value_purchase_price + ' ' + 'AED'
//             : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 210,
//     field: 'purchase_price_local_currency',
//     headerName: 'Purchase Price in Local Currency',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.purchase_price_local_currency ? row.purchase_price_local_currency + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 220,
//     field: 'current_stock_value_sale_price',
//     headerName: 'Current Stock Value (At the price of individuals for sale)',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.current_stock_value_sale_price ? row.current_stock_value_sale_price + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 210,
//     field: 'current_stock_value_sale_price',
//     headerName: 'Current Stock Value (By sale price)',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.current_stock_value_sale_price ? row.current_stock_value_sale_price + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'selling_price_local_currency',
//     headerName: 'Selling price in local currency',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.selling_price_local_currency ? row.selling_price_local_currency + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'potential_individual_profit',
//     headerName: 'Potential individual profit',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.potential_individual_profit ? row.potential_individual_profit + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'potential_profit',
//     headerName: 'Potential profit',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.potential_profit ? row.potential_profit + ' ' + 'AED' : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'total_unit_sold',
//     headerName: 'Total unit sold',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.total_unit_sold ? row.total_unit_sold : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'total_unit_transferred',
//     headerName: 'Total Unit Transferred',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.total_unit_transferred ? row.total_unit_transferred : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'total_unit_adjusted',
//     headerName: 'Total Unit Adjusted',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.total_unit_adjusted ? row.total_unit_adjusted : 'Not available'}
//         </Typography>
//       )
//     }
//   },
//   {
//     flex: 0.25,
//     minWidth: 190,
//     field: 'current_stock_manufacturing',
//     headerName: 'Current Stock (Manufacturing)',
//     renderCell: ({ row }) => {
//       return (
//         <Typography sx={{ color: 'text.secondary' }}>
//           {row.current_stock_manufacturing ? row.current_stock_manufacturing : 'Not available'}
//         </Typography>
//       )
//     }
//   }
// ]
const ProductsTable = () => {
  // ** State
  const [openForm, setOpenForm] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [withImage, setWithImage] = useState(1)
  const [TabValue, setTabValue] = useState('1')
  const [notForSale, setNotForSale] = useState(false)

  // const [dataTree, setDataTree] = useState(null)

  // ** Constants
  const newData = data && data.length ? data.map(item => ({ ...item })) : []
  const title = 'Products List'

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Selectors
  const store = useSelector(state => state.getProducts?.data?.value?.items)

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
      dispatch(fetchProducts(token))
    }
  }, [dispatch, token, url])

  // ** Functions
  const handleAddClickOpen = () => setOpenForm(true)
  const toggle = () => {
    setOpenForm(prev => !prev)
  }

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
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
      <Grid item xs={12}>
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
            getRowHeight={() => 'auto'}
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
      </Grid>
    </Grid>
  )
}

export default ProductsTable
