import { useState } from 'react'

// ** Third Party Components
import { IconButton } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import DialogUploadImage from './DialogUploadImage'

const CustomButtonUploadImage = ({ value, name, setFieldValue }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <IconButton onClick={handleOpen} color='primary'>
        <Icon icon={value && value.length > 0 ? 'bx:bx-image' : 'bx:bx-upload'} fontSize={20} />
      </IconButton>

      {
        <DialogUploadImage
          open={open}
          handleClose={handleClose}
          name={name}
          setFieldValue={setFieldValue}
          value={value}
        />
      }
    </>
  )
}

export default CustomButtonUploadImage
