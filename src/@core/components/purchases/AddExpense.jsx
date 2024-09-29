import { Fragment, useState, useEffect, useMemo, useCallback } from 'react'

import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from '../customDialogHeader/CustomHeader'
import {
  Box,
  Button,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Tooltip
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { FieldArray, useField } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import AddExpenseTable from './AddExpenseTable'

const CustomInputField = ({ name, value, onChange, disabled, multiline, rows }) => {
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

const AddExpense = ({ toggle, open, handleChange, setFieldValue, data, values }) => {
  // ** Cookies
  const transText = getCookie('fontStyle')
  const decimalFormate = getCookie('DecimalFormat')

  const { currency_symbol } = values

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
  }, [totals, values, setFieldValue, decimalFormate])

  const supplierCheck = useCallback(
    (supplierId, totalAmount) => {
      const { contact_id } = values
      if (contact_id === supplierId) {
        setFieldValue('additional_supplier_charges', totalAmount)
      } else {
        setFieldValue('additional_cost_charges', totalAmount)
      }
    },
    [values, setFieldValue]
  )

  useEffect(() => {
    values.expense.forEach(item => {
      const { supplier, amount } = item
      supplierCheck(supplier, amount)
    })
  }, [values.expense, supplierCheck])

  return (
    <Fragment>
      <CustomDialog open={open} handleClose={toggle}>
        <CustomHeader divider={true} title='Add Expense' handleClose={toggle} />
        <DialogContent
          sx={{
            textTransform: transText
          }}
        >
          <FieldArray name={`expense`}>
            {({ push, remove }) => (
              <div>
                <Box
                  sx={{
                    my: 2
                  }}
                >
                  <Button
                    variant='outlined'
                    onClick={() => {
                      push({
                        supplier: null,
                        amount: 0,
                        vat: 0,
                        total: 0,
                        total_curr: 0,
                        vat_curr: 0,
                        amount_curr: 0,
                        note: '',
                        debit: null,
                        cost_center: null,
                        date: new Date(),
                        search_supplier: ''
                      })
                    }}
                  >
                    New Row
                  </Button>
                </Box>

                <AddExpenseTable
                  values={values}
                  columns={[
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
                                supplierCheck(event.target.value, values.expense[params.idx].amount)
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
                            onChange={event => {
                              handleChange(event)
                              const amount = Number(event.target.value)
                              const vat = Number(values.expense[params.idx].vat)
                              const total = Number(amount + vat).toFixed(decimalFormate)
                              setFieldValue(`expense.${params.idx}.total`, total)
                              supplierCheck(values.expense[params.idx].supplier, amount)

                              // Calculate Total Amount ant Total Vat and Total
                              const totals = values.expense.reduce(
                                (acc, curr) => {
                                  acc.total += Number(curr.total)
                                  acc.vat += Number(curr.vat)
                                  acc.amount += Number(curr.amount)

                                  return acc
                                },
                                { total: 0, vat: 0, amount: 0 }
                              )

                              setFieldValue('expense_total', totals.total.toFixed(decimalFormate))
                              setFieldValue('expense_total_vat', totals.vat.toFixed(decimalFormate))
                              setFieldValue('expense_total_amount', totals.amount.toFixed(decimalFormate))
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
                            onChange={event => {
                              handleChange(event)
                              const vat = Number(event.target.value)
                              const amount = Number(values.expense[params.idx].amount)
                              const total = Number(amount + vat).toFixed(decimalFormate)
                              setFieldValue(`expense.${params.idx}.total`, total)

                              // Calculate Total Amount ant Total Vat and Total
                              const totals = values.expense.reduce(
                                (acc, curr) => {
                                  acc.total += Number(curr.total)
                                  acc.vat += Number(curr.vat)
                                  acc.amount += Number(curr.amount)

                                  return acc
                                },
                                { total: 0, vat: 0, amount: 0 }
                              )

                              setFieldValue('expense_total', totals.total.toFixed(decimalFormate))
                              setFieldValue('expense_total_vat', totals.vat.toFixed(decimalFormate))
                              setFieldValue('expense_total_amount', totals.amount.toFixed(decimalFormate))
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
                      headerName: `Amount ${currency_symbol}`,
                      minWidth: 110,
                      align: 'center',
                      flex: 0.25,
                      renderCell: params => {
                        return (
                          <CustomInputField
                            value={values.expense[params.idx].amount_curr}
                            name={`expense.${params.idx}.amount_curr`}
                            onChange={event => {
                              handleChange(event)
                              const amount_curr = Number(event.target.value)
                              const vat = Number(values.expense[params.idx].vat_curr)
                              const total_curr = Number(amount_curr + vat).toFixed(decimalFormate)
                              setFieldValue(`expense.${params.idx}.total_curr`, total_curr)

                              // Calculate Total Amount ant Total Vat and Total
                              const totals = values.expense.reduce(
                                (acc, curr) => {
                                  acc.total_curr += Number(curr.total_curr)
                                  acc.vat_curr += Number(curr.vat_curr)
                                  acc.amount_curr += Number(curr.amount_curr)

                                  return acc
                                },
                                { total_curr: 0, vat_curr: 0, amount_curr: 0 }
                              )

                              setFieldValue('expense_total_curr', totals.total_curr.toFixed(decimalFormate))
                              setFieldValue('expense_total_vat_curr', totals.vat_curr.toFixed(decimalFormate))
                              setFieldValue('expense_total_amount_curr', totals.amount_curr.toFixed(decimalFormate))
                            }}
                          />
                        )
                      }
                    },
                    {
                      field: `vat_curr`,
                      headerName: `Vat ${currency_symbol}`,
                      minWidth: 100,
                      align: 'center',
                      flex: 0.25,
                      renderCell: params => {
                        return (
                          <CustomInputField
                            value={values.expense[params.idx].vat_curr}
                            name={`expense.${params.idx}.vat_curr`}
                            onChange={event => {
                              handleChange(event)
                              const vat = Number(event.target.value)
                              const amount_curr = Number(values.expense[params.idx].amount_curr)
                              const total_curr = Number(amount_curr + vat).toFixed(decimalFormate)
                              setFieldValue(`expense.${params.idx}.total_curr`, total_curr)

                              // Calculate Total Amount ant Total Vat and Total
                              const totals = values.expense.reduce(
                                (acc, curr) => {
                                  acc.total_curr += Number(curr.total_curr)
                                  acc.vat_curr += Number(curr.vat_curr)
                                  acc.amount_curr += Number(curr.amount_curr)

                                  return acc
                                },
                                { total_curr: 0, vat_curr: 0, amount_curr: 0 }
                              )

                              setFieldValue('expense_total_curr', totals.total_curr.toFixed(decimalFormate))
                              setFieldValue('expense_total_vat_curr', totals.vat_curr.toFixed(decimalFormate))
                              setFieldValue('expense_total_amount_curr', totals.amount_curr.toFixed(decimalFormate))
                            }}
                          />
                        )
                      }
                    },
                    {
                      field: 'total_curr',
                      headerName: `Total ${currency_symbol}`,
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
                              <MenuItem value=''>
                                <em>Please Select</em>
                              </MenuItem>
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
                      minWidth: 160,
                      align: 'center',
                      flex: 0.45,
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
                  ]}
                  rows={values.expense}
                />

                <Divider
                  sx={{
                    mb: 3
                  }}
                />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <TextField
                        name='expense_total_amount'
                        label='Total Amount'
                        value={values.expense_total_amount}
                        disabled
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <TextField
                        name='expense_total_vat'
                        label='Total Vat'
                        value={values.expense_total_vat}
                        disabled
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <TextField label='Total' name='expense_total' value={values.expense_total} disabled />
                    </FormControl>
                  </Grid>
                </Grid>
                {values.currency_id && (
                  <Box sx={{ my: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4} lg={4}>
                        <FormControl fullWidth>
                          <TextField
                            name='expense_total_amount_curr'
                            label='Total Amount Currency'
                            value={values.expense_total_amount_curr}
                            disabled
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <FormControl fullWidth>
                          <TextField
                            name='expense_total_vat_curr'
                            label='Total Vat Currency'
                            value={values.expense_total_vat_curr}
                            disabled
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <FormControl fullWidth>
                          <TextField
                            label='Total Currency'
                            name='expense_total_curr'
                            value={values.expense_total_curr}
                            disabled
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </div>
            )}
          </FieldArray>
        </DialogContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color='primary' variant='contained' onClick={toggle}>
            Save
          </Button>
        </Box>
      </CustomDialog>
    </Fragment>
  )
}

export default AddExpense
