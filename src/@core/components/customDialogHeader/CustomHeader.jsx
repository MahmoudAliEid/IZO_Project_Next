import { Button, DialogTitle, Divider, Typography } from '@mui/material'
import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Cookies
import { getCookie } from 'cookies-next'

const CustomHeader = ({ title, handleClose, divider }) => {
  const [hover, setHover] = useState(false)
  const transText = getCookie('fontStyle')

  return (
    <>
      <DialogTitle id='customized-dialog-title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant='h6'
          component='span'
          sx={{
            textTransform: 'capitalize',
            textTransform: transText
          }}
        >
          {title}
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
      {divider === false ? null : <Divider />}
    </>
  )
}

export default CustomHeader
