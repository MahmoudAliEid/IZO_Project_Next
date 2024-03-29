// ** React Imports
import { useState } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// import { getCookie, setCookie } from 'cookies-next'

// import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import DeleteAlert from '../variationAlert/DeleteAlert'

// import useSubmitUser from 'src/hooks/useSubmitUser'
// import VariationsForm from 'src/@core/components/products/variations/variationForm/VariationsForm'
// import VariationFormEdit from 'src/@core/components/products/variations/variationForm/VariationFormEdit'

// import DialogEdit from 'src/@core/components/Variatons/dialogEdit'

// import { deleteVariations } from 'src/store/apps/products/variations/deleteVariationsSlice'
// import { postAddVariations } from 'src/store/apps/products/variations/postCreateVariations'

// import { postDeleteUser } from 'src/store/apps/izoUsers/deleteUserSlice'

// ** Next Imports
// import { getCookie } from 'cookies-next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'

// import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Card from '@mui/material/Card'

// import * as Yup from 'yup'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
// import { useSelector } from 'react-redux'

// import { fetchVariations } from 'src/store/apps/products/variations/getVariationsSlice'
// import { fetchCreateVariations } from 'src/store/apps/products/variations/getCreateVariationsSlice'

// ** Third Party Components
import axios from 'axios'
import { FormControl, TextField } from '@mui/material'

const RowOptions = ({ idRow, itemId, row }) => {
  // ** Hooks
  // const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const [openAlert, setOpenAlert] = useState(false)

  const rowOptionsOpen = anchorEl

  // ** Cookies

  // const token = getCookie('token')

  // const url = getCookie('apiUrl')

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // const handleDelete = () => {
  //   console.log('handleDelete', id)

  //   // if (!id || !token) {
  //   //   console.log('Invalid id or token')
  //   //   handleRowOptionsClose()

  //   //   return
  //   // }

  //   // dispatch(deleteVariations({ id }))
  //   //   .then(() => {
  //   //     dispatch(fetchVariations(token, url))
  //   //     console.log('User deleted id, token, url', id, token, url)
  //   //     handleRowOptionsClose()
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error deleting user:', error)

  //   //     // Handle the error as needed
  //   //     handleRowOptionsClose()
  //   //   })
  // }

  const AlertOpen = () => {
    setOpenAlert(prev => !prev)
    handleRowOptionsClose()
  }
  const toggle = () => {
    setOpenAlert(prev => !prev)
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
        <MenuItem onClick={AlertOpen} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {openAlert && (
        <DeleteAlert
          open={openAlert}
          close={toggle}
          idRow={idRow}
          itemId={itemId}
          row={row}
          oldListData={row.oldListData}
          setOldListData={row.setOldListData}
        />
      )}
    </>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 120,
    minHeight: 80,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => {
      return (
        // <Typography noWrap sx={{ color: 'text.secondary' }}>
        //   {row.name ? row.name : 'Not available'}
        // </Typography>
        <FormControl fullWidth sx={{ my: 3 }}>
          <TextField
            id='outlined-basic'
            fullWidth
            label='Name'
            variant='outlined'
            value={row.name ? row.name : 'Not available'}
            //on change i want to update the value of the name by its id and the value of the input
            // by those row.setOldListData(filter on it) row.oldListData (update it)
            onChange={e => {
              row.setOldListData(
                row.oldListData.map(item => {
                  if (item.id === row.id) {
                    return { ...item, name: e.target.value }
                  }

                  return item
                })
              )
            }}
          />
        </FormControl>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions idRow={row.id} itemId={row.itemId} row={row} />
  }
]

const VariationsTable = ({ itemId, oldListData, setOldListData }) => {
  // ** State
  // Check if data is defined before mapping
  const rowsWithId = oldListData ? oldListData.map(item => ({ ...item, itemId, oldListData, setOldListData })) : []
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // const [dataOld, setDataOld] = useState([])
  const title = 'Variations Items'

  //test copy data
  // const listData = useSelector(state => state?.getEditVariations?.data?.value[0].list)

  // useEffect(() => {
  //   setDataOld(listData)
  // }, [listData])

  // if (dataOld) {
  //   setCookie('oldVariations', listData)
  // }

  // const cookieDataString = getCookie('oldVariations')
  // const cookieData = cookieDataString ? JSON.parse(cookieDataString) : []

  // const CookieData = cookieData ?? []

  // console.log(`cookies old Variations: ${typeof CookieData}`)

  // const mainData = CookieData => {
  //   const arrOfObjects = []
  //   for (const object of CookieData) {
  //     arrOfObjects.push(object)
  //   }

  //   return arrOfObjects
  // }

  // const MainDataArray = mainData(CookieData)

  // console.log(MainDataArray, 'Main Data Array')

  // const rowsWithId = MainDataArray ? MainDataArray.map(item => ({ ...item, itemId, values, MainDataArray })) : []

  // console.log(rowsWithId, 'rowsWithId')

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // console.log(values, 'values of update form')

  // ** handle search function
  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = rowsWithId.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <Card>
      <CardHeader title={title} />
      <Divider sx={{ m: '0 !important' }} />
      {/* <Box
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
          </Box> */}
      <Box>
        {rowsWithId ? (
          <DataGrid
            autoHeight
            rowHeight={70}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rows={filteredData.length ? filteredData : rowsWithId}
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
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/apps/users/stats')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default VariationsTable
