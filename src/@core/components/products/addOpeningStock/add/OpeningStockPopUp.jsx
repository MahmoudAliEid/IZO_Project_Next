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
  Typography
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

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateOpeningStock } from 'src/store/apps/products/addOpeningStock/getCreateOpeningStock'
import { createOpeningStock } from 'src/store/apps/products/addOpeningStock/postCreateOpeningStock'
import { editOpeningStock } from 'src/store/apps/products/addOpeningStock/postEditOpeningStock'
import CustomDragTableSearch from './CustomDragTableSearch'
import { fetchOpeningStock } from 'src/store/apps/products/addOpeningStock/getListSlice'
import CustomDialog from 'src/@core/Global/CustomDialog'

// ** Custom Input Component
const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const OpeningStockPopUp = ({ open, handleClose, edit, id }) => {
  // ** State
  const [data, setData] = useState()
  const [openForm, setOpenForm] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    store: '',
    date: '',
    total_items: 0,
    net_total_amount: 0,
    search_product: '',
    parent_price: null,
    items: [
      {
        id: -1,
        name: '',
        line_id: '',
        total: '',
        line_store: '',
        product_id: '',
        quantity: '',
        price: '',
        unit: '',
        store: '',
        all_unit: [],
        initial: true,
        unit_quantity: '',
        child_price: '',
        list_prices: [],
        product_unit_id: '',
        product_unit_qty: '',
        order_id: ''
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
  const store = useSelector(state => state.getCreateOpeningStock?.data?.value)
  const createStatus = useSelector(state => state.postCreateOpeningStock)
  const editStore = useSelector(state => state.getEditOpeningStock?.data?.value)
  const editStatus = useSelector(state => state.postEditOpeningStock)

  // ** Get Cookies
  const transText = getCookie('fontStyle')

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    store: Yup.string().required('This field is required')
  })

  // ** useEffect
  useEffect(() => {
    dispatch(fetchCreateOpeningStock()).then(response => {
      // setData(response)
      console.log(response)
    })
  }, [dispatch])

  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

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
    // dispatch(fetchCreateOpeningStock(values))
    console.log(values)

    if (edit && id) {
      dispatch(editOpeningStock({ values, id }))
        .then(() => {
          dispatch(fetchOpeningStock())
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
          dispatch(fetchOpeningStock())
        })
    }
    setSubmitting(false)

    // handleClose()
  }
  const handleAddClickOpen = () => setOpenForm(true)
  const toggle = () => {
    setOpenForm(prev => !prev)
  }
  console.log(data, 'data from opening stock')

  return (
    <CustomDialog open={open} toggle={toggle}>
      <CustomHeader
        title={edit ? 'Update Opening Stock' : 'Add Opening Stock'}
        handleClose={handleClose}
        divider={false}
      />
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
                  <Grid container spacing={3} sx={{ p: 5 }}>
                    <Grid item xs={4}>
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
                          {data &&
                            data.prices.length > 0 &&
                            data.prices.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.value}
                              </MenuItem>
                            ))}
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
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='Warehouse'>Warehouse</InputLabel>
                        <Select
                          id='Warehouse'
                          name='store'
                          label='Warehouse'
                          value={values.store}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.store && touched.store}
                          fullWidth
                        >
                          {data &&
                            data.store.length > 0 &&
                            data.store.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.store && touched.store && <FormHelperText error>{String(errors.store)}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <DatePickerWrapper>
                          <DatePicker
                            name='date'
                            selected={values.date}
                            popperPlacement={popperPlacement}
                            onChange={date => {
                              setFieldValue('date', date)
                            }}
                            dateFormat={dateFormat}
                            customInput={
                              <CustomInput
                                fullWidth
                                label=' Date'
                                sx={{ textTransform: transText }}
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
                    {/* ______________________________________________________ */}
                    <Divider />
                    <Grid item xs={12} sm={12}>
                      <FieldArray name={`items`}>
                        {({ push, remove }) => (
                          <div>
                            <CustomDragTableSearch
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
                              <Grid item xs={12} md={5} lg={5}>
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
                              <Grid item xs={12} md={5} lg={5}>
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

export default OpeningStockPopUp
