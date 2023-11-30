// This is setup for create Adding new Product

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
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import StepperAddProduct from './StepperAddProduct'

// ** Styled close button
const CustomCloseButton = styled(IconButton)(({ theme }) => ({
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

const FormProduct = ({ open, toggle, isEdit, itemId }) => {
  //** Test */
  console.log('FormProduct open itemId toggle isEdit 🐱‍👤', open, itemId, toggle, isEdit)
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
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='customized-dialog-title' sx={{ position: 'relative' }}>
          <Typography
            variant='h6'
            component='span'
            sx={{
              textTransform: 'capitalize'
            }}
          >
            {isEdit ? `Update Product` : `Add Product`}
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
          {<StepperAddProduct isEdit={isEdit} itemId={itemId} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default FormProduct
