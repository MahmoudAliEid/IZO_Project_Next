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
// import TablePagination from '@mui/material/TablePagination'

import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
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
import SearchAndSelect from './SearchAndSelect'

const CompoTable = ({ rows, productIndex, values, handleChange, remove, setFieldValue, push }) => {
  // ** States
  // const [page, setPage] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  // const [allUnits, setAllUnits] = useState([])

  // const [variationsParent, setVariationsParent] = useState([])
  // const [variationsChild, setVariationsChild] = useState([])
  // const [filteredVariationChildSecond, setFilteredVariationChildSecond] = useState([])
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

  //** update allUnits when all_units in rows */

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
          name={`product_compo.${productIndex}.rows.${params.idx + 1}.name`}
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
            onChange={e => {
              handleChange(e)
              const newValue = Number(e.target.value) * Number(params.purchase_price_exc) * Number(params.unit_quantity)
              //update total amount when quantity changes
              console.log('value from quantity', e.target.value, params.purchase_price_exc, params.unit_quantity)
              setFieldValue(
                `product_compo.${productIndex}.rows.${params.idx}.total_amount`,
                Number(newValue).toFixed(2)
              )
            }}
          />
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
            <Select
              value={params.unit}
              name={`product_compo.${productIndex}.rows.${params.idx}.unit`}
              onChange={e => {
                handleChange(e)

                // set value of unit_quantity to unit_quantity
                setFieldValue(
                  `product_compo.${productIndex}.rows.${params.idx}.unit_quantity`,
                  rows[params.idx].all_unit.find(unit => unit.id === e.target.value).unit_quantity
                )
                // when unit takes a unit_quantity , update total amount

                setFieldValue(
                  `product_compo.${productIndex}.rows.${params.idx}.total_amount`,
                  Number(
                    params.purchase_price_exc *
                      params.quantity *
                      rows[params.idx].all_unit.find(unit => unit.id === e.target.value).unit_quantity
                  ).toFixed(2)
                )
              }}
              id='demo-simple-select'
              label='Unit'
              fullWidth
            >
              {rows[params.idx].all_unit && rows[params.idx].all_unit.length > 0 ? (
                rows[params.idx].all_unit.map((unit, idx) => (
                  <MenuItem key={idx} value={unit.id}>
                    {unit.value}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={''}>No Units</MenuItem>
              )}
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
          disabled={true}
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
          disabled={true}
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

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }

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

  const profit = values.product_compo[productIndex].profit_percent

  useEffect(() => {
    const tax = values.tax

    setFieldValue(
      `product_compo.${productIndex}.selling_price_inc_tax`,
      rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0) * (1 + tax) * (1 + profit / 100)
    )
  }, [rows, setFieldValue, productIndex, values.tax, profit])

  // useEffect(() => {
  //   setFieldValue(
  //     `product_compo.${productIndex}.selling_price_inc_tax`,
  //     rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0)
  //   )
  // }, [rows, setFieldValue, productIndex])

  useEffect(() => {
    setFieldValue(
      `product_compo.${productIndex}.item_level_purchase_price_total`,
      rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0)
    )
  }, [rows, setFieldValue, productIndex])

  // update selling_price_inc_tax when value.tax changes
  // useEffect(() => {
  //   if (values.product_compo[productIndex].change === null) {
  //     const profit = values.product_compo[productIndex].profit_percent //0
  //     const tax = values.tax //0.05
  //     const newSellingPrice =
  //       Number(values.product_compo[productIndex].item_level_purchase_price_total) * (1 + profit / 100) * (1 + tax)
  //     setFieldValue(`product_compo.${productIndex}.selling_price_inc_tax`, Number(newSellingPrice).toFixed(2))
  //   } else {
  //     const newValue = values.product_compo[productIndex].change
  //     setFieldValue(`product_compo.${productIndex}.selling_price_inc_tax`, newValue)
  //   }

  //   return () => {
  //     setFieldValue(`product_compo.${productIndex}.change`, null)
  //   }
  // }, [values, setFieldValue, productIndex])

  console.log('searchProduct 🎃🎃🎃🎃', searchProduct)
  console.log('rows form compo table 🎃', rows)

  return (
    <>
      <SearchAndSelect
        rows={rows}
        values={values}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        productIndex={productIndex}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        push={push}
        setOpen={setOpen}
      />

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
              {rows && rows.length > 1 ? (
                rows.map((row, idx) => (
                  <TableRow hover role='checkbox' key={idx} sx={{ display: row.initial ? 'none' : 'default' }}>
                    {columns.map((column, index) => {
                      const params = row[column.field]
                      console.log(row, 'row form table compo')

                      return (
                        <TableCell key={index + 1} align={column.align}>
                          {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell colSpan={3}>
                    <Typography variant='body2' align='center' sx={{ my: 10 }}>
                      No Rows 🍰
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter
              style={{
                position: 'sticky',
                bottom: '0',

                backgroundColor: '#424242'
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
        {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
      </>

      {open && (
        <Dialog
          open={open}
          onClose={setTimeout(() => {
            setOpen(false)
          }, 2000)}
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
    console.log('id 👀👀👀', id)
    console.log('idx 👀👀👀', idx)
    console.log('params 👀👀👀✨', params)

    remove(idx)

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
        <Tooltip title={`Delete this Row ${idx}`}>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>
    </Fragment>
  )
}
