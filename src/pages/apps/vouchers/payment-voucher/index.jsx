import { forwardRef, useState, useEffect } from 'react'
import { Formik, Form, useField, FieldArray } from 'formik'
import * as Yup from 'yup'

import {
  Grid,
  Box,
  CardHeader,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Card,
  Divider,
  Button,
  InputLabel,
  Autocomplete
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import VoucherAddTable from '../receipt-voucher/VoucherAddTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateRVoucher } from 'src/store/apps/vouchers/getCreateReceiptVoucher'
import { fetchBills } from 'src/store/apps/vouchers/Actions/getBillsSlice'
import Attachment from '../receipt-voucher/Attachment'
import { createReceipt } from 'src/store/apps/vouchers/postCreateReceiptSlice'

// ** Cookies
import { getCookie } from 'cookies-next'

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const PaymentVoucher = () => {
  const [changeCurrency] = useState(0)
  const [auth] = useState(true)

  const [initialValues] = useState({
    currencies: '', //currency_id
    table_total: 0,
    type: 0,
    document_expense: [],
    currency_value: '',
    date: '',
    account: '',
    contact: [],
    amount: '',
    payment_id: [],
    amount_currency: '', //amount_currency
    bill_id: [],
    bill_amount: [],
    attachment: [],
    note: '',
    table: [
      {
        id: 0,
        check: false,
        date: '12/3/2021',
        reference_no: '123',
        supplier: 'supplier',
        purchase_status: 'purchase_status',
        payment_status: 'payment_status',
        warehouse_name: 'warehouse_name',
        grand_total: 'grand_total',
        payment_due: 'payment_due',
        added_by: 'added_by',
        status: 'old/new'
      }
    ]
  })

  const [openLoading, setOpenLoading] = useState(false)
  const [data, setData] = useState({
    currency: [],
    account: [],
    contact: []
  })

  const [accountText, setAccountText] = useState('')
  const [contactText, setContactText] = useState('')
  const theme = useTheme()
  const { direction } = theme
  const [bills, setBills] = useState([])
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const decimalFormat = getCookie('DecimalFormat')

  const dispatch = useDispatch()
  const storeData = useSelector(state => state.getCreateReceiptVoucher.data?.value)
  const storeBills = useSelector(state => state.getBills.data?.value)
  const createStatus = useSelector(state => state.postCreateReceipt)

  const validationSchema = Yup.object().shape({
    date: Yup.string().required('Required'),
    account: Yup.string().required('Required'),
    contact: Yup.string().required('Required'),
    amount: Yup.string().required('Required'),
    amount_currency: Yup.string().required('Required')
  })

  // ** Functions
  useEffect(() => {
    dispatch(fetchCreateRVoucher())
  }, [dispatch])

  useEffect(() => {
    if (storeData) {
      setData(storeData)
    }
  }, [storeData])
  useEffect(() => {
    if (storeBills) {
      setBills(storeBills)
    }
  }, [storeBills])

  const handleSubmitForm = values => {
    console.log(values, 'values form submit')

    dispatch(createReceipt({ values })).then(() => {
      setOpenLoading(true)
    })
  }

  const fetchDataOnSearchSelect = async id => {
    dispatch(fetchBills({ id, type: 'payment' }))
  }

  console.log('create payment voucher data', data)

  return (
    <Card>
      {openLoading && (
        <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={createStatus} />
      )}
      <Box sx={{ mb: 3 }}>
        <CardHeader title='Payment Voucher' />
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
          <Form>
            <Box sx={{ p: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={auth ? 6 : 12} md={4} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      label='Amount'
                      name='amount'
                      value={values.amount}
                      onChange={event => {
                        handleChange(event)
                        setFieldValue(
                          'table',
                          bills.map(row => ({
                            id: row.bill_id,
                            check: false,
                            date: row.date,
                            reference_no: row.reference_no,
                            supplier: row.supplier || 'no supplier',
                            purchase_status: row.status || 'no purchase status',
                            payment_status: row.pay_status || 'no payment status',
                            warehouse_name: row.store,
                            grand_total: row.final_total,
                            payment_due: row.pay_due,
                            add_by: row.add_by || 'no add by'
                          }))
                        )
                        // setContactText('')
                        // values.table.map((item, id) => {
                        //   //change the check to false if it true
                        //   if (item.check === true) {
                        //     setFieldValue(`table.${id}.check`, false)

                        //   }
                        // })
                        setFieldValue('bill_id', [])
                        setFieldValue('bill_amount', [])

                        if (values.currency_value !== '' && values.currency_value !== 0) {
                          setFieldValue(
                            'amount_currency',
                            Number(event.target.value / values.currency_value).toFixed(decimalFormat)
                          )
                          setFieldValue('table_total', Number(event.target.value).toFixed(decimalFormat))
                        } else {
                          setFieldValue('amount_currency', Number(event.target.value).toFixed(decimalFormat))
                          setFieldValue('table_total', Number(event.target.value).toFixed(decimalFormat))
                        }
                      }}
                      onBlur={handleBlur}
                      error={Boolean(touched.amount && errors.amount)}
                    />
                  </FormControl>
                </Grid>

                {auth === true && (
                  <>
                    <Grid item xs={12} lg={6} md={4} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          label='Amount in Currency'
                          name='amount_currency'
                          value={values.amount_currency}
                          onChange={event => {
                            const amount_currency = Number(event.target.value)
                            setFieldValue(
                              'table',
                              bills.map(row => ({
                                id: row.bill_id,
                                check: false,
                                date: row.date,
                                reference_no: row.reference_no,
                                supplier: row.supplier || 'no supplier',
                                purchase_status: row.status || 'no purchase status',
                                payment_status: row.pay_status || 'no payment status',
                                warehouse_name: row.store,
                                grand_total: row.final_total,
                                payment_due: row.pay_due,
                                add_by: row.add_by || 'no add by'
                              }))
                            )
                            // setFieldValue('contact', [])
                            // setContactText('')
                            setFieldValue('bill_id', [])
                            setFieldValue('bill_amount', [])

                            handleChange(event)
                            if (values.currency_value !== '' && values.currency_value !== 0) {
                              setFieldValue(
                                'amount',
                                Number(amount_currency * values.currency_value).toFixed(decimalFormat)
                              )
                              setFieldValue(
                                'table_total',
                                Number(amount_currency * values.currency_value).toFixed(decimalFormat)
                              )
                            } else {
                              setFieldValue('amount', Number(amount_currency).toFixed(decimalFormat))
                              setFieldValue('table_total', Number(amount_currency).toFixed(decimalFormat))
                            }
                          }}
                          onBlur={handleBlur}
                          error={Boolean(touched.amount_currency && errors.amount_currency)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} md={4} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Currencies</InputLabel>
                        <Select
                          value={values.currencies}
                          name='currencies'
                          label='Currencies'
                          onChange={event => {
                            handleChange(event)
                          }}
                          onBlur={handleBlur}
                          error={Boolean(touched.currencies && errors.currencies)}
                        >
                          <MenuItem value='' disabled>
                            Select Currency
                          </MenuItem>
                          {data.currency.length > 0 &&
                            data.currency.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.id}
                                onClick={() => {
                                  setFieldValue('currency_value', Number(item.amount).toFixed(decimalFormat))
                                  setFieldValue(
                                    'amount_currency',
                                    Number(values.amount / item.amount).toFixed(decimalFormat)
                                  )
                                }}
                              >
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} md={4} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          type='text'
                          label='Currency Value'
                          name='currency_value'
                          value={values.currency_value}
                          onChange={event => {
                            const currency_value = Number(event.target.value)
                            handleChange(event)
                            if (changeCurrency === 0) {
                              // make change in amount left
                              if (values.amount_currency !== '' && values.amount_currency !== 0) {
                                setFieldValue(
                                  'amount',
                                  Number(currency_value * values.amount_currency).toFixed(decimalFormat)
                                )
                                setFieldValue(
                                  'table_total',
                                  Number(currency_value * values.amount_currency).toFixed(decimalFormat)
                                )
                              } else {
                                setFieldValue('amount', Number(currency_value).toFixed(decimalFormat))
                                setFieldValue('table_total', Number(currency_value).toFixed(decimalFormat))
                              }
                            } else {
                              if (values.amount !== '' && values.amount !== 0 && currency_value !== 0) {
                                setFieldValue(
                                  'amount_currency',
                                  Number(values.amount / currency_value).toFixed(decimalFormat)
                                )
                              } else {
                                setFieldValue('amount_currency', Number(values.amount).toFixed(decimalFormat))
                              }
                            }
                          }}
                          onBlur={handleBlur}
                          error={Boolean(touched.currency_value && errors.currency_value)}
                        />
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ p: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12} md={4} sm={12}>
                  <FormControl fullWidth>
                    <DatePickerWrapper>
                      <DatePicker
                        name='date'
                        selected={values.date}
                        popperPlacement={popperPlacement}
                        onChange={date => {
                          setFieldValue('date', date)
                        }}
                        id='basic-input'
                        dateFormat='yyyy/MM/dd'
                        customInput={
                          <CustomInput
                            fullWidth
                            label='Date '
                            readOnly={false}
                            value={values.date}
                            name='date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.date && errors.date)}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6} md={4} sm={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      selectOnFocus
                      fullWidth
                      id='combo-box-demo'
                      name='account'
                      value={accountText}
                      onChange={(event, newValue) => {
                        setAccountText(newValue)
                        setFieldValue('account', newValue?.id || '')
                      }}
                      options={data.accounts || []}
                      getOptionLabel={option => option.value || ''}
                      renderInput={params => <TextField fullWidth {...params} label='Account' />}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6} md={4} sm={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      selectOnFocus
                      fullWidth
                      name='contact'
                      value={contactText}
                      onChange={(event, newValue) => {
                        setContactText(newValue)
                        setFieldValue('contact', newValue?.id || '')
                        fetchDataOnSearchSelect(newValue?.id || '')
                        setFieldValue(`table`, [])
                      }}
                      options={data.contact || []}
                      getOptionLabel={option => option.value || ''}
                      renderInput={params => <TextField fullWidth {...params} label='Contact' />}
                    />
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} lg={6} md={4} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Contact</InputLabel>
                    <Select
                      label='Contact'
                      name='contact'
                      value={values.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.contact && errors.contact)}
                    >
                      {data.contact.length > 0 &&
                        data.contact.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.value}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Divider />
                <Grid item xs={12} lg={12} md={4} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      label='Note'
                      multiline
                      rows={4}
                      name='note'
                      value={values.note}
                      variant='filled'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.note && errors.note)}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={12}
                  md={4}
                  sm={12}
                  sx={{
                    border: theme => `1px solid ${theme.palette.divider}`,
                    borderRadius: '10px',
                    backgroundColor: theme => theme.palette.background.paper,
                    p: 3,
                    mt: 3
                  }}
                >
                  <FormControl fullWidth>
                    <Attachment image={values.attachment} setFieldValue={setFieldValue} />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ p: 5 }}>
              <FieldArray name='table'>
                {({ push, remove }) => (
                  <VoucherAddTable
                    push={push}
                    type='receipt'
                    remove={remove}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                )}
              </FieldArray>
            </Box>
            <Box sx={{ p: 5, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' color='primary'>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default PaymentVoucher
