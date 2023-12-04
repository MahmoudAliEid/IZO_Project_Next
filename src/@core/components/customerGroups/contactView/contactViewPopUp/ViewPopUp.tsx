/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import StepperView from './StepperView'

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
  const handleClose = () => {
    toggle()
  }

  return (
    <Fragment>
      <Dialog open={open} maxWidth='lg' fullWidth={true} onClose={handleClose} aria-labelledby='max-width-dialog-title'>
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
      </Dialog>
    </Fragment>
  )
}

export default ViewPopUp