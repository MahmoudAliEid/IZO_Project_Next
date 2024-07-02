// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'

// import TablePagination from '@mui/material/TablePagination'

import { IconButton, FormControl, Typography, Checkbox, Box } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store
import { useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

// ** Third Party Components
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
// import CustomInputField from '../productVariable/components/CustomInputField'
// import SearchAndSelect from './SearchAndSelect'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.footer}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    border: 'none'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const ChequesAddTable = ({ values, handleChange, remove, setFieldValue, push }) => {
  // ** States

  const [rows, setRows] = useState([])
  const transText = getCookie('fontStyle')
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  // const [total, setTotal] = useState(values.amount)
  // const [remainValue, setRemainValue] = useState(values.amount)

  // useEffect(() => {
  //   if (values.amount) {
  //     setRemainValue(Number(values.amount))
  //     setTotal(Number(values.amount))
  //   }
  // }, [values.amount])

  // ** Columns

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
      field: 'check',
      headerName: 'Check',
      flex: 0.25,
      align: 'center',
      minWidth: 80,
      renderCell: params => (
        <FormControl>
          <Checkbox
            checked={values?.table[params.idx].check}
            disabled={values?.table_total === 0 && !values?.table[params.idx].check}
            name={`table.${params.idx}.check`}
            onChange={event => {
              handleChange(event)
              const total = Number(params.grand_total)

              if (values?.bill_id.includes(params.id)) {
                // Checkbox is currently checked, uncheck it by removing params.id from bill_id
                setFieldValue(
                  'bill_id',
                  values?.bill_id.filter(id => id !== params.id)
                )
              } else {
                // Checkbox is currently unchecked, check it by adding params.id to bill_id
                setFieldValue('bill_id', [...values?.bill_id, params.id])
              }

              const amount = total - values?.table_total
              if (values?.bill_amount.includes(amount)) {
                // Checkbox is currently checked, uncheck it by removing amount from bill_amount
                setFieldValue(
                  'bill_amount',
                  values?.bill_amount.filter(a => a !== amount)
                )
              } else {
                // Checkbox is currently unchecked, check it by adding amount to bill_amount
                setFieldValue('bill_amount', [...values?.bill_amount, amount])
              }
              if (event.target.checked) {
                // set id to bill id  arr
                if (total > values?.table_total) {
                  setFieldValue(`table.${params.idx}.payment_due`, total - values?.table_total)
                  setFieldValue(`table.${params.idx}.payment`, total - (total - values?.table_total))
                  setFieldValue('bill_id', [...values?.bill_id, params.id])
                  setFieldValue('bill_amount', [...values?.bill_amount, values?.table_total])
                  setFieldValue('table_total', 0)
                } else {
                  setFieldValue('table_total', values?.table_total - total)
                  setFieldValue('bill_id', [...values?.bill_id, params.id])
                  setFieldValue('bill_amount', [...values?.bill_amount, total])
                  setFieldValue(`table.${params.idx}.payment_due`, 0)
                  setFieldValue(`table.${params.idx}.payment`, total)
                }
              } else {
                if (Number(params.payment_due) > 0) {
                  setFieldValue('table_total', values?.table_total + (total - Number(params.payment_due)))
                  setFieldValue(`table.${params.idx}.payment_due`, total)
                  setFieldValue(
                    'bill_id',
                    values?.bill_id.filter(id => id !== params.id)
                  )
                  setFieldValue(
                    'bill_amount',
                    values?.bill_amount.filter(a => a !== total - Number(params.payment_due))
                  )
                  setFieldValue(`table.${params.idx}.payment`, params.grand_total - total)
                } else {
                  setFieldValue('table_total', values?.table_total + total)
                  setFieldValue(`table.${params.idx}.payment_due`, total)
                  setFieldValue(`table.${params.idx}.payment`, params.grand_total - total)
                  setFieldValue(
                    'bill_id',
                    values?.bill_id.filter(id => id !== params.id)
                  )
                  setFieldValue(
                    'bill_amount',
                    values?.bill_amount.filter(a => a !== total)
                  )
                }
                setFieldValue(`table.${params.idx}.check`, false)
                setFieldValue(`table.${params.idx}.status`, 1)
                setFieldValue(
                  `old_bill_id`,
                  values?.old_bill_id.filter(row => row !== params.id)
                )
                setFieldValue(
                  `old_bill_amount`,
                  values?.old_bill_amount.filter(row => row !== params.grand_total)
                )
                setFieldValue(
                  `payment_id`,
                  values?.payment_id.filter(row => row !== params.payment_id)
                )
              }
            }}
          />
        </FormControl>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 0.35,
      align: 'center',
      minWidth: 180
    },
    {
      field: 'reference_no',
      headerName: 'Reference No',
      flex: 0.35,
      align: 'center',
      minWidth: 180
    },
    {
      field: 'supplier',
      headerName: 'Supplier',
      flex: 0.25,
      align: 'center',
      minWidth: 130
    },
    //purchase_status
    {
      field: 'purchase_status',
      headerName: 'Purchase Status',
      flex: 0.25,
      align: 'center',
      minWidth: 170
    },
    //payment_status
    {
      field: 'payment_status',
      headerName: 'Payment Status',
      flex: 0.25,
      align: 'center',
      minWidth: 170
    },
    //warehouse_name
    {
      field: 'warehouse_name',
      headerName: 'Warehouse Name',
      flex: 0.25,
      align: 'center',
      minWidth: 170
    },

    {
      field: 'grand_total',
      headerName: 'Grand Total',
      align: 'center',
      flex: 0.25,
      minWidth: 150,
      renderCell: params => (
        <Box>
          <Typography variant='body2' align='center'>
            {CurrencySymbolPlacement === 'after'
              ? `${Number(params.grand_total).toFixed(decimalFormat)} ${currency_code} `
              : `${currency_code} ${Number(params.grand_total).toFixed(decimalFormat)} `}
          </Typography>
        </Box>
      )
    },
    {
      field: 'payment',
      headerName: 'Payment',
      align: 'center',
      flex: 0.25,
      minWidth: 150,
      renderCell: params => (
        <Box>
          <Typography variant='body2' align='center'>
            {CurrencySymbolPlacement === 'after'
              ? `${Number(params.payment).toFixed(decimalFormat)} ${currency_code} `
              : `${currency_code} ${Number(params.payment).toFixed(decimalFormat)} `}
          </Typography>
        </Box>
      )
    },
    {
      field: 'payment_due',
      headerName: 'Payment Due',
      align: 'center',
      flex: 0.25,
      minWidth: 150,
      renderCell: params => (
        <Box>
          <Typography variant='body2' align='center'>
            {CurrencySymbolPlacement === 'after'
              ? `${Number(params.payment_due).toFixed(decimalFormat)} ${currency_code} `
              : `${currency_code} ${Number(params.payment_due).toFixed(decimalFormat)} `}
          </Typography>
        </Box>
      )
    },
    {
      field: 'add_by',
      headerName: 'Add By',
      align: 'center',
      flex: 0.25,
      minWidth: 100,
      renderCell: params => <RowOptions id={params.id} idx={params.idx} params={params} remove={remove} />
    }
  ]

  // ** Get data from store
  const storeBills = useSelector(state => state.getBillsCheques.data?.value)

  // ** UseEffect Update rows
  useEffect(() => {
    if (storeBills) {
      setRows(storeBills)
    }
  }, [storeBills])

  useEffect(() => {
    // auto pushing

    if (rows.length > 0) {
      rows.map(row => {
        const obj = {
          id: row.bill_id,
          check: false,
          date: row.date,
          reference_no: row.reference_no,
          supplier: row.supplier || 'no supplier',
          purchase_status: row.status || 'no purchase status',
          payment_status: row.pay_status || 'no payment status',
          warehouse_name: row.store,
          grand_total: row.final_total,
          payment: row.pay_due,
          status: row.status,
          payment_due: row.pay_due,
          add_by: row.add_by || 'no add by'
        }

        push(obj)

        console.log('pushed:', obj)
      })
    }
  }, [rows, push])

  console.log('data form Cheques store: & Row:', storeBills, rows)

  return (
    <>
      <>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
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
                      justifyContent: 'center',
                      textTransform: transText
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(values?.table) && values?.table && values?.table.length > 0 ? (
                values?.table.map((row, idx) => (
                  <TableRow
                    hover
                    role='checkbox'
                    key={idx}
                    sx={{
                      display: row.id === 0 || row.id === '' ? 'none' : 'default',
                      textTransform: transText
                    }}
                  >
                    {columns.map((column, index) => {
                      const params = row[column.field]

                      return (
                        <TableCell
                          key={index + 1}
                          align={column.align}
                          sx={{
                            textTransform: transText
                          }}
                        >
                          {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={6}>
                    <Typography
                      variant='body2'
                      align='center'
                      sx={{
                        my: 10,
                        textTransform: transText
                      }}
                    >
                      No Rows
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
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
      <Box
        style={{
          position: 'sticky',
          bottom: '0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme => theme.palette.primary.main,
            backgroundColor: '#424242'
          }}
        >
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }} color={'white'}>
              Total :
            </Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography sx={{ textTransform: transText }} color={'white'}>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.amount).toFixed(decimalFormat)} ${currency_code}`
                : `${currency_code} ${Number(values?.amount).toFixed(decimalFormat)}`}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }} color={'white'}>
              Remain:
            </Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography color={'white'}>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.table_total).toFixed(decimalFormat)} ${currency_code}`
                : `${currency_code} ${Number(values?.table_total).toFixed(decimalFormat)}`}
            </Typography>
          </StyledTableCell>
        </Box>
      </Box>
    </>
  )
}

export default ChequesAddTable

const RowOptions = ({ id }) => {
  // ** State
  const [isClicked, setIsClicked] = useState(false)

  return (
    <Fragment>
      <IconButton
        size='small'
        onClick={() => {
          alert(`View ${id}`)
          setIsClicked(!isClicked)
        }}
      >
        <Icon icon='bx:show' fontSize={20} color={isClicked ? 'primary' : 'inherit'} />
      </IconButton>
      {/* <Menu
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
      </Menu> */}
    </Fragment>
  )
}
