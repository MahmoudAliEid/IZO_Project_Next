const RowOptions = ({ idx, remove }) => {
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
        <Tooltip title={`Delete this Row ${idx + 1}`}>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>
    </Fragment>
  )
}

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
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Grid,
  TextField,
  Box
} from '@mui/material'

// ** Formik
import { useField } from 'formik'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import SearchAndSelect from './SearchAndSelect'

import { getCookie } from 'cookies-next'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const LinkStyled = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const CustomInputField = ({ name, value, onChange }) => {
  const [field] = useField(name)

  return <TextField {...field} value={value} onChange={onChange} fullWidth />
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const CustomDragTableSearch = ({ rows, values, handleChange, remove, setFieldValue, push }) => {
  const [open, setOpen] = useState(false)
  const [searchProduct, setSearchProduct] = useState(null)
  const [data, setData] = useState([])

  const store = useSelector(state => state.getCreateOpeningStock?.data?.value?.store)
  const lastProduct = useSelector(state => state.getLastProduct?.data?.info)

  // ** Cookies
  const decimalFormate = getCookie('DecimalFormat')
  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

  useEffect(() => {
    if (values.items && values.items.length > 0) {
      setFieldValue(
        'total_items',
        values.items.map(item => Number(item.quantity)).reduce((acc, curr) => acc + curr, 0)
      )
    }
  }, [setFieldValue, values])
  useEffect(() => {
    if (values.items && values.items.length > 0) {
      setFieldValue(
        'net_total_amount',
        values.items
          .map(item => Number(item.price) * Number(item.quantity))
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(decimalFormate)
      )
    }
  }, [setFieldValue, values, decimalFormate])

  useEffect(() => {
    values.items.map((item, idx) => {
      if (item.unit) {
        const arrOfUnit = item.all_unit

        const unit = arrOfUnit && arrOfUnit.length > 0 && arrOfUnit.find(unit => unit.id === item.unit)
        if (unit) {
          setFieldValue(`items.${idx}.list_prices`, unit.list_price)
        }
      }
    })
  }, [setFieldValue, values.items])

  useEffect(() => {
    if (lastProduct) {
      push({
        id: lastProduct.id,
        name: lastProduct.text,
        total: lastProduct?.total || 0,
        variation_id: lastProduct.variation_id,
        cost: lastProduct.cost === 0 ? lastProduct.all_units[0].list_price[0].price : lastProduct.cost,
        line_store: '',
        product_id: lastProduct.product_id,
        quantity: 1,
        price: lastProduct.cost === 0 ? lastProduct.all_units[0].list_price[0].price : lastProduct.cost,
        unit: 1,
        store: '',
        all_unit: lastProduct.all_units,
        initial: false,
        unit_quantity: 1,
        child_price: '',
        list_prices: []
      })
    }
  }, [lastProduct, push])

  const columns = [
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 0.25,
      align: 'center',
      minWidth: 120,
      renderCell: params => <LinkStyled>{params.name}</LinkStyled>
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      align: 'center',
      flex: 0.45,
      minWidth: 210,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={12} lg={4}>
            <CustomInputField
              value={values.items[params.idx].quantity}
              name={`items.${params.idx}.quantity`}
              type='number'
              onChange={e => {
                if (e.target.value <= 0 || e.target.value === '0' || e.target.value === '') {
                  setFieldValue(`items.${params.idx}.quantity`, 1)
                }
                handleChange(e)

                if (values.items[params.idx].unit_quantity > 0) {
                  setFieldValue(
                    `items.${params.idx}.total`,
                    (Number(e.target.value) * Number(values.items[params.idx].price)).toFixed(decimalFormate)
                  )
                } else {
                  setFieldValue(
                    `items.${params.idx}.total`,
                    (Number(e.target.value) * Number(values.items[params.idx].price)).toFixed(decimalFormate)
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} sm={12} lg={8}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
              <Select
                value={values.items[params.idx].unit}
                name={`items.${params.idx}.unit`}
                onChange={e => {
                  handleChange(e)
                }}
                id='demo-simple-select'
                label='Unit'
                fullWidth
              >
                {rows[params.idx].all_unit && rows[params.idx].all_unit.length > 0 ? (
                  rows[params.idx].all_unit.map((unit, idx) => (
                    <MenuItem
                      key={idx}
                      value={unit.id}
                      onClick={() => {
                        setFieldValue(`items.${params.idx}.list_prices`, unit.list_price)
                        setFieldValue(`items.${params.idx}.child_price`, '')
                        setFieldValue('parent_price', 0)

                        const price_id = 0

                        // set price value based on price_id in all items row if it's unit is null
                        values.items.forEach(item => {
                          if (unit.list_price.length > 0) {
                            const price = unit.list_price.find(price => price.line_id === price_id)

                            if (price) {
                              const priceValue = price.price

                              setFieldValue(`items.${params.idx}.price`, priceValue)
                              setFieldValue(`items.${params.idx}.total`, Number(priceValue) * Number(item.quantity))
                            } else if (price === null) {
                              setFieldValue(`items.${params.idx}.price`, 0)
                              setFieldValue(`items.${params.idx}.total`, 0)
                            } else {
                              return
                            }
                          }
                        })
                      }}
                    >
                      {unit.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={''}>No Units</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Price</InputLabel>
              <Select
                value={values.items[params.idx].child_price}
                name={`items.${params.idx}.child_price`}
                onChange={event => {
                  handleChange(event)
                }}
                id='demo-simple-select'
                label='Price'
                fullWidth
              >
                <MenuItem
                  onClick={() => {
                    const parentPrice = values.parent_price
                    const listPrice = values.items[params.idx].list_prices
                    if (listPrice) {
                      const childPrice = listPrice.find(price => price.line_id === parentPrice)
                      setFieldValue(`items.${params.idx}.price`, childPrice?.price)
                    }
                  }}
                  value={''}
                >
                  Please Select
                </MenuItem>
                {rows[params.idx].list_prices && rows[params.idx].list_prices.length > 0
                  ? rows[params.idx].list_prices.map((price, idx) => (
                      <MenuItem
                        onClick={() => {
                          setFieldValue(`items.${params.idx}.price`, price.price ? price.price : 0)
                          setFieldValue(
                            `items.${params.idx}.total`,
                            (Number(values.items[params.idx].quantity) * Number(price.price)).toFixed(decimalFormate)
                          )
                        }}
                        key={idx}
                        value={price.line_id}
                      >
                        {price.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.price`}
          value={Number(values.items[params.idx].price).toFixed(decimalFormate)}
          onChange={e => {
            handleChange(e)
            setFieldValue(
              `items.${params.idx}.total`,
              (Number(values.items[params.idx].quantity) * Number(e.target.value)).toFixed(decimalFormate)
            )
          }}
        />
      )
    },
    {
      field: 'total',
      headerName: 'Total',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.total`}
          value={
            values.items[params.idx].total ||
            Number(values.items[params.idx].price * values.items[params.idx].quantity).toFixed(decimalFormate)
          }
          onChange={event => {
            handleChange(event)
            if (values.items[params.idx].quantity > 0) {
              setFieldValue(
                `items.${params.idx}.price`,
                (Number(event.target.value) / Number(values.items[params.idx].quantity)).toFixed(decimalFormate)
              )
              setFieldValue(
                `items.${params.idx}.total`,
                (Number(event.target.value) * Number(values.items[params.idx].quantity)).toFixed(decimalFormate)
              )
            }
          }}
        />
      )
    },
    {
      field: 'Store',
      headerName: 'Store',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <FormControl fullWidth>
              <InputLabel htmlFor='Store'>Store</InputLabel>
              <Select
                value={params.store}
                name={`items.${params.idx}.store`}
                onChange={handleChange}
                id='Store'
                label='Store'
                fullWidth
              >
                <MenuItem value={''}>Please Select</MenuItem>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel htmlFor='Store'>Store</InputLabel>
              <Select
                id='Store'
                label='Store'
                name={`items.${params.idx}.store`}
                value={values.items[params.idx].store}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={''}>Please Select</MenuItem>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      flex: 0.25,
      minWidth: 80,
      renderCell: params => <RowOptions idx={params.idx} remove={remove} />
    }
  ]

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const reorderedRows = reorder(rows, result.source.index, result.destination.index)

    // setMainRows(reorderedRows)
    setFieldValue('items', reorderedRows)
  }

  return (
    <>
      <SearchAndSelect
        rows={values.items}
        values={values}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        push={push}
        setOpen={setOpen}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
          <Table stickyHeader aria-label='sticky table'>
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
            <Droppable droppableId='droppable'>
              {provided => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {values.items && values.items.length > 0 ? (
                    values.items.map((row, idx) => (
                      <Draggable key={row.id} draggableId={row.id.toString()} index={idx}>
                        {provided => (
                          <TableRow
                            hover
                            role='checkbox'
                            key={idx}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ display: row.id === 0 ? 'none' : 'auto' }}
                          >
                            {columns.map((column, index) => {
                              const params = row[column.field]

                              return (
                                <TableCell key={index + 1} align={column.align}>
                                  {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell colSpan={3}>
                        <Typography variant='body2' align='center' sx={{ my: 10 }}>
                          No Rows
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
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

export default CustomDragTableSearch
