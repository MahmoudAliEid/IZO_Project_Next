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

// import MainLoading from 'src/@core/components/mainLoading/MainLoading'

// import { useTheme } from '@mui/material/styles'

import { Formik } from 'formik'
import UploadImage from 'src/@core/components/globalUpload/UploadImage'
import { useEffect, useState } from 'react'
import { postCreateCategory } from 'src/store/apps/products/categories/postCreateCategorySlice'
import { fetchCategories } from 'src/store/apps/products/categories/getCategoriesSlice'
import { fetchCreateCategory } from 'src/store/apps/products/categories/getCreateCategorySlice'
import { useSelector, useDispatch } from 'react-redux'

const CategoriesForm = ({ type, open, setOpen, setData }) => {
  const [image, setImage] = useState('')
  const [checkBox, setCheckBox] = useState(false)

  // const [isLoading, setIsLoading] = useState(false)
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

  // const statusOne = useSelector(state => state.getCreateCategory?.data.status)
  // const statusTwo = useSelector(state => state.postCreateCategory?.data.status)

  const categoryData = useSelector(state => state.getCreateCategory?.data?.categories)

  // ** Hook
  // const theme = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    setCategories(categoryData)
  }, [categoryData])

  // useEffect(() => {
  //   if (statusOne === 200 && statusTwo === 200) {
  //     setIsLoading(false)
  //   }
  // }, [statusOne, statusTwo])

  useEffect(() => {
    dispatch(fetchCreateCategory())
  }, [dispatch])

  // const dispatch = useDispatch()
  const { handleSubmitData } = useSubmitUser()

  const handleCheckBoxChange = () => {
    setCheckBox(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
    setImage('')
    setInitialValues({})
    setCheckBox(false)
  }

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log({ ...values, image }, 'Values form  add Category')

    console.log('Add btn clicked')

    handleSubmitData(postCreateCategory, fetchCategories, { ...values, image })
    setImage('')
    setOpen(false)
    setCheckBox(false)
    resetForm()
    setData(prev => {
      return [
        ...prev,
        {
          id: Math.floor(Math.random()),
          image_url: 'Loading...',
          created_by: 'Loading...',
          ...values
        }
      ]
    })

    // setIsLoading(true)
  }

  return (
    <Dialog
      scroll='body'
      open={open}
      onClose={handleClose}
      aria-labelledby='customer-group-edit'
      sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
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
                        <MenuItem value={0}>Null</MenuItem>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                  Add
                </Button>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default CategoriesForm
