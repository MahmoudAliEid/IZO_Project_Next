// ** React Imports
import { useEffect, useState } from 'react'

//  ** Draft Js
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

// ** MUI
import {
  Grid,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  FormHelperText
} from '@mui/material'

// ** Components
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

const SecondInfo = ({
  initialValues,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  updatingProductData,
  isEdit
}) => {
  // ** for long description
  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(initialValues.long_description))
  const editorDataState = EditorState.createWithContent(contentDataState)

  // ** for short description
  const contentDataState2 = ContentState.createFromBlockArray(convertFromHTML(initialValues.short_description))
  const editorDataState2 = EditorState.createWithContent(contentDataState2)

  // ** State
  const [warrantiesData, setWarrantiesData] = useState([])

  // ** States for Editor
  const [editorState, setEditorState] = useState(editorDataState)
  const [editorState2, setEditorState2] = useState(editorDataState2)

  // ** Selectors
  const warranties = useSelector(state => state.getCreateProduct?.data?.value?.warranties)

  // ** Hook
  const dispatch = useDispatch()

  // ** set descriptions when change
  useEffect(() => {
    if (updatingProductData.long_description && isEdit) {
      const contentDataState = ContentState.createFromBlockArray(convertFromHTML(updatingProductData.long_description))
      const editorDataState = EditorState.createWithContent(contentDataState)
      setEditorState(editorDataState)
    } else {
      // If long_description is empty, set editorState to an empty string
      setEditorState(EditorState.createEmpty())
    }

    // Cleanup function to clear editorState when component unmounts
    return () => {
      setEditorState(EditorState.createEmpty())
    }
  }, [updatingProductData.long_description, isEdit])

  useEffect(() => {
    let editorDataState2 = null

    if (updatingProductData.short_description && isEdit) {
      const contentDataState2 = ContentState.createFromBlockArray(
        convertFromHTML(updatingProductData.short_description)
      )
      editorDataState2 = EditorState.createWithContent(contentDataState2)
      setEditorState2(editorDataState2)
    } else {
      // If short_description is empty, set editorState2 to an empty string
      editorDataState2 = EditorState.createEmpty()
      setEditorState2(editorDataState2)
    }

    // Cleanup function to clear editorState2 when component unmounts
    return () => {
      editorDataState2 = EditorState.createEmpty()
      setEditorState2(editorDataState2)
    }
  }, [updatingProductData.short_description, isEdit])

  useEffect(() => {
    dispatch(fetchCreateProduct())
  }, [dispatch])
  useEffect(() => {
    if (warranties) {
      setWarrantiesData(warranties)
    }
  }, [warranties])

  // set Editor to main valuse
  useEffect(() => {
    if (editorState) {
      setFieldValue('long_description', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
  }, [editorState, setFieldValue])

  useEffect(() => {
    if (editorState2) {
      setFieldValue('short_description', draftToHtml(convertToRaw(editorState2.getCurrentContent())))
    }
  }, [editorState2, setFieldValue])

  // console.log(editorState, convertToRaw(editorState.getCurrentContent()), 'editorState this is  first one 💖💖💓')
  // console.log(editorState2, convertToRaw(editorState2.getCurrentContent()), 'editorState this is  second one 💌💟💟')
  const data = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  console.log(data)
  console.log('updated data', updatingProductData)

  return (
    <Grid container spacing={3} justifyContent={'center'} alignContent={'center'} alignItems={'center'} padding={3}>
      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Warranty</InputLabel>
          <Select
            value={initialValues.warranty_id}
            onChange={handleChange}
            name='warranty_id'
            id='demo-simple-select'
            label='Warranty'
            fullWidth
            onBlur={handleBlur}
            error={touched.warranty_id && !!errors.warranty_id}
            helperText={touched.warranty_id && errors.warranty_id ? String(errors.warranty_id) : ''}
          >
            <MenuItem value=''>
              <em>Select a warranty</em>
            </MenuItem>
            {warrantiesData.map(warranty => (
              <MenuItem key={warranty.id} value={warranty.id}>
                {warranty.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <FormControlLabel
            label='Manage Stock?'
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: 'text.secondary'
              }
            }}
            control={
              <Checkbox
                name='enable_stock'
                checked={initialValues.enable_stock}
                color='primary'
                onChange={e => {
                  setFieldValue('enable_stock', e.target.checked === true ? 1 : 0)
                }}
                onBlur={handleBlur}
                error={touched.enable_stock && !!errors.enable_stock}
              />
            }
          />
          <FormHelperText>Enable stock management at product level</FormHelperText>
        </FormControl>
      </Grid>

      {initialValues.enable_stock === 1 ? (
        <Grid item xs={12} lg={6} md={6} sm={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Alert Quantity'
              value={initialValues.alert_quantity}
              onChange={handleChange}
              name='alert_quantity'
              onBlur={handleBlur}
              error={touched.alert_quantity && !!errors.alert_quantity}
              helperText={touched.alert_quantity && errors.alert_quantity ? String(errors.alert_quantity) : ''}
            />
          </FormControl>
        </Grid>
      ) : null}

      <Grid item xs={12} className='match-height'>
        <Typography variant='h6'>Long Description</Typography>
        <EditorWrapper>
          <ReactDraftWysiwyg editorState={editorState} onEditorStateChange={data => setEditorState(data)} />
        </EditorWrapper>
      </Grid>

      <Grid item xs={12} className='match-height'>
        <Typography variant='h6'>Short Description</Typography>
        <EditorWrapper>
          <ReactDraftWysiwyg editorState={editorState2} onEditorStateChange={data => setEditorState2(data)} />
        </EditorWrapper>
      </Grid>
    </Grid>
  )
}

export default SecondInfo
