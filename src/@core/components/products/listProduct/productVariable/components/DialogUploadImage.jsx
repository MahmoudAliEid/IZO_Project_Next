import { useState } from 'react'

// ** Third Party Components
import { Button, Card, CardActions, Dialog } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import ImageUploadVariable from './ImageUploadVariable'

const DialogUploadImage = ({ open, handleClose, name, setFieldValue, value }) => {
  const [isNotDone, setIsNotDone] = useState(true)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 'calc(100% - 1rem)' } }}
      maxWidth='md'
      fullWidth
      scroll='body'
    >
      <Card sx={{ p: 10 }}>
        <ImageUploadVariable name={name} setFieldValue={setFieldValue} value={value} setIsNotDone={setIsNotDone} />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} disabled={!isNotDone} variant='outlined' color='error'>
            <Icon icon='eva:close-fill' />
            Cancel
          </Button>
          <Button onClick={handleClose} disabled={isNotDone} variant='contained'>
            <Icon icon='eva:checkmark-fill' />
            Done
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}
export default DialogUploadImage
