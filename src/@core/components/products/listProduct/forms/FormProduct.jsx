// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import StepperAddProduct from './StepperAddProduct'
import CustomHeader from '../../../customDialogHeader/CustomHeader'

const FormProduct = ({ isEdit, open, toggle, itemId }) => {
  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        scroll='body'
        maxWidth='lg'
        fullWidth={true}
        fullScreen={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <CustomHeader title={isEdit ? `Update Product ` : `Add Product `} handleClose={handleClose} />
        <DialogContent
          sx={{
            padding: '0 !important'
          }}
        >
          {<StepperAddProduct isEdit={isEdit} itemId={itemId} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default FormProduct
