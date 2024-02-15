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

// import { useTheme } from '@mui/material/styles'

import { Formik } from 'formik'
import UploadImage from 'src/@core/components/globalUpload/UploadImage'
import { useEffect, useState } from 'react'
import { fetchCategories } from 'src/store/apps/products/categories/getCategoriesSlice'
import { postEditCategory } from 'src/store/apps/products/categories/postEditCategorySlice'
import { fetchEditCategory } from 'src/store/apps/products/categories/getEditCategorySlice'
import { fetchCategoriesTree } from 'src/store/apps/products/categories/getCategoriesTreeSlice'

import { useSelector, useDispatch } from 'react-redux'

const CategoriesEditForm = ({ type, open, setOpen, catId }) => {
  const [image, setImage] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [categories, setCategories] = useState([])
  const [initialValues, setInitialValues] = useState({
    name: '',
    short_code: '',
    parent_id: 0,
    woocommerce_cat_id: '',
    category_type: '',
    description: '',
    slug: '',
    image: image
  })

  const categoryValue = useSelector(state => state.getEditCategory?.data?.value)

  // ** Hook
  // const theme = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    if (categoryValue) {
      setInitialValues(prev => ({
        ...prev,
        name: categoryValue.info.name || '',
        short_code: categoryValue.info.short_code || '',
        parent_id: categoryValue.info.parent_id || '',
        description: categoryValue.info.description || '',
        woocommerce_cat_id: categoryValue.info.woocommerce_cat_id || '',
        category_type: categoryValue.info.category_type || '',
        slug: categoryValue.info.slug || ''
      }))
      setCategories(categoryValue)
      setImage(categoryValue.info.image_url)

      if (categoryValue.info.parent_id) {
        setCheckBox(prev => !prev)
      }
    }
  }, [categoryValue])

  useEffect(() => {
    dispatch(fetchEditCategory({ itemId: catId }))
  }, [dispatch, catId])

  // const dispatch = useDispatch()
  const { handleSubmitData } = useSubmitUser()

  const handleCheckBoxChange = () => {
    setCheckBox(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
    setImage('')
    setCheckBox(false)
    setInitialValues({})
  }

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission logic here
    console.log({ ...values, image }, 'Values form  edit Category')

    console.log('Add btn clicked')

    await handleSubmitData(postEditCategory, fetchCategories, { ...values, image }, catId).then(() => {
      dispatch(fetchCategoriesTree())
    })
    setImage('')
    setOpen(false)
    setCheckBox(false)
    resetForm()
  }

  return (
    <Dialog
      scroll='body'
      open={open}
      fullWidth={true}
      maxWidth='lg'
      onClose={handleClose}
      aria-labelledby='customer-group-edit'
      sx={{
        '& .MuiPaper-root': { width: '100%', p: [2, 10] },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }}
      aria-describedby='customer-group-edit-description'
    >
      <DialogTitle
        id='customer-group-edit'
        maxWidth='md'
        fullWidth={true}
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        {type} Categories Information
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      label='Add as a Sub Category'
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.875rem',
                          color: 'text.secondary'
                        }
                      }}
                      control={<Checkbox checked={checkBox} color='primary' onChange={handleCheckBoxChange} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {checkBox ? (
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
                        {Object.keys(categories).length === 0
                          ? null
                          : categories.categories.map(item => (
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', mt: 3 }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Update
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default CategoriesEditForm
