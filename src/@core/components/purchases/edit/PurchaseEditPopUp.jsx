// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Mui imports
import { Grid } from '@mui/material'

// ** Custom Components
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from '../../customDialogHeader/CustomHeader'
import EditPurchaseCard from './EditPurchaseCard'

const PurchaseEditPopUp = ({ open, toggle, id }) => {
  return (
    <CustomDialog open={open} handleClose={toggle}>
      <CustomHeader divider={true} title='Edit Purchase' handleClose={toggle} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DatePickerWrapper>
            <EditPurchaseCard id={id} />
          </DatePickerWrapper>
        </Grid>
      </Grid>
    </CustomDialog>
  )
}

export default PurchaseEditPopUp
