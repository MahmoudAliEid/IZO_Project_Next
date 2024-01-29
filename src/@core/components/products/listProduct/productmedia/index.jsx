import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

import { Card, CardContent, CardHeader } from '@mui/material'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import Productbrochure from './Productbrochure'
import Productimage from './Productimage'
import Productmultipleimages from './Productmultipleimages'
import UploadVideo from './UploadVideo'

// const LinkStyled = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

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
