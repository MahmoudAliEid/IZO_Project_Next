
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { storeBrand } from 'src/store/apps/products/brands/storebrandSlice'
import { fetchAllBrands } from 'src/store/apps/products/brands/getallbrandsSlice'
import { fetchBrandDetails } from 'src/store/apps/products/brands/getbrandDetailsSlice'
import { updateBrand } from 'src/store/apps/products/brands/updatebrandSlice'
import AddNewBrandImage from './AddNewBrandImage'
import UploadImage from 'src/@core/components/globalUpload/UploadImage'
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const DialogAddBrands = ({ open, toggle, isEdit, itemId }: any) => {

  // console.log(itemId, "itemId for edit");

  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const [initialValues, setInitialValues] = useState<any>({
    name: '',
    description: '',
    use_for_repair: 0,

  })

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),
    use_for_repair: Yup.string()
      .required('Use for repair is required'),
    image: Yup.string()
      .required('Image is required'),
  });

  useEffect(() => {
    if (isEdit && itemId !== undefined) {
      dispatch(fetchBrandDetails(itemId));

    }
  }, [isEdit])

  const brandDetailsResponse = useSelector((state: { getbrandDetailsSlice: { data: any } }) => state.getbrandDetailsSlice.brand);

  useEffect(() => {
    if (brandDetailsResponse.status === 200 && brandDetailsResponse.value && brandDetailsResponse.value.info && isEdit) {
      console.log(brandDetailsResponse.value, "brandDetailsResponse for edit");

      setInitialValues({
        name: brandDetailsResponse.value && brandDetailsResponse.value.info.name,
        description: brandDetailsResponse.value && brandDetailsResponse.value.info.description,
        use_for_repair: brandDetailsResponse.value && brandDetailsResponse.value.info.use_for_repair,

        // image: brandDetailsResponse.value && brandDetailsResponse.value.info.image_url,
      })
      setImage(brandDetailsResponse.value && brandDetailsResponse.value.info.image_url)
    }
  }, [brandDetailsResponse, isEdit])


  const storeBrandResponse = useSelector((state: { storebrandSlice: { data: any } }) => state.storebrandSlice.data);

  useEffect(() => {
    if (storeBrandResponse.status === 200) {
      dispatch(fetchAllBrands());
    }
  }
    , [storeBrandResponse])

  const handleSubmitForm = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    console.log(values, "values for submit");
    if (isEdit && itemId) {
      dispatch(updateBrand({ updateData: { ...values, image }, id: itemId }))
    }
    else {

      dispatch(storeBrand({ ...values, image }));
    }
    resetForm();

  }


  const updateBrandResponse = useSelector((state: { updatebrandSlice: { data: any } }) => state.updatebrandSlice.data);

  useEffect(() => {
    if (updateBrandResponse.status === 200) {
      // console.log(updateBrandResponse, "updateBrandResponse for edit 🔥🔥");

      dispatch(fetchAllBrands());
    }
  }
    , [updateBrandResponse])



  console.log(image[0], "image form initialVales")

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='md'
        fullWidth={true}
      >
        <DialogTitle id='alert-dialog-title'>{isEdit ? `Edit Brand` : `Add New Brand`}</DialogTitle>
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
                <div style={{ marginBottom: '1rem' }}>

                  <FormControlLabel
                    control={
                      <Checkbox
                        name='use_for_repair'
                        checked={values.use_for_repair}
                        onChange={
                          (e) => {
                            setFieldValue('use_for_repair', e.target.checked === true ? 1 : 0)
                          }
                        }
                        onBlur={handleBlur}
                      />
                    }
                    label='Use for Repair'
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <UploadImage
                    image={image}
                    setImage={setImage}
                  />
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

export default DialogAddBrands
