// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { Box, Grid, Typography } from '@mui/material'

const MainLoading = ({ name, open }) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        fullWidth
        disableEscapeKeyDown={true}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>IZO</Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '20px'
                }}
              >
                <Box>
                  <ProgressCustomization />
                </Box>
                <Typography variant='body'>{name}...</Typography>
              </Box>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default MainLoading
