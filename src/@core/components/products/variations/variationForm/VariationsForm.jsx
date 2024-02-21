import { useState } from 'react'
import {
  TextField,
  FormControl,
  Chip,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  Button,
  Box,
  Grid
} from '@mui/material'
import { Formik } from 'formik'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import { useSelector } from 'react-redux'

const VariationsForm = ({ type, open, setOpen, handleSubmit, openLoading, setOpenLoading }) => {
  const [listValues, setListValues] = useState([])
  const [currValue, setCurrValue] = useState('')
  const [vName, setVName] = useState('')

  // ** Selectors
  const saveStatus = useSelector(state => state.postCreateVariations)

  const formInputData = {
    name: vName,
    items: listValues
  }

  const handleChangeTwo = e => {
    setCurrValue(e.target.value)
  }

  const handleClose = () => {
    setVName('')
    setListValues([])
    setOpen(false)
  }
  const handleDelete = (item, index) => {
    let arr = [...listValues]
    arr.splice(index, 1)
    setListValues(arr)
  }
  const handleKeyUp = e => {
    if (e.keyCode === 32 && currValue.trim() !== '') {
      setListValues(oldState => [...oldState, currValue])
      setCurrValue('')
    }
  }

  return (
    <>
      <Dialog
        scroll='body'
        open={open}
        onClose={handleClose}
        aria-labelledby='customer-group-edit'
        sx={{
          '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] },
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
          {type} Variation Information
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText variant='body2' id='customer-group-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            Variations details will receive a privacy audit.
          </DialogContentText>
          <Formik initialValues={formInputData} onSubmit={handleSubmit} enableReinitialize={true}>
            {({ handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label='Variation Name'
                        value={vName}
                        onChange={e => {
                          setVName(e.target.value)
                        }}
                        onBlur={handleBlur}
                        name='name'
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label='Add Variation Values'
                        helperText='Press space to add'
                        value={currValue}
                        onChange={event => handleChangeTwo(event)}
                        onKeyDown={handleKeyUp}
                        name='items'
                        required
                        InputProps={{
                          endAdornment: (
                            <Grid container spacing={6}>
                              <Grid item sx={12}>
                                {listValues &&
                                  listValues.map((item, index) => (
                                    <Chip
                                      sx={{ margin: '5px' }}
                                      size='small'
                                      onDelete={() => handleDelete(item, index)}
                                      label={item}
                                      key={index}
                                    />
                                  ))}
                              </Grid>
                            </Grid>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, flexDirection: 'row-reverse' }}>
                  <Button size='large' type='submit' variant='contained' sx={{ ml: 3 }}>
                    Add
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      {openLoading && (
        <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={saveStatus} />
      )}
    </>
  )
}

export default VariationsForm
