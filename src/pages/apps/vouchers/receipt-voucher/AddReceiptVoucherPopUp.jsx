import { DialogContent } from '@mui/material'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import AddReceiptVoucher from './AddReceiptVoucher'
import CustomDialog from 'src/@core/Global/CustomDialog'

const AddReceiptVoucherPopUp = ({ open, toggle }) => {
  return (
    <CustomDialog open={open} toggle={toggle}>
      <CustomHeader title='Add Receipt Voucher' handleClose={toggle} divider={false} />
      <DialogContent>
        <AddReceiptVoucher />
      </DialogContent>
    </CustomDialog>
  )
}

export default AddReceiptVoucherPopUp
