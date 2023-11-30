// ** React Imports
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import useSubmitUser from 'src/hooks/useSubmitUser'
import VariationsForm from 'src/@core/components/products/variations/variationForm/VariationsForm'
import VariationFormEdit from 'src/@core/components/products/variations/variationForm/VariationFormEdit'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

// import DialogEdit from 'src/@core/components/Variatons/dialogEdit'

import { deleteVariations } from 'src/store/apps/products/variations/deleteVariationsSlice'
import { postAddVariations } from 'src/store/apps/products/variations/postCreateVariations'

// import { postDeleteUser } from 'src/store/apps/izoUsers/deleteUserSlice'

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

// import Dialog from '@mui/material/Dialog'
// import Select from '@mui/material/Select'
// import { Chip } from '@mui/material'

// import Switch from '@mui/material/Switch'
// import TextField from '@mui/material/TextField'
// import InputLabel from '@mui/material/InputLabel'
// import DialogTitle from '@mui/material/DialogTitle'
// import FormControl from '@mui/material/FormControl'
// import DialogContent from '@mui/material/DialogContent'

// import DialogActions from '@mui/material/DialogActions'
// import InputAdornment from '@mui/material/InputAdornment'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import DialogContentText from '@mui/material/DialogContentText'
// import { Formik } from 'formik'

// import { styled } from '@mui/material/styles'
// import * as Yup from 'yup'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// import InputLabel from '@mui/material/InputLabel'
// import FormControl from '@mui/material/FormControl'
// import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchVariations } from 'src/store/apps/products/variations/getVariationsSlice'
import { fetchCreateVariations } from 'src/store/apps/products/variations/getCreateVariationsSlice'

// ** Custom Components Imports

// import CustomAvatar from 'src/@core/components/mui/avatar'

// import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
// import { CardStatsType } from 'src/@fake-db/types'
// import { ThemeColor } from 'src/@core/layouts/types'
// import { UsersType } from 'src/types/apps/userTypes'
// import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
// import TableHeader from 'src/views/apps/user/list/TableHeader'

// import SidebarEditUser from 'src/views/apps/user/list/EditUserDrawer'

// ** Vars
// const userRoleObj = {
//   admin: { icon: 'bx:mobile-alt', color: 'error' },
//   author: { icon: 'bx:cog', color: 'warning' },
//   editor: { icon: 'bx:edit', color: 'info' },
//   maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
//   subscriber: { icon: 'bx:user', color: 'primary' }
// }

// const userStatusObj = {
//   active: { title: 'active', color: 'success' },
//   pending: { title: 'pending', color: 'warning' },
//   inactive: { title: 'inactive', color: 'secondary' }
// }

// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontWeight: 600,
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
//         {getInitials(row.name ? row.name : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

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

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  function removeObjectById(arr, idToRemove) {
    const newArray = arr.filter(item => item.id !== idToRemove)

    return newArray
  }
  const handleDelete = () => {
    if (!id || !token) {
      console.log('Invalid id or token')
      handleRowOptionsClose()

      return
    }
    const frontData = removeObjectById(data, id)
    setData(frontData)

    dispatch(deleteVariations({ id }))
      .then(() => {
        dispatch(fetchVariations(token, url))
        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting user:', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }

  const handleDeleteAlert = () => {
    setOpenAlert(prev => !prev)
  }

  // const handleEdit = () => {
  //   setOpen(true)
  //   console.log(id)
  // }

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
            setOpen(true)
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
      {open && (
        <VariationFormEdit
          type={'Edit'}
          open={open}
          setOpen={setOpen}
          itemId={id}
          mainData={data}
          setMainData={setData}
        />
      )}
      {openAlert && (
        <DeleteGlobalAlert
          name='Variation'
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
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Variations',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.name ? row.name : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'list',
    headerName: 'Values',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap={false} sx={{ color: 'text.secondary' }}>
          {row.list ? row.list.map(item => item.name + ', ') : 'Not available'}
        </Typography>
      )
    }
  }
]

const Variations = () => {
  // ** State

  const [open, setOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [data, setData] = useState(null)
  const [dataForm, setDataForm] = useState(null)
  const title = 'Variations List'
  const newData = data && data.length ? data.map(item => ({ ...item, data, setData })) : []

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Hooks
  const dispatch = useDispatch()
  const { handleSubmitData } = useSubmitUser()

  const store = useSelector(state => state.getVariations?.data?.value)
  const storeAddFormData = useSelector(state => state.getCreateVariations?.data?.value)

  useEffect(() => {
    setData(store)
    setDataForm(storeAddFormData)
  }, [store, storeAddFormData])

  // ** Cookies
  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    setToken(token)

    setUrl(url)
  }, [token, url])

  useEffect(() => {
    if (token && url) {
      dispatch(fetchVariations(token, url))
      dispatch(fetchCreateVariations(token, url))
    }
  }, [dispatch, token, url])

  const handleAddClickOpen = () => setOpen(true)

  // ** handle search function
  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
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

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values, 'form  add variations')
    console.log('Add btn clicked')
    handleSubmitData(postAddVariations, fetchVariations, values)
    setOpen(false)
    resetForm()

    setData(prev => {
      return [
        ...prev,
        {
          id: Math.floor(Math.random()),
          list: values.items.map(item => ({
            name: item
          })),
          ...values
        }
      ]
    })
  }
  console.log(data, 'data form add')

  // const onchangeHandle = event => {
  //   setValueToShow(event.target.value)
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
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
      {dataForm && <VariationsForm type={'Add'} open={open} setOpen={setOpen} handleSubmit={handleSubmit} />}
    </Grid>
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

export default Variations
