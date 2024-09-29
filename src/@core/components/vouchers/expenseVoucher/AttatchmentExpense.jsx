import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Components
import { Grid, Chip, Divider, Typography, CardContent, List, ListItem, DialogContent, Box } from '@mui/material'

// ** Custom Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import SwiperThumbnails from 'src/views/components/swiper/SwiperThumbnails'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** cookies
import { getCookie } from 'cookies-next'
import { attachmentExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/Actions/getAttachmentExpenseVoucher'
import CustomDialog from 'src/@core/Global/CustomDialog'

const AttachmentExpense = ({ open, toggle, id }) => {
  const [attachment, setAttachment] = useState(null) // Initially setting data as null
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

  // ** Hook
  const dispatch = useDispatch()
  const {
    settings: { direction }
  } = useSettings()

  useEffect(() => {
    if (id) {
      dispatch(attachmentExpenseVoucher({ id }))
    }
  }, [id, dispatch])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state.getAttachmentExpenseVoucher?.data?.value)

  useEffect(() => {
    if (fetchData) {
      setAttachment(fetchData)
    }
  }, [fetchData])

  return (
    <Fragment>
      <KeenSliderWrapper>
        <CustomDialog open={open} toggle={handleClose}>
          <Fragment>
            <CustomHeader title={`Expense Voucher Attachments `} handleClose={handleClose} divider={false} />
            <DialogContent sx={{ padding: '0 !important' }}>
              <Divider sx={{ mb: 2 }}>
                <Chip
                  label='Expense Voucher Attachments '
                  color='primary'
                  variant='outlined'
                  sx={{
                    '& .MuiChip-label': {
                      textTransform: fontStyling
                    }
                  }}
                />
              </Divider>

              {attachment ? (
                <CardContent>
                  {attachment?.length > 0 ? (
                    <Grid container spacing={2} justifyContent={'center'}>
                      <Grid item xs={6}>
                        <SwiperThumbnails images={attachment || []} direction={direction} />
                      </Grid>
                      <Grid item xs={12}>
                        {attachment?.files && (
                          <List>
                            {attachment?.files.map(file => (
                              <ListItem key={file.name}>
                                <div className='file-details'>
                                  <div className='file-preview'>
                                    <Icon icon='bx:file' />
                                  </div>
                                  <div>
                                    <Typography className='file-name'>{file.name}</Typography>
                                    <Typography className='file-size' variant='body2'>
                                      {Math.round(file.size / 100) / 10 > 1000
                                        ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                                        : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                                    </Typography>
                                  </div>
                                </div>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography
                        sx={{
                          textTransform: fontStyling
                        }}
                        variant='h6'
                      >
                        No Attachments Found
                      </Typography>
                    </Box>
                  )}
                </CardContent>
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
            </DialogContent>
          </Fragment>
        </CustomDialog>
      </KeenSliderWrapper>
    </Fragment>
  )
}

export default AttachmentExpense
