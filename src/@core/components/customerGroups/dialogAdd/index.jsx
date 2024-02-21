import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { getCookie } from 'cookies-next'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/getCustomerGroupSlice'
import { postAddCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/postCreateCGSlice'
import LoadingAnimation from '../../utilities/loadingComp'
import { fetchCreateCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/getCreateCGSlice'

const DialogAddCG = ({ openAdd, handleAddClose }) => {
  // ** Cookies
  const token = getCookie('token')
  const url = getCookie('apiUrl')

  // ** States
  const [openLoading, setOpenLoading] = useState(false)
  const [dataForm, setDataForm] = useState(null)
  const [initialValues] = useState({
    name: '',
    amount: '',
    price_calculation_type: 'percentage',
    selling_price_group_id: ''
  })

  // ** Selectors
  const storeAddFormData = useSelector(state => state.getCreateCustomerGroup?.data?.value)
  const saveStatus = useSelector(state => state?.postCreateCustomerGroup)

  // ** Dispatch
  const dispatch = useDispatch()

  // **Effects
  useEffect(() => {
    setDataForm(storeAddFormData)
  }, [storeAddFormData])

  useEffect(() => {
    if (token && url) {
      dispatch(fetchCreateCustomerGroup(token, url))
    }
  }, [token, url, dispatch])

  // ** Submit
  const handleSubmitAdd = (values, { resetForm }) => {
    dispatch(postAddCustomerGroup(values)).then(() => {
      dispatch(fetchCustomerGroup())
    })
    resetForm()
    setOpenLoading(true)
  }

  return (
    <Dialog
      scroll='body'
      open={openAdd}
      onClose={handleAddClose}
      aria-labelledby='customer-group-edit'
      sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }}
      aria-describedby='customer-group-edit-description'
    >
      <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={saveStatus} />
      <DialogTitle
        id='customer-group-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Add Customer Group Information
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='customer-group-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Add Customer Group details will receive a privacy audit.
        </DialogContentText>
        {dataForm && (
          <Formik initialValues={initialValues} onSubmit={handleSubmitAdd} enableReinitialize={true}>
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Customer Group Name'
                      value={values.name || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='name'
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='customer-group-Price-calculation-type-label'>Price Calculation Type</InputLabel>
                      <Select
                        label='Price Calculation Type'
                        value={values.price_calculation_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='price_calculation_type'
                        id='customer-group-Price-calculation-type'
                        labelId='customer-group-Price-calculation-type-label'
                      >
                        {dataForm && Object.keys(dataForm).length === 0
                          ? null
                          : dataForm.price_collection_price.map((item, id) => (
                              <MenuItem key={id} value={item.key}>
                                {item.value}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {values.price_calculation_type === 'percentage' ? (
                      <TextField
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='amount'
                        label='Calculation Percentage (%)'
                        value={values.amount}
                      />
                    ) : values.price_calculation_type === 'selling_price_group' ? (
                      <FormControl fullWidth>
                        <InputLabel id='customer-group-selling-price-group-id-label'>Sale Price Group</InputLabel>
                        <Select
                          label='Sale Price Group'
                          value={values.selling_price_group_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='selling_price_group_id'
                          id='customer-group-selling-price-group-id'
                          labelId='customer-group-selling-price-group-id-label'
                        >
                          {Object.keys(dataForm).length === 0
                            ? null
                            : dataForm.sales_price_group.map((item, id) => (
                                <MenuItem key={id} value={item.id}>
                                  {item.value}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, flexDirection: 'row-reverse' }}>
                  <Button size='large' type='submit' variant='contained' sx={{ mr: 3, ml: 3 }}>
                    Add
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleAddClose}>
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogAddCG
