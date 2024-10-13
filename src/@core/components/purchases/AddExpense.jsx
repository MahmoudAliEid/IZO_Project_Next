import { Fragment } from 'react'

import { Box, Button, DialogContent, Divider, FormControl, Grid, TextField } from '@mui/material'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Third Party Components
import { FieldArray } from 'formik'

// ** Custom Components
import AddExpenseTable from './AddExpenseTable'
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from '../customDialogHeader/CustomHeader'
import MultipleUploadFile from 'src/@core/Global/MultipleUploadFile'

const AddExpense = ({ toggle, open, handleChange, setFieldValue, data, values }) => {
  // ** Cookies

  const transText = getCookie('fontStyle')

  // ToDo : debit is required and amount of row should be >0
  // ToDo : units in product Times Base Unit should be >0 in add  from or edit
  // ToDo : when unit change check why total is NAN

  return (
    <Fragment>
      <CustomDialog open={open} handleClose={toggle}>
        <CustomHeader divider={true} title='Add Expense' handleClose={toggle} />
        <DialogContent
          sx={{
            textTransform: transText
          }}
        >
          <FieldArray name={`expense`}>
            {({ push, remove }) => (
              <div>
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
          <Button color='primary' variant='contained' onClick={toggle}>
            Save
          </Button>
        </Box>
      </CustomDialog>
    </Fragment>
  )
}

export default AddExpense
