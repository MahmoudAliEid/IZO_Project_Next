import React from 'react'

// ** Mui Components
import { CardContent, Grid, Box, Typography } from '@mui/material'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Cookies
import { getCookie } from 'cookies-next'

const PurchaseFirstSection = () => {
  // ** Get Cookies
  const transText = getCookie('fontStyle')

  return (
    <CardContent>
      <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
        <Grid item xl={12} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h5'
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 700,
                  letterSpacing: '-0.45px',
                  textTransform: transText,
                  fontSize: '1.75rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
                IZO CLOUD - V4.0 | Powered By AGT | +971-56-777-9250 | +971-4-23-55-919
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default PurchaseFirstSection
