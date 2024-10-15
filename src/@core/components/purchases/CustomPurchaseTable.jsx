// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import {
  Menu,
  MenuItem,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  Dialog,
  Typography,
  Box,
  Button,
  Checkbox
} from '@mui/material'

// ** Third Party Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SearchPurchase from './SearchPurchase'

// import  columns
import useCreateColumns from './useCreateColumns'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const CustomPurchaseTable = ({ rows, values, handleChange, remove, setFieldValue, push }) => {
  const [open, setOpen] = useState(false)
  const [searchProduct, setSearchProduct] = useState(null)
  const [hiddenColumns, setHiddenColumns] = useState({})
  const { columns } = useCreateColumns({ rows, values, handleChange, setFieldValue, remove, hiddenColumns })

  const toggleColumnVisibility = columnField => {
    setHiddenColumns(prevHidden => ({
      ...prevHidden,
      [columnField]: !prevHidden[columnField]
    }))
  }

  const lastProduct = useSelector(state => state.getLastProduct?.data?.info)

  // ** Cookies
  const decimalFormate = getCookie('DecimalFormat')

  // ** Calc Total Items
  useEffect(() => {
    const setField = (name, value) => setFieldValue(name, Number(value).toFixed(decimalFormate))
    if (values.items && values.items.length > 0) {
      setField(
        'total_items',
        values.items.map(item => Number(item.quantity)).reduce((acc, curr) => acc + curr, 0)
      )
    }
  }, [setFieldValue, values, decimalFormate])

  // ** set list price for each row
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

  // ** set last product to the table
  useEffect(() => {
    if (lastProduct) {
      push({
        id: lastProduct[0].id,
        name: lastProduct[0].text,
        total: lastProduct[0]?.total || 0,
        variation_id: lastProduct[0].variation_id,
        cost: lastProduct[0].cost === 0 ? lastProduct[0].all_unit[0].list_price[0].price : lastProduct[0].cost,
        line_store: '',
        product_id: lastProduct[0].product_id,
        quantity: 1,
        price: lastProduct[0].cost === 0 ? lastProduct[0].all_unit[0].list_price[0].price : lastProduct[0].cost,
        unit: 1,
        store: '',
        all_unit: lastProduct[0].all_units,
        initial: false,
        unit_quantity: 1,
        child_price: '',
        list_prices: []
      })
    }
  }, [lastProduct, push])

  // ** remove first row when component is mounted
  useEffect(() => {
    if (values.items && values.items.length > 0) {
      if (values.items[0].initial) {
        remove(0)
      }
    }
  }, [values.items, remove])

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const reorderedRows = reorder(rows, result.source.index, result.destination.index)

    setFieldValue('items', reorderedRows)
  }

  const filteredColumns = columns.filter(column => {
    if (values.currency_id) {
      return column
    } else {
      return (
        column.field !== 'unit_price_before_dis_curr' &&
        column.field !== 'unit_price_after_dis_curr' &&
        column.field !== 'total_currency'
      )
    }
  })

  const HandleHideColumn = ({ initialColumns, toggleColumnVisibility }) => {
    // Step 1: Manage columns state with useState
    const [columns] = useState(initialColumns)
    const [anchorEl, setAnchorEl] = useState(null)

    // Step 2: Modify hide value in state
    // const modifyHideValue = fieldName => {
    //   const updatedColumns = columns.map(column => {
    //     if (column.field === fieldName) {
    //       return { ...column, hide: !column.hide } // Toggle hide value
    //     }

    //     return column
    //   })
    //   setColumns(updatedColumns) // Step 3: Update state
    // }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleOpen = event => {
      setAnchorEl(event.currentTarget)
    }

    return (
      <Fragment>
        <Box>
          <Button variant='outlined' color='primary' onClick={handleOpen} sx={{ my: 2 }}>
            Hide Columns
          </Button>
        </Box>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
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
          {columns.map((column, idx) => (
            <MenuItem
              key={idx}
              onClick={() => toggleColumnVisibility(column.field)} // Toggle hide value
            >
              <Checkbox
                checked={!column.hide} // Checkbox is checked if column is visible (hide is false)
                onChange={() => toggleColumnVisibility(column.field)} // Trigger hide/show on change
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    )
  }

  return (
    <>
      <SearchPurchase
        rows={values.items}
        values={values}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        push={push}
        setOpen={setOpen}
      />
      <HandleHideColumn initialColumns={filteredColumns} toggleColumnVisibility={toggleColumnVisibility} />

      <DragDropContext onDragEnd={onDragEnd}>
        <TableContainer component={Paper} sx={{ maxHeight: 1040, minWidth: '100%' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {filteredColumns.map((column, idx) => (
                  <TableCell
                    key={idx}
                    align={column.align || 'center'}
                    sx={{
                      minWidth: column.minWidth,
                      flex: column.flex,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',

                      display: column.hide ? 'none' : 'auto'
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
                            sx={{
                              display: row.initial ? 'none' : 'auto'
                            }}
                          >
                            {filteredColumns.map((column, index) => {
                              const params = row[column.field]
                              const no = row.id === -1 ? idx - 1 : idx

                              return (
                                <TableCell
                                  key={index + 1}
                                  align={column.align}
                                  sx={{ display: column.hide ? 'none' : 'auto' }}
                                >
                                  {column.renderCell ? column.renderCell({ ...row, idx: idx, no: no }) : params}
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
                      <TableCell colSpan={8}>
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

export default CustomPurchaseTable
