import React, { Fragment, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateContactBank } from 'src/store/apps/Cheques/contactBank/getCreateContactBank'
import { Formik, Form } from 'formik'
import { createContactBank } from 'src/store/apps/Cheques/contactBank/postCreateContactBank'
import { editContactBank } from 'src/store/apps/Cheques/contactBank/postEditContactBank'
import { fetchContactBank } from 'src/store/apps/Cheques/contactBank/getContactBankSlice'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import { fetchEditContactBank } from 'src/store/apps/Cheques/contactBank/getEditContactBank'

const ContactBankAdd = ({ id, open, toggle, isEdit }) => {
  const [mainData, setMainData] = useState([])
  const [openLoading, setOpenLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    location_id: '' // dropdown menu
  })
  const [mainEditData, setMainEditData] = useState({})

  const dispatch = useDispatch()
  const data = useSelector(state => state.getCreateContactBank?.data?.value?.locations)
  const addStatus = useSelector(state => state.postCreateContactBank)
  const editStatus = useSelector(state => state.postEditContactBank)
  const editData = useSelector(state => state.getEditContactBank?.data?.value?.info[0])

  useEffect(() => {
    if (id && isEdit) {
      dispatch(fetchEditContactBank({ itemId: id }))
    }
  }, [dispatch, id, isEdit])

  useEffect(() => {
    if (editData) {
      setMainEditData(editData)
    }
  }, [editData])

  useEffect(() => {
    if (mainEditData) {
      setInitialValues({
        name: mainEditData.name || '',
        location_id: mainEditData.location_id || ''
      })
    }
  }, [mainEditData])

  useEffect(() => {
    dispatch(fetchCreateContactBank())
  }, [dispatch])

  useEffect(() => {
    if (data !== null) {
      setMainData(data)
    }
  }, [data])

  const handleSubmit = (values, { resetForm }) => {
    if (id && isEdit) {
      dispatch(editContactBank({ id, values })).then(() => {
        dispatch(fetchContactBank())
      })
    } else {
      dispatch(createContactBank({ values })).then(() => {
        dispatch(fetchContactBank())
      })
    }
    setOpenLoading(true)

    resetForm()
  }

  return (
    <Fragment>
      <Dialog open={open} onClose={toggle} fullWidth maxWidth='sm'>
        <DialogTitle>{isEdit ? 'Edit Contact Bank' : 'Add Contact Bank'} </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
            {({ isSubmitting, handleChange, handleBlur, touched, errors, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl className='mb-2' fullWidth>
                      <TextField
                        label='Name'
                        id='name'
                        name='name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth className='mb-2'>
                      <InputLabel>Location</InputLabel>
                      <Select
                        name='location_id'
                        label='Location'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location_id}
                        error={touched.location_id && Boolean(errors.location_id)}
                        helperText={touched.location_id && errors.location_id}
                      >
                        <MenuItem value=''>Select Location</MenuItem>
                        {Array.isArray(mainData) &&
                          mainData.length > 0 &&
                          mainData.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.value}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={toggle} variant='outlined' color='error' sx={{ mx: 2 }}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Please wait...' : 'Submit'}
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>

          {openLoading && (
            <LoadingAnimation
              open={openLoading}
              onClose={() => setOpenLoading(false)}
              statusType={isEdit ? editStatus : addStatus}
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default ContactBankAdd
