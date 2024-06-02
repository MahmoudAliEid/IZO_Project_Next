import { forwardRef, useState, useEffect, Fragment } from 'react'
import { Formik, Form, useField, FieldArray } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditRVoucher } from 'src/store/apps/vouchers/getEditReceiptVoucherSlice'
import { editReceipt } from 'src/store/apps/vouchers/postEditReceiptSlice'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

import { useTheme } from '@mui/material/styles'
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

import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import VoucherAddTable from 'src/pages/apps/vouchers/receipt-voucher/VoucherAddTable'
import { fetchBills } from 'src/store/apps/vouchers/Actions/getBillsSlice'
import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'
import { fetchVouchers } from 'src/store/apps/vouchers/getVouchersSlice'

// const LinkStyled = styled(Box)(({ theme }) => ({
//   fontWeight: 400,
//   fontSize: '1rem',
//   cursor: 'pointer',
//   textDecoration: 'none',
//   color: theme.palette.text.secondary,
//   '&:hover': {
//     color: theme.palette.primary.main
//   }
// }))

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const VoucherEditPopUp = ({ open, toggle, itemId }) => {
  // ** States
  const [changeCurrency] = useState(0)
  const [voucherData, setVoucherData] = useState(null)
  const [auth] = useState(true)
  // const [accountText, setAccountText] = useState('')
  // const [contactText, setContactText] = useState('')
  // const [bills, setBills] = useState([])
  const [initialValues, setInitialValues] = useState({
    currencies: '', //currency_id
    table_total: 0,
    type: 1,
    document_expense: [],
    currency_value: '',
    date: '',
    account: '',
    contact: ' ',
    contactText: '111 | Lands',
    accountText: 'Main Box',
    amount: '',
    amount_currency: '', //amount_currency
    bill_id: [],
    bill_amount: [],
    attachment: [],
    note: '',
    table: [],

    old_bill_id: [],
    old_bill_amount: [],
    payment_id: []
  })
  const [openLoading, setOpenLoading] = useState(false)
  const [data, setData] = useState({
    currency: [],
    account: [],
    contact: []
  })

  const [oldAmount, setOldAmount] = useState(0)
  const [oldRemain, setOldRemain] = useState(0)
  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()

  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Get data from store
  const storeData = useSelector(state => state.getEditReceiptVoucher.data?.value)
  const editStatus = useSelector(state => state.postEditReceipt)
  // const storeBills = useSelector(state => state.getBills.data?.value)

  // ** Functions

  // ** Handle date convert
  // Function to parse a YYYY-MM-DD date string to a Date object
  // Function to format a Date object to the desired string format
  function formatDateObject(dateString) {
    let date = new Date(dateString)

    // Ensure the parsed date is valid
    if (isNaN(date)) {
      throw new Error('Invalid date string provided')
    }

    // Ensure the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
      throw new Error('Invalid Date object provided')
    }

    // Options for formatting the date string
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }

    // Format the date to the desired string format
    let formattedDate = date.toLocaleString('en-US', options)

    return formattedDate
  }

  // // Example usage
  try {
    let dateString = '2024-05-09'

    let formattedDate = formatDateObject(dateString)

    // console.log(dateObject) // Output: Thu May 09 2024 00:00:00 GMT+0300 (Eastern European Summer Time)
    console.log(formattedDate) // Output: Thu, May 9, 2024, 12:00:00 AM GMT+3
  } catch (error) {
    console.error(error.message)
  }

  const handleClose = () => {
    toggle()
  }

  useEffect(() => {
    if (itemId) {
      dispatch(fetchEditRVoucher({ itemId }))
    }
  }, [itemId, dispatch])

  // ** Functions

  useEffect(() => {
    if (storeData) {
      setInitialValues(prev => ({
        ...prev,
        currencies: String(storeData.info[0].currency_id) || '',
        table_total: storeData.remaining || 0,
        date: new Date(storeData.info[0].date),
        account: storeData.info[0].account_id || '',
        contact: storeData.info[0].contact_id || '',
        amount: storeData.info[0].amount || '',
        amount_currency: storeData.info[0].currency_amount || '',
        currency_value: storeData.info[0].exchange_price || '',
        note: storeData.info[0].text || '',
        attachment: storeData.info[0].attachment || [],
        table:
          storeData.bill.map(row => ({
            id: row.bill_id,
            check: row.check,
            date: row.date,
            reference_no: row.reference_no,
            supplier: row.supplier || 'no supplier',
            purchase_status: row.invoice_status || 'no purchase status',
            payment_status: row.pay_status || 'no payment status',
            warehouse_name: row.store,
            grand_total: row.final_total,
            payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
            payment_due: row.pay_due,
            add_by: row.add_by || 'no add by',
            status: row.status,
            payment_id: row.payment_id
          })) || [],
        old_bill_id: storeData.bill.filter(row => row.bill_id !== '' && row.status === 0).map(row => row.bill_id) || [],
        old_bill_amount:
          storeData.bill.filter(row => row.final_total !== '' && row.status === 0).map(row => row.final_total) || [],
        payment_id:
          storeData.bill.filter(row => row.payment_id !== '' && row.status === 0).map(row => row.payment_id) || [],
        bill_id: [],
        bill_amount: [],
        type: storeData.info[0].type || 1,
        contactText: '111 | Lands',
        accountText: 'Main Box'
      }))
    }
  }, [storeData])

  useEffect(() => {
    if (storeData) {
      setData(storeData.require)
      setOldAmount(storeData.info[0].amount)
      setOldRemain(storeData.remaining)
    }
  }, [storeData])
  useEffect(() => {
    if (storeData) {
      setVoucherData(storeData)
    }
  }, [storeData])

  // useEffect(() => {
  //   if (storeBills) {
  //     setBills(storeBills)
  //   }
  // }, [storeBills])

  const handleSubmitForm = values => {
    console.log(values, 'values form submit')

    dispatch(editReceipt({ id: itemId, values }))
      .then(() => {
        setOpenLoading(true)
      })
      .then(() => {
        dispatch(fetchVouchers())
      })
  }

  const fetchDataOnSearchSelect = async id => {
    dispatch(fetchBills({ id, type: 'receipt' }))
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{ height: '100%' }}
      >
        {voucherData ? (
          <Fragment>
            <CustomHeader
              title={`Receipt Voucher Edit( Ref No: ${voucherData.info[0].ref_no})`}
              handleClose={handleClose}
              divider={false}
            />
            <DialogContent sx={{ padding: '0 !important' }}>
              <Card>
                {openLoading && (
                  <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={editStatus} />
                )}
                <Box sx={{ mb: 3 }}>
                  <CardHeader title='Receipt Voucher' />
                </Box>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
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
                                  setFieldValue('bill_id', [])
                                  setFieldValue('bill_amount', [])

                                  if (values.currency_value !== '' && values.currency_value !== 0) {
                                    setFieldValue(
                                      'amount_currency',
                                      Number(event.target.value / values.currency_value).toFixed(2)
                                    )
                                    // setFieldValue('table_total', Number(event.target.value).toFixed(2))
                                  } else {
                                    setFieldValue('amount_currency', Number(event.target.value).toFixed(2))
                                    // setFieldValue('table_total', Number(event.target.value).toFixed(2))
                                  }

                                  // check if the amount is  less than the old amount
                                  if (
                                    Number(event.target.value) < Number(oldAmount) &&
                                    Number(event.target.value) > 0
                                  ) {
                                    setFieldValue(
                                      'table',
                                      voucherData.bill.map(row => ({
                                        id: row.bill_id,
                                        check: false,
                                        date: row.date,
                                        reference_no: row.reference_no,
                                        supplier: row.supplier || 'no supplier',
                                        purchase_status: row.invoice_status || 'no purchase status',
                                        payment_status: row.pay_status || 'no payment status',
                                        warehouse_name: row.store,
                                        grand_total: row.final_total,
                                        payment: 0,
                                        payment_due: row.final_total,
                                        add_by: row.add_by || 'no add by',
                                        status: 1,
                                        payment_id: row.status === 0 ? '' : row.payment_id
                                      }))
                                    )

                                    setFieldValue('bill_id', [])
                                    setFieldValue('bill_amount', [])
                                    setFieldValue('table_total', Number(event.target.value))
                                    setFieldValue('remain', Number(event.target.value))
                                    setFieldValue('old_bill_id', [])
                                    setFieldValue('old_bill_amount', [])
                                    setFieldValue('payment_id', [])
                                  }

                                  // check if the amount is greater than the old amount
                                  else if (Number(event.target.value) > Number(oldAmount)) {
                                    setFieldValue(
                                      'table_total',
                                      Number(event.target.value) - Number(oldAmount) + Number(oldRemain)
                                    )
                                    setFieldValue(
                                      'remain',
                                      (Number(event.target.value) - Number(oldAmount) + Number(oldRemain)).toFixed(2)
                                    )
                                    setFieldValue(
                                      'table',
                                      voucherData.bill.map(row => ({
                                        id: row.bill_id,
                                        check: row.status === 0 ? true : false,
                                        date: row.date,
                                        reference_no: row.reference_no,
                                        supplier: row.supplier || 'no supplier',
                                        purchase_status: row.invoice_status || 'no purchase status',
                                        payment_status: row.pay_status || 'no payment status',
                                        warehouse_name: row.store,
                                        grand_total: row.final_total,
                                        status: row.status,
                                        payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
                                        payment_due: row.pay_due,
                                        add_by: row.add_by || 'no add by',
                                        payment_id: row.payment_id
                                      }))
                                    )
                                    setFieldValue(
                                      'payment_id',
                                      voucherData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.payment_id)
                                    )
                                    setFieldValue(
                                      'old_bill_id ',
                                      voucherData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.bill_id)
                                    )
                                    setFieldValue(
                                      'old_bill_amount',
                                      voucherData.bill
                                        .filter(row => row.final_total !== '' && row.status === 0)
                                        .map(row => row.final_total) || []
                                    )
                                  } else if (Number(event.target.value) === Number(oldAmount)) {
                                    console.log('equal😁😁🤣')
                                    setFieldValue(
                                      'table',
                                      voucherData.bill.map(row => ({
                                        id: row.bill_id,
                                        check: row.status === 0 ? true : false,
                                        date: row.date,
                                        reference_no: row.reference_no,
                                        supplier: row.supplier || 'no supplier',
                                        purchase_status: row.invoice_status || 'no purchase status',
                                        payment_status: row.pay_status || 'no payment status',
                                        warehouse_name: row.store,
                                        grand_total: row.final_total,
                                        status: row.status,
                                        payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
                                        payment_due: row.pay_due,
                                        add_by: row.add_by || 'no add by',
                                        payment_id: row.payment_id
                                      }))
                                    )
                                    setFieldValue(
                                      'payment_id',
                                      voucherData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.payment_id)
                                    )
                                    setFieldValue(
                                      'old_bill_id ',
                                      voucherData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.bill_id)
                                    )
                                    setFieldValue(
                                      'old_bill_amount',
                                      voucherData.bill
                                        .filter(row => row.final_total !== '' && row.status === 0)
                                        .map(row => row.final_total) || []
                                    )
                                    setFieldValue(
                                      'table_total',
                                      Number(event.target.value) - Number(oldAmount) + Number(oldRemain)
                                    )
                                    setFieldValue(
                                      'remain',
                                      (Number(event.target.value) - Number(oldAmount) + Number(oldRemain)).toFixed(2)
                                    )
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
                                        voucherData.bill.map(row => ({
                                          id: row.bill_id,
                                          check: row.status === 0 ? true : false,
                                          date: row.date,
                                          reference_no: row.reference_no,
                                          supplier: row.supplier || 'no supplier',
                                          purchase_status: row.invoice_status || 'no purchase status',
                                          payment_status: row.pay_status || 'no payment status',
                                          warehouse_name: row.store,
                                          grand_total: row.final_total,
                                          payment: Number(row.final_total) - Number(row.pay_due),
                                          payment_due: row.pay_due,
                                          add_by: row.add_by || 'no add by',
                                          payment_id: row.payment_id
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
                                          Number(amount_currency * values.currency_value).toFixed(2)
                                        )
                                        // setFieldValue(
                                        //   'table_total',
                                        //   Number(amount_currency * values.currency_value).toFixed(2)
                                        // )

                                        // check if the amount is  less than the old amount
                                        if (
                                          Number(amount_currency * values.currency_value) < Number(oldAmount) &&
                                          Number(event.target.value) > 0
                                        ) {
                                          setFieldValue(
                                            'table',
                                            voucherData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              payment: 0,
                                              payment_due: row.final_total,
                                              add_by: row.add_by || 'no add by',
                                              status: 1,
                                              payment_id: row.status === 0 ? '' : row.payment_id
                                            }))
                                          )

                                          setFieldValue('bill_id', [])
                                          setFieldValue('bill_amount', [])
                                          setFieldValue(
                                            'amount',
                                            Number(amount_currency * values.currency_value).toFixed(2)
                                          )
                                          setFieldValue('table_total', Number(amount_currency * values.currency_value))
                                          setFieldValue('remain', Number(amount_currency * values.currency_value))
                                          setFieldValue('old_bill_id', [])
                                          setFieldValue('old_bill_amount', [])
                                          setFieldValue('payment_id', [])
                                        }
                                        // check if the amount is greater than the old amount
                                        else if (Number(amount_currency * values.currency_value) > Number(oldAmount)) {
                                          setFieldValue(
                                            'amount',
                                            Number(amount_currency * values.currency_value).toFixed(2)
                                          )
                                          setFieldValue(
                                            'table_total',
                                            Number(amount_currency * values.currency_value) -
                                              Number(oldAmount) +
                                              Number(oldRemain)
                                          )
                                          setFieldValue(
                                            'remain',
                                            (
                                              Number(amount_currency * values.currency_value) -
                                              Number(oldAmount) +
                                              Number(oldRemain)
                                            ).toFixed(2)
                                          )
                                          setFieldValue(
                                            'table',
                                            voucherData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: row.status === 0 ? true : false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              status: row.status,
                                              payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
                                              payment_due: row.pay_due,
                                              add_by: row.add_by || 'no add by',
                                              payment_id: row.payment_id
                                            }))
                                          )
                                          setFieldValue(
                                            'payment_id',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            voucherData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                        } else if (
                                          Number(amount_currency * values.currency_value) === Number(oldAmount)
                                        ) {
                                          setFieldValue(
                                            'table',
                                            voucherData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: row.status === 0 ? true : false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              status: row.status,
                                              payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
                                              payment_due: row.pay_due,
                                              add_by: row.add_by || 'no add by',
                                              payment_id: row.payment_id
                                            }))
                                          )
                                          setFieldValue(
                                            'payment_id',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            voucherData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                          setFieldValue(
                                            'table_total',
                                            Number(amount_currency * values.currency_value) -
                                              Number(oldAmount) +
                                              Number(oldRemain)
                                          )
                                          setFieldValue(
                                            'remain',
                                            (
                                              Number(amount_currency * values.currency_value) -
                                              Number(oldAmount) +
                                              Number(oldRemain)
                                            ).toFixed(2)
                                          )
                                        }
                                      } else {
                                        setFieldValue('amount', Number(amount_currency).toFixed(2))
                                        // setFieldValue('table_total', Number(amount_currency).toFixed(2))
                                        // check if the amount is  less than the old amount
                                        if (
                                          Number(amount_currency) < Number(oldAmount) &&
                                          Number(event.target.value) > 0
                                        ) {
                                          setFieldValue(
                                            'table',
                                            voucherData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              payment: 0,
                                              payment_due: row.final_total,
                                              add_by: row.add_by || 'no add by',
                                              status: 1,
                                              payment_id: row.status === 0 ? '' : row.payment_id
                                            }))
                                          )

                                          setFieldValue('bill_id', [])
                                          setFieldValue('bill_amount', [])
                                          setFieldValue('table_total', Number(amount_currency))
                                          setFieldValue('remain', Number(amount_currency))
                                          setFieldValue('old_bill_id', [])
                                          setFieldValue('old_bill_amount', [])
                                          setFieldValue('payment_id', [])
                                        }
                                        // check if the amount is greater than the old amount
                                        else if (Number(amount_currency) > Number(oldAmount)) {
                                          setFieldValue('table_total', Number(amount_currency) + Number(oldRemain))
                                          setFieldValue(
                                            'remain',
                                            (
                                              Number(amount_currency * values.currency_value) + Number(oldRemain)
                                            ).toFixed(2)
                                          )
                                          setFieldValue(
                                            'table',
                                            voucherData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: row.status === 0 ? true : false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              status: row.status,
                                              payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
                                              payment_due: row.pay_due,
                                              add_by: row.add_by || 'no add by',
                                              payment_id: row.payment_id
                                            }))
                                          )
                                          setFieldValue(
                                            'payment_id',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            voucherData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                        } else if (Number(amount_currency) === Number(oldAmount)) {
                                          setFieldValue(
                                            'table',
                                            voucherData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: row.status === 0 ? true : false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              status: row.status,
                                              payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(2),
                                              payment_due: row.pay_due,
                                              add_by: row.add_by || 'no add by',
                                              payment_id: row.payment_id
                                            }))
                                          )
                                          setFieldValue(
                                            'payment_id',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            voucherData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            voucherData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                          setFieldValue(
                                            'table_total',
                                            Number(amount_currency) - Number(oldAmount) + Number(oldRemain)
                                          )
                                          setFieldValue(
                                            'remain',
                                            (Number(amount_currency) - Number(oldAmount) + Number(oldRemain)).toFixed(2)
                                          )
                                        }
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
                                      const currency_value = Number(event.target.value)
                                      handleChange(event)
                                      setFieldValue('currency_value', currency_value)
                                      setFieldValue(
                                        'amount_currency',
                                        Number(values.amount / currency_value).toFixed(2)
                                      )
                                    }}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.currencies && errors.currencies)}
                                  >
                                    <MenuItem value='' disabled>
                                      Select Currency
                                    </MenuItem>
                                    {data.currency.length > 0 &&
                                      data.currency.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
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
                                            Number(currency_value * values.amount_currency).toFixed(2)
                                          )

                                          // setFieldValue(
                                          //   'table_total',
                                          //   Number(currency_value * values.amount_currency).toFixed(2)
                                          // )
                                          // check if the amount is  less than the old amount
                                          if (
                                            Number(currency_value * values.amount_currency) < Number(oldAmount) &&
                                            Number(currency_value * values.amount_currency) > 0
                                          ) {
                                            setFieldValue(
                                              'table',
                                              voucherData.bill.map(row => ({
                                                id: row.bill_id,
                                                check: false,
                                                date: row.date,
                                                reference_no: row.reference_no,
                                                supplier: row.supplier || 'no supplier',
                                                purchase_status: row.invoice_status || 'no purchase status',
                                                payment_status: row.pay_status || 'no payment status',
                                                warehouse_name: row.store,
                                                grand_total: row.final_total,
                                                payment: 0,
                                                payment_due: row.final_total,
                                                add_by: row.add_by || 'no add by',
                                                status: 1,
                                                payment_id: row.status === 0 ? '' : row.payment_id
                                              }))
                                            )

                                            setFieldValue('bill_id', [])
                                            setFieldValue('bill_amount', [])
                                            setFieldValue(
                                              'table_total',
                                              Number(currency_value * values.amount_currency)
                                            )
                                            setFieldValue('remain', Number(currency_value * values.amount_currency))
                                            setFieldValue('old_bill_id', [])
                                            setFieldValue('old_bill_amount', [])
                                            setFieldValue('payment_id', [])
                                          }

                                          // check if the amount is greater than the old amount
                                          else if (
                                            Number(currency_value * values.amount_currency) > Number(oldAmount)
                                          ) {
                                            setFieldValue(
                                              'table_total',
                                              Number(currency_value * values.amount_currency) -
                                                Number(oldAmount) +
                                                Number(oldRemain)
                                            )
                                            setFieldValue(
                                              'remain',
                                              (
                                                Number(currency_value * values.amount_currency) -
                                                Number(oldAmount) +
                                                Number(oldRemain)
                                              ).toFixed(2)
                                            )
                                            setFieldValue(
                                              'table',
                                              voucherData.bill.map(row => ({
                                                id: row.bill_id,
                                                check: row.status === 0 ? true : false,
                                                date: row.date,
                                                reference_no: row.reference_no,
                                                supplier: row.supplier || 'no supplier',
                                                purchase_status: row.invoice_status || 'no purchase status',
                                                payment_status: row.pay_status || 'no payment status',
                                                warehouse_name: row.store,
                                                grand_total: row.final_total,
                                                status: row.status,
                                                payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                                  2
                                                ),
                                                payment_due: row.pay_due,
                                                add_by: row.add_by || 'no add by',
                                                payment_id: row.payment_id
                                              }))
                                            )
                                            setFieldValue(
                                              'payment_id',
                                              voucherData.bill
                                                .filter(row => row.bill_id !== '' && row.status === 0)
                                                .map(row => row.payment_id)
                                            )
                                            setFieldValue(
                                              'old_bill_id ',
                                              voucherData.bill
                                                .filter(row => row.bill_id !== '' && row.status === 0)
                                                .map(row => row.bill_id)
                                            )
                                            setFieldValue(
                                              'old_bill_amount',
                                              voucherData.bill
                                                .filter(row => row.final_total !== '' && row.status === 0)
                                                .map(row => row.final_total) || []
                                            )
                                          } else if (
                                            Number(currency_value * values.amount_currency) === Number(oldAmount)
                                          ) {
                                            console.log('equal😁😁🤣')
                                            setFieldValue(
                                              'table',
                                              voucherData.bill.map(row => ({
                                                id: row.bill_id,
                                                check: row.status === 0 ? true : false,
                                                date: row.date,
                                                reference_no: row.reference_no,
                                                supplier: row.supplier || 'no supplier',
                                                purchase_status: row.invoice_status || 'no purchase status',
                                                payment_status: row.pay_status || 'no payment status',
                                                warehouse_name: row.store,
                                                grand_total: row.final_total,
                                                status: row.status,
                                                payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                                  2
                                                ),
                                                payment_due: row.pay_due,
                                                add_by: row.add_by || 'no add by',
                                                payment_id: row.payment_id
                                              }))
                                            )
                                            setFieldValue(
                                              'payment_id',
                                              voucherData.bill
                                                .filter(row => row.bill_id !== '' && row.status === 0)
                                                .map(row => row.payment_id)
                                            )
                                            setFieldValue(
                                              'old_bill_id ',
                                              voucherData.bill
                                                .filter(row => row.bill_id !== '' && row.status === 0)
                                                .map(row => row.bill_id)
                                            )
                                            setFieldValue(
                                              'old_bill_amount',
                                              voucherData.bill
                                                .filter(row => row.final_total !== '' && row.status === 0)
                                                .map(row => row.final_total) || []
                                            )
                                            setFieldValue(
                                              'table_total',
                                              Number(currency_value * values.amount_currency) -
                                                Number(oldAmount) +
                                                Number(oldRemain)
                                            )
                                            setFieldValue(
                                              'remain',
                                              (
                                                Number(currency_value * values.amount_currency) -
                                                Number(oldAmount) +
                                                Number(oldRemain)
                                              ).toFixed(2)
                                            )
                                          }
                                        } else {
                                          setFieldValue('amount', Number(currency_value).toFixed(2))
                                          setFieldValue('table_total', Number(currency_value).toFixed(2))
                                        }
                                      } else {
                                        if (values.amount !== '' && values.amount !== 0 && currency_value !== 0) {
                                          setFieldValue(
                                            'amount_currency',
                                            Number(values.amount / currency_value).toFixed(2)
                                          )
                                        } else {
                                          setFieldValue('amount_currency', Number(values.amount).toFixed(2))
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
                                // value={values.accountText}
                                value={data.accounts.find(account => account.value === values.accountText) || null}
                                onChange={(event, newValue) => {
                                  setFieldValue('accountText', newValue)
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
                                // value={values.contactText}
                                value={data.contact.find(contact => contact.value === values.contactText) || null}
                                onChange={(event, newValue) => {
                                  setFieldValue('contactText', newValue)
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
            </DialogContent>
          </Fragment>
        ) : (
          <Grid>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <Box>
                <ProgressCustomization />
              </Box>
            </Box>
          </Grid>
        )}
      </Dialog>
    </Fragment>
  )
}

export default VoucherEditPopUp
