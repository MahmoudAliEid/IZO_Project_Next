/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Next Import
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

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

const ProductMedia = () => {
  const [initialValues, setInitialValues] = useState({
    productimage: [],
    productmultipleimages: [],
    productbrochure: [],
    productvideo: []
  })

  return (
    <DropzoneWrapper
      sx={{
        '.css-1o07xpt-MuiButtonBase-root-MuiIconButton-root': {
          display: 'none'
        }
      }}
    >
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <LinkStyled href='#' target='_blank'>
                Product Media
              </LinkStyled>
            </Typography>
          }
        />
        <Grid item xs={12}>
          <CardSnippet
            title='Product image'
            code={{
              tsx: source.FileUploaderMultipleTSXCode,
              jsx: source.FileUploaderMultipleJSXCode
            }}
          >
            <Productimage initialValues={initialValues} />
          </CardSnippet>
        </Grid>

        <Grid item xs={12}>
          <CardSnippet
            title='Product multiple images'
            code={{
              tsx: source.FileUploaderRestrictionsTSXCode,
              jsx: source.FileUploaderRestrictionsJSXCode
            }}
          >
            <Productmultipleimages />
          </CardSnippet>
        </Grid>

        <Grid item xs={12}>
          <CardSnippet
            title='Product brochure'
            code={{
              tsx: source.FileUploaderSingleTSXCode,
              jsx: source.FileUploaderSingleJSXCode
            }}
          >
            <Productbrochure />
          </CardSnippet>
        </Grid>
        <Grid item xs={12}>
          <CardSnippet
            title='Product video'
            code={{
              tsx: source.FileUploaderSingleTSXCode,
              jsx: source.FileUploaderSingleJSXCode
            }}
          >
            <UploadVideo />
          </CardSnippet>
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

export default ProductMedia
