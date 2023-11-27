'use client'

// ** React Imports
import { ChangeEvent, useState, useEffect, useRef, Fragment } from 'react'
import { Button, Divider } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Menu from '@mui/material/Menu'
import Link from 'next/link'


// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** redux imports
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllBrands } from 'src/store/apps/products/brands/getallbrandsSlice'
import { deleteBrand } from 'src/store/apps/products/brands/deletebrandsSlice'

// **icons
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DialogAddBrands from './DialogAddBrands'

// import DialogDeleteBrand from './DialogDeleteBrand'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert';
import DialogViewBrand from './DialogViewBrand'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialogEditBrands, setOpenDialogEditBrands] = useState<boolean>(false)
  const [openAlertDeleteBrands, setOpenAlertDeleteBrands] = useState<boolean>(false)
  const [openDialogViewBrands, setOpenDialogViewBrands] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handleRowOptionsClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = async () => {
    console.log(id, "id for delete 🙌🙌🙌🙌🙌");
    await dispatch(deleteBrand(id));
    await dispatch(fetchAllBrands());
    handleRowOptionsClose();
  }

  const handleEdit = () => {
    setOpenDialogEditBrands(!openDialogEditBrands)
  }

  const handleDeleteBrand = () => {
    setOpenAlertDeleteBrands(!openAlertDeleteBrands)
  }

  const handleViewBrand = () => {
    setOpenDialogViewBrands(!openDialogViewBrands)
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
          sx={{ '& svg': { mr: 2 } }}
          onClick={() => {
            handleViewBrand();
            handleRowOptionsClose();
          }}
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
        <MenuItem onClick={() => {
          handleDeleteBrand()
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
        openAlertDeleteBrands && <DeleteGlobalAlert
          name={'Brand'}
          open={openAlertDeleteBrands}
          close={handleDeleteBrand}
          mainHandleDelete={handleDelete}
        />
      }

      {
        openDialogViewBrands && <DialogViewBrand
          open={openDialogViewBrands}
          onClose={handleViewBrand}
          brandID={id}
        />
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

  // {
  //   flex: 0.275,
  //   minWidth: 100,
  //   field: 'id',
  //   headerName: 'ID',
  // },
  // {
  //   flex: 0.275,
  //   minWidth: 100,
  //   field: 'business_id',
  //   headerName: 'Business ID',
  // },

  {
    flex: 0.2,
    minWidth: 180,
    headerName: 'Name',
    field: 'name'
  },
  {
    flex: 0.2,
    minWidth: 300,
    headerName: 'Description',
    field: 'description'
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Created By',
    field: 'created_by'
  },

  // {
  //   flex: 0.2,
  //   minWidth: 120,
  //   headerName: 'Created At',
  //   field: 'created_at',
  //   valueGetter: (params) => {
  //     const date = new Date(params.value);

  //     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  //   }
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 120,
  //   headerName: 'Updated At',
  //   field: 'updated_at',
  //   valueGetter: (params) => {
  //     const date = new Date(params.value);

  //     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  //   }

  // },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Use For Repair',
    field: 'use_for_repair'
  },

  // {
  //   flex: 0.2,
  //   minWidth: 120,
  //   headerName: 'Image',
  //   field: 'image',
  //   renderCell: (params) => {
  //     return (
  //       <img src={`https://test.izocloud.net/public/uploads/img/${params.value}`}
  //         alt="Brand" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
  //     );
  //   },
  // },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Image ',
    field: 'image_url',
    renderCell: ({ row }) => (
      <img src={row.image} alt="Brand" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
    ),

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

  useEffect(() => {
    const getAllBrands = async () => {
      await dispatch(fetchAllBrands())
    }
    getAllBrands()
  }, [])

  // get all brands from redux store
  const allBrandsFromRedux = useSelector((state: { getallbrandsSlice: { data: any } }) => state.getallbrandsSlice.brands)

  useEffect(() => {
    if (allBrandsFromRedux && allBrandsFromRedux.length) {
      console.log(allBrandsFromRedux, "all brands from redux");

      setData(allBrandsFromRedux)
    }
  }, [allBrandsFromRedux])

  const handleAddClickOpen = () => {
    setOpenDialogAddBrands(!openDialogAddBrands);
  };

  return (
    <Card style={{ height: "100%", width: "100%" }} ref={cardRef}>
      <DialogAddBrands open={openDialogAddBrands} toggle={handleAddClickOpen} isEdit={false} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, spacing: 2 }}>
        <CardHeader title="All Brands" />



      </Box>
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
      <DataGrid
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
      />
    </Card>
  )
}

export default AllBrands
