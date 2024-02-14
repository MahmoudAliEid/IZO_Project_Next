
// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import DialogTitle from '@mui/material/DialogTitle'
// import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import StepperStoreUser from './StepperStoreUser'
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


const DialogAddUser = ({ open, toggle, isEdit, itemId }: any) => {

  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>

      <Dialog
        open={open}
        maxWidth="lg"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'

      >
        {/* <DialogTitle id='customized-dialog-title' sx={{ position: 'relative' }}>
          <Typography variant='h6' component='span'>
            {isEdit ? 'Edit User' : 'Add User'}
          </Typography>
          <CustomCloseButton size='small' aria-label='close' onClick={handleClose}>
            <Icon icon='bx:x' />
          </CustomCloseButton>
        </DialogTitle> */}
        <CustomHeader
          title={isEdit ? 'Edit User' : 'Add User'}
          handleClose={handleClose}
          divider
        />
        <DialogContent
          sx={{
            padding: '0 !important',
          }}
        >
          <StepperStoreUser isEdit={isEdit} itemId={itemId} />
        </DialogContent>

      </Dialog>
    </Fragment>
  )
}

export default DialogAddUser
