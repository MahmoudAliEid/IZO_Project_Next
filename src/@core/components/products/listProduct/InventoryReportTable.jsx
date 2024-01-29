// ** React & Components
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import FormProduct from 'src/@core/components/products/listProduct/forms/FormProduct'

// ** Next Imports
import { getCookie } from 'cookies-next'
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

// import { styled } from '@mui/material/styles'

// ** Util Import
// import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { fetchProducts } from 'src/store/apps/products/listProducts/getProductsSlice'
import { deleteProduct } from 'src/store/apps/products/listProducts/postDeleteProductSlice'

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.2)} !important`
// }))

const RowOptions = ({ id }) => {
  // console.log(data, setData)

  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')

  const rowOptionsOpen = anchorEl

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

    dispatch(deleteProduct({ id, token }))
      .then(() => {
        dispatch(fetchProducts(token))

        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting Product:', error)

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

      {open && <FormProduct isEdit={true} open={open} toggle={toggle} itemId={id} />}
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
    field: 'action',
    headerName: 'Action',
    renderCell: ({ row }) => <RowOptions id={row.id} data={row.data} setData={row.setData} />
  },
  {
    flex: 0.25,
    minWidth: 220,
    field: 'product',
    headerName: 'Product Name',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.product ? row.product : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'sku',
    headerName: 'SKU',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.sku ? row.sku : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'location',
    headerName: 'Business Location',
    renderCell: ({ row }) => {
      return <Typography sx={{ color: 'text.secondary' }}>{row.location ? row.location : 'Not available'}</Typography>
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'unit_price',
    headerName: 'Unit Price',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.unit_price ? row.unit_price + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'current_stock_value_individual_price',
    headerName: 'Current Stock Value (At the individual price to buy)',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.current_stock_value_individual_price
            ? row.current_stock_value_individual_price + ' ' + 'AED'
            : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'current_stock_value_purchase_price',
    headerName: 'Current Stock Value (By purchase price)',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.current_stock_value_purchase_price
            ? row.current_stock_value_purchase_price + ' ' + 'AED'
            : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'purchase_price_local_currency',
    headerName: 'Purchase Price in Local Currency',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.purchase_price_local_currency ? row.purchase_price_local_currency + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'current_stock_value_sale_price',
    headerName: 'Current Stock Value (At the price of individuals for sale)',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.current_stock_value_sale_price ? row.current_stock_value_sale_price + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'current_stock_value_sale_price',
    headerName: 'Current Stock Value (By sale price)',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.current_stock_value_sale_price ? row.current_stock_value_sale_price + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'selling_price_local_currency',
    headerName: 'Selling price in local currency',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.selling_price_local_currency ? row.selling_price_local_currency + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'potential_individual_profit',
    headerName: 'Potential individual profit',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.potential_individual_profit ? row.potential_individual_profit + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'potential_profit',
    headerName: 'Potential profit',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.potential_profit ? row.potential_profit + ' ' + 'AED' : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'total_unit_sold',
    headerName: 'Total unit sold',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.total_unit_sold ? row.total_unit_sold : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'total_unit_transferred',
    headerName: 'Total Unit Transferred',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.total_unit_transferred ? row.total_unit_transferred : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'total_unit_adjusted',
    headerName: 'Total Unit Adjusted',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.total_unit_adjusted ? row.total_unit_adjusted : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'current_stock_manufacturing',
    headerName: 'Current Stock (Manufacturing)',
    renderCell: ({ row }) => {
      return (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.current_stock_manufacturing ? row.current_stock_manufacturing : 'Not available'}
        </Typography>
      )
    }
  }
]

const InventoryReportTable = () => {
  // ** State
  const [openForm, setOpenForm] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])

  console.log(setData, 'setData from InventoryReportTable')

  // ** Constants
  const title = 'Inventory Report'
  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Selectors
  // const store = useSelector(state => state.getProducts?.data?.value?.items)

  // ** Hooks
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   setData(store)
  // }, [store])

  useEffect(() => {
    // ** Cookies
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // useEffect(() => {
  //   if (token && url) {
  //     dispatch(fetchProducts(token))
  //   }
  // }, [dispatch, token, url])

  // ** Functions
  const handleAddClickOpen = () => setOpenForm(true)
  const toggle = () => {
    setOpenForm(prev => !prev)
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
            {data ? (
              <DataGrid
                autoHeight
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                slots={{ toolbar: QuickSearchToolbar }}
                onPaginationModelChange={setPaginationModel}
                rows={filteredData.length ? filteredData : data}
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
      {openForm && <FormProduct isEdit={false} open={openForm} toggle={toggle} />}
    </Grid>
  )
}

export default InventoryReportTable
