// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'

const DeleteGlobalAlert = ({ open, close, mainHandleDelete }) => {
  const handleDelete = () => {
    mainHandleDelete()
    close()
  }

  const handleCloseAlert = () => close()

  return (
    <Fragment>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete !</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Button
            startIcon={<CancelIcon />}
            size='small'
            variant='contained'
            color='success'
            onClick={handleCloseAlert}
          >
            Cancel
          </Button>

          <Button size='small' startIcon={<DeleteIcon />} variant='contained' color='error' onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteGlobalAlert
