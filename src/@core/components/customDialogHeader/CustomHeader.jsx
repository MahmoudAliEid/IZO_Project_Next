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
          size='large'
          aria-label='close'
          onClick={handleClose}
          variant={hover ? 'contained' : 'text'}
          onMouseEnter={() => {
            setHover(true)
          }}
          onMouseLeave={() => {
            setHover(false)
          }}
          color='error'
          sx={{
            position: 'absolute',
            top: 3,
            right: 3,
            MozBorderRadiusTopright: 5,
            fontSize: '35px',
            border: '1px solid',
            padding: '0.5rem',
            '&:hover': {
              backgroundColor: 'error',
              border: 'none !important'
            }
          }}
        >
          <Icon sx={{ fontSize: '35px !important', width: '50px' }} icon='bx:x' />
        </Button>
      </DialogTitle>
      {divider === false ? null : <Divider />}
    </>
  )
}

export default CustomHeader
