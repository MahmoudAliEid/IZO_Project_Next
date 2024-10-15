import { useState } from 'react'

// ** Mui
import { Box, Button } from '@mui/material'

import EditorPopUp from './EditorPopUp'

const CustomDescription = ({ name, value, setFieldValue }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m: 2
      }}
    >
      <Button
        variant='outlined'
        onClick={() => {
          toggle()
        }}
      >
        Show Description
      </Button>
      {open && (
        <EditorPopUp
          editorValue={value}
          open={open}
          toggle={toggle}
          setFieldValue={setFieldValue}
          fieldName={name}
          isEdit={true}
        />
      )}
    </Box>
  )
}
export default CustomDescription
