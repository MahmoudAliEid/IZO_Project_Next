import {
  TextField,
  FormControl,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  Button,
  Box,
  Grid
} from '@mui/material'

// ** Custom Hooks
import useSubmitUser from 'src/hooks/useSubmitUser'

// ** Next Imports
import { getCookie } from 'cookies-next'

import { Formik } from 'formik'

import * as yup from 'yup'

import { useEffect, useState } from 'react'
import { postAddSPGroup } from 'src/store/apps/products/salePriceGroup/postCreateSPGroupSlice'
import { postEditSPGroup } from 'src/store/apps/products/salePriceGroup/postEditSPGroupSlice'
import { fetchSPGroup } from 'src/store/apps/products/salePriceGroup/getSPGroupSlice'
import { fetchEditSPGroup } from 'src/store/apps/products/salePriceGroup/getEditSPGroupSlice'
import { fetchCreateSPGroup } from 'src/store/apps/products/salePriceGroup/getCreateSPGroupSlice'
import { useSelector, useDispatch } from 'react-redux'
import LoadingAnimation from '../../utilities/loadingComp'

const SalePriceGroup = ({ type, open, setOpen, itemId }) => {
  // ** State

  // const [editInfo, setEditInfo] = useState({})
  // const [create, setCreate] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: ''
  })

  // ** Validation Schema
  const validationSchema = yup.object({
    name: yup.string().required('Required'),
    description: yup.string()
  })

  // ** Cookies
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  // ** Selector
  // const createData = useSelector(state => state.getCreateSPGroup?.data?.value)
  const dataEditInfo = useSelector(state => state.getEditSPGroup?.data?.value.info[0])
  const saveStatus = useSelector(state => state.postCreateSPGroup)
  const editStatus = useSelector(state => state.postEditSPGroup)

  // ** Hook
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // setCreate(createData)
  // }, [createData])

  // useEffect(() => {
  //   if (dataEditInfo && type === 'Edit') {
  //     // setEditInfo(dataEditInfo)
  //   }
  // }, [dataEditInfo, type])

  useEffect(() => {
    if (dataEditInfo && type === 'Edit') {
      setInitialValues(prev => ({
        ...prev,
        name: dataEditInfo.name || '',
        description: dataEditInfo.description || ''
      }))
    }
  }, [dataEditInfo, type])

  useEffect(() => {
    dispatch(fetchCreateSPGroup(token, url))
  }, [dispatch, token, url])

  useEffect(() => {
    if (type === 'Edit' && itemId) {
      dispatch(fetchEditSPGroup({ itemId }))
    }
  }, [dispatch, token, type, itemId])

  // const dispatch = useDispatch()
  const { handleSubmitData } = useSubmitUser()

  const handleClose = () => {
    setOpen(false)

    setInitialValues({})
  }

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values, 'Values form  add Sale Price Group')

    console.log('Add btn clicked')
    if (type === 'Add') {
      handleSubmitData(postAddSPGroup, fetchSPGroup, values)
    } else if (type === 'Edit' && itemId) {
      handleSubmitData(postEditSPGroup, fetchSPGroup, values, itemId)
    }

    // setOpen(false)
    setOpenLoading(true)
    resetForm()
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
          {type} Sale Price Group Information
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText
            variant='body2'
            id='salePriceGroup-edit-add-description'
            sx={{ textAlign: 'center', mb: 7 }}
          >
            Sale Price Group details will receive a privacy audit.
          </DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label=' Name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='name'
                        required
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name ? String(errors.name) : ''}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label='Description'
                        rows={4}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='description'
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description ? String(errors.description) : ''}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, justifyContent: 'flex-end' }}>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleClose} sx={{ mr: 3 }}>
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
      <LoadingAnimation
        open={openLoading}
        onClose={() => setOpenLoading(false)}
        statusType={type === 'Edit' ? editStatus : saveStatus}
      />
    </>
  )
}

export default SalePriceGroup
