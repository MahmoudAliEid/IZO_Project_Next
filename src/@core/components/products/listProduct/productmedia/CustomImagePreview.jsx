import React from 'react'

// ** MUI Imports
import { Box, Card } from '@mui/material'

// ** Next Image
import Image from 'next/image'

// ** Custom Components
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'

// ** Cookies
import { getCookie } from 'cookies-next'

const CustomImagePreview = ({ files, open, toggle }) => {
  const textTransform = getCookie('fontStyle')

  return (
    <CustomDialog open={open} toggle={toggle} width={'max-content'}>
      <CustomHeader title='Image Preview ' handleClose={toggle} />
      <Card sx={{ fontStyle: textTransform, justifyContent: 'center', alignItems: 'center' }}>
        {Array.isArray(files) && files.length > 0 ? (
          files.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px !important'
              }}
            >
              <Image
                src={URL.createObjectURL(file)}
                width={500}
                height={500}
                alt='Image Preview'
                style={{
                  borderRadius: '10px',
                  display: 'block',
                  margin: '0 auto',
                  padding: '10px'
                }}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px !important'
            }}
          >
            <Image
              src={URL.createObjectURL(files)}
              width={500}
              height={500}
              alt='Image Preview'
              style={{
                borderRadius: '10px',
                display: 'block',
                margin: '0 auto',
                padding: '10px'
              }}
            />
          </Box>
        )}
      </Card>
    </CustomDialog>
  )
}

export default CustomImagePreview
