import { Fragment, useEffect, useState } from 'react'

import { Alert, Box, Button, DialogContent, DialogTitle, Divider, FormControl, Grid, TextField } from '@mui/material'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Third Party Components
import { FieldArray } from 'formik'

// ** Custom Components
import AddExpenseTable from './AddExpenseTable'
import CustomDialog from 'src/@core/Global/CustomDialog'
// import CustomHeader from '../customDialogHeader/CustomHeader'
import MultipleUploadFile from 'src/@core/Global/MultipleUploadFile'

const AddExpense = ({ toggle, open, handleChange, setFieldValue, data, values }) => {
  // ** Cookies
  const transText = getCookie('fontStyle')

  const [isNotValid, setIsNotValid] = useState(false)

  useEffect(() => {
    let valid = false
    values.expense.forEach(item => {
      if (!item.debit || item.debit === '0' || item.debit === 0 || item.debit === '') {
        valid = true
      }
    })

    setIsNotValid(valid)
  }, [values.expense])

  return (
    <Fragment>
      <CustomDialog open={open} handleClose={toggle}>
        {/* <CustomHeader divider={true} title='Add Expense' handleClose={toggle} /> */}
        <DialogTitle
          title='Add Expense'
          sx={{
            textTransform: transText
          }}
        >
          Add Expense
        </DialogTitle>
        <DialogContent
          sx={{
            textTransform: transText
          }}
        >
          <FieldArray name={`expense`}>
            {({ push, remove }) => (
              <div>
                {isNotValid && (
                  <Alert severity='error' sx={{ m: 2 }}>
                    <strong>Warning:</strong> Please make sure to add the debit details for each row
                  </Alert>
                )}
                <AddExpenseTable
                  values={values}
                  data={data}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  remove={remove}
                  push={push}
                  rows={values.expense}
                />

                <Divider
                  sx={{
                    mb: 3
                  }}
                />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <TextField
                        name='expense_total_amount'
                        label='Total Amount'
                        value={values.expense_total_amount}
                        disabled
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <TextField
                        name='expense_total_vat'
                        label='Total Vat'
                        value={values.expense_total_vat}
                        disabled
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <TextField label='Total' name='expense_total' value={values.expense_total} disabled />
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ my: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <MultipleUploadFile
                        image={values.expense_attachment}
                        setFieldValue={setFieldValue}
                        name='expense_attachment'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            )}
          </FieldArray>
        </DialogContent>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color='primary' variant='contained' onClick={toggle} disabled={isNotValid}>
            Save
          </Button>
        </Box>
      </CustomDialog>
    </Fragment>
  )
}

export default AddExpense
