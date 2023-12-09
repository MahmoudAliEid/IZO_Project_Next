/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Grid, Card, Box, CardContent, Button, CardActions, CardHeader, Typography } from '@mui/material'

// ** Custom Components
import UploadFile from 'src/@core/components/globalUpload/UploadFile'

// ** Formik
import { Formik } from 'formik'

const SPGImport = () => {
  const initialValues = {
    file: []
  }

  const handleSubmitForm = (values, { resetForm }) => {
    console.log('values 🐱‍👤', values)
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
                <Button color='primary' variant='outlined' disabled>
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
