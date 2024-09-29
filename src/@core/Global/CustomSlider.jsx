import { Fragment, useEffect, useState } from 'react'

// ** MUI Components
import { Grid, Typography, Box, Dialog } from '@mui/material'

// ** Custom Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import CustomSwiperThumbnails from './CustomSwiperThumbnails'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** cookies
import { getCookie } from 'cookies-next'

const CustomSlider = ({ open, toggle, data }) => {
  const [showProgress, setShowProgress] = useState(true)

  const fontStyling = getCookie('fontStyle')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(false)
    }, 30000) // 30000 milliseconds = 1 minute

    // Cleanup function to clear the timer if the component unmounts before the timer finishes
    return () => clearTimeout(timer)
  }, []) // Empty dependency array means this effect runs once on mount

  const handleClose = () => {
    toggle()
  }

  const {
    settings: { direction }
  } = useSettings()

  return (
    <Fragment>
      <Dialog
        open={open}
        toggle={handleClose}
        width='90vw'
        maxWidth='90vw'
        minWidth='300px'
        sx={{
          '& .MuiDialog-paper': {
            width: '90vw',
            maxWidth: '90vw',
            minWidth: '300px'
          },
          fontStyle: fontStyling
        }}
      >
        <KeenSliderWrapper>
          <Fragment>
            <CustomHeader title={`Preview Media `} handleClose={handleClose} />

            {data?.length > 0 ? (
              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  flexDirection: 'column',
                  margin: 'auto'
                }}
              >
                <Grid item xs={12}>
                  <CustomSwiperThumbnails images={data || []} direction={direction} />
                </Grid>
              </Grid>
            ) : (
              <Grid>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    flexDirection: 'column'
                  }}
                >
                  <Box>{showProgress && <ProgressCustomization />}</Box>
                  <Box>
                    <Typography
                      sx={{
                        textTransform: fontStyling
                      }}
                      variant='h6'
                    >
                      No Attachments Found...
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Fragment>
        </KeenSliderWrapper>
      </Dialog>
    </Fragment>
  )
}

export default CustomSlider
