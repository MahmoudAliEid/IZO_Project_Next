import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import UploadVideo from './UploadVideo'
import FileUploader from 'src/@core/Global/FileUploader '

const SecondMedia = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  const fileTypes = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png']
  }

  return (
    <DropzoneWrapper>
      <Grid container spacing={5} className='match-height'>
        {/* <Grid item xs={6}>
          <Card>
            <CardHeader title='Product Brochure' />
            <CardContent>
              <Productbrochure
                image={initialValues.productbrochure}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Product Test' />
            <CardContent>
              <FileUploader
                fieldName='productbrochure'
                setFieldValue={setFieldValue}
                accept={fileTypes}
                multiple={false}
                files={initialValues.productbrochure}
              />
              {/* <FilePreview /> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Product Video' />
            <CardContent>
              <UploadVideo
                video={initialValues.productvideo}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

export default SecondMedia
