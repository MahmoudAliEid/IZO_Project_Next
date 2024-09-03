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

import {
  IconButton,
  FormControl,
  Typography,
  Box,
  Select,
  TextField,
  InputLabel,
  MenuItem,
  Tooltip,
  Menu,
  Button
} from '@mui/material'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store
import { useSelector } from 'react-redux'

// ** next cookies
import { getCookie } from 'cookies-next'

const AddExpenseVoucherTable = ({
  values,
  handleBlur,
  touched,
  errors,
  handleChange,
  setFieldValue,
  push,
  remove,
  setFieldTouched
}) => {
  console.log(values, handleBlur, touched, errors, handleChange, setFieldValue, push, remove, setFieldTouched)
  // ** States
  const [data, setData] = useState([])
  const decimalFormat = getCookie('DecimalFormat')
  const transText = getCookie('fontStyle')

  // ** Hooks
  const store = useSelector(state => state.getCreateExpenseVoucher.data.value)

  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

  const columns = [
    {
      field: 'credit_id',
      headerName: 'Credit',
      minWidth: 180,
      flex: 0.35,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <InputLabel htmlFor='credit_id'>Credit</InputLabel>
          <Select
            id='credit_id'
            label='Credit'
            disabled={values.main_credit_check ? true : false}
            name={`table[${params.idx}].credit_id`}
            value={values?.table[params.idx]?.credit_id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.credit_id && Boolean(errors.credit_id)}
            fullWidth
          >
            <MenuItem value=''>Select Credit</MenuItem>
            {data?.accounts_credit &&
              data?.accounts_credit.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
      )
    },
    {
      field: 'debit_id',
      headerName: 'Debit',
      minWidth: 180,
      flex: 0.5,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <InputLabel htmlFor='debit_id'>Debit</InputLabel>

          <Select
            id='debit_id'
            label='Debit'
            name={`table[${params.idx}].debit_id`}
            value={values?.table[params.idx]?.debit_id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.debit_id && Boolean(errors.debit_id)}
            fullWidth
          >
            <MenuItem value=''>Select Debit</MenuItem>
            {data?.accounts_debit &&
              data?.accounts_debit.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 100,
      flex: 0.25,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <Tooltip title={`${values?.table[params.idx]?.amount}`}>
            <TextField
              name={`table[${params.idx}].amount`}
              value={values?.table[params.idx]?.amount}
              onClick={event => {
                event.target.select()
              }}
              onChange={event => {
                handleChange(event)

                const taxAmount = (
                  (Number(values?.table[params.idx]?.tax) * Number(event.target.value)) /
                  (Number(values?.table[params.idx]?.tax) + 100)
                ).toFixed(decimalFormat)
                setFieldValue(`table[${params.idx}].tax_amount`, taxAmount)
                setFieldValue(
                  `table[${params.idx}].net_amount`,
                  (Number(event.target.value) - taxAmount).toFixed(decimalFormat)
                )
              }}
              onBlur={handleBlur}
              error={touched.amount && Boolean(errors.amount)}
              fullWidth
            />
          </Tooltip>
        </FormControl>
      )
    },
    {
      field: 'cost_center_id',
      headerName: 'Cost Center',
      minWidth: 200,
      flex: 0.35,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <InputLabel htmlFor='cost_center_id'>Cost Center</InputLabel>
          <Select
            id='cost_center_id'
            label='Cost Center'
            name={`table[${params.idx}].cost_center_id`}
            value={values?.table[params.idx]?.cost_center_id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.cost_center_id && Boolean(errors.cost_center_id)}
            fullWidth
          >
            <MenuItem value=''>Select Cost Center</MenuItem>
            {data?.cost_center &&
              data?.cost_center.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
      )
    },
    {
      field: 'tax',
      headerName: 'Tax',
      minWidth: 100,
      flex: 0.25,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <Tooltip title={`${values?.table[params.idx]?.tax}`}>
            <TextField
              onClick={event => {
                event.target.select()
              }}
              name={`table[${params.idx}].tax`}
              value={values?.table[params.idx]?.tax}
              onChange={event => {
                handleChange(event)
                const taxAmount = (
                  (Number(event.target.value) * Number(values?.table[params.idx]?.amount)) /
                  (Number(event.target.value) + 100)
                ).toFixed(decimalFormat)
                setFieldValue(`table[${params.idx}].tax_amount`, taxAmount)
                setFieldValue(
                  `table[${params.idx}].net_amount`,
                  (Number(values?.table[params.idx]?.amount) - taxAmount).toFixed(decimalFormat)
                )
              }}
              onBlur={handleBlur}
              error={touched.tax && Boolean(errors.tax)}
              fullWidth
            />
          </Tooltip>
        </FormControl>
      )
    },
    {
      field: 'tax_amount',
      headerName: 'Tax Amount',
      minWidth: 100,
      flex: 0.25,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <Tooltip title={`${values?.table[params.idx]?.tax_amount}`}>
            <TextField
              onClick={event => {
                event.target.select()
              }}
              name={`table[${params.idx}].tax_amount`}
              value={values?.table[params.idx]?.tax_amount}
              onChange={handleChange}
              disabled
              fullWidth
            />
          </Tooltip>
        </FormControl>
      )
    },
    {
      field: 'net_amount',
      headerName: 'Net Amount',
      minWidth: 100,
      flex: 0.25,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <Tooltip title={`${values?.table[params.idx]?.net_amount}`}>
            <TextField
              onClick={event => {
                event.target.select()
              }}
              name={`table[${params.idx}].net_amount`}
              value={values?.table[params.idx]?.net_amount}
              onChange={handleChange}
              disabled
              fullWidth
            />
          </Tooltip>
        </FormControl>
      )
    },
    {
      field: 'note',
      headerName: 'Note',
      minWidth: 180,
      flex: 0.25,
      align: 'center',
      renderCell: params => (
        <FormControl fullWidth>
          <Tooltip title={`${values?.table[params.idx]?.note}`}>
            <TextField
              label='Note'
              name={`table[${params.idx}].note`}
              value={values?.table[params.idx]?.note}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.note && Boolean(errors.note)}
              fullWidth
            />
          </Tooltip>
        </FormControl>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 80,
      flex: 0.2,
      align: 'center',
      renderCell: params => <RowOptions idx={params.idx} remove={remove} />
    }
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          alignSelf: 'flex-end',
          textTransform: transText,
          m: 3
        }}
      >
        <Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              push({
                credit_id: '',
                debit_id: '',
                amount: 0,
                cost_center_id: '',
                tax: 0,
                tax_amount: 0,
                net_amount: 0,
                note: ''
              })
            }}
          >
            Add Row
          </Button>
        </Box>
      </Box>
      <>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
          <Table stickyHeader stickyFooter aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns &&
                  columns.length > 0 &&
                  columns.map((column, idx) => (
                    <TableCell
                      key={idx}
                      align={column.align || 'center'}
                      sx={{
                        minWidth: column.minWidth,
                        flex: column.flex,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 2,
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
                  <TableRow hover role='checkbox' key={idx}>
                    {columns.map((column, index) => {
                      const params = row[column.field]

                      return (
                        <TableCell key={index + 1} align={column.align} sx={{ textTransform: transText }}>
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
                    <Typography variant='body2' align='center' sx={{ my: 10, textTransform: transText }}>
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
      </>
    </>
  )
}

export default AddExpenseVoucherTable

const RowOptions = ({ idx, remove }) => {
  const transText = getCookie('fontStyle')
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
        {idx !== 0 ? (
          <Tooltip title={`Delete this Row ${idx + 1}`}>
            <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='bx:trash-alt' fontSize={20} />
              Delete
            </MenuItem>
          </Tooltip>
        ) : (
          <MenuItem>
            <Typography variant='caption' align='center' sx={{ my: 1, textTransform: transText }}>
              Not Allowed to Delete
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  )
}
