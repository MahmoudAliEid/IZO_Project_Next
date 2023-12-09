/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Next Import
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

import Typography from '@mui/material/Typography'
import { Card, CardContent, CardHeader, CardTitle } from '@mui/material'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import Productbrochure from './Productbrochure'
import Productimage from './Productimage'
import Productmultipleimages from './Productmultipleimages'
import UploadVideo from './UploadVideo'

// ** Source code imports
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ProductMedia = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  const theme = useTheme()

  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Product Image' sx={{ color: `${theme.palette.primary.main} !important` }} />
            <CardContent>
              <Productimage
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Product Multiple Images' />

            <CardContent>
              <Productmultipleimages
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Product Brochure' />
            <CardContent>
              <Productbrochure
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Product Video' />
            <CardContent>
              <UploadVideo
                initialValues={initialValues}
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

export default ProductMedia
