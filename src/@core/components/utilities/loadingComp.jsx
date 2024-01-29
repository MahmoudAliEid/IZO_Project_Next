import React, { Fragment, useEffect } from 'react'
import Lottie from 'lottie-react'
import errorAnimation from '/src/animation/errorAnimation.json'
import successAnimation from '/src/animation/successAnimation.json'
import loadingAnimation2 from '/src/animation/loading.json'
import { Dialog, DialogContent } from '@mui/material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'

const LoadingAnimation = ({ open, onClose, statusType }) => {
  const theme = useTheme()

  console.log(statusType, '===> statusType')

  useEffect(() => {
    if (statusType.success || statusType.error) {
      setTimeout(onClose, 2000)
    }
  }, [statusType.success, statusType.error, onClose])

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth scroll='body'>
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
              statusType.loading
                ? loadingAnimation2
                : statusType.success
                ? successAnimation
                : statusType.error
                ? errorAnimation
                : null
            }
            style={{
              width: '250px',
              height: '200px'
            }}
          />

          <Typography variant='h4' sx={{ mt: 2, py: 2 }}>
            {statusType.loading ? (
              <span>Loading...</span>
            ) : statusType.success ? (
              <span>Success 🎉✨</span>
            ) : statusType.error ? (
              <span>Error ❌</span>
            ) : null}
          </Typography>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default LoadingAnimation
