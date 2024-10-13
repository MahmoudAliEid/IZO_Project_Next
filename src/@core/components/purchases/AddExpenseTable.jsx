// ** MUI Imports
import {
  Typography,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Table,
  Grid
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { useField } from 'formik'
import DatePicker from 'react-datepicker'
import { Fragment, useEffect, useState, useMemo } from 'react'

// ** Custom Components
const CustomInputField = ({ name, value, onChange, disabled, multiline, rows, onBlur, type }) => {
  const [field] = useField(name)

  return (
    <TextField
      {...field}
      value={value}
      onChange={onChange}
      fullWidth
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      onBlur={onBlur}
      type={type}
    />
  )
}

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
        <Tooltip title={`Delete this Row `}>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>
    </Fragment>
  )
}

const AddExpenseTable = ({ rows, values, data, handleChange, setFieldValue, remove, push }) => {
  const { currency_id, expense_currency_symbol } = values

  // ** Cookies
  const transText = getCookie('fontStyle')
  const decimalFormate = getCookie('DecimalFormat')

  // ** Hooks
  const theme = useTheme()
  // ** Hook
  const { settings } = useSettings()
  const { dateFormat } = settings
  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // Memoized expense calculations to avoid recalculating on every render unless `values.expense` changes
  const totals = useMemo(() => {
    const result = values.expense.reduce(
      (acc, curr) => {
        acc.total += Number(curr.total)
        acc.vat += Number(curr.vat)
        acc.amount += Number(curr.amount)
        acc.total_curr += Number(curr.total_curr)
        acc.vat_curr += Number(curr.vat_curr)
        acc.amount_curr += Number(curr.amount_curr)

        return acc
      },
      { total: 0, vat: 0, amount: 0, total_curr: 0, vat_curr: 0, amount_curr: 0 }
    )

    return result
  }, [values.expense])

  useEffect(() => {
    const updateField = (fieldName, total) => setFieldValue(fieldName, total.toFixed(decimalFormate))

    if (totals.total !== values.expense_total) updateField('expense_total', totals.total)
    if (totals.vat !== values.expense_total_vat) updateField('expense_total_vat', totals.vat)
    if (totals.amount !== values.expense_total_amount) updateField('expense_total_amount', totals.amount)
    if (totals.total_curr !== values.expense_total_curr) updateField('expense_total_curr', totals.total_curr)
    if (totals.vat_curr !== values.expense_total_vat_curr) updateField('expense_total_vat_curr', totals.vat_curr)
    if (totals.amount_curr !== values.expense_total_amount_curr)
      updateField('expense_total_amount_curr', totals.amount_curr)
  }, [
    totals,
    values.expense_total,
    values.expense_total_vat,
    values.expense_total_amount,
    values.expense_total_curr,
    values.expense_total_vat_curr,
    values.expense_total_amount_curr,
    setFieldValue,
    decimalFormate
  ])

  const triggerUpdateSupplier = useMemo(() => {
    // Reducing over expenses to calculate total supplier and cost charges
    return values.expense.reduce(
      (acc, item) => {
        const { supplier, total } = item
        const contact_id = values.contact_id
        const totalNumber = Number(total) || 0 // Ensure 'amount' is always treated as a number

        if (contact_id) {
          if (contact_id === supplier || !supplier) {
            acc.supplierCharges += totalNumber // Add to supplier charges
          } else if (contact_id !== supplier) {
            acc.costCharges += totalNumber // Add to cost charges
          }
        } else {
          acc.costCharges += totalNumber // Add to cost charges
        }

        return acc
      },
      {
        supplierCharges: 0,
        costCharges: 0
      }
    )
  }, [values.expense, values.contact_id])

  useEffect(() => {
    const updateField = (fieldName, total) => {
      // Parse string back to number if needed
      setFieldValue(fieldName, Number(total).toFixed(decimalFormate))
    }

    updateField('additional_supplier_charges', triggerUpdateSupplier.supplierCharges)

    updateField('additional_cost_charges', triggerUpdateSupplier.costCharges)
    updateField(
      'additional_supplier_charges_curr',
      values.currency_id ? Number(triggerUpdateSupplier.supplierCharges) / Number(values.currency_id_amount) : 0
    )

    updateField(
      'additional_cost_charges_curr',
      values.currency_id ? Number(triggerUpdateSupplier.costCharges) / Number(values.currency_id_amount) : 0
    )
  }, [triggerUpdateSupplier, setFieldValue, decimalFormate, values.currency_id_amount, values.currency_id])

  // ** Calculate currency fields
  useEffect(() => {
    const result = {}
    const currencyAmount = values.expense_currency_id_amount
      ? Number(values.expense_currency_id_amount)
      : Number(values.currency_id_amount) || 1

    values.expense.forEach((row, rowIndex) => {
      if (!currencyAmount) {
        result[`expense.${rowIndex}.amount_curr`] = 0
        result[`expense.${rowIndex}.vat_curr`] = 0
        result[`expense.${rowIndex}.total_curr`] = 0
      } else {
        const curr_amount = Number(currencyAmount) || 1 // Default to 1 if not valid
        const amount = Number(row.amount) || 0 // Default to 0 if not valid
        const vat = Number(row.vat) || 0 // Default to 0 if not valid
        const total = Number(row.total) || 0
        const amount_curr = Number(amount / curr_amount) || 0
        const vat_crr = Number(vat / curr_amount) || 0
        const total_curr = Number(total / curr_amount) || 0

        // Add the calculated values to the result object
        result[`expense.${rowIndex}.amount_curr`] = amount_curr.toFixed(decimalFormate)
        result[`expense.${rowIndex}.vat_curr`] = vat_crr.toFixed(decimalFormate)
        result[`expense.${rowIndex}.total_curr`] = total_curr.toFixed(decimalFormate)
      }
    })
    const setFields = fields => {
      Object.entries(fields).forEach(([key, value]) => {
        setFieldValue(key, value)
      })
    }
    setFields(result)
  }, [values.expense, values.expense_currency_id_amount, values.currency_id_amount, setFieldValue, decimalFormate])

  const handleInputChangeCurrency = (amount, vat, params) => {
    if (currency_id) {
      const currencyAmount = values.expense[params.idx].currency_id_amount
        ? Number(values.expense[params.idx].currency_id_amount)
        : Number(values.expense_currency_id_amount)
        ? Number(values.expense_currency_id_amount)
        : Number(values.currency_id_amount)

      const vatCurr = Number(vat / currencyAmount).toFixed(decimalFormate)
      const amount_curr = Number(amount / currencyAmount).toFixed(decimalFormate)
      const total_curr = Number(amount_curr + vatCurr).toFixed(decimalFormate)
      setFieldValue(`expense.${params.idx}.amount_curr`, amount_curr)
      setFieldValue(`expense.${params.idx}.total_curr`, total_curr)
      setFieldValue(`expense.${params.idx}.vat_curr`, vatCurr)
    }
  }
  const handleInputChangePure = (amount_curr, vat_curr, params) => {
    if (currency_id) {
      const currencyAmount = values.expense[params.idx].currency_id_amount
        ? Number(values.expense[params.idx].currency_id_amount)
        : Number(values.expense_currency_id_amount)
        ? Number(values.expense_currency_id_amount)
        : Number(values.currency_id_amount)

      const vat = Number(vat_curr * currencyAmount).toFixed(decimalFormate)
      const amount = Number(amount_curr * currencyAmount).toFixed(decimalFormate)
      const total = Number(amount + vat).toFixed(decimalFormate)
      setFieldValue(`expense.${params.idx}.amount`, amount)
      setFieldValue(`expense.${params.idx}.total`, total)
      setFieldValue(`expense.${params.idx}.vat`, vat)
    }
  }

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      align: 'center',
      minWidth: 90,
      flex: 0.25,
      renderCell: params => {
        return <RowOptions idx={params.idx} remove={remove} />
      }
    },
    {
      flex: 1,
      minWidth: 250,
      field: 'supplier',
      headerName: 'Supplier',
      align: 'center',
      renderCell: params => {
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor='expense_supplier'>Supplier</InputLabel>
            <Select
              id='expense_supplier'
              name={`expense.${params.idx}.supplier`}
              label='Supplier'
              value={values.expense[params.idx].supplier}
              onChange={event => {
                handleChange(event)
              }}
              fullWidth
            >
              <MenuItem value=''>
                <em>Please Select</em>
              </MenuItem>
              {data &&
                data.suppliers.length > 0 &&
                data.suppliers.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )
      }
    },
    {
      field: 'currency_id',
      headerName: 'Currency',
      minWidth: 150,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor='expense_currency_id_row'>Currency</InputLabel>
            <Select
              id='expense_currency_id_row'
              name={`expense.${params.idx}.currency_id`}
              label='Currency'
              value={values.expense[params.idx].currency_id}
              onChange={event => {
                handleChange(event)
                handleClickCurrencyRow(data.currencies.find(item => item.id === event.target.value))
                setFieldValue(
                  `expense.${params.idx}.currency_id_amount`,
                  data.currencies.find(item => item.id === event.target.value).amount
                )
              }}
              fullWidth
            >
              <MenuItem
                value=''
                onClick={() => {
                  handleClickCurrencyRow(null)
                  setFieldValue(`expense.${params.idx}.currency_id_amount`, '')
                }}
              >
                <em>Please Select</em>
              </MenuItem>

              {data &&
                data.currencies.length > 0 &&
                data.currencies.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )
      }
    },
    {
      field: 'currency_id_amount',
      headerName: 'Currency Amount',
      minWidth: 150,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <FormControl fullWidth>
            <TextField
              name={`expense.${params.idx}.currency_id_amount`}
              label='Currency Amount'
              value={values.expense[params.idx].currency_id_amount}
              onChange={handleChange}
              disabled
            />
          </FormControl>
        )
      }
    },

    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 100,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].amount}
            name={`expense.${params.idx}.amount`}
            type='number'
            onChange={event => {
              if (Number(event.target.value) <= 0) {
                setFieldValue(`expense.${params.idx}.amount`, 1)
              } else {
                handleChange(event)
              }

              const amount = Number(event.target.value)
              const vat = Number(values.expense[params.idx].vat)
              const total = Number(amount + vat).toFixed(decimalFormate)
              setFieldValue(`expense.${params.idx}.total`, total)
              handleInputChangeCurrency(amount, vat, params)
            }}
          />
        )
      }
    },
    {
      field: 'vat',
      headerName: 'Vat',
      minWidth: 100,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].vat}
            name={`expense.${params.idx}.vat`}
            type='number'
            onChange={event => {
              if (Number(event.target.value) < 0) {
                setFieldValue(`expense.${params.idx}.vat`, 0)
              } else {
                handleChange(event)
              }
              const vat = Number(event.target.value)
              const amount = Number(values.expense[params.idx].amount)
              const total = Number(amount + vat).toFixed(decimalFormate)
              setFieldValue(`expense.${params.idx}.total`, total)
              handleInputChangeCurrency(amount, vat, params)
            }}
          />
        )
      }
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 100,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].total}
            name={`expense.${params.idx}.total`}
            onChange={handleChange}
            disabled={true}
          />
        )
      }
    },

    {
      field: 'amount_curr',
      headerName: `Amount ${expense_currency_symbol}`,
      minWidth: 110,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].amount_curr}
            name={`expense.${params.idx}.amount_curr`}
            type={'number'}
            onChange={event => {
              if (Number(event.target.value) <= 0) {
                setFieldValue(`expense.${params.idx}.amount_curr`, 1)
              } else {
                handleChange(event)
              }
              const amount_curr = Number(event.target.value)
              const vat = Number(values.expense[params.idx].vat_curr)
              const total_curr = Number(amount_curr + vat).toFixed(decimalFormate)
              setFieldValue(`expense.${params.idx}.total_curr`, total_curr)
              handleInputChangePure(amount_curr, vat, params)
            }}
          />
        )
      }
    },
    {
      field: `vat_curr`,
      headerName: `Vat ${expense_currency_symbol}`,
      minWidth: 100,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].vat_curr}
            name={`expense.${params.idx}.vat_curr`}
            type={'number'}
            onChange={event => {
              if (Number(event.target.value) < 0) {
                setFieldValue(`expense.${params.idx}.vat_curr`, 0)
              } else {
                handleChange(event)
              }
              const vat = Number(event.target.value)
              const amount_curr = Number(values.expense[params.idx].amount_curr)
              const total_curr = Number(amount_curr + vat).toFixed(decimalFormate)
              setFieldValue(`expense.${params.idx}.total_curr`, total_curr)
              handleInputChangePure(amount_curr, vat, params)
            }}
          />
        )
      }
    },
    {
      field: 'total_curr',
      headerName: `Total ${expense_currency_symbol}`,
      minWidth: 100,
      align: 'center',
      flex: 0.25,
      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].total_curr}
            name={`expense.${params.idx}.total_curr`}
            onChange={handleChange}
            disabled={true}
          />
        )
      }
    },

    {
      field: 'note',
      headerName: 'Note',
      minWidth: 250,
      align: 'center',
      flex: 0.85,

      renderCell: params => {
        return (
          <CustomInputField
            value={values.expense[params.idx].note}
            name={`expense.${params.idx}.note`}
            onChange={handleChange}
            multiline
            rows={2}
          />
        )
      }
    },
    {
      field: 'debit',
      headerName: 'Debit',
      minWidth: 140,
      align: 'center',
      flex: 0.35,
      renderCell: params => {
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor='expense_debit'>Debit</InputLabel>
            <Select
              id='expense_debit'
              name={`expense.${params.idx}.debit`}
              label='Debit'
              value={values.expense[params.idx].debit}
              onChange={handleChange}
              fullWidth
            >
              {data &&
                data.expense_accounts.length > 0 &&
                data.expense_accounts.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )
      }
    },
    {
      field: 'cost_center',
      headerName: 'Cost Center',
      minWidth: 200,
      align: 'center',
      flex: 1,
      renderCell: params => {
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor='expense_cost_center'>Cost Center</InputLabel>
            <Select
              id='expense_cost_center'
              name={`expense.${params.idx}.cost_center`}
              label='Cost Center'
              value={values.expense[params.idx].cost_center}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value=''>
                <em>Please Select</em>
              </MenuItem>
              {data &&
                data.cost_center.length > 0 &&
                data.cost_center.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )
      }
    },
    {
      field: 'date',
      headerName: 'Date',
      minWidth: 140,
      align: 'center',
      flex: 0.35,
      renderCell: params => {
        return (
          <DatePicker
            name={`expense.${params.idx}.date`}
            selected={values.expense[params.idx].date}
            popperPlacement={popperPlacement}
            onChange={date => {
              setFieldValue(`expense.${params.idx}.date`, date)
            }}
            dateFormat={dateFormat}
            customInput={
              <CustomInputField
                fullWidth
                value={values.expense[params.idx].date}
                name={`expense.${params.idx}.date`}
                onChange={handleChange}
              />
            }
          />
        )
      }
    }
  ]

  const filteredColumns = columns.filter(column => {
    if (currency_id) {
      return column
    } else {
      return (
        column.field !== 'amount_curr' &&
        column.field !== 'vat_curr' &&
        column.field !== 'total_curr' &&
        column.field !== 'currency_id' &&
        column.field !== 'currency_id_amount'
      )
    }
  })

  // ** Setting Fields
  const setFields = fields => {
    Object.entries(fields).forEach(([key, value]) => {
      setFieldValue(key, value)
    })
  }

  // **Calculate currency fields
  const calculateCurr = currencyAmount => {
    const result = {} // Initialize an object to accumulate the fields for all rows

    values.expense.forEach((row, rowIndex) => {
      if (!currencyAmount) {
        result[`expense.${rowIndex}.amount_curr`] = 0
        result[`expense.${rowIndex}.vat_curr`] = 0
        result[`expense.${rowIndex}.total_curr`] = 0
      } else {
        const curr_amount = Number(currencyAmount) || 1 // Default to 1 if not valid
        const amount = Number(row.amount) || 0 // Default to 0 if not valid
        const vat = Number(row.vat) || 0 // Default to 0 if not valid
        const total = Number(row.total) || 0
        const amount_curr = Number(amount / curr_amount) || 0
        const vat_crr = Number(vat / curr_amount) || 0
        const total_curr = Number(total / curr_amount) || 0

        // Add the calculated values to the result object
        result[`expense.${rowIndex}.amount_curr`] = amount_curr.toFixed(decimalFormate)
        result[`expense.${rowIndex}.vat_curr`] = vat_crr.toFixed(decimalFormate)
        result[`expense.${rowIndex}.total_curr`] = total_curr.toFixed(decimalFormate)
      }
    })

    return result // Return the accumulated fields object
  }

  const handleClickCurrency = (item, params) => {
    if (!item) {
      setFields(calculateCurr(null))
    }
    if (!values.expense[params.idx].currency_id) {
      setFieldValue('expense_currency_symbol', item?.symbol ? item.symbol : '')
      setFieldValue('expense_currency_id_amount', item?.amount ? item.amount : '')
      const fields = calculateCurr(item?.amount ? Number(item.amount) : null)
      setFields(fields)
    } else {
      return
    }
  }
  const handleClickCurrencyRow = item => {
    if (!item) {
      setFields(calculateCurr(null))
    }

    const fields = calculateCurr(item?.amount ? Number(item.amount) : null)
    setFields(fields)
  }

  return (
    <Fragment>
      <Button
        variant='outlined'
        sx={{
          my: 2
        }}
        onClick={() => {
          push({
            supplier: '',
            amount: 0,
            vat: 0,
            total: 0,
            total_curr: 0,
            vat_curr: 0,
            amount_curr: 0,
            note: '',
            debit: '',
            cost_center: '',
            date: new Date(),
            search_supplier: '',
            currency_id: '',
            currency_id_amount: ''
          })
        }}
      >
        New Row
      </Button>
      {values.currency_id && (
        <Grid
          container
          spacing={2}
          sx={{
            my: 2
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor='expense_currency_id'>Currency</InputLabel>
              <Select
                id='expense_currency_id'
                name='expense_currency_id'
                label='Currency'
                value={values.expense_currency_id}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem
                  value=''
                  onClick={() => {
                    handleClickCurrency(null)
                  }}
                >
                  <em>Please Select</em>
                </MenuItem>

                {data &&
                  data.currencies.length > 0 &&
                  data.currencies.map(item => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      onClick={() => {
                        handleClickCurrency(item)
                      }}
                    >
                      {item.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl fullWidth>
              <TextField
                name='expense_currency_id_amount'
                label='Currency Amount'
                value={values.expense_currency_id_amount}
                onChange={handleChange}
                disabled
              />
            </FormControl>
          </Grid>
        </Grid>
      )}

      <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%', width: '100%' }}>
        <Table stickyHeader stickyFooter aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {filteredColumns &&
                filteredColumns.length > 0 &&
                filteredColumns.map((column, idx) => (
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
            {Array.isArray(rows) && rows && rows.length > 0 ? (
              rows.map((row, idx) => (
                <TableRow
                  hover
                  role='checkbox'
                  key={idx}
                  sx={{ display: row.id === 0 || row.id === '' ? 'none' : 'default' }}
                >
                  {filteredColumns.map((column, index) => {
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
    </Fragment>
  )
}

export default AddExpenseTable
