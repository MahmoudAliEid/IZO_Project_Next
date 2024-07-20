import { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import { IconButton, FormControl, Typography, Checkbox, Box } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomNumericStyle from './CustomNumericStyle'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.footer}`]: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.mode === 'light' ? '#f3f4f6' : '#424242',
    border: 'none'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const ChequesAddTable = ({ values, handleChange, remove, setFieldValue, push }) => {
  const [rows, setRows] = useState([])
  // const [oldBackPayment, setOldBackPayment] = useState(0)

  const transText = getCookie('fontStyle')
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

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
            onChange={event => handleCheckBoxActions(event, params)}
          />
        </FormControl>
      )
    },
    { field: 'date', headerName: 'Date', flex: 0.35, align: 'center', minWidth: 180 },
    { field: 'reference_no', headerName: 'Reference No', flex: 0.35, align: 'center', minWidth: 180 },
    { field: 'supplier', headerName: 'Supplier', flex: 0.25, align: 'center', minWidth: 130 },
    { field: 'purchase_status', headerName: 'Purchase Status', flex: 0.25, align: 'center', minWidth: 170 },
    { field: 'payment_status', headerName: 'Payment Status', flex: 0.25, align: 'center', minWidth: 170 },
    { field: 'warehouse_name', headerName: 'Warehouse Name', flex: 0.25, align: 'center', minWidth: 170 },
    {
      field: 'grand_total',
      headerName: 'Grand Total',
      align: 'center',
      flex: 0.25,
      minWidth: 150,
      renderCell: params => (
        <CustomNumericStyle value={params.grand_total ? Number(params.grand_total).toFixed(decimalFormat) : 0} />
      )
    },
    {
      field: 'payment',
      headerName: 'Payment',
      align: 'center',
      flex: 0.25,
      minWidth: 150,
      renderCell: params => (
        <CustomNumericStyle value={params.payment ? Number(params.payment).toFixed(decimalFormat) : 0} />
      )
    },
    {
      field: 'payment_due',
      headerName: 'Payment Due',
      align: 'center',
      flex: 0.25,
      minWidth: 150,
      renderCell: params => (
        <CustomNumericStyle value={params.payment_due ? Number(params.payment_due).toFixed(decimalFormat) : 0} />
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

  const storeBills = useSelector(state => state.getBillsCheques.data?.value)

  useEffect(() => {
    if (storeBills) {
      setRows(storeBills)
    }
  }, [storeBills])

  useEffect(() => {
    if (rows.length > 0) {
      rows.forEach(row => {
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
          previous_payment: row.previous_payment,
          add_by: row.add_by || 'no add by'
        }

        push(obj)
      })
    }
  }, [rows, push])
  // const handleCheckboxChange = (event, params) => {
  //   const { checked } = event.target
  //   handleChange(event)

  //   if (checked) {
  //     // set id to bill id  arr
  //     if (total > values?.table_total) {
  //       setFieldValue(`table.${params.idx}.payment_due`, total - values?.table_total)
  //       setFieldValue(`table.${params.idx}.payment`, total - (total - values?.table_total))
  //       setFieldValue('bill_id', [...values?.bill_id, params.id])
  //       setFieldValue('bill_amount', [...values?.bill_amount, values?.table_total])
  //       setFieldValue('table_total', 0)
  //     } else {
  //       setFieldValue('table_total', values?.table_total - total)
  //       setFieldValue('bill_id', [...values?.bill_id, params.id])
  //       setFieldValue('bill_amount', [...values?.bill_amount, total])
  //       setFieldValue(`table.${params.idx}.payment_due`, 0)
  //       setFieldValue(`table.${params.idx}.payment`, total)
  //     }
  //   } else {
  //     if (Number(params.payment_due) > 0) {
  //       setFieldValue('table_total', values?.table_total + (total - Number(params.payment_due)))
  //       setFieldValue(`table.${params.idx}.payment_due`, total)
  //       setFieldValue(
  //         'bill_id',
  //         values?.bill_id.filter(id => id !== params.id)
  //       )
  //       setFieldValue(
  //         'bill_amount',
  //         values?.bill_amount.filter(a => a !== total - Number(params.payment_due))
  //       )
  //       setFieldValue(`table.${params.idx}.payment`, params.grand_total - total)
  //     } else {
  //       setFieldValue('table_total', values?.table_total + total)
  //       setFieldValue(`table.${params.idx}.payment_due`, total)
  //       setFieldValue(`table.${params.idx}.payment`, params.grand_total - total)
  //       setFieldValue(
  //         'bill_id',
  //         values?.bill_id.filter(id => id !== params.id)
  //       )
  //       setFieldValue(
  //         'bill_amount',
  //         values?.bill_amount.filter(a => a !== total)
  //       )
  //     }
  //     setFieldValue(`table.${params.idx}.check`, false)
  //     setFieldValue(`table.${params.idx}.status`, 1)
  //     setFieldValue(
  //       `old_bill_id`,
  //       values?.old_bill_id.filter(row => row !== params.id)
  //     )
  //     setFieldValue(
  //       `old_bill_amount`,
  //       values?.old_bill_amount.filter(row => row !== params.grand_total)
  //     )
  //     setFieldValue(
  //       `payment_id`,
  //       values?.payment_id.filter(row => row !== params.payment_id)
  //     )
  //   }
  // }

  const handleCheckBoxActions = (event, params) => {
    const { checked } = event.target
    handleChange(event)
    const previous_payment = Number(params.previous_payment)
    console.log('previous_payment form check box 😫😪', previous_payment)
    const payment = Number(params.payment)
    const payment_due = Number(params.payment_due)
    const remain = Number(values?.table_total)
    const grand_total = Number(params.grand_total)
    const idx = params.idx

    if (checked) {
      if (previous_payment > 0) {
        // Second condition: previous_payment is true (contains a value), check was false (now checked)
        if (payment_due >= remain) {
          setFieldValue(`table.${idx}.payment_due`, payment_due - remain)
          setFieldValue(`table.${idx}.payment`, payment + remain)
          setFieldValue('table_total', 0)
        } else {
          setFieldValue(`table.${idx}.payment`, grand_total)
          setFieldValue(`table.${idx}.payment_due`, 0)
          setFieldValue('table_total', remain - payment_due)
        }
        setFieldValue('bill_id', [...values?.bill_id, params.id])
        setFieldValue('bill_amount', [...values?.bill_amount, grand_total])
      } else if (previous_payment === 0) {
        // Third condition: previous_payment is not true (does not contain a value), check was true (now unchecked)
        if (payment_due >= remain) {
          setFieldValue(`table.${idx}.payment`, payment + remain)
          setFieldValue(`table.${idx}.payment_due`, payment_due - remain)
          setFieldValue('table_total', 0)
        } else {
          setFieldValue(`table.${idx}.payment`, grand_total)
          setFieldValue(`table.${idx}.payment_due`, 0)
          setFieldValue('table_total', remain - payment_due)
        }
        setFieldValue('bill_id', [...values?.bill_id, params.id])
        setFieldValue('bill_amount', [...values?.bill_amount, grand_total])
      }
    } else {
      // First condition: previous_payment is true (contains a value), check was true (now unchecked)
      if (previous_payment > 0) {
        setFieldValue(`table.${idx}.payment_due`, payment_due + (payment - previous_payment))
        setFieldValue(`table.${idx}.payment`, previous_payment)
        setFieldValue('table_total', remain + (payment - previous_payment))
      } else {
        setFieldValue('table_total', remain + (payment - previous_payment))
        setFieldValue(`table.${idx}.payment_due`, payment_due + (payment - previous_payment))
        setFieldValue(`table.${idx}.payment`, previous_payment)
      }

      // Reset values to defaults
      setFieldValue(`table.${idx}.check`, false)
      setFieldValue(`table.${idx}.status`, 1)
      setFieldValue(
        'old_bill_id',
        values?.old_bill_id.filter(row => row !== params.id)
      )
      setFieldValue(
        'old_bill_amount',
        values?.old_bill_amount.filter(row => row !== grand_total)
      )
      setFieldValue(
        'payment_id',
        values?.payment_id.filter(row => row !== params.payment_id)
      )
      setFieldValue(
        'bill_id',
        values?.bill_id.filter(id => id !== params.id)
      )
      setFieldValue(
        'bill_amount',
        values?.bill_amount.filter(a => a !== grand_total)
      )
    }
  }

  // ! first condition, previous_payment ===true (contain a value) , check === true, action will be(uncheck)
  // previous_payment == 1000, payment==1200, payment_due==200, remain==2000, grand_total==1400
  // payment, payment_due, remain,
  // ** payment ==previous_payment =1000,
  // ** payment_due =payment_due + (payment - previous_payment) = 200 + (1200-1000) = 400 ,
  // ** remain = remain + (payment - previous_payment) = 2000 + (1200-1000) = 2200,
  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  // {// ! second condition, previous_payment ===true (contain a value) , check === false, (check)
  // previous_payment == 1000, payment==1200, payment_due==200, remain==100, grand_total==1400
  // payment, payment_due, remain,
  // ! payment_due>=remain
  // ** payment = payment + remain = 1200 + 100 = 1300,
  // ** payment_due = payment_due - remain = 200 - 100 = 100,
  // ** remain = 0,
  // ! payment_due<remain
  // previous_payment == 1000, payment==1200, payment_due==200, remain==1000, grand_total==1400
  // ** payment = grand_total = 1400,
  // ** payment_due = 0,
  // ** remain = remain - payment_due = 1000 - 200 = 800,}
  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  // ! third condition, previous_payment !==true , check === true, (uncheck)
  // previous_payment == 0, payment==1200, payment_due==200, remain==1000, grand_total==1400
  // payment, payment_due, remain,
  // ** payment = previous_payment = 0,
  // ** payment_due = payment_due + (payment - previous_payment) = 200 + (1200-0) = 1400 ===grand_total,
  // ** remain = remain + (payment - previous_payment) = 1000 + (1200-0) = 2200,

  return (
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
            {Array.isArray(values?.table) && values?.table.length > 0 ? (
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
                        key={index}
                        align={column.align}
                        sx={{
                          textTransform: transText
                        }}
                      >
                        {column.renderCell ? column.renderCell({ ...row, idx }) : params}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
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
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'sticky', bottom: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }}>Total :</Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.amount).toFixed(decimalFormat)} ${currency_code}`
                : `${currency_code} ${Number(values?.amount).toFixed(decimalFormat)}`}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }}>Remain:</Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography>
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
    </Fragment>
  )
}
