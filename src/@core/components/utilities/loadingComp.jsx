import React, { Fragment, useEffect } from 'react'
import Lottie from 'lottie-react'
import errorAnimation from '/src/animation/errorAnimation.json'
import successAnimation from '/src/animation/successAnimation.json'
import loadingAnimation2 from '/src/animation/loading.json'
import { Dialog, DialogContent } from '@mui/material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { styled, useTheme } from '@mui/material/styles'

const LottieAnimation = ({ open, onClose, storeWarrantiesResponseStatuse }) => {
  const theme = useTheme()

  console.log(storeWarrantiesResponseStatuse, '===> storeWarrantiesResponseStatuse')

  useEffect(() => {
    if (storeWarrantiesResponseStatuse.success || storeWarrantiesResponseStatuse.error) {
      setTimeout(onClose, 2000)
    }
  }, [storeWarrantiesResponseStatuse.success, storeWarrantiesResponseStatuse.error])

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <Image src={`/izoLogo/izo-logo-${theme.palette.mode}.png`} alt='Logo' width={120} height={120} />

          <Lottie
            animationData={
              storeWarrantiesResponseStatuse.loading
                ? loadingAnimation2
                : storeWarrantiesResponseStatuse.success
                ? successAnimation
                : storeWarrantiesResponseStatuse.error
                ? errorAnimation
                : null
            }
            style={{
              width: '300px',
              height: '300px'
            }}
          />

          <Typography variant='h5' sx={{ mt: 2 }}>
            {storeWarrantiesResponseStatuse.loading ? (
              <h1>Loading...</h1>
            ) : storeWarrantiesResponseStatuse.success ? (
              <h1>Success</h1>
            ) : storeWarrantiesResponseStatuse.error ? (
              <h1>Error</h1>
            ) : null}
          </Typography>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default LottieAnimation
