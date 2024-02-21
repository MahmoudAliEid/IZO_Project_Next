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
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material'

// import { useDispatch } from 'react-redux'
import useSubmitUser from 'src/hooks/useSubmitUser'

import * as Yup from 'yup'

// ** Next Imports
import { getCookie } from 'cookies-next'

import { Formik } from 'formik'

import { useEffect, useState } from 'react'
import { postAddUnit } from 'src/store/apps/products/units/postCreateUnitSlice'
import { postEditUnit } from 'src/store/apps/products/units/postEditUnitSlice'
import { fetchUnits } from 'src/store/apps/products/units/getUnitsSlice'
import { fetchCreateUnit } from 'src/store/apps/products/units/getCreateUnitSlice'
import { fetchEditUnit } from 'src/store/apps/products/units/getEditUnitSlice'
import { useSelector, useDispatch } from 'react-redux'
import LoadingAnimation from '../../utilities/loadingComp'

const UnitsForm = ({ type, open, setOpen, itemId }) => {
  // ** State

  const [units, setUnits] = useState([])
  const [openLoading, setOpenLoading] = useState(false)
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
  const unitData = useSelector(state => state.getCreateUnit?.data?.value.units)
  const dataEditInfo = useSelector(state => state.getEditUnit?.data?.value.info[0])
  const dataEditUnits = useSelector(state => state.getEditUnit?.data?.value.units)
  const saveStatus = useSelector(state => state?.postCreateUnit)
  const editStatus = useSelector(state => state?.postEditUnit)

  // ** Hook
  const dispatch = useDispatch()

  useEffect(() => {
    setUnits(unitData)

    setUnitsEdit(dataEditInfo)
  }, [unitData, dataEditInfo])

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

  // useEffect(() => {
  //   if (statusOne === 200 && statusTwo === 200) {
  //     setIsLoading(false)
  //   }
  // }, [statusOne, statusTwo])

  useEffect(() => {
    dispatch(fetchCreateUnit(token))
  }, [dispatch, token])

  useEffect(() => {
    if (type === 'Edit' && itemId) {
      dispatch(fetchEditUnit({ itemId }))
    }
  }, [dispatch, token, type, itemId])

  // const dispatch = useDispatch()
  const { handleSubmitData } = useSubmitUser()

  const handleClose = () => {
    setOpen(false)

    setInitialValues({})
  }

  // ** Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(' Name is required'),
    short_name: Yup.string().required('Short name is required')
  })
  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values, 'Values form  add Category')

    if (type === 'Add') {
      await handleSubmitData(postAddUnit, fetchUnits, values)
    } else if (type === 'Edit' && itemId) {
      setOpenLoading(true)
      await handleSubmitData(postEditUnit, fetchUnits, values, itemId).then(() => {
        setOpenLoading(true)
      })
    }

    dispatch(fetchCreateUnit(token))

    resetForm()
    setOpenLoading(true)
    console.log('Add btn clicked')
  }

  return (
    <>
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
        <DialogTitle
          id='unit-edit-add'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          {type} Unit Information
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
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
                        name='name'
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name ? String(errors.name) : ''}
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
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormControlLabel
                        label='Add as Multiple of other Unit'
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '0.875rem',
                            color: 'text.secondary'
                          }
                        }}
                        control={
                          <Checkbox
                            checked={values.multiple_unit}
                            color='primary'
                            onChange={() => {
                              setFieldValue('multiple_unit', !values.multiple_unit)
                            }}
                          />
                        }
                      />
                    </FormControl>
                  </Grid>
                  {values.multiple_unit ? (
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={4}
                          sx={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}
                        >
                          {/* <Typography variant='body' color='primary'>
                          1 {values.name ? values.name : 'Unit'} =
                        </Typography> */}
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
                            >
                              <MenuItem value={null}>Null</MenuItem>
                              {!units || units.length === 0
                                ? null
                                : units.map(item => (
                                    <MenuItem value={item.id} key={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                            </Select>
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
                    {type}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      {openLoading && (
        <LoadingAnimation
          open={openLoading}
          onClose={() => setOpenLoading(false)}
          statusType={type === 'Edit' ? editStatus : saveStatus}
        />
      )}
    </>
  )
}

export default UnitsForm
