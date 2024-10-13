// ** Custom Component
import CustomDialog from 'src/@core/Global/CustomDialog'

// ** MUI
import { Box, Button, DialogActions } from '@mui/material'
import Editor from 'src/@core/Global/Editor'
import CustomHeader from '../customDialogHeader/CustomHeader'

// ** Cookies
import { getCookie } from 'cookies-next'

const EditorPopUp = ({ open, toggle, editorValue, fieldName, setFieldValue, isEdit }) => {
  const transText = getCookie('fontStyle')

  return (
    <CustomDialog open={open} toggle={toggle} maxWidth={'md'}>
      <CustomHeader divider={true} handleClose={toggle} title={'Description'} />
      <Box
        sx={{
          margin: 'auto 0',
          textTransform: transText,
          p: 2
        }}
      >
        <Editor editorValue={editorValue} fieldName={fieldName} setFieldValue={setFieldValue} isEdit={isEdit} />
      </Box>
      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            textTransform: transText,
            my: 2
          }}
        >
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              toggle()
            }}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </CustomDialog>
  )
}

export default EditorPopUp
