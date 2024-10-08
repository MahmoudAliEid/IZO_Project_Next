import { forwardRef, useState, useEffect, Fragment } from 'react'

// ** Formik
import { Formik, Form, useField, FieldArray } from 'formik'

// ** Selectors and Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditCheques } from 'src/store/apps/Cheques/getEditChequesSlice'
import { editCheques } from 'src/store/apps/Cheques/postEditChequesSlice'
import { fetchCheques } from 'src/store/apps/Cheques/getChequesSlice'
import { fetchBillsCheques } from 'src/store/apps/Cheques/Actions/getBillsChequesSlice'

// ** Custom Component
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

import { useTheme } from '@mui/material/styles'
import {
  Grid,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Card,
  Divider,
  Button,
  InputLabel,
  Autocomplete,
  DialogContent
} from '@mui/material'

// ** Third Party Components
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** next cookies
import { getCookie } from 'cookies-next'

// ** Parts
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'
import ChequesAddTable from 'src/pages/apps/Cheques/add-cheque-in/ChequesAddTable'
import CustomDialog from 'src/@core/Global/CustomDialog'

// ** Custom Input Component
const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const ChequeEdit = ({ open, toggle, itemId, type }) => {
  // ** States
  const [oldAmount, setOldAmount] = useState(0)
  // const [oldRemain, setOldRemain] = useState(0)
  const [changeCurrency] = useState(0)
  const [chequeData, setChequeData] = useState(null)
  const [auth] = useState(true)
  const [initialValues, setInitialValues] = useState({
    currencies: '', //currency_id
    table_total: 0,
    type: type === 'out' ? 1 : 0,
    cheque_no: '',
    cheque_type: type === 'out' ? 1 : 0, // 0 for in 1 for out
    currencies: '', //currency_id
    account: '',
    bank_id: '',
    write_date: '',
    due_date: '',
    document_expense: [],
    currency_value: '',
    date: '',
    account: '',
    contact: ' ',
    contactText: '',
    accountText: '',
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
    account_collect: [],
    contact_banks: [],

    contact: []
  })

  // ** Cookies
  const token = getCookie('token')
  const url = getCookie('apiUrl')
  const DecimalFormat = getCookie('DecimalFormat')
  const transText = getCookie('fontStyle')

  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()

  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Get data from store
  const storeData = useSelector(state => state.getEditCheque.data?.value)
  const editStatus = useSelector(state => state.postEditCheque)

  // ** UseEffect
  useEffect(() => {
    if (itemId) {
      dispatch(fetchEditCheques({ itemId }))
    }
  }, [itemId, dispatch])

  useEffect(() => {
    if (storeData) {
      setInitialValues(prev => ({
        ...prev,
        currencies: String(storeData.info[0].currency_id) || '',
        bank_id: storeData.info[0].contact_bank_id || prev.bank_id,
        write_date: new Date(storeData.info[0].write_date) || '',
        due_date: new Date(storeData.info[0].due_date) || '',
        cheque_no: storeData.info[0].cheque_no || '',
        table_total: storeData.remaining || 0,
        date: new Date(storeData.info[0].date),
        account: storeData.info[0].account_id || '',
        contact: storeData.info[0].contact_id || '',
        amount: storeData.info[0].amount || '',
        amount_currency: storeData.info[0].amount_in_currency || '',
        currency_value: storeData.info[0].exchange_price || '',
        note: storeData.info[0].note || '',
        // attachment: storeData.info[0].document || [],
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
            previous_payment: row.previous_payment,
            grand_total: row.final_total,
            payment: row.total_payment !== '' ? Number(row.total_payment).toFixed(DecimalFormat) : 0,
            payment_due: row.pay_due,
            add_by: row.add_by || 'no add by',
            status: row.status,
            payment_id: row.payment_id
          })) || [],
        old_bill_id: storeData.bill.filter(row => row.bill_id !== '' && row.status === 0).map(row => row.bill_id) || [],
        old_bill_amount:
          storeData.bill
            .filter(row => row.final_total !== '' && row.status === 0)
            .map(row => Number(row.total_payment) - Number(row.previous_payment)) || [],
        payment_id:
          storeData.bill.filter(row => row.payment_id !== '' && row.status === 0).map(row => row.payment_id) || [],
        bill_id: [],
        bill_amount: [],
        type: storeData.info[0].type,
        contactText: storeData.info[0].contactText || 'no contact'
      }))
    }
  }, [storeData, DecimalFormat])

  useEffect(() => {
    if (storeData) {
      setData(storeData.require)
      setOldAmount(storeData.info[0].amount)
      // setOldRemain(storeData.remaining)
    }
  }, [storeData])
  useEffect(() => {
    if (storeData) {
      setChequeData(storeData)
    }
  }, [storeData])

  // ** Functions
  const handleClose = () => {
    toggle()
  }
  const handleSubmitForm = values => {
    console.log(values, 'values form submit edit cheque')

    dispatch(editCheques({ id: itemId, values }))
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
    dispatch(fetchBillsCheques({ id, type }))
  }

  console.log('chequeData bills 😂', chequeData)

  return (
    <Fragment>
      <CustomDialog open={open} toggle={toggle}>
        {chequeData ? (
          <Fragment>
            <CustomHeader
              title={` Cheque ${type}  Edit( Ref No: ${chequeData.info[0].ref_no})`}
              handleClose={handleClose}
              divider={false}
            />
            <DialogContent sx={{ padding: '0 !important' }}>
              <Card>
                {openLoading && (
                  <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={editStatus} />
                )}

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
                          <Grid item xs={12} lg={6} md={4} sm={12}>
                            <FormControl fullWidth>
                              <TextField
                                sx={{ textTransform: transText }}
                                label='Cheque No'
                                name='cheque_no'
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
                                sx={{ textTransform: transText }}
                                label='Amount'
                                name='amount'
                                value={values.amount}
                                onChange={event => {
                                  handleChange(event)
                                  // ** when amount is changed set them to empty because it contains the checked values
                                  // ** and we will un Check them on change amount
                                  setFieldValue('bill_id', [])
                                  setFieldValue('bill_amount', [])
                                  // ** unCheck all the checked values
                                  setFieldValue(
                                    'table',
                                    chequeData.bill.map(row => ({
                                      id: row.bill_id,
                                      check: false,
                                      date: row.date,
                                      reference_no: row.reference_no,
                                      supplier: row.supplier || 'no supplier',
                                      purchase_status: row.invoice_status || 'no purchase status',
                                      payment_status: row.pay_status || 'no payment status',
                                      warehouse_name: row.store,
                                      grand_total: row.final_total,
                                      payment: row.check ? 0 : Number(row.total_payment).toFixed(DecimalFormat),
                                      payment_due: row.check ? row.final_total : row.pay_due,
                                      add_by: row.add_by || 'no add by',
                                      status: row.status,
                                      payment_id: row.payment_id
                                    }))
                                  )
                                  // ** Change total Table (remain)
                                  setFieldValue('table_total', Number(event.target.value).toFixed(DecimalFormat))
                                  setFieldValue('remain', Number(event.target.value).toFixed(DecimalFormat))

                                  // ** Check if the currency value is not empty
                                  if (values.currency_value !== '' && values.currency_value !== 0) {
                                    setFieldValue(
                                      'amount_currency',
                                      Number(event.target.value / values.currency_value).toFixed(DecimalFormat)
                                    )
                                    // setFieldValue('table_total', Number(event.target.value).toFixed(DecimalFormat))
                                  } else {
                                    setFieldValue('amount_currency', Number(event.target.value).toFixed(DecimalFormat))
                                    // setFieldValue('table_total', Number(event.target.value).toFixed(DecimalFormat))
                                  }

                                  // check if the amount is  less than the old amount
                                  if (
                                    Number(event.target.value) < Number(oldAmount) &&
                                    Number(event.target.value) > 0
                                  ) {
                                    // setFieldValue(
                                    //   'table',
                                    //   chequeData.bill.map(row => ({
                                    //     id: row.bill_id,
                                    //     check: false,
                                    //     date: row.date,
                                    //     reference_no: row.reference_no,
                                    //     supplier: row.supplier || 'no supplier',
                                    //     purchase_status: row.invoice_status || 'no purchase status',
                                    //     payment_status: row.pay_status || 'no payment status',
                                    //     warehouse_name: row.store,
                                    //     grand_total: row.final_total,
                                    //     payment: 0,
                                    //     payment_due: row.final_total,
                                    //     add_by: row.add_by || 'no add by',
                                    //     status: 1,
                                    //     payment_id: row.status === 0 ? '' : row.payment_id
                                    //   }))
                                    // )

                                    setFieldValue('bill_id', [])
                                    setFieldValue('bill_amount', [])
                                    // setFieldValue('table_total', Number(event.target.value).toFixed(DecimalFormat))
                                    // setFieldValue('remain', Number(event.target.value).toFixed(DecimalFormat))
                                    setFieldValue('old_bill_id', [])
                                    setFieldValue('old_bill_amount', [])
                                    setFieldValue('payment_id', [])
                                  }

                                  // check if the amount is greater than the old amount
                                  else if (Number(event.target.value) > Number(oldAmount)) {
                                    // setFieldValue(
                                    //   'table_total',
                                    //   (Number(event.target.value) - Number(oldAmount) + Number(oldRemain)).toFixed(
                                    //     DecimalFormat
                                    //   )
                                    // )
                                    // setFieldValue(
                                    //   'remain',
                                    //   (Number(event.target.value) - Number(oldAmount) + Number(oldRemain)).toFixed(
                                    //     DecimalFormat
                                    //   )
                                    // )
                                    // setFieldValue(
                                    //   'table',
                                    //   chequeData.bill.map(row => ({
                                    //     id: row.bill_id,
                                    //     check: row.status === 0 ? true : false,
                                    //     date: row.date,
                                    //     reference_no: row.reference_no,
                                    //     supplier: row.supplier || 'no supplier',
                                    //     purchase_status: row.invoice_status || 'no purchase status',
                                    //     payment_status: row.pay_status || 'no payment status',
                                    //     warehouse_name: row.store,
                                    //     grand_total: row.final_total,
                                    //     status: row.status,
                                    //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                    //       DecimalFormat
                                    //     ),
                                    //     payment_due: row.pay_due,
                                    //     add_by: row.add_by || 'no add by',
                                    //     payment_id: row.payment_id
                                    //   }))
                                    // )
                                    setFieldValue(
                                      'payment_id',
                                      chequeData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.payment_id)
                                    )
                                    setFieldValue(
                                      'old_bill_id ',
                                      chequeData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.bill_id)
                                    )
                                    setFieldValue(
                                      'old_bill_amount',
                                      chequeData.bill
                                        .filter(row => row.final_total !== '' && row.status === 0)
                                        .map(row => row.final_total) || []
                                    )
                                  } else if (Number(event.target.value) === Number(oldAmount)) {
                                    // console.log('equal😁😁🤣')
                                    // setFieldValue(
                                    //   'table',
                                    //   chequeData.bill.map(row => ({
                                    //     id: row.bill_id,
                                    //     check: row.status === 0 ? true : false,
                                    //     date: row.date,
                                    //     reference_no: row.reference_no,
                                    //     supplier: row.supplier || 'no supplier',
                                    //     purchase_status: row.invoice_status || 'no purchase status',
                                    //     payment_status: row.pay_status || 'no payment status',
                                    //     warehouse_name: row.store,
                                    //     grand_total: row.final_total,
                                    //     status: row.status,
                                    //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                    //       DecimalFormat
                                    //     ),
                                    //     payment_due: row.pay_due,
                                    //     add_by: row.add_by || 'no add by',
                                    //     payment_id: row.payment_id
                                    //   }))
                                    // )
                                    setFieldValue(
                                      'payment_id',
                                      chequeData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.payment_id)
                                    )
                                    setFieldValue(
                                      'old_bill_id ',
                                      chequeData.bill
                                        .filter(row => row.bill_id !== '' && row.status === 0)
                                        .map(row => row.bill_id)
                                    )
                                    setFieldValue(
                                      'old_bill_amount',
                                      chequeData.bill
                                        .filter(row => row.final_total !== '' && row.status === 0)
                                        .map(row => row.final_total) || []
                                    )
                                    // setFieldValue(
                                    //   'table_total',
                                    //   (Number(event.target.value) - Number(oldAmount) + Number(oldRemain)).toFixed(
                                    //     DecimalFormat
                                    //   )
                                    // )
                                    // setFieldValue(
                                    //   'remain',
                                    //   (Number(event.target.value) - Number(oldAmount) + Number(oldRemain)).toFixed(
                                    //     DecimalFormat
                                    //   )
                                    // )
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
                                    sx={{ textTransform: transText }}
                                    label='Amount in Currency'
                                    name='amount_currency'
                                    value={values.amount_currency}
                                    onChange={event => {
                                      const amount_currency = Number(event.target.value)
                                      // ** unCheck all the checked values
                                      setFieldValue(
                                        'table',
                                        chequeData.bill.map(row => ({
                                          id: row.bill_id,
                                          check: false,
                                          date: row.date,
                                          reference_no: row.reference_no,
                                          supplier: row.supplier || 'no supplier',
                                          purchase_status: row.invoice_status || 'no purchase status',
                                          payment_status: row.pay_status || 'no payment status',
                                          warehouse_name: row.store,
                                          grand_total: row.final_total,
                                          payment: row.check ? 0 : Number(row.total_payment).toFixed(DecimalFormat),
                                          payment_due: row.check ? row.final_total : row.pay_due,
                                          add_by: row.add_by || 'no add by',
                                          status: row.status,
                                          payment_id: row.payment_id
                                        }))
                                      )
                                      setFieldValue('contact', [])
                                      // setContactText('')
                                      setFieldValue('bill_id', [])
                                      setFieldValue('bill_amount', [])
                                      setFieldValue('payment_id', [])
                                      setFieldValue('old_bill_id', [])
                                      setFieldValue('old_bill_amount', [])
                                      // setFieldValue(
                                      //   'table_total',
                                      //   Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                      // )

                                      handleChange(event)
                                      if (values.currency_value !== '' && values.currency_value !== 0) {
                                        setFieldValue(
                                          'amount',
                                          Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                        )
                                        setFieldValue(
                                          'table_total',
                                          Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                        )
                                        // setFieldValue(
                                        //   'table_total',
                                        //   Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                        // )

                                        // check if the amount is  less than the old amount
                                        if (
                                          Number(amount_currency * values.currency_value) < Number(oldAmount) &&
                                          Number(event.target.value) > 0
                                        ) {
                                          // setFieldValue(
                                          //   'table',
                                          //   chequeData.bill.map(row => ({
                                          //     id: row.bill_id,
                                          //     check: false,
                                          //     date: row.date,
                                          //     reference_no: row.reference_no,
                                          //     supplier: row.supplier || 'no supplier',
                                          //     purchase_status: row.invoice_status || 'no purchase status',
                                          //     payment_status: row.pay_status || 'no payment status',
                                          //     warehouse_name: row.store,
                                          //     grand_total: row.final_total,
                                          //     payment: 0,
                                          //     payment_due: row.final_total,
                                          //     add_by: row.add_by || 'no add by',
                                          //     status: 1,
                                          //     payment_id: row.status === 0 ? '' : row.payment_id
                                          //   }))
                                          // )

                                          setFieldValue('bill_id', [])
                                          setFieldValue('bill_amount', [])
                                          // setFieldValue(
                                          //   'amount',
                                          //   Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'table_total',
                                          //   Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'remain',
                                          //   Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                          // )
                                          setFieldValue('old_bill_id', [])
                                          setFieldValue('old_bill_amount', [])
                                          setFieldValue('payment_id', [])
                                        }
                                        // check if the amount is greater than the old amount
                                        else if (Number(amount_currency * values.currency_value) > Number(oldAmount)) {
                                          // setFieldValue(
                                          //   'amount',
                                          //   Number(amount_currency * values.currency_value).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'table_total',
                                          //   (
                                          //     Number(amount_currency * values.currency_value) -
                                          //     Number(oldAmount) +
                                          //     Number(oldRemain)
                                          //   ).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'remain',
                                          //   (
                                          //     Number(amount_currency * values.currency_value) -
                                          //     Number(oldAmount) +
                                          //     Number(oldRemain)
                                          //   ).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'table',
                                          //   chequeData.bill.map(row => ({
                                          //     id: row.bill_id,
                                          //     check: row.status === 0 ? true : false,
                                          //     date: row.date,
                                          //     reference_no: row.reference_no,
                                          //     supplier: row.supplier || 'no supplier',
                                          //     purchase_status: row.invoice_status || 'no purchase status',
                                          //     payment_status: row.pay_status || 'no payment status',
                                          //     warehouse_name: row.store,
                                          //     grand_total: row.final_total,
                                          //     status: row.status,
                                          //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                          //       DecimalFormat
                                          //     ),
                                          //     payment_due: row.pay_due,
                                          //     add_by: row.add_by || 'no add by',
                                          //     payment_id: row.payment_id
                                          //   }))
                                          // )
                                          setFieldValue(
                                            'payment_id',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            chequeData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                        } else if (
                                          Number(amount_currency * values.currency_value) === Number(oldAmount)
                                        ) {
                                          // setFieldValue(
                                          //   'table',
                                          //   chequeData.bill.map(row => ({
                                          //     id: row.bill_id,
                                          //     check: row.status === 0 ? true : false,
                                          //     date: row.date,
                                          //     reference_no: row.reference_no,
                                          //     supplier: row.supplier || 'no supplier',
                                          //     purchase_status: row.invoice_status || 'no purchase status',
                                          //     payment_status: row.pay_status || 'no payment status',
                                          //     warehouse_name: row.store,
                                          //     grand_total: row.final_total,
                                          //     status: row.status,
                                          //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                          //       DecimalFormat
                                          //     ),
                                          //     payment_due: row.pay_due,
                                          //     add_by: row.add_by || 'no add by',
                                          //     payment_id: row.payment_id
                                          //   }))
                                          // )
                                          setFieldValue(
                                            'payment_id',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            chequeData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                          // setFieldValue(
                                          //   'table_total',
                                          //   Number(amount_currency * values.currency_value) -
                                          //     Number(oldAmount) +
                                          //     Number(oldRemain)
                                          // )
                                          // setFieldValue(
                                          //   'remain',
                                          //   (
                                          //     Number(amount_currency * values.currency_value) -
                                          //     Number(oldAmount) +
                                          //     Number(oldRemain)
                                          //   ).toFixed(DecimalFormat)
                                          // )
                                        }
                                      } else {
                                        setFieldValue('amount', Number(amount_currency).toFixed(DecimalFormat))
                                        setFieldValue('table_total', Number(amount_currency).toFixed(DecimalFormat))
                                        // check if the amount is  less than the old amount
                                        if (
                                          Number(amount_currency) < Number(oldAmount) &&
                                          Number(event.target.value) > 0
                                        ) {
                                          // setFieldValue(
                                          //   'table',
                                          //   chequeData.bill.map(row => ({
                                          //     id: row.bill_id,
                                          //     check: false,
                                          //     date: row.date,
                                          //     reference_no: row.reference_no,
                                          //     supplier: row.supplier || 'no supplier',
                                          //     purchase_status: row.invoice_status || 'no purchase status',
                                          //     payment_status: row.pay_status || 'no payment status',
                                          //     warehouse_name: row.store,
                                          //     grand_total: row.final_total,
                                          //     payment: 0,
                                          //     payment_due: row.final_total,
                                          //     add_by: row.add_by || 'no add by',
                                          //     status: 1,
                                          //     payment_id: row.status === 0 ? '' : row.payment_id
                                          //   }))
                                          // )

                                          setFieldValue('bill_id', [])
                                          setFieldValue('bill_amount', [])
                                          // setFieldValue('table_total', Number(amount_currency).toFixed(DecimalFormat))
                                          // setFieldValue('remain', Number(amount_currency).toFixed(DecimalFormat))
                                          setFieldValue('old_bill_id', [])
                                          setFieldValue('old_bill_amount', [])
                                          setFieldValue('payment_id', [])
                                        }
                                        // check if the amount is greater than the old amount
                                        else if (Number(amount_currency) > Number(oldAmount)) {
                                          // setFieldValue(
                                          //   'table_total',
                                          //   (Number(amount_currency) + Number(oldRemain)).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'remain',
                                          //   (
                                          //     Number(amount_currency * values.currency_value) + Number(oldRemain)
                                          //   ).toFixed(DecimalFormat)
                                          // )
                                          // setFieldValue(
                                          //   'table',
                                          //   chequeData.bill.map(row => ({
                                          //     id: row.bill_id,
                                          //     check: row.status === 0 ? true : false,
                                          //     date: row.date,
                                          //     reference_no: row.reference_no,
                                          //     supplier: row.supplier || 'no supplier',
                                          //     purchase_status: row.invoice_status || 'no purchase status',
                                          //     payment_status: row.pay_status || 'no payment status',
                                          //     warehouse_name: row.store,
                                          //     grand_total: row.final_total,
                                          //     status: row.status,
                                          //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                          //       DecimalFormat
                                          //     ),
                                          //   payment_due: row.pay_due,
                                          //   add_by: row.add_by || 'no add by',
                                          //   payment_id: row.payment_id
                                          // }))
                                          // )
                                          setFieldValue(
                                            'payment_id',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            chequeData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                        } else if (Number(amount_currency) === Number(oldAmount)) {
                                          // setFieldValue(
                                          //   'table',
                                          //   chequeData.bill.map(row => ({
                                          //     id: row.bill_id,
                                          //     check: row.status === 0 ? true : false,
                                          //     date: row.date,
                                          //     reference_no: row.reference_no,
                                          //     supplier: row.supplier || 'no supplier',
                                          //     purchase_status: row.invoice_status || 'no purchase status',
                                          //     payment_status: row.pay_status || 'no payment status',
                                          //     warehouse_name: row.store,
                                          //     grand_total: row.final_total,
                                          //     status: row.status,
                                          //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                          //       DecimalFormat
                                          //     ),
                                          //     payment_due: row.pay_due,
                                          //     add_by: row.add_by || 'no add by',
                                          //     payment_id: row.payment_id
                                          //   }))
                                          // )
                                          setFieldValue(
                                            'payment_id',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.payment_id)
                                          )
                                          setFieldValue(
                                            'old_bill_id ',
                                            chequeData.bill
                                              .filter(row => row.bill_id !== '' && row.status === 0)
                                              .map(row => row.bill_id)
                                          )
                                          setFieldValue(
                                            'old_bill_amount',
                                            chequeData.bill
                                              .filter(row => row.final_total !== '' && row.status === 0)
                                              .map(row => row.final_total) || []
                                          )
                                          // setFieldValue(
                                          //   'table_total',
                                          //   (Number(amount_currency) - Number(oldAmount) + Number(oldRemain)).toFixed(
                                          //     DecimalFormat
                                          //   )
                                          // )
                                          // setFieldValue(
                                          //   'remain',
                                          //   (Number(amount_currency) - Number(oldAmount) + Number(oldRemain)).toFixed(
                                          //     DecimalFormat
                                          //   )
                                          // )
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
                                            setFieldValue('currency_value', Number(item.amount).toFixed(DecimalFormat))
                                            setFieldValue(
                                              'amount_currency',
                                              Number(values.amount / item.amount).toFixed(DecimalFormat)
                                            )
                                          }}
                                        >
                                          {item.value}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} lg={12} md={4} sm={12}>
                                <FormControl fullWidth>
                                  <TextField
                                    sx={{ textTransform: transText }}
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
                                            Number(currency_value * values.amount_currency).toFixed(DecimalFormat)
                                          )
                                          setFieldValue(
                                            'table',
                                            chequeData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              payment: row.check ? 0 : Number(row.total_payment).toFixed(DecimalFormat),
                                              payment_due: row.check ? row.final_total : row.pay_due,
                                              add_by: row.add_by || 'no add by',
                                              status: row.status,
                                              payment_id: row.payment_id
                                            }))
                                          )

                                          setFieldValue('bill_id', [])
                                          setFieldValue('bill_amount', [])
                                          setFieldValue(
                                            'table_total',
                                            Number(currency_value * values.amount_currency).toFixed(DecimalFormat)
                                          )
                                          setFieldValue(
                                            'remain',
                                            Number(currency_value * values.amount_currency).toFixed(DecimalFormat)
                                          )
                                          setFieldValue('old_bill_id', [])
                                          setFieldValue('old_bill_amount', [])
                                          setFieldValue('payment_id', [])
                                        } else {
                                          setFieldValue('amount', Number(currency_value).toFixed(DecimalFormat))
                                          setFieldValue('table_total', Number(currency_value).toFixed(DecimalFormat))
                                          setFieldValue('remain', Number(currency_value).toFixed(DecimalFormat))
                                        }

                                        // setFieldValue(
                                        //   'table_total',
                                        //   Number(currency_value * values.amount_currency).toFixed(DecimalFormat)
                                        // )
                                        // check if the amount is  less than the old amount
                                        // if (
                                        //   Number(currency_value * values.amount_currency) < Number(oldAmount) &&
                                        //   Number(currency_value * values.amount_currency) > 0
                                        // ) {

                                        //   setFieldValue('bill_id', [])
                                        //   setFieldValue('bill_amount', [])
                                        //   setFieldValue(
                                        //     'table_total',
                                        //     Number(currency_value * values.amount_currency).toFixed(DecimalFormat)
                                        //   )
                                        //   setFieldValue(
                                        //     'remain',
                                        //     Number(currency_value * values.amount_currency).toFixed(DecimalFormat)
                                        //   )
                                        //   setFieldValue('old_bill_id', [])
                                        //   setFieldValue('old_bill_amount', [])
                                        //   setFieldValue('payment_id', [])
                                        // }

                                        // check if the amount is greater than the old amount
                                        // else if (
                                        //   Number(currency_value * values.amount_currency) > Number(oldAmount)
                                        // ) {
                                        //   setFieldValue(
                                        //     'table_total',
                                        //     (
                                        //       Number(currency_value * values.amount_currency) -
                                        //       Number(oldAmount) +
                                        //       Number(oldRemain)
                                        //     ).toFixed(DecimalFormat)
                                        //   )
                                        //   setFieldValue(
                                        //     'remain',
                                        //     (
                                        //       Number(currency_value * values.amount_currency) -
                                        //       Number(oldAmount) +
                                        //       Number(oldRemain)
                                        //     ).toFixed(DecimalFormat)
                                        //   )
                                        // setFieldValue(
                                        //   'table',
                                        //   chequeData.bill.map(row => ({
                                        //     id: row.bill_id,
                                        //     check: row.status === 0 ? true : false,
                                        //     date: row.date,
                                        //     reference_no: row.reference_no,
                                        //     supplier: row.supplier || 'no supplier',
                                        //     purchase_status: row.invoice_status || 'no purchase status',
                                        //     payment_status: row.pay_status || 'no payment status',
                                        //     warehouse_name: row.store,
                                        //     grand_total: row.final_total,
                                        //     status: row.status,
                                        //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                        //       DecimalFormat
                                        //     ),
                                        //     payment_due: row.pay_due,
                                        //     add_by: row.add_by || 'no add by',
                                        //     payment_id: row.payment_id
                                        //   }))
                                        // )
                                        //   setFieldValue(
                                        //     'payment_id',
                                        //     chequeData.bill
                                        //       .filter(row => row.bill_id !== '' && row.status === 0)
                                        //       .map(row => row.payment_id)
                                        //   )
                                        //   setFieldValue(
                                        //     'old_bill_id ',
                                        //     chequeData.bill
                                        //       .filter(row => row.bill_id !== '' && row.status === 0)
                                        //       .map(row => row.bill_id)
                                        //   )
                                        //   setFieldValue(
                                        //     'old_bill_amount',
                                        //     chequeData.bill
                                        //       .filter(row => row.final_total !== '' && row.status === 0)
                                        //       .map(row => row.final_total) || []
                                        //   )
                                        // }
                                        // else if (
                                        //   Number(currency_value * values.amount_currency) === Number(oldAmount)
                                        // ) {
                                        // console.log('equal😁😁🤣')
                                        // setFieldValue(
                                        //   'table',
                                        //   chequeData.bill.map(row => ({
                                        //     id: row.bill_id,
                                        //     check: row.status === 0 ? true : false,
                                        //     date: row.date,
                                        //     reference_no: row.reference_no,
                                        //     supplier: row.supplier || 'no supplier',
                                        //     purchase_status: row.invoice_status || 'no purchase status',
                                        //     payment_status: row.pay_status || 'no payment status',
                                        //     warehouse_name: row.store,
                                        //     grand_total: row.final_total,
                                        //     status: row.status,
                                        //     payment: Number(Number(row.final_total) - Number(row.pay_due)).toFixed(
                                        //       DecimalFormat
                                        //     ),
                                        //     payment_due: row.pay_due,
                                        //     add_by: row.add_by || 'no add by',
                                        //     payment_id: row.payment_id
                                        //   }))
                                        // )
                                        // setFieldValue(
                                        //   'payment_id',
                                        //   chequeData.bill
                                        //     .filter(row => row.bill_id !== '' && row.status === 0)
                                        //     .map(row => row.payment_id)
                                        // )
                                        // setFieldValue(
                                        //   'old_bill_id ',
                                        //   chequeData.bill
                                        //     .filter(row => row.bill_id !== '' && row.status === 0)
                                        //     .map(row => row.bill_id)
                                        // )
                                        // setFieldValue(
                                        //   'old_bill_amount',
                                        //   chequeData.bill
                                        //     .filter(row => row.final_total !== '' && row.status === 0)
                                        //     .map(row => row.final_total) || []
                                        // )
                                        // setFieldValue(
                                        //   'table_total',
                                        //   (
                                        //     Number(currency_value * values.amount_currency) -
                                        //     Number(oldAmount) +
                                        //     Number(oldRemain)
                                        //   ).toFixed(DecimalFormat)
                                        // )
                                        // setFieldValue(
                                        //   'remain',
                                        //   (
                                        //     Number(currency_value * values.amount_currency) -
                                        //     Number(oldAmount) +
                                        //     Number(oldRemain)
                                        //   ).toFixed(DecimalFormat)
                                        // )
                                        // }}
                                      } else {
                                        if (values.amount !== '' && values.amount !== 0 && currency_value !== 0) {
                                          setFieldValue(
                                            'amount_currency',
                                            Number(values.amount / currency_value).toFixed(DecimalFormat)
                                          )
                                          setFieldValue(
                                            'table',
                                            chequeData.bill.map(row => ({
                                              id: row.bill_id,
                                              check: false,
                                              date: row.date,
                                              reference_no: row.reference_no,
                                              supplier: row.supplier || 'no supplier',
                                              purchase_status: row.invoice_status || 'no purchase status',
                                              payment_status: row.pay_status || 'no payment status',
                                              warehouse_name: row.store,
                                              grand_total: row.final_total,
                                              payment: row.check ? 0 : Number(row.total_payment).toFixed(DecimalFormat),
                                              payment_due: row.check ? row.final_total : row.pay_due,
                                              add_by: row.add_by || 'no add by',
                                              status: row.status,
                                              payment_id: row.payment_id
                                            }))
                                          )
                                          setFieldValue('bill_id', [])
                                          setFieldValue('bill_amount', [])

                                          setFieldValue('old_bill_id', [])
                                          setFieldValue('old_bill_amount', [])
                                          setFieldValue('payment_id', [])
                                        } else {
                                          setFieldValue('amount_currency', Number(values.amount).toFixed(DecimalFormat))
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
                          <Grid item xs={12} lg={12} md={4} sm={12}>
                            <FormControl fullWidth>
                              <InputLabel sx={{ textTransform: transText }} id='demo-simple-select-label'>
                                Bank
                              </InputLabel>
                              <Select
                                value={values.bank_id}
                                name='bank_id'
                                sx={{ textTransform: transText }}
                                label='Bank'
                                onChange={event => {
                                  handleChange(event)
                                }}
                                onBlur={handleBlur}
                                error={Boolean(touched.bank_id && errors.bank_id)}
                              >
                                <MenuItem sx={{ textTransform: transText }} value='' disabled>
                                  Select Bank
                                </MenuItem>
                                {data.contact_banks.length > 0 &&
                                  data.contact_banks.map((item, index) => (
                                    <MenuItem sx={{ textTransform: transText }} key={index} value={item.id}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider />
                      <Box sx={{ p: 5 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} lg={6} md={4} sm={12}>
                            <FormControl fullWidth>
                              <DatePickerWrapper>
                                <DatePicker
                                  name='write_date'
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
                                      sx={{ textTransform: transText }}
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
                                      sx={{ textTransform: transText }}
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
                      renderInput={params => <TextField
                      sx={{ textTransform: transText }} fullWidth {...params} label='Account' />}
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
                                renderInput={params => (
                                  <TextField sx={{ textTransform: transText }} fullWidth {...params} label='Contact' />
                                )}
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
                                sx={{ textTransform: transText }}
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
                            <ChequesAddTable
                              push={push}
                              type={type}
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
                        <Button type='submit' variant='contained' color='primary' sx={{ textTransform: transText }}>
                          Update
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
      </CustomDialog>
    </Fragment>
  )
}

export default ChequeEdit
