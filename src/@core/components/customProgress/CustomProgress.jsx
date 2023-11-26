import React from 'react'

import { Grid, Box } from '@mui/material'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

const CustomProgress = () => {
  return (
    <Grid container justifyContent='center' alignItems='center' style={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          flexDirection: 'column',
          textAlign: 'center' // Center align text
        }}
      >
        {/* <Box>
          <Typography variant='h4' color='primary' gutterBottom>
            No Data Exist
          </Typography>
        </Box> */}
        <Box mt={2}>
          <ProgressCustomization />
        </Box>
      </Box>
    </Grid>
  )
}

export default CustomProgress
