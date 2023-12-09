import { useState, useEffect } from 'react'
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
import { fetchEditVariations } from 'src/store/apps/products/variations/getEditVariationsSlice'
import { useDispatch, useSelector } from 'react-redux'
import VariationsTable from './VariationsTable'
import useSubmitEdit from 'src/hooks/useSubmitEdit'

// import { getCookie } from 'cookies-next'

// import { fetchVariations } from 'src/store/apps/products/variations/getVariationsSlice'
// import { postEditVariations } from 'src/store/apps/products/variations/postEditVariationsSlice'

const VariationFormEdit = ({ type, open, setOpen, itemId, mainData, setMainData }) => {
  const [listValues, setListValues] = useState([])
  const [currValue, setCurrValue] = useState('')
  const [vName, setVName] = useState('')
  const [data, setData] = useState({})
  const dataEdit = useSelector(state => state?.getEditVariations?.data?.value[0])
  const [oldListData, setOldListData] = useState([])

  // const [testData,setTestData]=useState('')

  const formInputData = {
    name: vName,
    items: listValues
  }

  const { handleSubmitEdit } = useSubmitEdit()

  //set old list data just one time
  // if (dataEdit !== null && dataEdit !== undefined) {
  //   setOldListData(dataEdit.list)
  // }
  console.log(oldListData, 'oldListData')

  const dispatch = useDispatch()
  useEffect(() => {
    if (dataEdit !== null && dataEdit !== undefined) {
      setData(dataEdit)

      setOldListData(dataEdit.list)
    }
  }, [dataEdit])

  useEffect(() => {
    if (data) {
      setVName(data.name)
    }
  }, [data])

  console.log('name', data.name)

  useEffect(() => {
    if (itemId) {
      //@ts-ignore
      dispatch(fetchEditVariations({ itemId }))
    }
  }, [dispatch, itemId])

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

  // const cookieDataString = getCookie('oldVariations')
  // const cookieData = cookieDataString ? JSON.parse(cookieDataString) : []

  // const CookieData = cookieData ?? []

  // console.log(`cookies old Variations: ${typeof CookieData}`)

  // const mainData = CookieData => {
  //   const arrOfObjects = []
  //   for (const object of CookieData) {
  //     arrOfObjects.push(object)
  //   }

  //   return arrOfObjects
  // }

  // const MainDataArray = mainData(CookieData)

  const handleSubmit = (values, { resetForm }) => {
    console.log(values, 'values from Edit variations')
    console.log(itemId, 'from submit Edit variations')
    handleSubmitEdit(values, itemId, oldListData)
    setOpen(false)
    resetForm()

    // Function to find and update an object by id
    function updateObjectById(arr, id, updatedData) {
      const targetObject = arr.find(obj => obj.id === id)

      if (targetObject) {
        // Object found, update it
        Object.assign(targetObject, updatedData)
      } else {
        // Object with the given id not found
        console.log(`Object with id ${id} not found`)
      }
    }

    // Example: Update the object with id 27
    const updateDate = updateObjectById(mainData, itemId, {
      // id: Math.floor(Math.random()),
      list: values.items.map(item => ({
        name: item
      })),
      ...values
    })

    setMainData(updateDate)
  }

  return (
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
                <Grid item sx={12}>
                  <VariationsTable itemId={itemId} oldListData={oldListData} setOldListData={setOldListData} />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                  Update
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        {/* <Grid container spacing={6}>
          <VariationsTable data={data?.list} />
        </Grid> */}
      </DialogContent>
    </Dialog>
  )
}

export default VariationFormEdit
