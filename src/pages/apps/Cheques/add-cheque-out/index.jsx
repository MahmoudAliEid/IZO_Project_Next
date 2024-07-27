import { forwardRef, useState, useEffect } from 'react'

// ** Formik & Validations
import { Formik, Form, useField, FieldArray } from 'formik'
import * as Yup from 'yup'

// ** Mui Components
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
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateCheques } from 'src/store/apps/Cheques/getCreateChequesSlice'
import { fetchBillsCheques } from 'src/store/apps/Cheques/Actions/getBillsChequesSlice'
import { createCheques } from 'src/store/apps/Cheques/postCreateCheques'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Custom Components && Third Party Components
import Attachment from '../../vouchers/receipt-voucher/Attachment'
import ChequesAddTable from '../add-cheque-in/ChequesAddTable'
import notify from 'src/utils/notify'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import { fetchCheques } from 'src/store/apps/Cheques/getChequesSlice'

// ** Custom Input
const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const AddChequeOut = () => {
  const [changeCurrency] = useState(0)
  const [auth] = useState(true)

  const [initialValues, setInitialValues] = useState({
    cheque_no: '',
    cheque_type: 1, // 0 for in 1 for out
    currencies: '', //currency_id
    table_total: 0,
    type: 1,
    bank_id: '',
    write_date: '',
    due_date: '',
    document_expense: [],
    currency_value: '',
    date: '',
    account: '',
    contact: [],
    amount: 0,
    payment_id: [],
    amount_currency: '', //amount_currency
    bill_id: [],
    bill_amount: [],
    attachment: [],
    old_bill_id: [],
    old_bill_amount: [],
    payment: [],
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
        grand_total: '0',
        payment_due: '0',
        payment: '0',
        added_by: 'added_by',
        status: 'old/new'
      }
    ]
  })

  const [openLoading, setOpenLoading] = useState(false)
  const [data, setData] = useState({
    currency: [],
    contact_banks: [],
    contact: [],
    accounts: []
  })

  const [contactText, setContactText] = useState('')
  const theme = useTheme()
  const { direction } = theme
  const [bills, setBills] = useState([])
  const [findContact, setFindContact] = useState(false)
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const decimalFormat = getCookie('DecimalFormat')
  const transText = getCookie('fontStyle')
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  const dispatch = useDispatch()
  const storeData = useSelector(state => state.getCreateCheque.data?.value)
  const storeBills = useSelector(state => state.getBillsCheques.data?.value)
  const createStatus = useSelector(state => state.postCreateCheque)

  const validationSchema = Yup.object().shape({
    cheque_no: Yup.string().required('Required'),
    write_date: Yup.string().required('Required'),
    due_date: Yup.string().required('Required'),
    contact: Yup.string().required('Required'),
    amount: Yup.string().required('Required'),
    amount_currency: Yup.string().required('Required')
  })

  // ** Functions
  useEffect(() => {
    dispatch(fetchCreateCheques())
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

  useEffect(() => {
    let foundChequeOut = false

    if (data.accounts.length > 0) {
      data.accounts.forEach(item => {
        console.log(item, 'item form map accounts')
        console.log(item.type, 'item type form map accounts')
        if (item.type === 'chequeOut') {
          if (!foundChequeOut) {
            // Update state only if a chequeOut account hasn't been found yet
            setInitialValues(prevState => ({
              ...prevState,
              account: item.id
            }))
            setFindContact(true)
            foundChequeOut = true // Mark that a chequeOut account has been found
          }
        }
      })

      if (!foundChequeOut) {
        // If no chequeOut account was found after iterating
        notify('Please you should add account first!', 'error')
        setFindContact(false)
      }
    }
  }, [data.accounts])

  const handleSubmitForm = values => {
    console.log(values, 'values form submit')
    // router.push('/apps/Cheques/list/')
    dispatch(createCheques({ values }))
      .then(() => {
        setOpenLoading(true)
      })
      .then(() => {
        dispatch(
          fetchCheques({
            token,
            url
          })
        )
      })
  }

  const fetchDataOnSearchSelect = async id => {
    dispatch(fetchBillsCheques({ id, type: 'out' }))
  }

  return (
    <Card>
      {openLoading && (
        <LoadingAnimation
          open={openLoading}
          onClose={() => setOpenLoading(false)}
          statusType={createStatus}
          redirectURL={'/apps/Cheques/list/'}
        />
      )}
      <Box sx={{ mb: 3 }}>
        <CardHeader title='Add Cheques Out' sx={{ textTransform: transText }} />
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
                <Grid item xs={12} lg={6} md={4} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      label='Cheque No'
                      name='cheque_no'
                      sx={{ textTransform: transText }}
                      value={values.cheque_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.cheque_no && errors.cheque_no)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={auth ? 6 : 12} md={4} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      label='Amount'
                      sx={{ textTransform: transText }}
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

                            payment: row.total_payment,
                            status: row.status,
                            payment_due: row.pay_due,
                            previous_payment: row.previous_payment,
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
                          sx={{ textTransform: transText }}
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
                                add_by: row.add_by || 'no add by',
                                payment: row.total_payment,
                                status: row.status,
                                previous_payment: row.previous_payment
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
                        <InputLabel id='demo-simple-select-label' sx={{ textTransform: transText }}>
                          Currencies
                        </InputLabel>
                        <Select
                          value={values.currencies}
                          name='currencies'
                          label='Currencies'
                          sx={{ textTransform: transText }}
                          onChange={event => {
                            handleChange(event)
                          }}
                          onBlur={handleBlur}
                          error={Boolean(touched.currencies && errors.currencies)}
                        >
                          <MenuItem value='' disabled sx={{ textTransform: transText }}>
                            Select Currency
                          </MenuItem>
                          {data.currency.length > 0 &&
                            data.currency.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.id}
                                sx={{ textTransform: transText }}
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
                    <Grid item xs={12} py={2}>
                      <FormControl fullWidth>
                        <TextField
                          type='text'
                          label='Currency Value'
                          sx={{ textTransform: transText }}
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
              {/* dropdown menu for bank */}
              <Grid item xs={12} lg={6} md={4} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label' sx={{ textTransform: transText }}>
                    Bank
                  </InputLabel>
                  <Select
                    value={values.bank_id}
                    name='bank_id'
                    label='Bank'
                    sx={{ textTransform: transText }}
                    onChange={event => {
                      handleChange(event)
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.bank_id && errors.bank_id)}
                  >
                    <MenuItem value='' disabled sx={{ textTransform: transText }}>
                      Select Bank
                    </MenuItem>
                    {data.contact_banks.length > 0 &&
                      data.contact_banks.map((item, index) => (
                        <MenuItem key={index} value={item.id} sx={{ textTransform: transText }}>
                          {item.value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ p: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6} md={4} sm={12} sx={{ textTransform: transText }}>
                  <FormControl fullWidth>
                    <DatePickerWrapper>
                      <DatePicker
                        name='write_date'
                        showYearDropdown
                        showMonthDropdown
                        selected={values.write_date}
                        popperPlacement={popperPlacement}
                        onChange={write_date => {
                          setFieldValue('write_date', write_date)
                        }}
                        id='basic-input'
                        dateFormat='yyyy/MM/dd'
                        customInput={
                          <CustomInput
                            fullWidth
                            label='Write Date'
                            readOnly={false}
                            value={values.write_date}
                            name='write_date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.write_date && errors.write_date)}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6} md={4} sm={12}>
                  <FormControl fullWidth>
                    <DatePickerWrapper>
                      <DatePicker
                        name='due_date'
                        showYearDropdown
                        showMonthDropdown
                        selected={values.due_date}
                        popperPlacement={popperPlacement}
                        onChange={due_date => {
                          setFieldValue('due_date', due_date)
                        }}
                        id='basic-input'
                        dateFormat='yyyy/MM/dd'
                        customInput={
                          <CustomInput
                            fullWidth
                            label='Due Date'
                            readOnly={false}
                            value={values.due_date}
                            name='due_date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.due_date && errors.due_date)}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} lg={6} md={4} sm={12}>
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
                </Grid> */}

                <Grid item xs={12} lg={12} md={4} sm={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      selectOnFocus
                      fullWidth
                      name='contact'
                      sx={{ textTransform: transText }}
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
                      sx={{ textTransform: transText }}
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
                    textTransform: transText,
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
                  <ChequesAddTable
                    push={push}
                    type='in'
                    remove={remove}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                )}
              </FieldArray>
            </Box>
            <Box sx={{ p: 5, display: 'flex', justifyContent: 'flex-end', textTransform: transText }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={!findContact}
                sx={{ textTransform: transText }}
              >
                save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default AddChequeOut
