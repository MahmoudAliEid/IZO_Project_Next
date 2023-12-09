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
  { columnNumber: 1, columnName: 'Product Name (Required)', instruction: 'Name of the product' },
  {
    columnNumber: 2,
    columnName: 'Brand (Optional)',
    instruction: 'Name of the brand (If not found, a new brand with the given name will be created)'
  },
  { columnNumber: 3, columnName: 'Unit (Required)', instruction: 'Name of the unit' },
  {
    columnNumber: 4,
    columnName: 'Category (Optional)',
    instruction: 'Name of the Category (If not found, a new category with the given name will be created)'
  },
  {
    columnNumber: 5,
    columnName: 'Sub category (Optional)',
    instruction:
      'Name of the Sub-Category (If not found, a new sub-category with the given name under the parent Category will be created)'
  },
  {
    columnNumber: 6,
    columnName: 'Item Code (Optional)',
    instruction: 'Product Item Code. If blank, an Item Code will be automatically generated'
  },
  {
    columnNumber: 7,
    columnName: 'Barcode Type (Optional, default: C128)',
    instruction: 'Barcode Type for the product. Currently supported: C128, C39, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14'
  },
  {
    columnNumber: 8,
    columnName: 'Manage Stock? (Required)',
    instruction: 'Enable or disable stock management. 1 = Yes, 0 = No'
  },
  { columnNumber: 9, columnName: 'Alert quantity (Optional)', instruction: 'Alert quantity' },
  { columnNumber: 10, columnName: 'Expires in (Optional)', instruction: 'Product expiry period (Only in numbers)' },
  {
    columnNumber: 11,
    columnName: 'Expiry Period Unit (Optional)',
    instruction: 'Unit for the expiry period. Available Options: days, months'
  },
  {
    columnNumber: 12,
    columnName: 'Applicable Tax (Optional)',
    instruction:
      'Name of the Tax Rate. If purchase Price (Excluding Tax) is not the same as Purchase Price (Including Tax), then you must supply the tax rate name.'
  },
  {
    columnNumber: 13,
    columnName: 'Selling Price Tax Type (Required)',
    instruction: 'Selling Price Tax Type. Available Options: inclusive, exclusive'
  },
  {
    columnNumber: 14,
    columnName: 'Product Type (Required)',
    instruction: 'Product Type. Available Options: single, variable'
  },
  {
    columnNumber: 15,
    columnName: 'Variation Name (Required if product type is variable)',
    instruction: 'Name of the variation (Ex: Size, Color etc )'
  },
  {
    columnNumber: 16,
    columnName: 'Variation Values (Required if product type is variable)',
    instruction: "Values for the variation separated with '|'. (Ex: Red|Blue|Green)"
  },
  {
    columnNumber: 17,
    columnName: 'Purchase Price (Including Tax) (Required if Purchase Price Excluding Tax is not given)',
    instruction:
      "Purchase Price (Including Tax) (Only in numbers). For variable products, '|' separated values with the same order as Variation Values (Ex: 84|85|88)"
  },
  {
    columnNumber: 18,
    columnName: 'Purchase Price (Excluding Tax) (Required if Purchase Price Including Tax is not given)',
    instruction:
      "Purchase Price (Excluding Tax) (Only in numbers). For variable products, '|' separated values with the same order as Variation Values (Ex: 84|85|88)"
  },
  {
    columnNumber: 19,
    columnName: 'Profit Margin % (Optional)',
    instruction: 'Profit Margin (Only in numbers). If blank, the default profit margin for the business will be used'
  },
  {
    columnNumber: 20,
    columnName: 'Sale Price (Optional)',
    instruction:
      'Sale Price (Only in numbers). If blank, Sale price will be calculated with the given Purchase Price and Applicable Tax'
  },
  {
    columnNumber: 21,
    columnName: 'Opening Stock (Optional)',
    instruction:
      "Opening Stock (Only in numbers). For variable products, separate stock quantities with '|' (Ex: 100|150|200)"
  },
  {
    columnNumber: 22,
    columnName: 'Opening stock location (Optional)',
    instruction: 'If blank, the first business location will be used. Name of the business location'
  },
  {
    columnNumber: 23,
    columnName: 'Expiry Date (Optional)',
    instruction: 'Stock Expiry Date. Format: mm-dd-yyyy; Ex: 11-25-2018'
  },
  {
    columnNumber: 24,
    columnName: 'Enable Product description, IMEI or Serial Number (Optional, default: 0)',
    instruction: '1 = Yes, 0 = No'
  },
  { columnNumber: 25, columnName: 'Weight (Optional)', instruction: 'Optional' },
  {
    columnNumber: 26,
    columnName: 'Rack (Optional)',
    instruction: "Rack details separated by '|' for different business locations serially. (Ex: R1|R5|R12)"
  },
  {
    columnNumber: 27,
    columnName: 'Row (Optional)',
    instruction: "Row details separated by '|' for different business locations serially. (Ex: ROW1|ROW2|ROW3)"
  },
  {
    columnNumber: 28,
    columnName: 'Position (Optional)',
    instruction: "Position details separated by '|' for different business locations serially. (Ex: POS1|POS2|POS3)"
  },
  {
    columnNumber: 29,
    columnName: 'Image (Optional)',
    instruction: 'Image name with extension. (Image name must be uploaded to the server public/uploads/img )'
  },
  { columnNumber: 30, columnName: 'Product Description (Optional)', instruction: '' },
  { columnNumber: 31, columnName: 'Custom Field1 (Optional)', instruction: '' },
  { columnNumber: 32, columnName: 'Custom Field2 (Optional)', instruction: '' },
  { columnNumber: 33, columnName: 'Custom Field3 (Optional)', instruction: '' },
  { columnNumber: 34, columnName: 'Custom Field4 (Optional)', instruction: '' },
  { columnNumber: 35, columnName: 'Not For Sale (Optional)', instruction: '1 = Yes, 0 = No' },
  {
    columnNumber: 36,
    columnName: 'Product locations (Optional)',
    instruction: 'Comma-separated string of business location names where the product will be available'
  }
]

const ImportProduct = () => {
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
          <CardHeader title='Import Product' />
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
export default ImportProduct
