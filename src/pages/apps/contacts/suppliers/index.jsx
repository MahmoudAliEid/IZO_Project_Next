// ** React Imports
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { postDeleteUser } from 'src/store/apps/izoUsers/deleteUserSlice'

// ** Next Imports
import Link from 'next/link'
import { getCookie } from 'cookies-next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// import { styled } from '@mui/material/styles'
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
import { fetchSuppliers } from 'src/store/apps/contacts/getSuppliersSlice'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

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
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

import SidebarEditUser from 'src/views/apps/user/list/EditUserDrawer'

// ** Vars
// const userRoleObj = {
//   admin: { icon: 'bx:mobile-alt', color: 'error' },
//   author: { icon: 'bx:cog', color: 'warning' },
//   editor: { icon: 'bx:edit', color: 'info' },
//   maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
//   subscriber: { icon: 'bx:user', color: 'primary' }
// }

const userStatusObj = {
  active: { title: 'active', color: 'success' },
  pending: { title: 'pending', color: 'warning' },
  inactive: { title: 'inactive', color: 'secondary' }
}

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
  const [editUserOpen, setEditUserOpen] = useState(false)
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

  const handleDelete = () => {
    if (!id || !token) {
      console.log('Invalid id or token')
      handleRowOptionsClose()

      return
    }

    dispatch(postDeleteUser({ id }))
      .then(() => {
        dispatch(fetchIzoUsers(token, url))
        console.log('User deleted id, token, url', id, token, url)
        handleRowOptionsClose()
      })
      .catch(error => {
        console.error('Error deleting user:', error)

        // Handle the error as needed
        handleRowOptionsClose()
      })
  }

  const handleEdit = () => {
    setEditUserOpen(!editUserOpen)
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
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/apps/user/view/account/${id}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem>
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
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:money' fontSize={20} />
          Pay
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:power-off' fontSize={20} />
          Deactivate
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mingcute:paper-line' fontSize={20} />
          Ledger
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='uiw:paper-clip' fontSize={20} />
          Documents & Notes
        </MenuItem>
      </Menu>
      {editUserOpen && <SidebarEditUser open={editUserOpen} toggle={handleEdit} itemId={id} />}
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
    minWidth: 180,
    field: 'contact_id',
    headerName: 'Contact ID',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.contact_id ? row.contact_id : 'No ID available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 360,
    field: 'name',
    headerName: 'Business Name',
    renderCell: ({ row }) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            {/* <LinkStyled href='/apps/user/view/account'></LinkStyled> */}
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {name ? name : 'Not available'}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  // {
  //   flex: 0.25,
  //   minWidth: 240,
  //   field: 'supplier_business_name',
  //   headerName: 'Business Name',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {row.supplier_business_name ? row.supplier_business_name : 'Not available'}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'tax_number',
    headerName: 'Tax Number',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.tax_number ? row.tax_number : 'Not available'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }) => {
      const { type } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{type}</Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'contact_status',
    headerName: 'Status',
    renderCell: params => {
      const status = userStatusObj[params.row.contact_status]

      return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    }
  },

  {
    flex: 0.25,
    minWidth: 180,
    field: 'mobile',
    headerName: 'Mobile',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.mobile ? row.mobile : 'No Mobile'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'credit_limit',
    headerName: 'Credit Limit',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.credit_limit ? row.credit_limit : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'pay_term_number',
    headerName: 'Pay Term',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.pay_term_number ? row.pay_term_number : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'opening_balance',
    headerName: 'Opening Balance',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.opening_balance ? `${row.opening_balance} AED` : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'advance_balance',
    headerName: 'Advance Balance',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.advance_balance ? `${row.advance_balance} AED` : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 220,
    field: 'created_at',
    headerName: 'Added on',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row?.created_at ? new Date(row.created_at).toLocaleString() : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'customer_group_id',
    headerName: 'Customer Group',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.customer_group_id ? row.customer_group_id : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.city && row.country ? `${row.city}/${row.country}` : 'No Address'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'total_purchase_due',
    headerName: 'Total Purchase Due',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.total_purchase_due ? `${row.total_purchase_due} AED` : 'No Data'}
        </Typography>
      )
    }
  },
  ,
  {
    flex: 0.25,
    minWidth: 200,
    field: 'total_purchase_return_due',
    headerName: 'Total Purchase Return Due',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.total_purchase_return_due ? `${row.total_purchase_return_due} AED` : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field1',
    headerName: 'Custom Field 1 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field1 ? row.custom_field1 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field2',
    headerName: 'Custom Field 2 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field2 ? row.custom_field2 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field3',
    headerName: 'Custom Field 3 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field3 ? row.custom_field3 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field4',
    headerName: 'Custom Field 4 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field4 ? row.custom_field4 : 'No Data'}
        </Typography>
      )
    }
  },

  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field5',
    headerName: 'Custom Field 5 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field5 ? row.custom_field5 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field6',
    headerName: 'Custom Field 6 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field6 ? row.custom_field6 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field7',
    headerName: 'Custom Field 7 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field7 ? row.custom_field7 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field8',
    headerName: 'Custom Field 8 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field8 ? row.custom_field8 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field9',
    headerName: 'Custom Field 9 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field9 ? row.custom_field9 : 'No Data'}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'custom_field10',
    headerName: 'Custom Field 10 ',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.custom_field10 ? row.custom_field10 : 'No Data'}
        </Typography>
      )
    }
  }

  // {
  //   flex: 0.2,
  //   field: 'role',
  //   minWidth: 160,
  //   headerName: 'Role',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         <CustomAvatar
  //           skin='light'
  //           sx={{ mr: 3, width: 30, height: 30 }}
  //           color={userRoleObj[row.role ? row.role : 'admin'].color}
  //         >
  //           <Icon fontSize={18} icon={userRoleObj[row.role ? row.role : 'admin'].icon} />
  //         </CustomAvatar>
  //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
  //           {row.role ? row.role : 'Admin'}
  //         </Typography>
  //       </Box>
  //     )
  //   }
  // },
]

const Suppliers = ({ apiData }) => {
  // ** State
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const title = 'Suppliers List-Manage your Suppliers'

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const [data, setData] = useState(null)

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.getSuppliers?.data?.contact)

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
      dispatch(fetchSuppliers(token, url))
    }
  }, [dispatch, token, url])

  // const handleFilter = useCallback((val: string) => {
  //   setValue(val)
  // }, [])

  // const handleRoleChange = useCallback((e: SelectChangeEvent) => {
  //   setRole(e.target.value)
  // }, [])

  // const handlePlanChange = useCallback((e: SelectChangeEvent) => {
  //   setPlan(e.target.value)
  // }, [])

  // const handleStatusChange = useCallback((e: SelectChangeEvent) => {
  //   setStatus(e.target.value)
  // }, [])

  // ** PDF
  // const generatePDF = useReactToPrint({

  //   content: () => componentPDF.current,
  //   documentTitle: "Suppliers",
  // })

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

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

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid> */}
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
              <Button startIcon={<AddCircleOutlineIcon />} onClick={toggleAddUserDrawer} variant='contained'>
                Add
              </Button>
            </Box>
          </Box>
          <Box>
            {data ? (
              <>
                {' '}
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                    <TableBody>
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Total Purchase Due</TableCell>
                        <TableCell align='right'>7657</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total Purchase Return Due</TableCell>
                        <TableCell align='right'>7657</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align='right'>543</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
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

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
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

export default Suppliers
