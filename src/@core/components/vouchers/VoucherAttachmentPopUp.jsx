import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAttachment } from 'src/store/apps/vouchers/Actions/getAttachment'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import { Grid, Chip, Divider, Typography, CardContent, List, ListItem } from '@mui/material'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { Box } from '@mui/system'

// ** Custom Components
import SwiperThumbnails from 'src/views/components/swiper/SwiperThumbnails'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// const LinkStyled = styled(Box)(({ theme }) => ({
//   fontWeight: 400,
//   fontSize: '1rem',
//   cursor: 'pointer',
//   textDecoration: 'none',
//   color: theme.palette.text.secondary,
//   '&:hover': {
//     color: theme.palette.primary.main
//   }
// }))

const VoucherAttachmentPopUp = ({ open, toggle, itemId }) => {
  const [attachment, setAttachment] = useState(null) // Initially setting data as null

  const handleClose = () => {
    toggle()
  }

  // ** Hook
  const dispatch = useDispatch()
  const {
    settings: { direction }
  } = useSettings()

  // Fetch data when itemId changes
  useEffect(() => {
    if (itemId) {
      dispatch(getAttachment({ id: itemId }))
    }
  }, [itemId, dispatch])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state.getAttachment?.data?.value)
  useEffect(() => {
    if (fetchData && fetchData.length > 0) setAttachment(fetchData)
  }, [fetchData])

  console.log('data of attachment', attachment)

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{ height: '100%' }}
      >
        <Fragment>
          <CustomHeader title={`Voucher Attachments `} handleClose={handleClose} divider={false} />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Divider sx={{ mb: 2 }}>
              <Chip label='Voucher Attachments ' color='primary' variant='outlined' />
            </Divider>
            <KeenSliderWrapper>
              {attachment ? (
                <CardContent>
                  {attachment?.length > 0 ? (
                    <Grid container spacing={2} sx={{ p: 3 }}>
                      <Grid item xs={12}>
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
                      <Typography variant='h6'>No Attachments Found</Typography>
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
                    <Box>
                      <ProgressCustomization />
                    </Box>
                    <Box>
                      <Typography variant='h6'>No Attachments Found...</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </KeenSliderWrapper>
          </DialogContent>
        </Fragment>
      </Dialog>
    </Fragment>
  )
}

export default VoucherAttachmentPopUp
