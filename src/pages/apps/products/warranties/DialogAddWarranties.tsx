
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// ** Store & Actions
import { storeWarranty } from 'src/store/apps/products/warranties/storeWarrantiesSlice'
import { getAllWarranties } from 'src/store/apps/products/warranties/getallWarrantiesSlice'
import { getWarrantyDetails } from 'src/store/apps/products/warranties/getAllWarrantiesDetailsSlice'
import { updateWarranty } from 'src/store/apps/products/warranties/updateWarrantiesSlice'

import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormHelperText } from '@mui/material';
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import MainDone from 'src/@core/components/mainLoading/MainDone'

const DialogAddWarranties = ({ open, toggle, isEdit, itemId }: any) => {

  // console.log(itemId, "itemId for edit 🔥🔥");
  const [openLottie, setOpenLottie] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [durationType, setDurationType] = useState<any>([
    "days", "months", "years"
  ]
  )
  const [initialValues, setInitialValues] = useState<any>({
    name: '',
    description: '',
    duration: '',
    duration_type: '',
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    duration: Yup.number().required('Required'),
    duration_type: Yup.string().required('Required'),
  });

  useEffect(() => {
    if (isEdit && itemId !== undefined) {
      //@ts-ignore
      dispatch(getWarrantyDetails(itemId));

    }
  }, [isEdit, dispatch, itemId])

//@ts-ignore
  const warrantiesDetailsResponse = useSelector((state: { getAllWarrantiesDetailsSlice: { data: any } }) => state.getAllWarrantiesDetailsSlice.entity);

  useEffect(() => {
    if (warrantiesDetailsResponse.status === 200 && warrantiesDetailsResponse.value && warrantiesDetailsResponse.value.info) {
      setInitialValues({
        name: warrantiesDetailsResponse.value && warrantiesDetailsResponse.value.info[0].name,
        description: warrantiesDetailsResponse.value && warrantiesDetailsResponse.value.info[0].description,
        duration: warrantiesDetailsResponse.value && warrantiesDetailsResponse.value.info[0].duration,
        duration_type: warrantiesDetailsResponse.value && warrantiesDetailsResponse.value.info[0].duration_type,
      })
    }
  }, [warrantiesDetailsResponse, isEdit])



//@ts-ignore
  const storeWarrantiesResponse = useSelector((state: { storeWarrantiesSlice: { data: any } }) => state.storeWarrantiesSlice.entities);
  const storeWarrantiesResponseStatus = useSelector((state: { storeWarrantiesSlice: { data: any } }) => state.storeWarrantiesSlice);

  if (storeWarrantiesResponseStatus) {
    console.log(storeWarrantiesResponseStatus, "storeWarrantiesResponseStatus for edit 🔥🔥");
  }

  useEffect(() => {
    if (storeWarrantiesResponse.status === 200) {
      //@ts-ignore
      dispatch(getAllWarranties());
    }
  }
    , [storeWarrantiesResponse, dispatch])

  const handleSubmitForm = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    console.log(values, "values for submit");
    if (isEdit && itemId) {
      //@ts-ignore
      dispatch(updateWarranty({ updateData: values, id: itemId }));
    }
    else {
    //@ts-ignore
      dispatch(storeWarranty(values));

    }

    setOpenLottie(true)


    resetForm();

  }

//@ts-ignore
  const updateWarrantiesResponse = useSelector((state: { updateWarrantiesSlice: { data: any } }) => state.updateWarrantiesSlice.entity);
  const updateWarrantiesMain = useSelector((state: { updateWarrantiesSlice: { data: any } }) => state.updateWarrantiesSlice);

  useEffect(() => {
    if (updateWarrantiesResponse.status === 200) {
      // console.log(updateWarrantiesResponse, "updateWarrantiesResponse for edit 🔥🔥");
//@ts-ignore
      dispatch(getAllWarranties());

      // resetForm();
      // setInitialValues({
      //   name: '',
      //   description: '',
      //   duration: '',
      //   duration_type: '',
      // })

//@ts-ignore
      dispatch(getWarrantyDetails(itemId));
    }
  }
    , [updateWarrantiesResponse, dispatch, itemId])




  return (
    <Fragment>
      <LoadingAnimation open={openLottie}
        onClose={() => setOpenLottie(false)}
        statusType={isEdit?updateWarrantiesMain:storeWarrantiesResponseStatus} />
      <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='md'
        fullWidth={true}
      >
        <DialogTitle id='alert-dialog-title'>{isEdit ? `Edit Warranties` : `Add New Warranties`}</DialogTitle>
        <DialogContent
          sx={{
            width: '100%',
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
            enableReinitialize={true}
          >

            {({ values, errors, touched, handleBlur, handleChange, setFieldValue, resetForm }) => (
              <form>
                <div style={{ marginBottom: '1rem' }}>
                  <TextField
                    label='Name'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name ? String(errors.name) : ''} fullWidth
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <TextField
                    label='Description'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description ? String(errors.description) : ''} fullWidth
                  />
                </div>
                <div style={{
                  marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div style={{ marginBottom: '1rem', width: '100%' }}>
                    <TextField
                      label='Duration'
                      name='duration'
                      type='number'
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.duration && !!errors.duration}
                      helperText={touched.duration && errors.duration ? String(errors.duration) : ''}
                      fullWidth
                    />
                  </div>
                  <div style={{ marginBottom: '1rem', width: '100%' }}>
                    <FormControl fullWidth>
                      <InputLabel>Duration Type</InputLabel>
                      <Select
                        name='duration_type'
                        value={values.duration_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Duration Type'
                        sx={{ textTransform: 'capitalize' }}
                      >
                        <MenuItem value=''>Please Select</MenuItem>
                        {durationType.map((item: any, index: any) => (
                          <MenuItem key={index} value={item}
                            sx={{ textTransform: 'capitalize' }}
                          >{item}</MenuItem>
                        ))}

                      </Select>
                      {touched.duration_type && !!errors.duration_type && <FormHelperText>{String(errors.duration_type)}</FormHelperText>}
                    </FormControl>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>

                  <Button variant='outlined' color='secondary' onClick={toggle}>
                    Cancel
                  </Button>
                  <Button variant='contained' onClick={() => handleSubmitForm(values, { resetForm })}>
                    {isEdit ? `Update` : `Add`}
                  </Button>

                </div>
              </form>
            )}
          </Formik>
        </DialogContent>

      </Dialog>
    </Fragment>
  )
}

export default DialogAddWarranties
