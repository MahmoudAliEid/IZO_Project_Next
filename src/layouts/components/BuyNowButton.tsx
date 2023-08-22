// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const BuyNowButton = () => {
  return (
    <Box
      className='buy-now-button mui-fixed'
      sx={{ right: theme => theme.spacing(20), bottom: theme => theme.spacing(10), zIndex: 11, position: 'fixed' }}
    >
      <Button
        component='a'
        target='_blank'
        variant='contained'
        href='https://themeselection.com/item/sneat-mui-react-nextjs-admin-template/'
        sx={{
          backgroundColor: '#ff3e1d',
          boxShadow: '0 1px 20px 1px #ff3e1d !important',
          '&:hover': {
            boxShadow: 'none !important',
            backgroundColor: '#e6381a'
          }
        }}
      >
        Buy Now
      </Button>
    </Box>
  )
}

export default BuyNowButton
