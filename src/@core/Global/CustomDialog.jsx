import { Dialog } from '@mui/material'
// ** Cookies
import { getCookie } from 'cookies-next'

const CustomDialog = ({ open, toggle, children, width, maxWidth }) => {
  const transText = getCookie('fontStyle')

  return (
    <Dialog
      open={open}
      onClose={toggle}
      fullWidth
      maxWidth={maxWidth ? maxWidth : null}
      sx={{
        '& .MuiDialog-paper': {
          width: width ? width : '90vw',
          maxWidth: '90vw',
          minWidth: '300px'
        },
        fontStyle: transText
      }}
    >
      {children}
    </Dialog>
  )
}

export default CustomDialog
