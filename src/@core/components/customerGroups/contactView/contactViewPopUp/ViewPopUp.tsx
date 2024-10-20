
// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import StepperView from './StepperView'
import CustomDialog from 'src/@core/Global/CustomDialog'


// import StepperStoreSuppliers from 'src/views/apps/contacts/suppliers/StepperStoreSuppliers'

// ** Styled close button
const CustomCloseButton =
  styled(IconButton)<IconButtonProps>
    (({ theme }) => ({
      top: '2.9rem',
      borderRadius: 8,
      right: '1.5rem',
      position: 'absolute',
      padding: theme.spacing(1.5),
      boxShadow: theme.shadows[3],
      marginTop: theme.spacing(-6),
      transition: 'all .23s ease .1s',
      transform: 'translate(23px, -25px)',
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        transform: 'translate(20px, -20px)',
        backgroundColor: theme.palette.background.paper
      },
      zIndex: 1000
    }))

const ViewPopUp = ({ open, toggle, isEdit, itemId, contact, contactData }: any) => {

   console.log('data from view popup isEdit', isEdit, 'itemId', itemId, 'contact', contact, 'contactData', contactData)
  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>
      <CustomDialog open={open}
        toggle={handleClose}
        maxWidth='md'

        width={"90vw"}



      >
        <DialogTitle id='customized-dialog-title' sx={{ position: 'relative' }}>
          <Typography
            variant='h6'
            component='span'
            sx={{
              textTransform: 'capitalize'
            }}
          >
            Information of {contact}
          </Typography>
          <CustomCloseButton size='small' aria-label='close' onClick={handleClose}>
            <Icon icon='bx:x' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '0 !important'
          }}
        >
          <StepperView ContactData={contactData} />
        </DialogContent>
      </CustomDialog>
    </Fragment>
  )
}

export default ViewPopUp
