//**React Imports */
import { useState, useEffect } from 'react'

import { Formik } from 'formik'
import { getCookie } from 'cookies-next'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import { postEditCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/postEditCGSlice'
import { fetchCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/getCustomerGroupSlice'

import { useDispatch, useSelector } from 'react-redux'
import { fetchEditCustomerGroup } from 'src/store/apps/contacts/CustomerGroup/getEditCGSlice'

import useSubmitUser from 'src/hooks/useSubmitUser'

const DialogEdit = ({ openEdit, setOpenEdit, itemId }) => {
  const dataEdit = useSelector(state => state?.getEditCustomerGroup?.data?.value)

  const [data, setData] = useState()
  const [valueToShow, setValueToShow] = useState(dataEdit?.value?.info?.price_calculation_type || 'selling_price_group')
  const { handleSubmitData } = useSubmitUser()

  //**Hooks
  const dispatch = useDispatch()
  console.log(dataEdit, 'Date Edit')

  useEffect(() => {
    if (dataEdit !== null && dataEdit !== undefined) {
      setData(dataEdit)
    }
  }, [dataEdit])

  console.log(data, 'Date  after Edit')

  const token = getCookie('token')
  const url = getCookie('apiUrl')

  useEffect(() => {
    if (token && url && itemId) {
      //@ts-ignore
      dispatch(fetchEditCustomerGroup({ token, url, itemId }))
    }
  }, [dispatch, token, url, itemId])

  const handleEditClose = () => setOpenEdit(false)
  const handleSubmit = values => {
    handleSubmitData(postEditCustomerGroup, fetchCustomerGroup, values, itemId)
    setOpenEdit(false)
  }

  const onchangeHandle = event => {
    setValueToShow(event.target.value)
  }

  return (
    <>
      <Dialog
        scroll='body'
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='customer-group-edit'
        sx={{
          '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
          '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
        }}
        aria-describedby='customer-group-edit-description'
      >
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
        {data && (
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <DialogContentText variant='body2' id='customer-group-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Updating details will receive a privacy audit.
            </DialogContentText>
            <Formik initialValues={data?.info} onSubmit={handleSubmit} enableReinitialize={true}>
              {({ values, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Customer Group Name'
                        value={values?.name}
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
                          value={values?.price_calculation_type}
                          onChange={event => {
                            onchangeHandle(event)
                            handleChange(event)
                          }}
                          onBlur={handleBlur}
                          name='price_calculation_type'
                          id='customer-group-Price-calculation-type'
                          labelId='customer-group-Price-calculation-type-label'
                        >
                          {Object.keys(data).length === 0
                            ? null
                            : data.price_collection_price.map((item, id) => (
                                <MenuItem key={id} value={item.key}>
                                  {item.value}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {valueToShow === 'percentage' ? (
                        <TextField
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='amount'
                          label='Calculation Percentage (%)'
                          value={values?.amount}
                        />
                      ) : valueToShow === 'selling_price_group' ? (
                        <FormControl fullWidth>
                          <InputLabel id='customer-group-selling-price-group-id-label'>Sale Price Group</InputLabel>
                          <Select
                            label='Price Calculation Type'
                            value={values?.selling_price_group_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='selling_price_group_id'
                            id='customer-group-selling-price-group-id'
                            labelId='customer-group-selling-price-group-id-label'
                          >
                            {Object.keys(data).length === 0
                              ? null
                              : data?.sales_price_group.map((item, id) => (
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                    <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                      Update
                    </Button>
                    <Button size='large' variant='outlined' color='secondary' onClick={handleEditClose}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

export default DialogEdit
