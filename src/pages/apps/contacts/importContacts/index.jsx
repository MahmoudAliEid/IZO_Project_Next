/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import { Grid, Card, Box, CardContent, Button, CardActions, CardHeader, Typography, Alert } from '@mui/material'

// ** Custom Components
import UploadFile from 'src/@core/components/globalUpload/UploadFile'
import TableBasic from 'src/views/table/mui/TableBasic'

// ** Formik
import { Formik } from 'formik'

// ** Data for Table
const tableData = [
  {
    columnNumber: 1,
    columnName: 'Contact type (Required)',
    instruction: 'Available Options: 1 = Customer, 2 = Supplier, 3 = Both'
  },
  { columnNumber: 2, columnName: 'Prefix (Optional)', instruction: '' },
  { columnNumber: 3, columnName: 'First Name (Required)', instruction: '' },
  { columnNumber: 4, columnName: 'Middle name (Optional)', instruction: '' },
  { columnNumber: 5, columnName: 'Last Name (Optional)', instruction: '' },
  { columnNumber: 6, columnName: 'Business Name (Required if contact type is supplier or both)', instruction: '' },
  { columnNumber: 7, columnName: 'Contact ID (Optional)', instruction: 'Leave blank to auto generate Contact ID' },
  { columnNumber: 8, columnName: 'Tax number (Optional)', instruction: '' },
  { columnNumber: 9, columnName: 'Opening Balance (Optional)', instruction: '' },
  { columnNumber: 10, columnName: 'Pay term (Required if contact type is supplier or both)', instruction: '' },
  {
    columnNumber: 11,
    columnName: 'Pay term period (Required if contact type is supplier or both)',
    instruction: 'Available Options: days and months'
  },
  { columnNumber: 12, columnName: 'Credit Limit (Optional)', instruction: '' },
  { columnNumber: 13, columnName: 'Email (Optional)', instruction: '' },
  { columnNumber: 14, columnName: 'Mobile (Required)', instruction: '' },
  { columnNumber: 15, columnName: 'Alternate contact number (Optional)', instruction: '' },
  { columnNumber: 16, columnName: 'Landline (Optional)', instruction: '' },
  { columnNumber: 17, columnName: 'City (Optional)', instruction: '' },
  { columnNumber: 18, columnName: 'State (Optional)', instruction: '' },
  { columnNumber: 19, columnName: 'Country (Optional)', instruction: '' },
  { columnNumber: 20, columnName: 'Address line 1 (Optional)', instruction: '' },
  { columnNumber: 21, columnName: 'Address line 2 (Optional)', instruction: '' },
  { columnNumber: 22, columnName: 'Zip Code (Optional)', instruction: '' },
  { columnNumber: 23, columnName: 'Date of birth (Optional)', instruction: 'Format Y-m-d (2023-11-07)' },
  { columnNumber: 24, columnName: 'Custom Field 1 (Optional)', instruction: '' },
  { columnNumber: 25, columnName: 'Custom Field 2 (Optional)', instruction: '' },
  { columnNumber: 26, columnName: 'Custom Field 3 (Optional)', instruction: '' },
  { columnNumber: 27, columnName: 'Custom Field 4 (Optional)', instruction: '' }
]

const ImportContacts = () => {
  const initialValues = {
    file: []
  }

  const handleSubmitForm = (values, { resetForm }) => {
    console.log('values 🐱‍👤', values)
  }

  console.log('initialValues 🐱‍👤', initialValues)

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} lg={12} md={12} sm={12}>
        <Card>
          <CardHeader title='Import Contacts' />
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
              {({ values, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={12}>
                    <Grid item xs={12} lg={12} md={12} sm={12}>
                      <UploadFile setFieldValue={setFieldValue} />
                    </Grid>
                  </Grid>
                  <CardActions>
                    <Button
                      color='primary'
                      variant='contained'
                      disabled={values.file.length ? false : true}
                      type='submit'
                    >
                      Submit
                    </Button>
                    <Button color='primary' variant='outlined' disabled>
                      Download Template File
                    </Button>
                  </CardActions>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12} md={12} sm={12}>
        <Card>
          <CardHeader title='Instructions' />
          <Alert
            severity='warning'
            sx={{
              '& .border-radius-4': {
                borderRadius: 'none !important'
              },
              '& .border-radius': {
                borderRadius: 'none !important'
              },
              m: 5
            }}
          >
            <Typography variant='h6'>
              Follow the instructions carefully before importing the file. The columns of the file should be in the
              following order.
            </Typography>
          </Alert>
          <TableBasic tableData={tableData} />
        </Card>
      </Grid>
    </Grid>
  )
}
export default ImportContacts
