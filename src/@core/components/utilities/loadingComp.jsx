import React, { Fragment, useEffect } from 'react'
import Lottie from 'lottie-react'
import successAnimation from '/src/animation/successAnimation.json'
import errorA from '/src/animation/errorA.json'
import { Dialog, DialogContent, Grid } from '@mui/material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { Box } from '@mui/system'

const LoadingAnimation = ({ open, onClose, statusType }) => {
  const theme = useTheme()

  useEffect(() => {
    if (statusType.success || statusType.error) {
      setTimeout(onClose, 2000)
    }
  }, [statusType.success, statusType.error, onClose])

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs' scroll='body'>
        <DialogContent
          sx={{
            width: '100%',
            pt: 0,
            height: '100%'
          }}
        >
          <Image src={`/izoLogo/izo-logo-${theme.palette.mode}.png`} alt='Logo' width={60} height={60} />

          <Box>
            <Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                {statusType.loading ? (
                  <Box>
                    <ProgressCustomization />
                  </Box>
                ) : statusType.success ? (
                  <Lottie
                    animationData={successAnimation}
                    style={{
                      width: '60px',
                      height: '60px'
                    }}
                  />
                ) : statusType.error ? (
                  <Lottie
                    animationData={errorA}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '60px',
                      height: '60px'
                    }}
                  />
                ) : null}

                <Typography variant='body6'>
                  {statusType.loading ? (
                    <span>Loading...</span>
                  ) : statusType.success ? (
                    <span>Success 🎉✨</span>
                  ) : statusType.error ? (
                    <span>Error ❌</span>
                  ) : null}
                </Typography>
              </Box>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default LoadingAnimation
