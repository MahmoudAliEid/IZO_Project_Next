import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getCookie } from 'cookies-next'
// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
// ** Custom Components
import CustomHeader from '../../customDialogHeader/CustomHeader'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import notify from 'src/utils/notify'
import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'

// ** Formik
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import fetchCreateExpenseVoucher from 'src/store/apps/vouchers/expenseVoucher/getCreateExpenseVoucher'
import AddExpenseVoucherTable from './AddExpenseVoucherTable'

const AddExpensePopUp = ({ open, handleClose }) => {
  const [data, setData] = useState([])
  const [initialValues] = useState({
    date: new Date(),
    currency_id: '',
    currency_id_amount: '',
    attachment: [],
    main_credit_check: false,
    main_credit: null,
    cost_center_id: '',
    table: [
      {
        id: 0,
        credit_id: '',
        debit_id: '',
        amount: '',
        note: '',
        cost_center_id: '',
        tax: 0,
        tax_amount: 0,
        net_amount: 0
      }
    ]
  })

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // ** Cookies
  const transText = getCookie('fontStyle')

  // ** Get data from store
  const storeData = useSelector(state => state.getCreateExpenseVoucher.data.value)

  // ** validate schema
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    main_credit: Yup.string().required('Main Credit is required'),
    cost_center_id: Yup.string().required('Cost Center is required')
    // table: Yup.array().of(
    //   Yup.object().shape({
    //     credit_id: Yup.string().required('Credit is required'),
    //     debit_id: Yup.string().required('Debit is required'),
    //     amount: Yup.number().required('Amount is required'),
    //     note: Yup.string().required('Note is required'),
    //     cost_center_id: Yup.string().required('Cost Center is required')
    //   })
    // )
  })

  useEffect(() => {
    if (storeData) {
      setData(storeData)
    }
  }, [storeData])

  useEffect(() => {
    dispatch(fetchCreateExpenseVoucher())
  }, [dispatch])

  // ** Function to handle form submit
  const handleSubmit = async (values, { setSubmitting }) => {
    // ** API Call
    console.log(values)

    try {
      // ** Dispatch action to add expense
    } catch (error) {
      notify('Error', 'error')
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='lg'
      scroll='body'
      sx={{ height: '100%', textTransform: transText }}
      aria-labelledby='form-dialog-title'
    >
      <CustomHeader handleClose={handleClose} title={'Add Expense'} divider={false} />
      <DialogContent sx={{ padding: '0 !important', textTransform: transText }}>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur }) => (
              <Form>
                <Box sx={{ p: 3 }}>
                  <Grid container space={2}>
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <FormControl>
                        <InputLabel>Main Credit</InputLabel>
                        <Select
                          name='main_credit'
                          value={values.main_credit}
                          label='Main Credit'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.main_credit && errors.main_credit}
                        >
                          <MenuItem value='cash'>hi</MenuItem>
                        </Select>
                        {touched.main_credit && errors.main_credit && (
                          <FormHelperText error>{String(errors.main_credit)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='currency_id'>Currency</InputLabel>
                        <Select
                          labelId='currency_id'
                          id='currency_id'
                          label='Currency'
                          name='currency_id'
                          value={values.currency_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.currency_id && errors.currency_id)}
                          fullWidth
                        >
                          {data &&
                            data?.currency &&
                            data?.currency.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={item.id}
                                  onClick={() => {
                                    setFieldValue('currency_id_amount', item.amount)
                                  }}
                                >
                                  {item.value}
                                </MenuItem>
                              )
                            })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          label='Currency Amount'
                          name='currency_id_amount'
                          value={values.currency_id_amount}
                          readOnly={true}
                          handleChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <DatePickerWrapper>
                          <DatePicker
                            name='date'
                            selected={values.date}
                            popperPlacement={popperPlacement}
                            onChange={date => {
                              setFieldValue('date', date)
                            }}
                            showMonthDropdown
                            showYearDropdown
                            id='basic-input'
                            dateFormat='yyyy/MM/dd'
                            customInput={
                              <TextField
                                fullWidth
                                label='Date '
                                readOnly={false}
                                value={values.date}
                                name='date'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.date && errors.date)}
                                helperText={errors.date}
                              />
                            }
                          />
                        </DatePickerWrapper>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
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
                      <AddExpenseVoucherTable
                        values={values}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        push={push}
                        remove={remove}
                        setFieldTouched={setFieldTouched}
                      />
                    )}
                  </FieldArray>
                </Box>
                <Box sx={{ p: 5, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type='submit' variant='contained' color='primary'>
                    Add
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
export default AddExpensePopUp
