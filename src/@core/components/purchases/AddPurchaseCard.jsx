// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'

// ** MUI
import { FormControl, FormHelperText, Button } from '@mui/material'
// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
// import Repeater from 'src/@core/components/repeater'
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// import FormProduct from 'src/@core/components/products/listProduct/forms/FormProduct'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
// import Attachment from 'src/pages/apps/vouchers/receipt-voucher/Attachment'

// ** Third Party Components
import { Formik, Form, FieldArray, useField } from 'formik'
import * as Yup from 'yup'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreatePurchase } from 'src/store/apps/purchases/getCreatePurchase'
import { createOpeningStock } from 'src/store/apps/products/addOpeningStock/postCreateOpeningStock'
import { editOpeningStock } from 'src/store/apps/products/addOpeningStock/postEditOpeningStock'
import { fetchPurchases } from 'src/store/apps/purchases/getPurchasesSlice'
import CustomPurchaseTable from './CustomPurchaseTable'
import SearchSupplier from './SearchSupplier'

import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import TotalSection from './TotalSection'
import AddExpense from './AddExpense'

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

// const MUITableCell = styled(TableCell)(({ theme }) => ({
//   borderBottom: 0,
//   paddingLeft: '0 !important',
//   paddingRight: '0 !important',
//   paddingTop: `${theme.spacing(1)} !important`,
//   paddingBottom: `${theme.spacing(1)} !important`
// }))

// const CalcWrapper = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   '&:not(:last-of-type)': {
//     marginBottom: theme.spacing(2)
//   }
// }))

// const RepeatingContent = styled(Grid)(({ theme }) => ({
//   paddingRight: 0,
//   display: 'flex',
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   border: `1px solid ${theme.palette.divider}`,
//   '& .col-title': {
//     top: '-1.85rem',
//     position: 'absolute',
//     color: theme.palette.text.secondary
//   },
//   [theme.breakpoints.down('lg')]: {
//     '& .col-title': {
//       top: '0',
//       position: 'relative'
//     }
//   }
// }))

// const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
//   paddingTop: theme.spacing(12),
//   paddingBottom: theme.spacing(10),
//   '& .repeater-wrapper + .repeater-wrapper': {
//     marginTop: theme.spacing(12)
//   }
// }))

// const InvoiceAction = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-start',
//   padding: theme.spacing(2, 1),
//   borderLeft: `1px solid ${theme.palette.divider}`
// }))

