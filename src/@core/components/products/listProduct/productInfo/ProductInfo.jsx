/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react'
import { EditorState, convertToRaw, convertToHTML } from 'draft-js'

// ** MUI
import {
  Grid,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Icon,
  Checkbox,
  FormControlLabel,
  Typography,
  FormHelperText
} from '@mui/material'

// ** Components
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import ProductUnitForm from '../subForms/ProductUnitForm'
import ProductCategoryForm from '../subForms/ProductCategoryForm'
import DialogAddBrands from 'src/pages/apps/products/brands/DialogAddBrands'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

const ProductInfo = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  // ** State
  const [openUnit, setOpenUnit] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubcategory, setOpenSubCategory] = useState(false)
  const [warrantiesData, setWarrantiesData] = useState([])
  const [unitsData, setUnitsData] = useState([])
  const [brandsData, setBrandsData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [subCategoriesData, setSubCategoriesData] = useState([])
  const [businessLocationsData, setBusinessLocationsData] = useState([])
  const [barcodeTypeData, setBarcodeTypeData] = useState([])

  // const [checkBox, setCheckBox] = useState(false)
  const [filteredSubCategoriesData, setFilteredSubCategoriesData] = useState([])

  // ** Selectors
  const productData = useSelector(state => state.getCreateProduct?.data?.value)
  const { warranties, units, brands, categories, sub_categories, business_locations, barcode_type } = productData

  // ** Hook
  const dispatch = useDispatch()

  useEffect(() => {
    const filteredSubCategories = subCategoriesData.filter(
      subCategory => subCategory.value.parent === initialValues.category_id
    )
    setFilteredSubCategoriesData(filteredSubCategories.length ? filteredSubCategories : [])
  }, [subCategoriesData, initialValues.category_id])
  useEffect(() => {
    dispatch(fetchCreateProduct())
  }, [dispatch])
  useEffect(() => {
    if (warranties) {
      setWarrantiesData(warranties)
    }
    if (units) {
      setUnitsData(units)
    }
    if (brands) {
      setBrandsData(brands)
    }
    if (categories) {
      setCategoriesData(categories)
    }
    if (sub_categories) {
      setSubCategoriesData(sub_categories)
    }
    if (business_locations) {
      setBusinessLocationsData(business_locations)
    }
    if (barcode_type) {
      setBarcodeTypeData(barcode_type)
    }
  }, [warranties, units, brands, categories, sub_categories, business_locations, barcode_type])

  // ** Functions
  // const handleOnChangeCheck = () => {
  //   setCheckBox(prev => !prev)
  //   setFieldValue('enable_stock', checkBox)
  // }
  const handleUnitOnClick = () => {
    setOpenUnit(true)
  }
  const handleBrandOnClick = () => {
    setOpenBrand(true)
  }
  const handleCategoryOnClick = () => {
    setOpenCategory(true)
  }
  const handleSubCategoryOnClick = () => {
    setOpenSubCategory(true)
  }
  const toggleBrand = () => {
    setOpenBrand(prev => !prev)
  }

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Product Name'
            value={initialValues.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name ? String(errors.name) : ''}
            name='name'
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Main Code'
            value={initialValues.code}
            onChange={handleChange}
            name='code'
            onBlur={handleBlur}
            error={touched.code && !!errors.code}
            helperText={touched.code && errors.code ? String(errors.code) : ''}
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Sub Code'
            value={initialValues.code2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.code2 && !!errors.code2}
            helperText={touched.code2 && errors.code2 ? String(errors.code2) : ''}
            name='code2'
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Barcode Type</InputLabel>
          <Select
            value={initialValues.barcode_type}
            onChange={handleChange}
            name='barcode_type'
            id='demo-simple-select'
            label='Barcode Type'
            fullWidth
            onBlur={handleBlur}
            error={touched.barcode_type && !!errors.barcode_type}
            helperText={touched.barcode_type && errors.barcode_type ? String(errors.barcode_type) : ''}
          >
            <MenuItem value=''>
              <em>Select a brand</em>
            </MenuItem>
            {barcodeTypeData.map(code => (
              <MenuItem key={code.id} value={code.id}>
                {code.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
              <Select
                value={initialValues.unit_id}
                onChange={handleChange}
                name='unit_id'
                id='demo-simple-select'
                label='Unit'
                fullWidth
                onBlur={handleBlur}
                error={touched.unit_id && !!errors.unit_id}
                helperText={touched.unit_id && errors.unit_id ? String(errors.unit_id) : ''}
              >
                <MenuItem value=''>
                  <em>Select a unit</em>
                </MenuItem>
                {unitsData.map(unit => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleUnitOnClick}
              sx={{ textAlign: 'center', height: '100%' }}
              color='primary'
              variant='contained'
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Brand</InputLabel>
              <Select
                value={initialValues.brand_id}
                onChange={handleChange}
                name='brand_id'
                id='demo-simple-select'
                label='Brand'
                fullWidth
                onBlur={handleBlur}
                error={touched.brand_id && !!errors.brand_id}
                helperText={touched.brand_id && errors.brand_id ? String(errors.brand_id) : ''}
              >
                <MenuItem value=''>
                  <em>Select a brand</em>
                </MenuItem>
                {brandsData.map(brand => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} justifyContent={'center'}>
            <Button
              onClick={handleBrandOnClick}
              sx={{ textAlign: 'center', height: '100%' }}
              color='primary'
              variant='contained'
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                value={initialValues.category_id}
                onChange={handleChange}
                name='category_id'
                id='demo-simple-select'
                label='Category'
                fullWidth
                onBlur={handleBlur}
                error={touched.category_id && !!errors.category_id}
                helperText={touched.category_id && errors.category_id ? String(errors.category_id) : ''}
              >
                <MenuItem value=''>
                  <em>Select a category</em>
                </MenuItem>
                {categoriesData.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleCategoryOnClick}
              sx={{ textAlign: 'center', height: '100%' }}
              color='primary'
              variant='contained'
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Sub Category</InputLabel>
              <Select
                value={initialValues.sub_category_id}
                onChange={handleChange}
                name='sub_category_id'
                id='demo-simple-select'
                label='Sub Category'
                fullWidth
                onBlur={handleBlur}
                error={touched.sub_category_id && !!errors.sub_category_id}
                helperText={touched.sub_category_id && errors.sub_category_id ? String(errors.sub_category_id) : ''}
              >
                <MenuItem value=''>
                  <em>Select a Sub Category</em>
                </MenuItem>
                {filteredSubCategoriesData.map(subCategory => (
                  <MenuItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleSubCategoryOnClick}
              sx={{ textAlign: 'center', height: '100%' }}
              color='primary'
              variant='contained'
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Business Locations</InputLabel>
          <Select
            value={initialValues.location}
            onChange={handleChange}
            name='location'
            id='demo-simple-select'
            label='Business Locations'
            fullWidth
            onBlur={handleBlur}
            error={touched.location && !!errors.location}
            helperText={touched.location && errors.location ? String(errors.location) : ''}
          >
            <MenuItem value=''>
              <em>Select a location</em>
            </MenuItem>
            {businessLocationsData.map(location => (
              <MenuItem key={location.id} value={location.id}>
                {location.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

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
                  setFieldValue('enable_stock', e.target.checked === true ? true : false)
                }}
                onBlur={handleBlur}
                error={touched.enable_stock && !!errors.enable_stock}
              />
            }
          />
          <FormHelperText>Enable stock management at product level</FormHelperText>
        </FormControl>
      </Grid>

      {initialValues.enable_stock === true ? (
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
          <ReactDraftWysiwyg
            editorState={initialValues.long_description}
            onEditorStateChange={data => setFieldValue('long_description', data)}
          />
        </EditorWrapper>
      </Grid>

      <Grid item xs={12} className='match-height'>
        <Typography variant='h6'>Short Description</Typography>
        <EditorWrapper>
          <ReactDraftWysiwyg
            editorState={initialValues.short_description}
            onEditorStateChange={data => setFieldValue('short_description', data)}
          />
        </EditorWrapper>
      </Grid>

      {/* Forms */}
      {openBrand && <DialogAddBrands open={openBrand} toggle={toggleBrand} isEdit={false} />}
      {openUnit && <ProductUnitForm open={openUnit} setOpen={setOpenUnit} />}
      {openCategory && <ProductCategoryForm subCat={false} open={openCategory} setOpen={setOpenCategory} />}
      {openSubcategory && <ProductCategoryForm subCat={true} open={openSubcategory} setOpen={setOpenSubCategory} />}
    </Grid>
  )
}

export default ProductInfo
