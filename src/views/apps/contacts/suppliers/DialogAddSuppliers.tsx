
// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports

import Dialog from '@mui/material/Dialog'
// import { styled } from '@mui/material/styles'

import DialogContent from '@mui/material/DialogContent'

// import IconButton, { IconButtonProps } from '@mui/material/IconButton'


// ** Icon Imports
import StepperStoreSuppliers from './StepperStoreSuppliers'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'

// ** Styled close button
// const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
//   top: '2.9rem',
//   borderRadius: 8,
//   right: '1.5rem',
//   position: 'absolute',
//   padding: theme.spacing(1.5),
//   boxShadow: theme.shadows[3],
//   marginTop: theme.spacing(-6),
//   transition: 'all .23s ease .1s',
//   transform: 'translate(23px, -25px)',
//   backgroundColor: theme.palette.background.paper,
//   '&:hover': {
//     transform: 'translate(20px, -20px)',
//     backgroundColor: theme.palette.background.paper
//   },
//   zIndex: 1000
// }))



const DialogAddSuppliers = ({ isView, open, toggle, isEdit, itemId, contact }: any) => {
  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>
      <Dialog open={open}  maxWidth='lg' sx={{height:'100vh'}} fullWidth={true} onClose={handleClose} aria-labelledby='max-width-dialog-title'>
        <CustomHeader
          title={isEdit ? `Edit ${contact}` : `Add New ${contact}`}
          handleClose={handleClose}
          divider={false}
        />
        <DialogContent
          sx={{
            padding: '0 !important'
          }}
        >
          {

            <StepperStoreSuppliers isView={isView} isEdit={isEdit} itemId={itemId} contact={contact} />

          }
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default DialogAddSuppliers
