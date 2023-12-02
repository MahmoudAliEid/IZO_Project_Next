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

// import { useDispatch } from 'react-redux'
// import useSubmitUser from 'src/hooks/useSubmitUser'

// import MainLoading from 'src/@core/components/mainLoading/MainLoading'

// import { useTheme } from '@mui/material/styles'
// ** Next Imports
// import { getCookie } from 'cookies-next'

import { Formik } from 'formik'

import { useState } from 'react'

// import { useSelector, useDispatch } from 'react-redux'

const ProductUnitForm = ({ open, setOpen }) => {
  // ** State

  const [initialValues, setInitialValues] = useState({
    name: '',
    short_name: '',
    allow_decimal: 0
  })

  // ** Cookies
  // const token = getCookie('token')

  // ** Hook
  // const dispatch = useDispatch()
  // const { handleSubmitData } = useSubmitUser()

  // ** Functions
  const handleClose = () => {
    setOpen(false)

    setInitialValues({})
  }

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values, 'Values form  add Category')

    console.log('Add btn clicked')

    // if (type === 'Add') {
    //   handleSubmitData(postAddUnit, fetchUnits, values)
    // } else if (type === 'Edit' && itemId) {
    //   handleSubmitData(postEditUnit, fetchUnits, values, itemId)
    // }

    setOpen(false)
    resetForm()
  }

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
        Add Unit Information
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
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

export default ProductUnitForm
