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
  InputLabel
} from '@mui/material'

import * as Yup from 'yup'

import useSubmitUser from 'src/hooks/useSubmitUser'
import { Formik } from 'formik'
import UploadImage from 'src/@core/components/globalUpload/UploadImage'
import { useEffect, useState } from 'react'
import { postCreateCategory } from 'src/store/apps/products/categories/postCreateCategorySlice'
import { fetchCreateCategory } from 'src/store/apps/products/categories/getCreateCategorySlice'
import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'
import { useSelector, useDispatch } from 'react-redux'

const ProductCategoryForm = ({ subCat, open, setOpen }) => {
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [initialValues, setInitialValues] = useState({
    name: '',
    short_code: '',
    parent_id: 0,
    woocommerce_cat_id: '',
    category_type: '',
    description: '',
    slug: ''
  })

  const categoryData = useSelector(state => state.getCreateCategory?.data?.categories.categories)

  // ** Hook
  const dispatch = useDispatch()

  useEffect(() => {
    setCategories(categoryData)
  }, [categoryData])

  useEffect(() => {
    dispatch(fetchCreateCategory())
  }, [dispatch])

  const { handleSubmitData } = useSubmitUser()

  // ** Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  })

  // ** Functions
  const handleClose = () => {
    setOpen(false)
    setImage('')
    setInitialValues({})
  }

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission logic here
    console.log({ ...values, image }, 'Values form  add Category')

    console.log('Add btn clicked')

    await handleSubmitData(postCreateCategory, fetchCreateProduct, { ...values, image })
    dispatch(fetchCreateProduct())

    setImage('')
    setOpen(false)

    resetForm()
  }

  console.log('Categories', categories)

  return (
    <Dialog
      scroll='body'
      fullWidth={true}
      maxWidth='md'
      open={open}
      onClose={handleClose}
      aria-labelledby='customer-group-edit'
      sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 750, p: [2, 10] },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }}
      aria-describedby='customer-group-edit-description'
    >
      {/* {isLoading ? <MainLoading name={'Add'} open={isLoading} /> : null} */}
      <DialogTitle
        id='customer-group-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Add Category Information
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='customer-group-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Categories details will receive a privacy audit.
        </DialogContentText>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
                      label='Category Name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='name'
                      error={Boolean(touched.name && !!errors.name)}
                      helperText={touched.name && !!errors.name ? String(errors.name) : ''}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Short Code'
                      value={values.short_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='short_code'
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} lg={6} md={6} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Woocommerce Cat Id'
                      value={values.woocommerce_cat_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='woocommerce_cat_id'
                    />
                  </FormControl>
                </Grid> */}
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Category Type'
                      value={values.category_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='category_type'
                    />
                  </FormControl>
                </Grid> */}
                {/* <Grid item xs={12} lg={6} md={6} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Parent Id'
                      name='parent_id'
                      value={values.parent_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </FormControl>
                </Grid> */}
                {/* <Grid item xs={12} lg={6} md={6} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='slug'
                      name='slug'
                      value={values.slug}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  {subCat ? (
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-standard-label'>Select Parent Category </InputLabel>
                      <Select
                        fullWidth
                        labelId='demo-simple-select-standard-label'
                        name='parent_id'
                        value={values.parent_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Select Parent Category'
                      >
                        <MenuItem value={0}>Null</MenuItem>
                        {categories?.length === 0
                          ? null
                          : categories?.map(item => (
                              <MenuItem value={item.id} key={item.id}>
                                {item.value}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <UploadImage image={image} setImage={setImage} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      rows={4}
                      multiline
                      variant='filled'
                      label='Description'
                      name='description'
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id='textarea-filled-static'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-end' }}>
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
      </DialogContent>
    </Dialog>
  )
}

export default ProductCategoryForm
