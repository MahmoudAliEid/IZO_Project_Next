// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports

import DialogContent from '@mui/material/DialogContent'
import StepperAddProduct from './StepperAddProduct'
import CustomHeader from '../../../customDialogHeader/CustomHeader'
import CustomDialog from 'src/@core/Global/CustomDialog'

const FormProduct = ({ isEdit, open, toggle, itemId, addOpeningStock }) => {
  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>
      <CustomDialog open={open} toggle={handleClose}>
        <CustomHeader title={isEdit ? `Update Product ` : `Add Product `} handleClose={handleClose} />
        <DialogContent
          sx={{
            padding: '0 !important'
          }}
        >
          {
            <StepperAddProduct
              isEdit={isEdit}
              itemId={itemId}
              handleClose={handleClose}
              addOpeningStock={addOpeningStock}
            />
          }
        </DialogContent>
      </CustomDialog>
    </Fragment>
  )
}

export default FormProduct
