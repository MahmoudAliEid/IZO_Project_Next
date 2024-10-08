import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

import { Card, CardContent, CardHeader } from '@mui/material'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
// import Productbrochure from './Productbrochure'
import Productimage from './Productimage'
import Productmultipleimages from './Productmultipleimages'

const ProductMedia = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue, handleClose }) => {
  const theme = useTheme()

  return (
    <DropzoneWrapper>
      <Grid container spacing={5} className='match-height'>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Product Image' sx={{ color: `${theme.palette.primary.main} !important` }} />
            <CardContent>
              <Productimage
                image={initialValues.productImage}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader title='Product Multiple Images' />

            <CardContent>
              <Productmultipleimages
                image={initialValues.productmultipleimages}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                handleClose={handleClose}
              />
            </CardContent>
          </Card>
        </Grid>

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
      </Grid>
    </DropzoneWrapper>
  )
}

export default ProductMedia
