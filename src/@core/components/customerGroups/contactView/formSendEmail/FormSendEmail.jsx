// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
// import { EditorState } from 'draft-js'
import { EditorState, convertToRaw } from 'draft-js'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Styled Component Import
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Component Import

import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled'
// import Editors from 'src/pages/forms/form-elements/editor'

// Chip,
import {
  TextField,
  FormControl,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  Button,
  Box,
  Grid,
  Typography
} from '@mui/material'
import { Formik } from 'formik'

const FormSendEmail = ({ data, open, close }) => {
  // ** State
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty())
  const [initialValues, setInitialValues] = useState({
    toEmail: '',
    emailSubject: '',
    emailBody: EditorState.createEmpty(),
    cc: '',
    bcc: '',
    mobile: ''
  })

  useEffect(() => {
    if (data !== null && data !== undefined) {
      // set type of contact in initial values
      setInitialValues(prev => ({
        ...prev,
        toEmail: data.email || '',
        mobile: data.mobile || ''
      }))
    }
  }, [data])

  const handleClose = () => {
    close()
  }

  // Convert the raw data to a plain text string.
  const rawText = convertToRaw(editorValue.getCurrentContent())

  const handleSubmit = values => {
    // Log the results.
    console.log('editor Data as Text', rawText)

    console.log('handleSubmit', values)
    console.log('editor Data', editorValue)
  }

  return (
    <Dialog
      scroll='body'
      open={open}
      onClose={handleClose}
      aria-labelledby='customer-group-edit'
      sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 1000, p: [2, 10] },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }}
      aria-describedby='customer-group-edit-description'
    >
      <DialogTitle
        id='customer-group-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Send Notification - Send Ledger
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='customer-group-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          <Typography>Available Tags:</Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            (business_name), (business_logo), (contact_name), (balance_due)
          </Typography>
        </DialogContentText>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item lg={12} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      type='email'
                      label='To'
                      value={values.toEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='toEmail'
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      type='email'
                      label='Email Subject'
                      value={values.emailSubject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='emailSubject'
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='CC'
                      value={values.cc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='cc'
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='BCC'
                      value={values.bcc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='bcc'
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} className='match-height'>
                  <EditorWrapper>
                    <ReactDraftWysiwyg editorState={editorValue} onEditorStateChange={data => setEditorValue(data)} />
                  </EditorWrapper>
                </Grid>

                <Grid item lg={12} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label='Mobile'
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='mobile'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, justifyContent: 'center' }}>
                <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                  Send
                </Button>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default FormSendEmail
