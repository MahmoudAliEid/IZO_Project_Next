import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  DialogContent,
  Divider,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getCookie } from 'cookies-next'
// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
// ** Custom Components
import CustomHeader from '../../customDialogHeader/CustomHeader'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import notify from 'src/utils/notify'
import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'

// ** Formik
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import AddExpenseVoucherTable from './AddExpenseVoucherTable'
import { fetchEditExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/getEditExpenseVoucher'
import { fetchExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/getExpenseVoucher'
import { editExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/postEditExpenseVoucher'
import { fetchCreateExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/getCreateExpenseVoucher'
import CustomDialog from 'src/@core/Global/CustomDialog'

const EditExpensePopUp = ({ open, handleClose, id }) => {
  const [data, setData] = useState([])
  const [openLoading, setOpenLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    date: new Date(),
    currency_id: '',
    currency_id_amount: '',
    attachment: [],
    main_credit_check: false,
    main_credit: null,
    cost_center_id: '',
    main_note: '',
    main_amount: 0,
    table: []
  })

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // ** Cookies
  const transText = getCookie('fontStyle')
  const decimalFormat = getCookie('DecimalFormat')

  // ** Get data from store
  const storeData = useSelector(state => state.getEditExpenseVoucher?.data?.value)
  const createStatus = useSelector(state => state.postEditExpenseVoucher)

  // ** validate schema
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    main_credit: Yup.string().required('Main Credit is required'),
    cost_center_id: Yup.string().required('Cost Center is required')
  })

  useEffect(() => {
    if (storeData) {
      setData(storeData.require)
    }
  }, [storeData])

  useEffect(() => {
    dispatch(fetchEditExpenseVoucher({ id }))
    dispatch(fetchCreateExpenseVoucher())
  }, [dispatch, id])

  // ** Set initial values
  useEffect(() => {
    if (storeData) {
      setInitialValues(prev => ({
        ...prev,
        date: new Date(storeData.info[0]?.date),
        currency_id: Number(storeData.info[0]?.currency_id),
        currency_id_amount: storeData.info[0]?.exchange_price,
        attachment: [],
        main_credit_check: storeData.info[0]?.main_credit ? true : false,
        main_credit: storeData.info[0]?.main_account_id,
        cost_center_id: storeData.info[0]?.cost_center_id,
        main_note: storeData.info[0]?.note_main,
        main_amount: storeData.info[0]?.total_credit,
        table: storeData.info[0]?.items.map(item => ({
          id: item.id,
          credit_id: item.credit_account_id,
          date: item.date,
          debit_id: item.debit_account_id,
          amount: item.amount,
          cost_center_id: item.cost_center_id,
          note: item.text,
          tax: item.tax_percentage,
          tax_amount: item.tax_amount,
          net_amount: (Number(item.amount) - Number(item.tax_amount)).toFixed(decimalFormat),
          status: 'old'
        }))
      }))
    }
  }, [storeData, decimalFormat])

  // ** Function to handle form submit
  const handleSubmit = async (values, { setSubmitting }) => {
    setOpenLoading(true)

    try {
      // ** Dispatch action to add expense
      dispatch(editExpenseVoucher({ values, id })).then(() => {
        dispatch(
          fetchExpenseVoucher({
            month: null,
            week: null,
            day: null,
            startDate: null,
            endDate: null
          })
        )
      })
    } catch (error) {
      notify('Error', 'error')
      setSubmitting(false)
    }
  }

  return (
    <CustomDialog open={open} toggle={handleClose}>
      {openLoading && (
        <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={createStatus} />
      )}
      <CustomHeader handleClose={handleClose} title={'Edit Expense'} divider={false} />
      <DialogContent sx={{ padding: '0 !important', textTransform: transText }}>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur, setFieldTouched }) => (
              <Form>
                <Box sx={{ p: 5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container item spacing={2}>
                        <Grid item xs={9}>
                          <FormControl fullWidth>
                            <InputLabel id='main_credit_label' htmlFor='main_credit' shrink>
                              Main Credit
                            </InputLabel>

                            <Select
                              name='main_credit'
                              id='main_credit'
                              labelId='main_credit_label'
                              value={values.main_credit || null}
                              label='Main Credit'
                              fullWidth
                              onChange={event => {
                                handleChange(event)
                                if (values.main_credit_check) {
                                  values.table.forEach((item, index) => {
                                    setFieldValue(`table[${index}].credit_id`, event.target.value)
                                  })
                                }
                              }}
                              onBlur={handleBlur}
                              error={touched.main_credit && Boolean(errors.main_credit)}
                            >
                              {data?.accounts_credit &&
                                data.accounts_credit.map((item, index) => (
                                  <MenuItem key={index} value={item.id}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                            </Select>
                            {touched.main_credit && errors.main_credit && (
                              <FormHelperText error>{String(errors.main_credit)}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            <FormControlLabel
                              label='Main Credit check'
                              sx={{
                                '& .MuiFormControlLabel-label': {
                                  fontSize: '0.875rem',
                                  color: 'text.secondary'
                                }
                              }}
                              control={
                                <Checkbox
                                  checked={values.main_credit_check}
                                  color='primary'
                                  name='main_credit_check'
                                  onChange={e => {
                                    setFieldValue('main_credit_check', e.target.checked)
                                    if (e.target.checked) {
                                      const mainCredit = values.main_credit
                                      values.table.map((item, index) => {
                                        setFieldValue(`table[${index}].credit_id`, mainCredit)
                                      })
                                    } else {
                                      values.table.map((item, index) => {
                                        setFieldValue(`table[${index}].credit_id`, '')
                                      })
                                    }
                                  }}
                                />
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6}>
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
                                    setFieldValue('currency_id_amount', item?.amount || 0)
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
                    <Grid item xs={12} md={6} lg={6} sx={12}>
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
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='cost_center_id'>Cost Center</InputLabel>
                        <Select
                          id='cost_center_id'
                          label='Cost Center'
                          name={`cost_center_id`}
                          value={values.cost_center_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.cost_center_id && Boolean(errors.cost_center_id)}
                          fullWidth
                        >
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
                    </Grid>
                    {values.main_credit_check && (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            name='main_note'
                            label='Main Note'
                            value={values.main_note}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            multiline
                            error={Boolean(touched.main_note && errors.main_note)}
                            helperText={errors.main_note}
                          />
                        </FormControl>
                      </Grid>
                    )}
                    {values.main_credit_check && (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            name='main_amount'
                            label='Main Amount'
                            value={Number(values.table.reduce((acc, item) => acc + Number(item.amount), 0)).toFixed(
                              decimalFormat
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                          />
                        </FormControl>
                      </Grid>
                    )}
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
                    Update
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </DialogContent>
    </CustomDialog>
  )
}
export default EditExpensePopUp
