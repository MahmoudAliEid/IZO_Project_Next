// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import StepperRoles from './Stepper'

const RolesDialogForm = ({ open, toggle, isEdit, itemId }) => {
  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        width='100%'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{ height: '100%' }}
      >
        <CustomHeader title={isEdit ? 'Edit Role ' : 'Add Role '} handleClose={handleClose} divider={true} />
        <DialogContent
          sx={{
            padding: '0 !important'
          }}
        >
          <StepperRoles isEdit={isEdit} itemId={itemId} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default RolesDialogForm
