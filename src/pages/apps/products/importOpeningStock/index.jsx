// ** MUI Imports
import { Grid, Card, CardContent, Button, CardActions, CardHeader, Typography, Alert } from '@mui/material'

// ** Custom Components
import UploadFile from 'src/@core/components/globalUpload/UploadFile'
import TableBasic from 'src/views/table/mui/TableBasic'

// ** cookies
import { getCookie } from 'cookies-next'

// Axios
import axios from 'axios'
import { postImportOQ } from 'src/store/apps/products/openingQuantity/actions/postImportOQSlice'
import { useDispatch } from 'react-redux'

// ** Formik
import { Formik } from 'formik'

// ** Data for Table
const tableData = [
  { columnNumber: 1, columnName: 'Item Code (Required)', instruction: '' },
  {
    columnNumber: 2,
    columnName: 'Location (Optional)',
    instruction: 'If blank, first business location will be used (Name of the business location)'
  },

  {
    columnNumber: 3,
    columnName: 'Store (Optional)',
    instruction: 'If blank, first store will be used (Name of the store)'
  },

  { columnNumber: 4, columnName: 'Quantity (Required)', instruction: '' },
  { columnNumber: 5, columnName: 'Unit Price (After Dis) ', instruction: 'Include.vat (Required)' },
  { columnNumber: 6, columnName: 'Lot Number (Optional)', instruction: '' },
  {
    columnNumber: 7,
    columnName: 'Expiry Date (Optional)',
    instruction: 'Stock expiry date in Business date format mm/dd/yyyy'
  }
]

const ImportOpeningStock = () => {
  const initialValues = {
    file: []
  }

  // ** Hooks
  const dispatch = useDispatch()

  const handleSubmitForm = (values, { resetForm }) => {
    console.log('values 🐱‍👤', values)
    dispatch(postImportOQ({ data: values }))
    resetForm()
  }

  console.log('initialValues 🐱‍👤', initialValues)

  // ** Function
  const handleExport = () => {
    // handle export to download file
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios({
      url: `${url}/app/react/opening-quantity/export-file`,
      method: 'GET',
      headers: headers
    }).then(response => {
      axios({
        url: response.data.info,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'import_opening_stock_csv_template.xls') //or any other extension
        document.body.appendChild(link)
        link.click()
      })
      console.log('response url 🐱‍👤🎃🎃🎃', response.data.info)
    })
  }

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} lg={12} md={12} sm={12}>
        <Card>
          <CardHeader title='Import Opening Stock' />
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
                    <Button color='primary' variant='outlined' onClick={handleExport}>
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
export default ImportOpeningStock
