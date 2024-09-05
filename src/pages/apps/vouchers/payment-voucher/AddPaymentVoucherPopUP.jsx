import { DialogContent } from '@mui/material'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import AddPaymentVoucherForm from './AddPaymentVoucherForm'
import CustomDialog from 'src/@core/Global/CustomDialog'

const AddReceiptVoucherPopUp = ({ open, toggle }) => {
  return (
    <CustomDialog open={open} toggle={toggle}>
      <CustomHeader title='Add Payment Voucher ✨' handleClose={toggle} divider={false} />
      <DialogContent>
        <AddPaymentVoucherForm />
      </DialogContent>
    </CustomDialog>
  )
}

export default AddReceiptVoucherPopUp
