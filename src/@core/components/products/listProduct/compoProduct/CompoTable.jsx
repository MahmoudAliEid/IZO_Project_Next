/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useSelector } from 'react-redux'
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  Typography,
  TableFooter
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import CustomInputField from '../productVariable/components/CustomInputField'

const CompoTable = ({ rows, productIndex, values, handleChange, pushVariation, remove, setFieldValue }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [variationsParent, setVariationsParent] = useState([])
  const [variationsChild, setVariationsChild] = useState([])
  const [filteredVariationChildSecond, setFilteredVariationChildSecond] = useState([])
  const [searchProduct, setSearchProduct] = useState(null)

  // ** Selectors
  // const variation_templates = useSelector(state => state.getCreateProduct?.data?.value?.variation_templates)
  // const variation_value_templates = useSelector(state => state.getCreateProduct?.data?.value?.variation_value_templates)

  // useEffect
  // useEffect(() => {
  //   if (variation_templates) {
  //     setVariationsParent(variation_templates)
  //   }
  // }, [variation_templates])

  // useEffect(() => {
  //   if (variation_value_templates) {
  //     setVariationsChild(variation_value_templates)
  //   }
  // }, [variation_value_templates])

  // useEffect(() => {
  //   if (Array.isArray(variationsChild) && searchProduct != null && variationsChild.length > 0 && searchProduct) {
  //     const filteredChild = variationsChild.filter(child => child.variation_templates_id === searchProduct)
  //     setFilteredVariationChildSecond(filteredChild)
  //   }
  // }, [variationsChild, searchProduct])

  // ** columns
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.25,
      align: 'center',
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`product_compo.${productIndex}.rows.${params.idx}.name`}
          value={params.name}
          onChange={handleChange}
        />
      )
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      align: 'center',
      flex: 0.35,
      minWidth: 210,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 3 }}>
          <CustomInputField
            name={`product_compo.${productIndex}.rows.${params.idx}.quantity`}
            value={params.quantity}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
            <Select
              value={params.unit}
              name={`product_compo.${productIndex}.rows.${params.idx}.unit`}
              onChange={handleChange}
              id='demo-simple-select'
              label='Unit'
              fullWidth
            >
              <MenuItem value=''>None</MenuItem>
              <MenuItem value='kg'>kg</MenuItem>
              <MenuItem value='g'>g</MenuItem>
              <MenuItem value='l'>l</MenuItem>
              <MenuItem value='ml'>ml</MenuItem>
              <MenuItem value='pcs'>pcs</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )
    },
    {
      field: 'purchase_price_exc',
      headerName: 'Purchase Price Exc Tax',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`product_compo.${productIndex}.rows.${params.idx}.purchase_price_exc`}
          value={params.purchase_price_exc}
          onChange={handleChange}
        />
      )
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`product_compo.${productIndex}.rows.${params.idx}.total_amount`}
          value={params.total_amount}
          onChange={handleChange}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      flex: 0.25,
      minWidth: 80,
      renderCell: params => <RowOptions id={params.id} idx={params.idx} params={params} remove={remove} />
    }
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // useEffect(() => {
  //   if (filteredVariationChildSecond.length > 0) {
  //     setFieldValue(
  //       `product_compo.${productIndex}.rows`,
  //       filteredVariationChildSecond.map(item => {
  //         return {
  //           name: item.name,
  //           composition_variation_id: item.id, //hide
  //           quantity: 1,
  //           unit: '',
  //           purchase_price_exc:item.purchase_price_exc,
  //           total_amount: 1 // quantity * purchase_price_exc
  //         }
  //       })
  //     )
  //   }
  // }, [filteredVariationChildSecond, setFieldValue, productIndex])

  return (
    <>
      <Box sx={{ my: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={6} sx={{ my: 5, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Search</InputLabel>
            <Select
              value={values.product_compo[productIndex].variation_template_id}
              name={`product_compo.${productIndex}.search_product`}
              onChange={e => {
                handleChange(e)
                setSearchProduct(e.target.value)
                setFieldValue(`product_compo.${productIndex}.rows`, [])
                setOpen(true)

                // setTriggerChange(prev => !prev)
              }}
              id='demo-simple-select'
              label='Search'
              fullWidth
            >
              <MenuItem value=''>None</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Box>
      {rows && rows.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader stickyFooter aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column, idx) => (
                    <TableCell
                      key={idx}
                      align={column.align || 'center'}
                      sx={{
                        minWidth: column.minWidth,
                        flex: column.flex,
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => {
                  return (
                    <TableRow hover role='checkbox' key={idx}>
                      {columns.map((column, index) => {
                        const params = row[column.field]

                        return (
                          <TableCell key={index} align={column.align}>
                            {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
              {/* {i want to add table footer contains total Net Total Amount  that === sum of all total_amount per row} */}

              <TableFooter
                style={{
                  position: 'sticky',
                  bottom: '0',
                  backdropFilter: 'blur(1000px)',
                  backgroundColor: '#606263'
                }}
              >
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography>Total Net Amount:</Typography>
                  </TableCell>
                  <TableCell align='right' colSpan={2}>
                    <Typography>{rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0)}</Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant='h6' align='center' sx={{ my: 10 }}>
          No Rows
        </Typography>
      )}
      {open && (
        <Dialog
          open={open}
          onClose={setTimeout(() => {
            setOpen(false)
          }, 3000)}
          maxWidth='md'
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              width: '100%',
              maxHeight: 'calc(100% - 1rem)',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          scroll='body'
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '16px 0'
              }}
            >
              <ProgressCustomization />
            </div>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default CompoTable

const RowOptions = ({ id, idx, params, remove }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = anchorEl

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    remove(idx)

    console.log('id 🎁🎁🎁🎁', id)
    console.log('idx 🏆🏆🏅🏅🥈🥇', idx)
    console.log('params 🎃🎃✨', params)

    handleRowOptionsClose()
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
        <Tooltip title='Delete this Row'>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>
    </Fragment>
  )
}
