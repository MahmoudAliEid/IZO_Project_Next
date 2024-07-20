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
import { Box, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'

const DeleteGlobalAlert = ({
  name,
  open,
  close,
  mainHandleDelete,
  customName = null,
  customDescription = null,
  nameOfAction = null
}) => {
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
        <DialogTitle id='alert-dialog-title' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>{customName ? customName : `Delete ${name}`}</Typography>
          <Box color={'error'}>
            <WarningIcon sx={{ fontSize: '35px' }} color='error' />
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {customDescription
              ? customDescription
              : `Are you
            sure you want to delete this ${name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CancelIcon />} variant='contained' color='success' onClick={handleCloseAlert}>
            Cancel
          </Button>

          <Button startIcon={<DeleteIcon />} variant='outlined' color='error' onClick={handleDelete}>
            {nameOfAction ? nameOfAction : `Delete`}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteGlobalAlert
