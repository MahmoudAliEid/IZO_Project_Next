// ** React Imports
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { postDeleteUser } from 'src/store/apps/izoUsers/deleteUserSlice'



// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import { getCookie } from 'cookies-next'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'



// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchIzoUsers } from 'src/store/apps/izoUsers/izoUsersSlice'


// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import DialogAddUser from 'src/views/apps/user/list/DialogAddUser'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

// interface UserStatusType {
//   [key: string]: ThemeColor
// }

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'bx:mobile-alt', color: 'error' },
  author: { icon: 'bx:cog', color: 'warning' },
  editor: { icon: 'bx:edit', color: 'info' },
  maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
  subscriber: { icon: 'bx:user', color: 'primary' }
}

interface CellType {
  row: UsersType
}

// const userStatusObj: UserStatusType = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// }

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = (row: UsersType) => {
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


const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  // ** State
  // const [dataFetched, setDataFetched] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertDelete,setOpenAlertDelete]=useState<boolean>(false)

  const rowOptionsOpen = Boolean(anchorEl);

  // ** Cookies

  const token = getCookie('token');
  const url = getCookie('apiUrl');


  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (!id || !token) {
      console.log('Invalid id or token');
      handleRowOptionsClose();

      return;
    }

    //@ts-ignore
    dispatch(postDeleteUser({ id }))
      .then(() => {
        //@ts-ignore
        dispatch(fetchIzoUsers({token, url}));
        console.log('User deleted id, token, url', id, token, url);
        handleRowOptionsClose();
      })
      .catch(error => {
        console.error('Error deleting user:', error);

        // Handle the error as needed
        handleRowOptionsClose();
      });
  };

  const handleEdit = () => {
    setEditUserOpen(!editUserOpen);
  };

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
        <MenuItem onClick={() => {
          handleEdit();
          handleRowOptionsClose();
        }
        }

          sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:pencil' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={()=>setOpenAlertDelete(true)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {

        // editUserOpen && <SidebarEditUser open={editUserOpen} toggle={handleEdit} itemId={id} />
      }
      {
        editUserOpen && <DialogAddUser open={editUserOpen} toggle={handleEdit} isEdit={true} itemId={id} />
      }
      {
        openAlertDelete && <DeleteGlobalAlert name={'User'} open={openAlertDelete} close={()=>setOpenAlertDelete(false)} mainHandleDelete={handleDelete}/>
      }

    </>
  )
};

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  },
  {
    flex: 0.25,
    minWidth: 240,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      const { name, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/account'>{name}</LinkStyled>
            <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
              {email ? email : "defualt@example.com"}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 240,
    field: 'username',
    headerName: 'User Name',
    renderCell: ({ row }: CellType) => {
      const { username } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/account'>{username ? username : row.name}</LinkStyled>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 240,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.email ? row.email : "defualt@example.com"}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    field: 'role',
    minWidth: 160,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            sx={{ mr: 3, width: 30, height: 30 }}
            color={userRoleObj[row.role ? row.role : "admin"].color as ThemeColor}
          >
            <Icon fontSize={18} icon={userRoleObj[row.role ? row.role : "admin"].icon} />
          </CustomAvatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role ? row.role : "Admin"}
          </Typography>
        </Box>
      )
    }
  },



]

type DataType = {
  users: {
    data: {
      users: {
        id: string,
        name: string,
        email: string,
        username: string,
        avatar: string,
        role: string
      }
    }
  }
}
const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataType[]>([])
  const title = 'Users List'

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  //@ts-ignore
  const [data, setData] = useState<DataType[]>(null);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  //@ts-ignore
  const store = useSelector((state) => state.users?.data?.users)

  useEffect(() => {
    setData(store)
  }, [store])


  // ** Cookies
  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    //@ts-ignore
    setToken(token)

    //@ts-ignore
    setUrl(url)
  }, [token, url])




  useEffect(() => {

    if (token && url) {
      //@ts-ignore
      dispatch(fetchIzoUsers({token, url}));
    }

  }, [dispatch, token, url])



  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)


  // ** handle search function
  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
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
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.map((item: CardStatsHorizontalProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
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
          <CardHeader title={title} />

              <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2  }}>
                <Button fullWidth startIcon={<AddCircleOutlineIcon />} onClick={toggleAddUserDrawer} variant='contained'>
                  Add
                </Button>
              </Box>
            </Box>
          <Divider sx={{ mb:2 }} />

          <Box >
            {data ? <DataGrid
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
                  onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                }
              }}


            /> : <Grid>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: "center", padding: "20px" }}>
                <Box><ProgressCustomization /></Box>
              </Box>

            </Grid>}
          </Box>

        </Card>
      </Grid>

      {

        // <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />

      }

      {

        <DialogAddUser open={addUserOpen} toggle={toggleAddUserDrawer} isEdit={false} />

      }
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/apps/users/stats')
  const apiData: CardStatsType['statsHorizontal'] = res.data

  return {
    props: {
      apiData
    }
  }
}

export default UserList
