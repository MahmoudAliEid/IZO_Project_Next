// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Typography, Button } from '@mui/material'

const MainDone = ({ isDone }) => {
  const [open, setOpen] = useState(isDone)
  const handleCloseAlert = () => {
    setOpen(prev => !prev)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        fullWidth
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>IZO </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <CheckCircleIcon color='success'></CheckCircleIcon>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CheckCircleIcon />} variant='contained' color='success' onClick={handleCloseAlert}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
export default MainDone
