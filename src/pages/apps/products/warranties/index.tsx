'use client'

// ** React Imports
import { ChangeEvent, useState, useEffect, useRef, Fragment } from 'react'
import { Button, Divider,Grid } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// ** Custom Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp';




// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Menu from '@mui/material/Menu'


// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** redux imports
import { useDispatch, useSelector } from 'react-redux'

import { getAllWarranties } from 'src/store/apps/products/warranties/getallWarrantiesSlice'
import { deleteWarranty } from 'src/store/apps/products/warranties/deleteWarrantiesSlice'

// **icons
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DialogAddBrands from './DialogAddWarranties'



const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

//@ts-ignore
const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialogEditBrands, setOpenDialogEditBrands] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openLoading, setOpenLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const selectDeleteWarranty = useSelector((state: {deleteWarrantiesSlice:{data:any}}) => state.deleteWarrantiesSlice);


  const handleRowOptionsClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLoading = () => {
    setOpenLoading(!openLoading)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = async () => {
    console.log(id, "id for delete 🙌🙌🙌🙌🙌");

    handleLoading()

    //@ts-ignore

    dispatch(deleteWarranty(id)).then(() => {
      //@ts-ignore

      dispatch(getAllWarranties())
    })


    handleRowOptionsClose();
  }

  const handleEdit = () => {
    setOpenDialogEditBrands(!openDialogEditBrands)
  }

  const handleDeleteAlert = () => {
    setOpenAlert(!openAlert)
  }



  return (
    <Fragment>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='bx:dots-vertical-rounded' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
        <MenuItem onClick={() => {
          handleDeleteAlert()
          handleRowOptionsClose()
        }
        }
          sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {
        openDialogEditBrands && <DialogAddBrands
          open={openDialogEditBrands}
          toggle={handleEdit}
          isEdit={true}
          itemId={id}
        />
      }

      {
        openAlert && <DeleteGlobalAlert name='Unit' open={openAlert} close={handleDeleteAlert} mainHandleDelete={handleDelete} />
      }

      {
        openLoading && <LoadingAnimation open={openLoading} onClose={handleLoading} statusType={selectDeleteWarranty} />
      }


    </Fragment>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  },

  {
    flex: 0.275,
    minWidth: 100,
    field: 'name',
    headerName: 'Name',
  },
  {
    flex: 0.275,
    minWidth: 100,
    field: 'description',
    headerName: 'Description',
  },

  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Duration',
    field: 'duration' + ' ' + 'duration_type',
    renderCell: ({ row }) => <span>{row.duration} {row.duration_type}</span>
  },


]


const AllBrands = () => {
  // ** States
  const [data, setData] = useState<any>([])
  const cardRef = useRef(null);
  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [openDialogAddBrands, setOpenDialogAddBrands] = useState<boolean>(false)

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter((row: any) => {
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

  useEffect(() => {
    const getAllBrands = async () => {
      //@ts-ignore
      dispatch(getAllWarranties())
    }
    getAllBrands()
  }, [dispatch])

  // get all Warranties from redux
  //@ts-ignore
  const allWarrantiesFromRedux = useSelector((state: { getallWarrantiesSlice: { data: any } }) => state.getallWarrantiesSlice.entities)

  useEffect(() => {
    if (allWarrantiesFromRedux && allWarrantiesFromRedux.value && allWarrantiesFromRedux.value.length) {
      console.log(allWarrantiesFromRedux.value, "all Warranties from redux");

      setData(allWarrantiesFromRedux.value)
    }
  }, [allWarrantiesFromRedux])

  const handleAddClickOpen = () => {
    setOpenDialogAddBrands(!openDialogAddBrands);
  };

  return (
    <Grid container spacing={6}>
      <Grid item lg={12} xs={12}>
    <Card style={{ height: "100%", width: "100%" }} ref={cardRef}>
        <CardHeader title="Warranties List" />
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
            {
              data ?  <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
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
            />:<Grid>
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
            }

            </Box>

        </Card>
      </Grid>
      <DialogAddBrands open={openDialogAddBrands} toggle={handleAddClickOpen} isEdit={false} />
    </Grid>
  )
}

export default AllBrands
