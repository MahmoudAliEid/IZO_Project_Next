import { useState, useEffect, forwardRef } from 'react'

// ** MUI
import {
  DialogContent,
  DialogActions,
  Button,
  Card,
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Divider,
  Typography,
  Chip
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// ** Third Party Components
import { Formik, Form, FieldArray, useField } from 'formik'
import * as Yup from 'yup'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
// ** Custom Components
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormProduct from 'src/@core/components/products/listProduct/forms/FormProduct'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreatePurchase } from 'src/store/apps/purchases/getCreatePurchase'
import { createOpeningStock } from 'src/store/apps/products/addOpeningStock/postCreateOpeningStock'
import { editOpeningStock } from 'src/store/apps/products/addOpeningStock/postEditOpeningStock'
import { fetchPurchases } from 'src/store/apps/purchases/getPurchasesSlice'
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomPurchaseTable from './CustomPurchaseTable'
import SearchSupplier from './SearchSupplier'

// ** Custom Input Component
const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const AddPurchases = ({ open, handleClose, edit, id }) => {
  // ** State
  const [data, setData] = useState()
  const [openForm, setOpenForm] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    total_items: 0,
    net_total_amount: 0,
    search_product: '',
    search_supplier: '',
    business_info: null,
    parent_price: null,
    //----------------
    contact_id: '',
    contactText: '',
    sup_refe: '',
    transaction_date: '',
    exchange_rage: '',
    location_id: '',
    pay_term_type: '',
    pay_term_number: '',
    status: '',
    cost_center_id: '',
    store_id: '',
    currency_id: '',
    currency_id_amount: '',
    project_no: '',
    depending_curr: '', // on  if currency_id selected
    dis_currency: '', //   if currency_id selected

    dis_type: '',
    attachment: [],
    items: [
      {
        id: -1,
        name: 'Mahmoud',
        description: '',
        quantity: 1,
        unit: '',
        unit_price_before_dis: 0,
        unit_price_before_dis_include_vat: 0,
        list_prices: [],
        all_unit: [],
        child_price: '',
        unit_price_after_dis: 0,
        unit_price_after_dis_include_vat: 0,
        amount_discount: 0,
        percentage_discount: 0,
        unit_price_after_dis_curr: 0,
        unit_price_before_dis_curr: 0,
        total: 0,
        total_currency: 0,
        mfg_date: '',
        unit_quantity: 0
      }
    ]
  })

  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  // ** Hook
  const { settings } = useSettings()
  const { dateFormat } = settings
  // ** Vars
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Selectors
  const store = useSelector(state => state.getCreatePurchase?.data?.value)
  const createStatus = useSelector(state => state.postCreateOpeningStock)
  const editStore = useSelector(state => state.getEditOpeningStock?.data?.value)
  const editStatus = useSelector(state => state.postEditOpeningStock)

  // ** Get Cookies
  const transText = getCookie('fontStyle')
  const token = getCookie('token')

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    store: Yup.string().required('This field is required')
  })

  // ** useEffect
  useEffect(() => {
    dispatch(fetchCreatePurchase()).then(response => {
      // setData(response)
      console.log(response)
    })
  }, [dispatch])

  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

  // ** edit
  useEffect(() => {
    if (edit && editStore) {
      setInitialValues(prev => ({
        ...prev,
        store: editStore.info[0].store.id,
        date: new Date(editStore.info[0].date),
        parent_price: editStore.info[0].list_price,
        items: editStore.info[0].items.map(item => ({
          id: item.id,
          name: item.productName,
          line_id: item.line_id,
          total: '',
          line_store: item.store_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          unit: item.product_unit_id,
          store: item.store_id,
          all_unit: item.all_units,
          initial: false,
          unit_quantity: '',
          child_price: item.list_price,
          list_prices: item.list_unit_price,
          product_unit_id: item.product_unit_id,
          product_unit_qty: item.product_unit_qty,
          line_id: item.line_id,
          order_id: item.order_id
        }))
      }))
    }
  }, [edit, editStore])

  // ** Function to handle form submit
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)

    if (edit && id) {
      dispatch(editOpeningStock({ values, id }))
        .then(() => {
          dispatch(fetchPurchases({ token: token, query: null }))
        })
        .then(() => {
          setOpenLoading(true)
        })
    } else {
      dispatch(createOpeningStock({ values }))
        .then(() => {
          setOpenLoading(true)
        })
        .then(() => {
          dispatch(fetchPurchases({ token: token, query: null }))
        })
    }
    setSubmitting(false)

    // handleClose()
  }
  const handleAddClickOpen = () => setOpenForm(true)
  const toggle = () => {
    setOpenForm(prev => !prev)
  }
  console.log(data, 'data from Purchase')

  return (
    <CustomDialog open={open} toggle={toggle}>
      <CustomHeader title={edit ? 'Update Purchase' : 'Add Purchase'} handleClose={handleClose} divider={false} />
      {openLoading && (
        <LoadingAnimation
          open={openLoading}
          onClose={() => setOpenLoading(false)}
          statusType={edit ? editStatus : createStatus}
        />
      )}

      <Box
        sx={{
          gap: 4,
          my: 3,
          mr: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'self-end',
          justifyContent: 'flex-end'
        }}
      >
        <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddClickOpen} variant='contained'>
          Add New Product
        </Button>
      </Box>
      <DialogContent sx={{ padding: '0 !important' }}>
        {true ? (
          <Card>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, handleBlur, handleChange, errors, touched, setFieldValue }) => (
                <Form>
                  <Divider sx={{ mb: 2 }}>
                    <Chip
                      label='Purchase Main Info'
                      color='primary'
                      variant='outlined'
                      sx={{
                        '& .MuiChip-label': { textTransform: transText }
                      }}
                    />
                  </Divider>
                  <Grid container spacing={3} sx={{ p: 5 }}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <SearchSupplier setFieldValue={setFieldValue} handleChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        border: theme => `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px',
                        p: 3,
                        ml: 3,
                        mt: 3,
                        color: 'text.secondary'
                      }}
                    >
                      <FormControl fullWidth>
                        <Typography
                          variant='body1'
                          sx={{
                            fontWeight: '300',
                            p: 2
                          }}
                        >
                          Company Information:
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Divider />

                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='Warehouse'>Warehouse</InputLabel>
                        <Select
                          id='Warehouse'
                          name='store_id'
                          label='Warehouse'
                          value={values.store_id}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.store_id && touched.store_id}
                          fullWidth
                        >
                          {data &&
                            data.stores.length > 0 &&
                            data.stores.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.store_id && touched.store_id && (
                          <FormHelperText error>{String(errors.store_id)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <DatePickerWrapper>
                          <DatePicker
                            name='transaction_date'
                            selected={values.transaction_date}
                            popperPlacement={popperPlacement}
                            onChange={date => {
                              setFieldValue('transaction_date', date)
                            }}
                            dateFormat={dateFormat}
                            customInput={
                              <CustomInput
                                fullWidth
                                label='Purchase Date'
                                sx={{ textTransform: transText }}
                                readOnly={false}
                                value={values.transaction_date}
                                name='transaction_date'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.transaction_date && errors.transaction_date)}
                              />
                            }
                          />
                        </DatePickerWrapper>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <TextField
                              name='pay_term_number'
                              label='Pay Number'
                              value={values.pay_term_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(touched.pay_term_number && errors.pay_term_number)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <InputLabel htmlFor='pay_term_type'>Pay Type</InputLabel>
                              <Select
                                id='pay_term_type'
                                name='pay_term_type'
                                label='Pay Type'
                                value={values.pay_term_type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.pay_term_type && errors.pay_term_type)}
                                fullWidth
                              >
                                <MenuItem value=''>
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value='days'>Days</MenuItem>
                                <MenuItem value='months'>Months</MenuItem>
                                <MenuItem value='years'>Years</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='purchase_status'>Purchase Status</InputLabel>
                        <Select
                          id='purchase_status'
                          name='status'
                          label='Purchase Status'
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.status && errors.status)}
                          fullWidth
                        >
                          <MenuItem value=''>
                            <em>Please Select</em>
                          </MenuItem>
                          {data &&
                            data.status.length > 0 &&
                            data.status.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.status && touched.status && (
                          <FormHelperText error>{String(errors.status)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {/* cost center */}
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='cost_center'>Cost Center</InputLabel>
                        <Select
                          id='cost_center'
                          name='cost_center_id'
                          label='Cost Center'
                          value={values.cost_center_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.cost_center_id && errors.cost_center_id)}
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
                        {errors.cost_center_id && touched.cost_center_id && (
                          <FormHelperText error>{String(errors.cost_center_id)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {/* currency */}
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <InputLabel htmlFor='currency_id'>Currency</InputLabel>
                            <Select
                              id='currency_id'
                              name='currency_id'
                              label='Currency'
                              value={values.currency_id}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(touched.currency_id && errors.currency_id)}
                              fullWidth
                            >
                              <MenuItem value=''>
                                <em>Please Select</em>
                              </MenuItem>
                              {data &&
                                data.currencies.length > 0 &&
                                data.currencies.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    value={item.id}
                                    onClick={() => {
                                      // setFieldValue('depending_curr', item.depending_curr)
                                      // setFieldValue('dis_currency', item.dis_currency)
                                      setFieldValue('currency_id_amount', item.amount)
                                    }}
                                  >
                                    {item.value}
                                  </MenuItem>
                                ))}
                            </Select>
                            {errors.currency_id && touched.currency_id && (
                              <FormHelperText error>{String(errors.currency_id)}</FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name='currency_id_amount'
                              label='Currency Amount'
                              value={values.currency_id_amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(touched.currency_id_amount && errors.currency_id_amount)}
                            />
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                    {/* Receipt Reference */}
                    <Grid item xs={6} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          name='sup_refe'
                          label='Receipt Reference'
                          value={values.sup_refe}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.sup_refe && errors.sup_refe)}
                        />
                      </FormControl>
                    </Grid>
                    {/* prices */}
                    <Grid item xs={6} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='parent_price'>Prices</InputLabel>
                        <Select
                          id='parent_price'
                          name='parent_price'
                          label='Prices'
                          disabled={values.items.length === 1 && !edit}
                          value={values.parent_price}
                          required
                          onChange={event => {
                            handleChange(event)
                            const price_id = event.target.value

                            // set price value based on price_id in all items row if it's unit is null
                            values.items.forEach((item, index) => {
                              if (item.unit !== '' && item.list_prices.length > 0 && item.child_price === '') {
                                const price = item.list_prices.find(price => price.line_id === price_id)

                                if (price) {
                                  const priceValue = price.price

                                  setFieldValue(`items.${index}.price`, priceValue)
                                  setFieldValue(`items.${index}.total`, Number(priceValue) * Number(item.quantity))
                                } else if (price === null) {
                                  setFieldValue(`items.${index}.price`, 0)
                                  setFieldValue(`items.${index}.total`, 0)
                                } else {
                                  return
                                }
                              }
                            })
                          }}
                          onBlur={handleBlur}
                          error={errors.parent_price && touched.parent_price}
                          fullWidth
                        >
                          {data && data?.prices?.length > 0
                            ? data?.prices.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                  {item.value}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                        {errors.store && touched.store && <FormHelperText error>{String(errors.store)}</FormHelperText>}
                      </FormControl>
                      {values.items.length === 1 && !edit ? (
                        <FormHelperText error sx={{ ml: 2 }}>
                          <Typography color={'error'} variant='caption'>
                            Please add Rows to Table to show Prices
                          </Typography>
                        </FormHelperText>
                      ) : values.items.length === 0 && edit ? (
                        <FormHelperText error sx={{ ml: 2 }}>
                          <Typography color={'error'} variant='caption'>
                            Please add Rows to Table to show Prices
                          </Typography>
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <FormControl fullWidth>
                        <Attachment image={values.attachment} setFieldValue={setFieldValue} />
                      </FormControl>
                    </Grid>

                    {/* ______________________________________________________ */}
                    <Grid item xs={12} sm={12}>
                      <Divider sx={{ mb: 2 }}>
                        <Chip
                          label='Product Search Box'
                          color='primary'
                          variant='outlined'
                          sx={{
                            '& .MuiChip-label': { textTransform: transText }
                          }}
                        />
                      </Divider>
                      <FieldArray name={`items`}>
                        {({ push, remove }) => (
                          <div>
                            <CustomPurchaseTable
                              rows={values.items}
                              handleChange={handleChange}
                              values={values}
                              push={push}
                              remove={remove}
                              setFieldValue={setFieldValue}
                              edit={edit}
                            />

                            <Divider
                              sx={{
                                mb: 3
                              }}
                            />
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={6} lg={6}>
                                <FormControl fullWidth>
                                  <TextField
                                    name='total_items'
                                    label='Total Items'
                                    value={values.total_items}
                                    disabled
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.total_items && errors.total_items)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={6} lg={6}>
                                <FormControl fullWidth>
                                  <TextField
                                    label='Net Total Amount'
                                    name='net_total_amount'
                                    value={values.net_total_amount}
                                    disabled
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.net_total_amount && errors.net_total_amount)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Divider sx={{ mb: 2 }}>
                                  <Chip
                                    label='Purchase Footer Info'
                                    color='primary'
                                    variant='outlined'
                                    sx={{
                                      '& .MuiChip-label': { textTransform: transText }
                                    }}
                                  />
                                </Divider>
                              </Grid>
                              <Grid item xs={12} md={2} lg={2}>
                                <Box
                                  sx={{
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    borderRadius: '10px',
                                    backgroundColor: theme => theme.palette.background.paper
                                  }}
                                >
                                  <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    sx={{
                                      textTransform: transText,
                                      width: '100%',
                                      height: '55px'
                                    }}
                                  >
                                    {edit ? 'Update' : 'Save'}
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </div>
                        )}
                      </FieldArray>
                    </Grid>
                    {/* ______________________________________________________ */}
                  </Grid>
                  <DialogActions></DialogActions>
                </Form>
              )}
            </Formik>
          </Card>
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
      </DialogContent>
      {openForm && <FormProduct isEdit={false} open={openForm} toggle={toggle} addOpeningStock={true} />}
    </CustomDialog>
  )
}

export default AddPurchases
