// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
// import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import StepperAddProduct from './StepperAddProduct'

// ** Styled close button
// const CustomCloseButton = styled(Button)(({ theme }) => ({
//   top: '2.9rem',
//   // borderRadius: 8,

//   right: '1.5rem',
//   position: 'absolute',
//   padding: theme.spacing(1.5),
//   // boxShadow: theme.shadows[3],
//   // marginTop: theme.spacing(-6),
//   // transition: 'all .23s ease .1s',
//   // transform: 'translate(23px, -25px)',
//   // backgroundColor: theme.palette.warning,
//   // '&:hover': {
//   //   backgroundColor: theme.palette.error
//   // },
//   zIndex: 1000
// }))

const FormProduct = ({ isEdit, open, toggle, itemId }) => {
  // ** States
  const [hover, setHover] = useState(false)
  //** Test */
  console.log('open 🐱‍👤', open)
  console.log('toggle 🐱‍👤', toggle)
  console.log('itemId 🐱‍👤', itemId)
  console.log('isEdit 🐱‍👤', isEdit)
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
        <DialogTitle id='customized-dialog-title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant='h6'
            component='span'
            sx={{
              textTransform: 'capitalize'
            }}
          >
            {isEdit ? `Update Product` : `Add Product`}
          </Typography>

          <Button
            size='medium'
            aria-label='close'
            onClick={handleClose}
            // change variant to 'outlined' on hover and 'contained' if else to see the difference on hover
            variant={hover ? 'contained' : 'text'}
            onMouseEnter={() => {
              setHover(true)
            }}
            onMouseLeave={() => {
              setHover(false)
            }}
            color='error'
            sx={{
              // make the button on right top corner
              position: 'absolute',
              top: 0,
              right: 0,
              borderRadius: 0,
              borderToP: 'none !important',
              borderRight: 'none !important',
              padding: '0.5rem',
              '&:hover': {
                backgroundColor: 'error'
              }
            }}
          >
            <Icon icon='bx:x' />
          </Button>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '0 !important'
          }}
        >
          {/* <h1>Hi, I'm Mahmoud</h1> */}
          {<StepperAddProduct isEdit={isEdit} itemId={itemId} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default FormProduct
