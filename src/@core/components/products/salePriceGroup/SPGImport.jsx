// ** cookies
import { getCookie } from 'cookies-next'

// Axios
import axios from 'axios'

// ** MUI Imports
import { Grid, Card, CardContent, Button, CardActions, CardHeader, Typography } from '@mui/material'

// ** Custom Components
import UploadFile from 'src/@core/components/globalUpload/UploadFile'

// ** Formik
import { Formik } from 'formik'

// ** Store & Actions
// import { fetchExportSPGroup } from 'src/store/apps/products/salePriceGroup/actions/getExportSPGSlice'
import { postImportSPGroup } from 'src/store/apps/products/salePriceGroup/actions/postImportSPGSlice'
import { useDispatch } from 'react-redux'

const SPGImport = () => {
  // ** State
  const initialValues = {
    file: []
  }

  // ** Hooks
  const dispatch = useDispatch()

  // ** Function
  const handleExport = () => {
    // handle export to download file
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios({
      url: `${url}/app/react/sales-price-group/export`,
      method: 'GET',
      headers: headers,
      responseType: 'blob' // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'sale_price_group_export.xlsx') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  }

  const handleSubmitForm = (values, { resetForm }) => {
    console.log('values 🐱‍👤', values)
    dispatch(postImportSPGroup({ data: values }))

    resetForm()
  }

  console.log('initialValues 🐱‍👤', initialValues)

  return (
    <Card>
      <CardHeader title='Import and Export Sale Price Group' />
      <CardContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={12}>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <UploadFile setFieldValue={setFieldValue} />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <Typography variant='h5' color='textSecondary'>
                    Instructions
                  </Typography>
                  <Typography variant='subtitle2' color='textSecondary'>
                    • Export Selling price group prices.
                  </Typography>
                  <Typography variant='subtitle2' color='textSecondary'>
                    • Update the exported file and import the same file.
                  </Typography>
                  <Typography variant='subtitle2' color='textSecondary'>
                    • Only selling price group prices of the product will be updated. Any blank price will be skipped.
                  </Typography>
                </Grid>
              </Grid>
              <CardActions>
                <Button color='primary' variant='contained' disabled={values.file.length ? false : true} type='submit'>
                  Submit
                </Button>
                <Button color='primary' variant='outlined' onClick={handleExport}>
                  Export Sale Price Group
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}
export default SPGImport