// const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
//   color: theme.palette.success.main,
//   backgroundColor: 'transparent !important',
//   '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
// }))

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddPurchaseCard = () => {
  // ** State
  const [data, setData] = useState()
  // const [openForm, setOpenForm] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [searchSupplier, setSearchSupplier] = useState(null)
  const [addExpense, setAddExpense] = useState(false)
  const [fieldCharge, setFieldCharge] = useState('')
  const [initialValues, setInitialValues] = useState({
    total_items: 0,
    sub_total: 0,
    search_product: '',
    search_supplier: '',
    business_info: null,
    parent_price: null,
    discount: 0,
    discount_type: '',
    discount_amount: 0,
    discount_amount_curr: 0,
    discount_amount_value: 0,
    sub_total_curr: 0,
    tax_amount: '',
    tax: 0,
    tax_curr: 0,
    tax_value: 0,
    tax_final: 0,
    final_total: 0,
    final_total_curr: 0,
    final_additional_cost: 0,
    final_additional_supplier: 0,
    shipping_details: '',
    contact_id: '',
    contactText: '',
    sup_refe: '',
    transaction_date: new Date(),
    due_date: new Date(tomorrowDate),
    exchange_rage: '',
    location_id: '',
    pay_term_type: '',
    pay_term_number: '',
    status: '',
    cost_center_id: '',
    store_id: '',
    currency_id: '',
    currency_id_amount: '',
    currency_symbol: '',
    additional_supplier_charges: 0,
    additional_cost_charges: 0,
    project_no: '',
    depending_curr: '', // on  if currency_id selected
    dis_currency: '', //   if currency_id selected
    dis_type: '',
    attachment: [],
    items: [
      // {
      //   id: -1,
      //   name: 'Mahmoud',
      //   description: '',
      //   quantity: 1,
      //   unit: '',
      //   unit_price_before_dis: 0,
      //   unit_price_before_dis_include_vat: 0,
      //   list_prices: [],
      //   all_unit: [],
      //   child_price: '',
      //   unit_price_after_dis: 0,
      //   unit_price_after_dis_include_vat: 0,
      //   amount_discount: 0,
      //   percentage_discount: 0,
      //   unit_price_after_dis_curr: 0,
      //   unit_price_before_dis_curr: 0,
      //   total: 0,
      //   total_currency: 0,
      //   mfg_date: '',
      //   unit_quantity: 0
      // }
    ],
    expense: [],
    expense_total_amount: 0,
    expense_total: 0,
    expense_total_vat: 0,
    expense_total_amount_curr: 0,
    expense_total_curr: 0,
    expense_total_vat_curr: 0,
    expense_attachment: []
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
  // const editStore = useSelector(state => state.getEditOpeningStock?.data?.value)
  const editStatus = useSelector(state => state.postEditOpeningStock)

  const dataOfLastSupplier = useSelector(state => state.getLastSupplierAdded?.data?.value)

  // ** Get Cookies
  const transText = getCookie('fontStyle')
  const token = getCookie('token')
  const userName = getCookie('userName')
  const decimalFormate = getCookie('DecimalFormat')

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

  // ** Trigger last supplier added
  useEffect(() => {
    if (dataOfLastSupplier) {
      setInitialValues(prev => {
        return {
          ...prev,
          business_info: {
            name: dataOfLastSupplier?.name,
            businessName: dataOfLastSupplier?.businessName,
            contactNumber: dataOfLastSupplier?.contactNumber,
            mobile: dataOfLastSupplier?.mobile,
            tax_number: dataOfLastSupplier?.tax_number,
            email: dataOfLastSupplier?.email,
            balance: dataOfLastSupplier?.balance
          }
        }
      })
    }
  }, [dataOfLastSupplier])

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

  const handleGlobalPriceChange = (event, setFieldValue, values) => {
    const price_id = event.target.value

    // set price value based on price_id in all items row if it's unit is null
    values.items.forEach((item, index) => {
      if (item.unit !== '' && item.list_prices.length > 0 && item.child_price === '') {
        const price = item.list_prices.find(price => price.line_id === price_id)

        if (price) {
          const priceValue = Number(price.price)
          const discountAmount = Number(item.amount_discount)
          const tax = Number(values.tax_value)
          const unitPriceAfterDis = Number(priceValue) - Number(discountAmount)
          const vatValueBefore = Number(priceValue) * Number(tax)
          const vatValueAfter = Number(unitPriceAfterDis) * Number(tax)
          const unitPriceAfterDisInCludeVat = Number(unitPriceAfterDis) + Number(vatValueAfter)
          const unitPriceBeforeDisInCludeVat = Number(priceValue) + Number(vatValueBefore)
          const unitPriceBeforeDisCurr = Number(priceValue) / Number(values.currency_id_amount)
          const unitPriceAfterDisCurr = Number(unitPriceBeforeDisCurr) - Number(discountAmount)

          setFieldValue(`items.${index}.unit_price_before_dis`, priceValue.toFixed(decimalFormate))
          setFieldValue(`items.${index}.unit_price_after_dis`, unitPriceAfterDis.toFixed(decimalFormate))
          setFieldValue(
            `items.${index}.unit_price_before_dis_include_vat`,
            unitPriceBeforeDisInCludeVat.toFixed(decimalFormate)
          )
          setFieldValue(
            `items.${index}.unit_price_after_dis_include_vat`,
            unitPriceAfterDisInCludeVat.toFixed(decimalFormate)
          )
          setFieldValue(`items.${index}.unit_price_before_dis_curr`, unitPriceBeforeDisCurr.toFixed(decimalFormate))
          setFieldValue(`items.${index}.unit_price_after_dis_curr`, unitPriceAfterDisCurr.toFixed(decimalFormate))
          setFieldValue(
            `items.${index}.total`,
            (Number(item.quantity) * unitPriceAfterDisInCludeVat).toFixed(decimalFormate)
          )
          setFieldValue(
            `items.${index}.total_currency`,
            (Number(item.quantity) * unitPriceAfterDisCurr).toFixed(decimalFormate)
          )
        } else if (price === null) {
          setFieldValue(`items.${index}.unit_price_before_dis`, 0)
          setFieldValue(`items.${index}.unit_price_after_dis`, 0)
          setFieldValue(`items.${index}.unit_price_before_dis_include_vat`, 0)
          setFieldValue(`items.${index}.unit_price_after_dis_include_vat`, 0)
          setFieldValue(`items.${index}.unit_price_before_dis_curr`, 0)
          setFieldValue(`items.${index}.unit_price_after_dis_curr`, 0)
          setFieldValue(`items.${index}.total`, 0)
          setFieldValue(`items.${index}.total_currency`, 0)
        } else {
          return
        }
      }
    })
  }

  // ** Hook
  // const theme = useTheme()

  return (
    <Card>
      {openLoading && (
        <LoadingAnimation
          open={openLoading}
          onClose={() => setOpenLoading(false)}
          statusType={edit ? editStatus : createStatus}
        />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleBlur, handleChange, errors, touched, setFieldValue }) => (
          <Form>
            <CardContent>
              <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                <Grid item xl={12} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant='h5'
                        sx={{
                          ml: 2,
                          lineHeight: 1,
                          fontWeight: 700,
                          letterSpacing: '-0.45px',
                          textTransform: 'uppercase',
                          fontSize: '1.75rem !important'
                        }}
                      >
                        {themeConfig.templateName}
                      </Typography>
                    </Box>
                    <div>
                      <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
                        IZO CLOUD - V4.0 | Powered By AGT | +971-56-777-9250 | +971-4-23-55-919
                      </Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            <Divider
              sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
            />
            <CardContent>
              <Grid container sx={{ px: { sm: 4, xs: 0 } }}>
                <Grid item xl={6} xs={12}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        flexDirection: { sm: 'row', xs: 'column' },
                        alignItems: { sm: 'center', xs: 'flex-start' }
                      }}
                    >
                      <Typography variant='h5' sx={{ mr: 2, mb: { sm: 0, xs: 3 }, width: '105px' }}>
                        Purchase
                      </Typography>
                      <TextField
                        size='small'
                        value={data?.invoice_number}
                        sx={{ width: '150px' }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>#</InputAdornment>
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        mt: { sm: 0, xs: 2 },
                        flexDirection: { sm: 'row', xs: 'column' },
                        alignItems: { sm: 'center', xs: 'flex-start' }
                      }}
                    >
                      <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                        Date Issued:
                      </Typography>
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
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        mt: { sm: 0, xs: 2 },
                        flexDirection: { sm: 'row', xs: 'column' },
                        alignItems: { sm: 'center', xs: 'flex-start' }
                      }}
                    >
                      <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                        Date Due:
                      </Typography>
                      <DatePicker
                        name='due_date'
                        selected={values.due_date}
                        popperPlacement={popperPlacement}
                        onChange={date => {
                          setFieldValue('due_date', date)
                        }}
                        dateFormat={dateFormat}
                        customInput={
                          <CustomInput
                            fullWidth
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
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            <Divider
              sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
            />

            <CardContent>
              <Grid container sx={{ px: { sm: 4, xs: 0 } }} spacing={3}>
                <Grid item xs={12} md={6} sm={12} sx={{ mb: { lg: 0, xs: 6 } }}>
                  <Typography sx={{ mb: 4, fontWeight: 500 }}>Purchase From:</Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <SearchSupplier
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          searchSupplier={searchSupplier}
                          setSearchSupplier={setSearchSupplier}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      {values.business_info !== null && values.business_info !== undefined ? (
                        <div>
                          {values.business_info.businessName ? (
                            <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                              {values.business_info.businessName}
                            </Typography>
                          ) : null}
                          {values.business_info.contactNumber ? (
                            <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                              {values.business_info.contactNumber}
                            </Typography>
                          ) : null}
                          {values.business_info.mobile ? (
                            <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                              {values.business_info.mobile}
                            </Typography>
                          ) : null}
                          {values.business_info.tax_number ? (
                            <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                              {values.business_info.tax_number}
                            </Typography>
                          ) : null}
                          {values.business_info.email ? (
                            <Typography sx={{ mb: 1, color: 'text.secondary' }}>
                              {values.business_info.email}
                            </Typography>
                          ) : null}
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ mb: { lg: 0, xs: 6 } }}>
                  <Typography sx={{ mb: 6, fontWeight: 500 }}>Salesman: {userName}</Typography>

                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    {/* prices */}
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='parent_price'>Prices</InputLabel>
                        <Select
                          id='parent_price'
                          name='parent_price'
                          label='Prices'
                          disabled={values.items.length === 0}
                          value={values.parent_price}
                          required
                          onChange={event => {
                            handleChange(event)
                            handleGlobalPriceChange(event, setFieldValue, values)
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
                      {values.items.length === 0 ? (
                        <FormHelperText error sx={{ ml: 2 }}>
                          <Typography color={'error'} variant='caption'>
                            Please add Rows to Table to show Prices
                          </Typography>
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    {/* currency */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='currency_id'>Currency</InputLabel>
                        <Select
                          id='currency_id'
                          name='currency_id'
                          label='Currency'
                          value={values.currency_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={values.items.length === 0}
                          error={Boolean(touched.currency_id && errors.currency_id)}
                          fullWidth
                        >
                          <MenuItem
                            value=''
                            onClick={() => {
                              setFieldValue('currency_id_amount', '')

                              values.items.map((row, index) => {
                                const unitPriceBeforeDis = Number(row.unit_price_before_dis) // 100
                                const discountAmount = Number(row.amount_discount) // 10
                                const unitPriceAfterDis = unitPriceBeforeDis - discountAmount // 100 - 10 = 90
                                const unitPriceAfterDisIncludeVat =
                                  unitPriceAfterDis + unitPriceAfterDis * Number(values.tax_value) // 90 + 90 * 0.05 = 94.5

                                const total = Number(row.quantity) * unitPriceAfterDisIncludeVat // 1 * 94.5 = 94.5

                                const discountPercentage = (discountAmount * 100) / unitPriceBeforeDis // 10 * 100 / 100 = 10

                                setFieldValue(
                                  `items.${index}.percentage_discount`,
                                  discountPercentage.toFixed(decimalFormate)
                                )
                                setFieldValue(
                                  `items.${index}.unit_price_after_dis`,
                                  unitPriceAfterDis.toFixed(decimalFormate)
                                )
                                setFieldValue(`items.${index}.total`, total.toFixed(decimalFormate))
                                setFieldValue(
                                  `items.${index}.unit_price_after_dis_include_vat`,
                                  unitPriceAfterDisIncludeVat.toFixed(decimalFormate)
                                )
                              })
                            }}
                          >
                            <em>Please Select</em>
                          </MenuItem>
                          {data &&
                            data.currencies.length > 0 &&
                            data.currencies.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.id}
                                onClick={() => {
                                  setFieldValue('currency_symbol', item.symbol)
                                  if (item.amount !== null && item.amount !== undefined && item.amount !== '') {
                                    setFieldValue('currency_id_amount', item.amount)
                                  }

                                  if (item.amount !== null && item.amount !== undefined && item.amount !== '') {
                                    values.items.map(row => {
                                      const unitPriceBeforeDis = Number(row.unit_price_before_dis) // 100
                                      const discountAmount = Number(row.amount_discount) // 10
                                      const unitPriceBeforeDisCurr = unitPriceBeforeDis / Number(item.amount) // 100 / 3.67 = 27.322
                                      const unitPriceAfterDisCurr = unitPriceBeforeDisCurr - Number(discountAmount) //  27.322 - 10 = 17.322
                                      const totalCurrency = Number(row.quantity) * unitPriceAfterDisCurr // 1 * 17.322 = 17.322

                                      const unitPriceAfterDis = unitPriceAfterDisCurr * Number(item.amount) // 17.322 * 3.67 = 63.5
                                      const unitPriceAfterDisIncludeVat =
                                        unitPriceAfterDis + unitPriceAfterDis * Number(values.tax_value) // 63.5 + 63.5 * 0.05 = 66.675

                                      const total = Number(row.quantity) * unitPriceAfterDisIncludeVat // 1 * 66.675 = 66.675

                                      const discountPercentage = (Number(discountAmount) * 100) / unitPriceBeforeDisCurr // 10 * 100 / 27.322 = 36.6

                                      setFieldValue(
                                        `items.${index}.percentage_discount`,
                                        discountPercentage.toFixed(decimalFormate)
                                      )

                                      setFieldValue(
                                        `items.${index}.unit_price_after_dis_curr`,
                                        unitPriceAfterDisCurr.toFixed(decimalFormate)
                                      )
                                      setFieldValue(
                                        `items.${index}.total_currency`,
                                        totalCurrency.toFixed(decimalFormate)
                                      )
                                      setFieldValue(
                                        `items.${index}.unit_price_before_dis_curr`,
                                        unitPriceBeforeDisCurr.toFixed(decimalFormate)
                                      )
                                      setFieldValue(`items.${index}.total`, total.toFixed(decimalFormate))
                                      setFieldValue(
                                        `items.${index}.unit_price_after_dis`,
                                        unitPriceAfterDis.toFixed(decimalFormate)
                                      )
                                      setFieldValue(
                                        `items.${index}.unit_price_after_dis_include_vat`,
                                        unitPriceAfterDisIncludeVat.toFixed(decimalFormate)
                                      )
                                    })
                                  }
                                }}
                              >
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {values.items.length === 0 ? (
                          <FormHelperText error sx={{ ml: 2 }}>
                            <Typography color={'error'} variant='caption'>
                              Please add Rows to Table to show Currency
                            </Typography>
                          </FormHelperText>
                        ) : null}
                        {errors.currency_id && touched.currency_id && (
                          <FormHelperText error>{String(errors.currency_id)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='currency_id_amount'
                          label='Currency Amount'
                          value={values.currency_id_amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled
                          error={Boolean(touched.currency_id_amount && errors.currency_id_amount)}
                        />
                      </FormControl>
                    </Grid>
                    {/* Receipt Reference */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    {/* cost center */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>

            <Divider
              sx={{ mt: theme => `${theme.spacing(3.5)} !important`, mb: theme => `${theme.spacing(2.5)} !important` }}
            />

            <CardContent>
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
                            label='Sub Total'
                            name='sub_total'
                            value={values.sub_total}
                            disabled
                            onChange={() => {
                              const SubTotal = values.items.reduce((acc, item) => {
                                return acc + Number(item.quantity) * Number(item.unit_price_after_dis)
                              }, 0)
                              setFieldValue('sub_total', SubTotal.toFixed(decimalFormate))
                            }}
                            onBlur={handleBlur}
                            error={Boolean(touched.sub_total && errors.sub_total)}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12}></Grid>
                      {/* <Grid item xs={12} md={2} lg={2}>
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
                      </Grid> */}
                    </Grid>
                  </div>
                )}
              </FieldArray>
            </CardContent>

            <Divider sx={{ mt: '0 !important', mb: theme => `${theme.spacing(2.5)} !important` }} />
            {/* Footer Section */}
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} sx={{ order: { sm: 1, xs: 2 } }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='discount_type'>Discount Type</InputLabel>
                        <Select
                          id='discount_type'
                          name='discount_type'
                          label='Discount Type'
                          value={values.discount_type}
                          onChange={event => {
                            handleChange(event)

                            const discount_type = event.target.value

                            const discountAmount = Number(values.discount_amount)

                            if (values.currency_id) {
                              if (discount_type === 'percentage') {
                                const disAmount = (values.sub_total_curr * Number(discountAmount)) / 100
                                const currencyAmount = Number(values.currency_id_amount)

                                setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))
                                setFieldValue(
                                  'discount_amount_value',
                                  (disAmount * currencyAmount).toFixed(decimalFormate)
                                )
                              } else if (discount_type === 'fixed_after_vat') {
                                const disAmount = (100 * Number(discountAmount)) / (100 + Number(values.tax_amount)) // 100 * 10 / 100 + 5 = 9.52

                                setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))

                                setFieldValue(
                                  `discount_amount_value`,
                                  (disAmount * values.currency_id_amount).toFixed(decimalFormate)
                                )
                              } else if (discount_type === 'fixed_before_vat') {
                                setFieldValue('discount_amount_curr', Number(discountAmount).toFixed(decimalFormate))
                                setFieldValue(
                                  `discount_amount_value`,
                                  (discountAmount * values.currency_id_amount).toFixed(decimalFormate)
                                )
                              }
                            } else {
                              if (discount_type === 'percentage') {
                                const disAmount = (values.sub_total * Number(discountAmount)) / 100

                                setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
                              } else if (discount_type === 'fixed_after_vat') {
                                const disAmount =
                                  (100 * Number(discountAmount)) / 100 + Number(values.values.tax_amount)

                                setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
                              } else if (discount_type === 'fixed_before_vat') {
                                setFieldValue('discount_amount_value', Number(discountAmount).toFixed(decimalFormate))
                              }
                            }
                          }}
                          onBlur={handleBlur}
                          error={Boolean(touched.discount_type && errors.discount_type)}
                          fullWidth
                        >
                          {data &&
                            data.discount.length > 0 &&
                            data.discount.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.discount && touched.discount && (
                          <FormHelperText error>{String(errors.discount)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          name='discount_amount'
                          label='Discount Amount'
                          disabled={values.discount_type === '' || values.discount_type === null}
                          value={values.discount_amount}
                          onChange={event => {
                            handleChange(event)
                            const discount_type = values.discount_type
                            const discountAmount = Number(event.target.value)

                            if (values.currency_id) {
                              if (discount_type === 'percentage') {
                                const disAmount = (values.sub_total_curr * Number(discountAmount)) / 100
                                const currencyAmount = Number(values.currency_id_amount)

                                setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))
                                setFieldValue(
                                  'discount_amount_value',
                                  (disAmount * currencyAmount).toFixed(decimalFormate)
                                )
                              } else if (discount_type === 'fixed_after_vat') {
                                const disAmount = (100 * Number(discountAmount)) / 100 + Number(values.tax_amount)

                                setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))

                                setFieldValue(
                                  `discount_amount_value`,
                                  (disAmount * values.currency_id_amount).toFixed(decimalFormate)
                                )
                              } else if (discount_type === 'fixed_before_vat') {
                                setFieldValue('discount_amount_curr', Number(discountAmount).toFixed(decimalFormate))
                                setFieldValue(
                                  `discount_amount_value`,
                                  (discountAmount * values.currency_id_amount).toFixed(decimalFormate)
                                )
                              }
                            } else {
                              if (discount_type === 'percentage') {
                                const disAmount = (values.sub_total * Number(discountAmount)) / 100

                                setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
                              } else if (discount_type === 'fixed_after_vat') {
                                const disAmount = (100 * Number(discountAmount)) / 100 + Number(values.tax_amount)

                                setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
                              } else if (discount_type === 'fixed_before_vat') {
                                setFieldValue('discount_amount_value', Number(discountAmount).toFixed(decimalFormate))
                              }
                            }
                          }}
                          onBlur={handleBlur}
                          error={Boolean(touched.discount_amount && errors.discount_amount)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='tax_amount'>Tax Amount</InputLabel>
                        <Select
                          id='tax_amount'
                          name='tax_amount'
                          label='Tax Amount'
                          value={values.tax_amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.tax_amount && errors.tax_amount)}
                          fullWidth
                        >
                          <MenuItem value=''>
                            <em>Please Select</em>
                          </MenuItem>
                          {data &&
                            data.taxes.length > 0 &&
                            data.taxes.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.id}
                                onClick={() => {
                                  const taxValue = Number(item.amount) / 100
                                  setFieldValue('tax_value', Number(taxValue))
                                  setFieldValue('tax', Number(item.amount))
                                  // map over items and add tax value for input contain tax
                                  values.items.forEach((item, index) => {
                                    const taxValueBeforeDis = Number(item.unit_price_before_dis) * Number(taxValue)
                                    const taxValueAfterDis = Number(item.unit_price_after_dis) * Number(taxValue)
                                    const unitPriceAfterDisInCludeVat = (
                                      Number(item.unit_price_after_dis) + taxValueAfterDis
                                    ).toFixed(decimalFormate)

                                    setFieldValue(
                                      `items.${index}.unit_price_before_dis_include_vat`,
                                      (Number(item.unit_price_before_dis) + taxValueBeforeDis).toFixed(decimalFormate)
                                    )
                                    setFieldValue(
                                      `items.${index}.unit_price_after_dis_include_vat`,
                                      unitPriceAfterDisInCludeVat
                                    )
                                    setFieldValue(
                                      `items.${index}.total`,
                                      (Number(item.quantity) * unitPriceAfterDisInCludeVat).toFixed(decimalFormate)
                                    )
                                  })
                                }}
                              >
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.tax_amount && touched.tax_amount && (
                          <FormHelperText error>{String(errors.tax_amount)}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          label='Shipping Details'
                          name='shipping_details'
                          value={values.shipping_details}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Grid container spacing={2}>
                          <Grid item xs={9} md={10} lg={10}>
                            <FormControl fullWidth>
                              <TextField
                                id='additional_supplier_charges'
                                name='additional_supplier_charges'
                                label='Additional Supplier charges'
                                value={values.additional_supplier_charges}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                                error={Boolean(
                                  touched.additional_supplier_charges && errors.additional_supplier_charges
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={3} md={2} lg={2}>
                            <Button
                              onClick={() => {
                                setAddExpense(true)
                                setFieldCharge('additional_supplier_charges')
                              }}
                              sx={{ textAlign: 'center', height: '100%', width: '100%' }}
                              color='primary'
                              variant='contained'
                            >
                              <AddCircleOutline />
                            </Button>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Grid container spacing={2}>
                          <Grid item xs={9} md={10} lg={10}>
                            <FormControl fullWidth>
                              <TextField
                                id='additional-cost-charges'
                                label='Additional Cost charges'
                                name='additional_cost_charges'
                                value={values.additional_cost_charges}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                                error={Boolean(touched.additional_cost_charges && errors.additional_cost_charges)}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={3} md={2} lg={2}>
                            <Button
                              onClick={() => {
                                setAddExpense(true)
                                setFieldCharge('additional_cost_charges')
                              }}
                              sx={{ textAlign: 'center', height: '100%', width: '100%' }}
                              color='primary'
                              variant='contained'
                            >
                              <AddCircleOutline />
                            </Button>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <TotalSection values={values} setFieldValue={setFieldValue} />
              </Grid>
              <Divider
                sx={{ mt: theme => `${theme.spacing(10)} !important`, mb: theme => `${theme.spacing(1)} !important` }}
              />
            </CardContent>

            <CardContent>
              <InputLabel
                htmlFor='invoice-note'
                sx={{ mb: 2, fontSize: '.75rem', fontWeight: 600, color: 'text.primary', textTransform: 'uppercase' }}
              >
                Note:
              </InputLabel>
              <TextField rows={2} fullWidth multiline id='invoice-note' placeholder='Thank You!' />
            </CardContent>
            {addExpense && (
              <AddExpense
                data={data}
                open={addExpense}
                setFieldValue={setFieldValue}
                fieldCharge={fieldCharge}
                handleChange={handleChange}
                values={values}
                toggle={() => setAddExpense(!addExpense)}
              />
            )}
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default AddPurchaseCard
