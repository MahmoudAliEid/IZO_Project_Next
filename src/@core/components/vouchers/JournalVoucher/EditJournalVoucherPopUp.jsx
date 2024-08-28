import { forwardRef, useState, useEffect, Fragment } from 'react'
import { Formik, Form, useField, FieldArray } from 'formik'
import * as Yup from 'yup'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/getCreateJournalVoucher'
import { fetchEditJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/getEditJournalVoucher'
import { editJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/postEditJournalVoucher'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

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
  Alert
} from '@mui/material'

import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'

import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'

// ** next cookies
import { getCookie } from 'cookies-next'
import { Warning } from '@mui/icons-material'
import EditJournalVoucherTable from './EditJournalVoucherTable'
import notify from 'src/utils/notify'
import { fetchJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/getJournalVoucherSlice'

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const EditJournalVoucherPopUp = ({ open, handleClose, id }) => {
  // const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    date: new Date(),
    currency_id: '',
    currency_id_amount: '',
    attachment: [],
    total_credit: 0,
    total_debit: 0,
    table: []
  })

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    // make account_id required in table
    table: Yup.array().of(
      Yup.object().shape({
        account_id: Yup.string().required('Required')
      })
    )
  })

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // const DecimalFormat = getCookie('DecimalFormat')
  const transText = getCookie('fontStyle')

  // ** Vars
  const store = useSelector(state => state.getCreateJournalVoucher.data?.value)
  const status = useSelector(state => state.postCreateJVSlice)
  const storeEdit = useSelector(state => state.getEditJournalVoucher.data?.value)

  // ** UseEffects
  useEffect(() => {
    dispatch(fetchCreateJournalVoucher())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchEditJournalVoucher({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (store !== null) {
      setData(store)
    }
  }, [store])

  // set initial values
  useEffect(() => {
    if (storeEdit) {
      const { date, currency_id, exchange_price, amount, items } = storeEdit.info[0]
      setInitialValues(prev => ({
        ...prev,
        date: new Date(date),
        currency_id: currency_id,
        currency_id_amount: exchange_price,
        attachment: [],
        total_credit: amount,
        total_debit: amount,
        table: items.map(item => ({
          line_id: item.id,
          account_id: item.account_id,
          text: item.text,
          debit: item.debit,
          credit: item.credit,
          cost_center_id: item.cost_center_id,
          status: 'old',
          accountName: item.accountName,
          disabled_debit: item.debit === 0,
          disabled_credit: item.credit === 0
        }))
      }))
    }
  }, [storeEdit])

  // ** Functions
  const handleSubmit = values => {
    setLoading(true)

    dispatch(editJournalVoucher({ values, id }))
      .then(() => {
        fetchJournalVoucher({
          day: null,
          month: null,
          week: null,
          startDate: null,
          endDate: null
        })
      })
      .then(() => {
        setLoading(false)
        dispatch(fetchEditJournalVoucher({ id }))
      })
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{ height: '100%', textTransform: transText }}
      >
        {loading && (
          <LoadingAnimation
            open={loading}
            onClose={() => {
              setLoading(false)
            }}
            statusType={status}
          />
        )}
        <Fragment>
          <CustomHeader title={`Add Journal Voucher`} handleClose={handleClose} divider={false} />
          <DialogContent sx={{ padding: '0 !important', textTransform: transText }}>
            <Card>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
                  <Form>
                    <Box sx={{ p: 3 }}>
                      {values.total_credit !== values.total_debit ? (
                        <Alert severity='warning' sx={{ mb: 3 }} icon={<Warning />}>
                          Total Credit and Total Debit should be equal
                        </Alert>
                      ) : null}

                      <Grid container spacing={2}>
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
                            <CustomInput
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
                        <Grid item xs={12} sx={{ mb: 2 }}>
                          <FormControl fullWidth>
                            <Attachment image={values.attachment} setFieldValue={setFieldValue} />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Box sx={{ p: 5 }}>
                        <FieldArray name='table'>
                          {({ push, remove }) => (
                            <EditJournalVoucherTable
                              values={values}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              setFieldValue={setFieldValue}
                              push={push}
                              remove={remove}
                            />
                          )}
                        </FieldArray>
                      </Box>
                      <Box sx={{ p: 5, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          disabled={
                            values.total_credit === 0 ||
                            values.total_debit === 0 ||
                            values.total_credit !== values.total_debit ||
                            values.table.filter(row => row.debit === 0 && row.credit === 0).length > 0
                          }
                          onClick={() => {
                            const isEmpty = values.table.filter(row => row.account_id === '')
                            console.log(isEmpty, 'isEmpty')
                            if (isEmpty.length > 0) {
                              notify('All accounts must be selected', 'error')
                            } else {
                              return
                            }
                            const isZeros = values.table.filter(row => row.debit === 0 && row.credit === 0)
                            if (isZeros.length > 0) {
                              notify('Debit or Credit must be greater than 0', 'error')
                            } else {
                              return
                            }
                          }}
                        >
                          Update
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Card>
          </DialogContent>
        </Fragment>
      </Dialog>
    </Fragment>
  )
}

export default EditJournalVoucherPopUp
