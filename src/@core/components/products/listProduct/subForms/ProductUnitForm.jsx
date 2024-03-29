import { useEffect, useState } from 'react'
import {
  TextField,
  FormControl,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText
} from '@mui/material'

// import { useDispatch } from 'react-redux'
import useSubmitUser from 'src/hooks/useSubmitUser'

// ** Next Imports
import { getCookie } from 'cookies-next'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { postEditUnit } from 'src/store/apps/products/units/postEditUnitSlice'
import { fetchEditUnit } from 'src/store/apps/products/units/getEditUnitSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'
import { postCreateProductUnit } from 'src/store/apps/products/listProducts/actions/postCreateProductUnitSlice'
import { fetchCreateProductUnit } from 'src/store/apps/products/listProducts/actions/getCreateProductUnitSlice'

const ProductUnitForm = ({ type, open, setOpen, itemId, setNewUnit, subUnit }) => {
  // ** State
  const [units, setUnits] = useState([])
  const [status, setStatus] = useState('')
  const [unitsEdit, setUnitsEdit] = useState({})
  const [initialValues, setInitialValues] = useState({
    name: '',
    short_name: '',
    allow_decimal: 0,
    multiple_unit: false,
    sub_qty: '',
    parent_unit: null
  })

  // ** Cookies
  const token = getCookie('token')

  // const url = getCookie('apiUrl')
  const unitData = useSelector(state => state.getCreateProductUnit?.data?.value.units)
  const dataEditInfo = useSelector(state => state.getEditUnit?.data?.value.info[0])
  const dataEditUnits = useSelector(state => state.getEditUnit?.data?.value.units)
  const statusCode = useSelector(state => state.getCreateProduct?.data?.status)

  console.log(dataEditInfo, 'info of unit to product')

  // ** Hook
  const dispatch = useDispatch()

  useEffect(() => {
    if (statusCode === 200) {
      setStatus('success')
    }
  }, [statusCode])

  useEffect(() => {
    setUnits(unitData)

    setUnitsEdit(dataEditInfo)
  }, [unitData, dataEditInfo])

  useEffect(() => {
    if (subUnit) {
      setInitialValues(prev => ({
        ...prev,
        multiple_unit: subUnit ? true : false || false
      }))
    }
  }, [subUnit])

  useEffect(() => {
    if (dataEditUnits && type === 'Edit') {
      setUnits(dataEditUnits)
    }
  }, [dataEditUnits, type])

  useEffect(() => {
    if (unitsEdit && type === 'Edit') {
      setInitialValues(prev => ({
        ...prev,
        name: unitsEdit.name || '',
        allow_decimal: unitsEdit.allow_decimal || 0,
        short_name: unitsEdit.short_name || '',
        sub_qty: unitsEdit.base_unit_multiplier || '',
        parent_unit: unitsEdit.base_unit_id || '',
        multiple_unit: unitsEdit.base_unit_id ? true : false
      }))
    }
  }, [unitsEdit, type])

  useEffect(() => {
    dispatch(fetchCreateProductUnit())
  }, [dispatch])

  useEffect(() => {
    if (type === 'Edit' && itemId) {
      dispatch(fetchEditUnit({ itemId }))
    }
  }, [dispatch, token, type, itemId])

  const { handleSubmitData } = useSubmitUser()

  // ** Validation schema
  const validationSchemaOne = Yup.object().shape({
    name: Yup.string().required(' Name is required'),
    short_name: Yup.string().required('Short name is required')
  })
  const validationSchemaTwo = Yup.object().shape({
    name: Yup.string().required(' Name is required'),
    short_name: Yup.string().required('Short name is required'),
    parent_unit: Yup.string().required('Base unit is required when create sub Unit')
  })

  // ** Render Component
  const renderComponent = () => {
    if (subUnit) {
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaTwo}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Unit Name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && !!errors.name)}
                      helperText={touched.name && !!errors.name ? String(errors.name) : null}
                      name='name'
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Short name'
                      value={values.short_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='short_name'
                      error={touched.short_name && !!errors.short_name}
                      helperText={touched.short_name && errors.short_name ? String(errors.short_name) : ''}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-standard-label'>Allow Decimal</InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-standard-label'
                      name='allow_decimal'
                      value={values.allow_decimal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Allow Decimal'
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {values.multiple_unit ? (
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4} sx={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <TextField
                          fullWidth
                          multiline
                          color='primary'
                          value={`1 ${values.name ? values.name : 'Unit'} =`}
                          disabled={true}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            multiline
                            label='Times Base Unit'
                            name='sub_qty'
                            value={values.sub_qty}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-standard-label'>Base Unit</InputLabel>
                          <Select
                            fullWidth
                            labelId='demo-simple-select-standard-label'
                            name='parent_unit'
                            value={values.parent_unit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label='Base Unit'
                            error={touched.parent_unit && !!errors.parent_unit && values.multiple_unit}
                          >
                            {/* <MenuItem value={null}>Null</MenuItem> */}
                            {!units || units.length === 0
                              ? null
                              : units.map(item => (
                                  <MenuItem value={item.id} key={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                          </Select>
                          <FormHelperText error={touched.parent_unit && !!errors.parent_unit && values.multiple_unit}>
                            {touched.parent_unit && !!errors.parent_unit && values.multiple_unit
                              ? String(errors.parent_unit)
                              : null}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, justifyContent: 'flex-end' }}>
                <Button size='large' variant='outlined' sx={{ mr: 3 }} color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Add
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )
    } else {
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaOne}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Unit Name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && !!errors.name)}
                      helperText={touched.name && !!errors.name ? String(errors.name) : null}
                      name='name'
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Short name'
                      value={values.short_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='short_name'
                      error={touched.short_name && !!errors.short_name}
                      helperText={touched.short_name && errors.short_name ? String(errors.short_name) : ''}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-standard-label'>Allow Decimal</InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-standard-label'
                      name='allow_decimal'
                      value={values.allow_decimal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Allow Decimal'
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, justifyContent: 'flex-end' }}>
                <Button size='large' variant='outlined' sx={{ mr: 3 }} color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Add
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )
    }
  }

  const handleClose = () => {
    setOpen(false)
    setInitialValues({})
  }

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values, 'Values form  add product units')
    console.log(statusCode, 'status code')
    console.log(status, 'status 👀👀🐱‍🚀')

    console.log('Add btn clicked')
    if (type === 'Add') {
      await handleSubmitData(postCreateProductUnit, fetchCreateProduct, values)
      if (!subUnit && status === 'success') {
        setTimeout(() => {
          setNewUnit(true)
        }, 2000)
      }
    } else if (type === 'Edit' && itemId) {
      handleSubmitData(postEditUnit, fetchCreateProduct, values, itemId)
    }

    setOpen(false)
    resetForm()
  }

  console.log(units, 'units')

  return (
    <Dialog
      scroll='body'
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth='md'
      aria-labelledby='unit-edit-add'
      sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 750, p: [2, 10] },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }}
      aria-describedby='unit-edit-add-description'
    >
      {/* {isLoading ? <MainLoading name={'Add'} open={isLoading} /> : null} */}
      <DialogTitle
        id='unit-edit-add'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        {type} Product Unit Information
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='unit-edit-add-description' sx={{ textAlign: 'center', mb: 7 }}>
          Unit details will receive a privacy audit.
        </DialogContentText>
        {renderComponent()}
      </DialogContent>
    </Dialog>
  )
}

export default ProductUnitForm
