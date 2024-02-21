// ** React Imports
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
// import useSubmitUser from 'src/hooks/useSubmitUser'
import DialogEdit from 'src/@core/components/customerGroups/dialogEdit'
// import { postAddCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/postCreateCGSlice'
import { postDeleteCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/postDeleteCGSlice'

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

// // import Switch from '@mui/material/Switch'
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
import { fetchCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/getCustomerGroupSlice'
import { fetchCreateCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/getCreateCGSlice'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'

// import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import DialogAddCG from 'src/@core/components/customerGroups/dialogAdd'

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
const renderClient = row => {
  if (row.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
      >
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [editCustomerGroupOpen, setEditCustomerGroupOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

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

  const handleDelete = () => {
    console.log('handleDelete')

    if (!id || !token) {
      console.log('Invalid id or token')
      handleRowOptionsClose()

      return
    }

    dispatch(postDeleteCustomerGroup({ id }))
      .then(() => {
        dispatch(fetchCustomerGroup(token, url))
        console.log('User deleted id, token, url', id, token, url)
        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting user:', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }

  // const handleEdit = () => {
  //   setEditCustomerGroupOpen(true)
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
            setEditCustomerGroupOpen(true)
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
      {editCustomerGroupOpen && (
        <DialogEdit openEdit={editCustomerGroupOpen} setOpenEdit={setEditCustomerGroupOpen} itemId={id} />
      )}
      {openDeleteAlert && (
        <DeleteGlobalAlert
          open={openDeleteAlert}
          close={() => setOpenDeleteAlert(!openDeleteAlert)}
          mainHandleDelete={handleDelete}
          name='Customer Group'
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
    renderCell: ({ row }) => <RowOptions id={row.id} />
  },
  {
    flex: 0.25,
    minWidth: 360,
    field: 'name',
    headerName: 'Customer Group Name',
    renderCell: ({ row }) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
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
    minWidth: 200,
    field: 'amount',
    headerName: 'Calculation percentage(%)',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.amount ? row.amount : 'Not available'}
        </Typography>
      )
    }
  },

  {
    flex: 0.25,
    minWidth: 200,
    field: 'selling_price_group_id',
    headerName: 'Sale Price Group',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.selling_price_group_id ? row.selling_price_group_id : 'Not available'}
        </Typography>
      )
    }
  }
]

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   amount: Yup.string().required('amount is required'),
//   rice_calculation_type: Yup.string().required('Price Calculation Type is required'),
//   selling_price_group_id: Yup.string().required('Sale Price Group is required')
// })

const CustomerGroups = () => {
  // ** State

  const [openAdd, setOpenAdd] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  // const [valueToShow, setValueToShow] = useState('percentage')
  // const formInputData = {
  //   name: '',
  //   amount: null,
  //   price_calculation_type: 'percentage',
  //   selling_price_group_id: null
  // }
  const [data, setData] = useState(null)
  // const [dataForm, setDataForm] = useState(null)
  const title = 'Customer Groups List'

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** Hooks
  const dispatch = useDispatch()
  // const { handleSubmitData } = useSubmitUser()

  const store = useSelector(state => state.getCustomerGroup?.data?.value)
  // const storeAddFormData = useSelector(state => state.getCreateCustomerGroup?.data?.value)
  const saveStatus = useSelector(state => state?.postCreateCustomerGroup)

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
      dispatch(fetchCustomerGroup(token, url))
      dispatch(fetchCreateCustomerGroup(token, url))
    }
  }, [dispatch, token, url])

  const handleAddClickOpen = () => setOpenAdd(true)
  const handleAddClose = () => setOpenAdd(false)

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

  // const handleSubmit = (values, { resetForm }) => {
  //   // Handle form submission logic here
  //   console.log(values, 'form  add customer group')
  //   console.log('Add btn clicked')
  //   handleSubmitData(postAddCustomerGroup, fetchCustomerGroup, values)
  //   resetForm()
  //   setOpenLoading(true)
  // }

  // const onchangeHandle = event => {
  //   setValueToShow(event.target.value)
  // }

  // console.log(valueToShow)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={saveStatus} />
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
      {/* {dataForm && (
        <Dialog
          scroll='body'
          open={openAdd}
          onClose={handleAddClose}
          aria-labelledby='customer-group-edit'
          sx={{
            '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
            '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
          }}
          aria-describedby='customer-group-edit-description'
        >
          <DialogTitle
            id='customer-group-edit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            Add Customer Group Information
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText variant='body2' id='customer-group-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Add Customer Group details will receive a privacy audit.
            </DialogContentText>
            <Formik
              initialValues={formInputData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, handleBlur, handleChange, handleSubmit, resetForm }) => (
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Customer Group Name'
                        value={values.name || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='name'
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='customer-group-Price-calculation-type-label'>Price Calculation Type</InputLabel>
                        <Select
                          label='Price Calculation Type'
                          value={values.price_calculation_type}
                          onChange={event => {
                            onchangeHandle(event)
                            handleChange(event)
                          }}
                          onBlur={handleBlur}
                          name='price_calculation_type'
                          id='customer-group-Price-calculation-type'
                          labelId='customer-group-Price-calculation-type-label'
                        >
                          {Object.keys(dataForm).length === 0
                            ? null
                            : dataForm.price_collection_price.map((item, id) => (
                                <MenuItem key={id} value={item.key}>
                                  {item.value}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {valueToShow === 'percentage' ? (
                        <TextField
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='amount'
                          label='Calculation Percentage (%)'
                          value={values.amount}
                        />
                      ) : valueToShow === 'selling_price_group' ? (
                        <FormControl fullWidth>
                          <InputLabel id='customer-group-selling-price-group-id-label'>Sale Price Group</InputLabel>
                          <Select
                            label='Price Calculation Type'
                            value={values.sales_price_group}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='selling_price_group_id'
                            id='customer-group-selling-price-group-id'
                            labelId='customer-group-selling-price-group-id-label'
                          >
                            {Object.keys(dataForm).length === 0
                              ? null
                              : dataForm.sales_price_group.map((item, id) => (
                                  <MenuItem key={id} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, flexDirection: 'row-reverse' }}>
                    <Button
                      size='large'
                      type='submit'
                      variant='contained'
                      sx={{ mr: 3, ml: 3 }}
                      onClick={e => {
                        e.preventDefault()
                        handleSubmit(values, { resetForm })
                        setOpenLoading(true)
                      }}
                    >
                      Add
                    </Button>
                    <Button size='large' variant='outlined' color='secondary' onClick={handleAddClose}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      )} */}
      {openAdd && <DialogAddCG openAdd={openAdd} handleAddClose={handleAddClose} />}
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

export default CustomerGroups
