import { Dialog } from '@mui/material'
// ** Cookies
import { getCookie } from 'cookies-next'

const CustomDialog = ({ open, toggle, children }) => {
  const transText = getCookie('fontStyle')

  return (
    <Dialog
      open={open}
      onClose={toggle}
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: '90vw',
          maxWidth: '90vw',
          minWidth: '300px'
        },
        fontStyle: transText
      }}
    >
      {...children}
    </Dialog>
  )
}

export default CustomDialog
