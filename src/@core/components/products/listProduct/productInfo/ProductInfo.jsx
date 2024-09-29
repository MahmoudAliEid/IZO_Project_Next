// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI
import {
  Grid,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  FormHelperText,
  Chip,
  Box
} from '@mui/material'

// ** Components

import ProductUnitForm from '../subForms/ProductUnitForm'
import ProductCategoryForm from '../subForms/ProductCategoryForm'
import DialogAddBrands from 'src/pages/apps/products/brands/DialogAddBrands'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'

const ProductInfo = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  // ** State
  const [openUnit, setOpenUnit] = useState(false)
  const [openSubUnit, setOpenSubUnit] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubcategory, setOpenSubCategory] = useState(false)

  const [unitsData, setUnitsData] = useState([])
  const [subUnitsData, setSubUnitsData] = useState([])
  const [brandsData, setBrandsData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [subCategoriesData, setSubCategoriesData] = useState([])
  const [businessLocationsData, setBusinessLocationsData] = useState([])
  const [barcodeTypeData, setBarcodeTypeData] = useState([])
  const [selectedUnit, setSelectedUnit] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [newBrand, setNewBrand] = useState(false)
  const [newUnit, setNewUnit] = useState(false)
  const [filteredSubCategoriesData, setFilteredSubCategoriesData] = useState([])
  const [filteredSubUnitsData, setFilteredSubUnitsData] = useState([])

  // ** Selectors
  const units = useSelector(state => state.getCreateProduct?.data?.value?.units)
  const sub_units = useSelector(state => state.getCreateProduct?.data?.value?.sub_units)
  const brands = useSelector(state => state.getCreateProduct?.data?.value?.brands)
  const categories = useSelector(state => state.getCreateProduct?.data?.value?.categories)
  const sub_categories = useSelector(state => state.getCreateProduct?.data?.value?.sub_categories)
  const business_locations = useSelector(state => state.getCreateProduct?.data?.value?.business_locations)
  const barcode_type = useSelector(state => state.getCreateProduct?.data?.value?.barcode_type)

  // ** Hook
  const dispatch = useDispatch()

  useEffect(() => {
    const filteredSubCategories = subCategoriesData.filter(
      subCategory => subCategory.value.parent === initialValues.category_id
    )
    setFilteredSubCategoriesData(filteredSubCategories.length ? filteredSubCategories : [])
  }, [subCategoriesData, initialValues.category_id])

  // ** filter sub units
  useEffect(() => {
    const filteredSubUnits = subUnitsData.filter(subUnit => subUnit.parent_id === initialValues.unit_id)
    setFilteredSubUnitsData(filteredSubUnits.length ? filteredSubUnits : [])
  }, [subUnitsData, initialValues.unit_id])

  useEffect(() => {
    dispatch(fetchCreateProduct())
  }, [dispatch])
  useEffect(() => {
    if (units) {
      setUnitsData(units)
      if (newUnit) {
        setSelectedUnit(units.length > 0 ? units[units.length - 1].id : '')
      }
    }
    if (sub_units) {
      setSubUnitsData(sub_units)
    }
    if (brands) {
      setBrandsData(brands)
      if (newBrand) {
        setSelectedBrand(brands.length > 0 ? brands[brands.length - 1].id : '')
      }
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
  }, [units, sub_units, brands, categories, sub_categories, business_locations, barcode_type, newUnit, newBrand])

  // ** Functions
  const handleUnitOnClick = () => {
    setOpenUnit(true)
  }
  const handleSubUnitOnClick = () => {
    setOpenSubUnit(true)
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
    <Grid container spacing={3} justifyContent={'center'} alignContent={'center'} alignItems={'center'} padding={3}>
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
            required
            onChange={handleChange}
            name='barcode_type'
            id='demo-simple-select'
            label='Barcode Type'
            fullWidth
            onBlur={handleBlur}
            error={touched.barcode_type && !!errors.barcode_type}
            helperText={touched.barcode_type && errors.barcode_type ? String(errors.barcode_type) : ''}
          >
            {barcodeTypeData.map(code => (
              <MenuItem key={code.id} value={code.id}>
                {code.value}
              </MenuItem>
            ))}
          </Select>
          {touched.barcode_type && errors.barcode_type ? (
            <FormHelperText error={touched.barcode_type && !!errors.barcode_type}>
              {touched.barcode_type && errors.barcode_type ? String(errors.barcode_type) : null}
            </FormHelperText>
          ) : null}
        </FormControl>
      </Grid>

      <Grid
        item
        xs={12} // Adjusted to take full width in small screens
        lg={6}
        md={6}
        sm={12}
      >
        <FormControl fullWidth>
          <Grid container spacing={2}>
            <Grid item xs={9} md={10} lg={10}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
                <Select
                  value={initialValues.unit_id || selectedUnit}
                  disabled={initialValues.sub_unit_id && initialValues.sub_unit_id.length > 0 ? true : false}
                  onChange={handleChange}
                  required
                  name='unit_id'
                  id='demo-simple-select-label'
                  label='Unit'
                  fullWidth
                  onBlur={handleBlur}
                  error={touched.unit_id && !!errors.unit_id}
                  helperText={touched.unit_id && errors.unit_id ? String(errors.unit_id) : ''}
                >
                  {unitsData.map(unit => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} md={2} lg={2}>
              <Button
                onClick={handleUnitOnClick}
                sx={{ textAlign: 'center', height: '100%', width: '100%' }}
                color='primary'
                variant='contained'
              >
                <AddCircleOutline />
              </Button>
            </Grid>
          </Grid>
          <FormControl>
            <FormHelperText>
              {initialValues.sub_unit_id && initialValues.sub_unit_id.length > 0
                ? 'Disabled when select sub Units'
                : null}
            </FormHelperText>
            {touched.unit_id && !!errors.unit_id ? (
              <FormHelperText error={touched.unit_id && !!errors.unit_id}>
                {touched.unit_id && errors.unit_id ? String(errors.unit_id) : null}
              </FormHelperText>
            ) : null}
          </FormControl>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container spacing={2}>
          <Grid item xs={9} md={10} lg={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Sub Unit</InputLabel>
              <Select
                value={initialValues.sub_unit_id}
                onChange={handleChange}
                multiple
                name='sub_unit_id'
                id='demo-simple-select'
                label='Sub Unit'
                fullWidth
                renderValue={selected =>
                  filteredSubUnitsData && filteredSubUnitsData.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={filteredSubUnitsData.find(subUnit => subUnit.id === value)?.name || null}
                          onDelete={() => {
                            const updatedSubUnitIds = initialValues.sub_unit_id.filter(item => item !== value)
                            setFieldValue('sub_unit_id', updatedSubUnitIds)
                            setFilteredSubUnitsData(filteredSubUnitsData.filter(item => item.id !== value))
                          }}
                        />
                      ))}
                    </Box>
                  ) : null
                }
                onBlur={handleBlur}
                disabled={filteredSubUnitsData && filteredSubUnitsData.length ? false : true}
                error={touched.sub_unit_id && !!errors.sub_unit_id}
                helperText={touched.sub_unit_id && errors.sub_unit_id ? String(errors.sub_unit_id) : ''}
              >
                {initialValues.sub_unit_id.length >= 2 && (
                  <MenuItem value='' disabled>
                    <em>You can select only up to two sub units</em>
                  </MenuItem>
                )}
                {filteredSubUnitsData.map(subUnit => (
                  <MenuItem
                    key={subUnit.id}
                    value={subUnit.id}
                    disabled={initialValues.sub_unit_id.length >= 2 && !initialValues.sub_unit_id.includes(subUnit.id)}
                  >
                    {subUnit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2} lg={2} justifyContent={'center'}>
            <Button
              onClick={handleSubUnitOnClick}
              sx={{ textAlign: 'center', height: '100%', width: '100%' }}
              color='primary'
              variant='contained'
              disabled={initialValues.sub_unit_id.length >= 2}
            >
              <AddCircleOutline />
            </Button>
          </Grid>
          <FormControl>
            <FormHelperText>
              {filteredSubUnitsData && filteredSubUnitsData.length
                ? 'Sub Unit is limited to two units'
                : 'No sub Units'}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container spacing={2}>
          <Grid item xs={9} md={10} lg={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Brand</InputLabel>
              <Select
                value={initialValues.brand_id || selectedBrand}
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
          <Grid item xs={3} md={2} lg={2} justifyContent={'center'}>
            <Button
              onClick={handleBrandOnClick}
              sx={{ textAlign: 'center', height: '100%', width: '100%' }}
              color='primary'
              variant='contained'
            >
              <AddCircleOutline />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container spacing={2}>
          <Grid item xs={9} md={10} lg={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                value={initialValues.category_id}
                onChange={handleChange}
                required
                name='category_id'
                id='demo-simple-select'
                label='Category'
                fullWidth
                onBlur={handleBlur}
                error={touched.category_id && !!errors.category_id}
                helperText={touched.category_id && errors.category_id ? String(errors.category_id) : ''}
              >
                {categoriesData.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2} lg={2} justifyContent={'center'}>
            <Button
              onClick={handleCategoryOnClick}
              sx={{ textAlign: 'center', height: '100%', width: '100%' }}
              color='primary'
              variant='contained'
            >
              <AddCircleOutline />
            </Button>
          </Grid>
          <FormControl>
            <FormHelperText error={touched.category_id && !!errors.category_id}>
              {touched.category_id && errors.category_id ? String(errors.category_id) : null}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Grid container spacing={2}>
          <Grid item xs={9} md={10} lg={10}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Sub Category</InputLabel>
              <Select
                value={initialValues.sub_category_id}
                onChange={handleChange}
                required
                name='sub_category_id'
                id='demo-simple-select'
                label='Sub Category'
                fullWidth
                onBlur={handleBlur}
                renderValue={selected =>
                  filteredSubCategoriesData && filteredSubCategoriesData.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip
                        label={filteredSubCategoriesData.find(subCategory => subCategory.id === selected)?.value.name}
                        onDelete={() => {
                          const updatedSubCategoryIds = initialValues.sub_category_id.filter(item => item !== selected)
                          setFieldValue('sub_category_id', updatedSubCategoryIds)
                        }}
                      />
                    </Box>
                  ) : null
                }
                error={touched.sub_category_id && !!errors.sub_category_id}
                helperText={touched.sub_category_id && errors.sub_category_id ? String(errors.sub_category_id) : ''}
              >
                {filteredSubCategoriesData.map(subCategory => (
                  <MenuItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2} lg={2} justifyContent={'center'}>
            <Button
              onClick={handleSubCategoryOnClick}
              sx={{ textAlign: 'center', height: '100%', width: '100%' }}
              color='primary'
              variant='contained'
            >
              <AddCircleOutline />
            </Button>
          </Grid>
          <FormControl>
            <FormHelperText error={touched.sub_category_id && !!errors.sub_category_id}>
              {touched.sub_category_id && errors.sub_category_id
                ? String(errors.sub_category_id) + ', ' + 'if no sub-cat.. should add one'
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Business Locations</InputLabel>
          <Select
            value={initialValues.location}
            multiple
            onChange={handleChange}
            required
            name='location'
            id='demo-simple-select'
            label='Business Locations'
            fullWidth
            onBlur={handleBlur}
            renderValue={selected =>
              businessLocationsData && businessLocationsData.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip
                      key={value}
                      label={businessLocationsData.find(location => location.id === value)?.value || null}
                      onDelete={() => {
                        const updatedLocationIds = initialValues.location.filter(item => item !== value)
                        setFieldValue('location', updatedLocationIds)
                      }}
                    />
                  ))}
                </Box>
              ) : null
            }
            error={touched.location && !!errors.location}
            helperText={touched.location && errors.location ? String(errors.location) : ''}
          >
            {/* <MenuItem value=''>
              <em>Select a location</em>
            </MenuItem> */}
            {businessLocationsData.map(location => (
              <MenuItem key={location.id} value={location.id}>
                {location.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormHelperText error={touched.location && !!errors.location}>
          {touched.location && errors.location ? String(errors.location) : null}
        </FormHelperText>
      </Grid>

      {/* Forms */}
      {openBrand && (
        <DialogAddBrands
          isCustom={true}
          open={openBrand}
          toggle={toggleBrand}
          isEdit={false}
          setNewBrand={setNewBrand}
        />
      )}
      {openUnit && <ProductUnitForm type={'Add'} open={openUnit} setOpen={setOpenUnit} setNewUnit={setNewUnit} />}
      {openSubUnit && <ProductUnitForm type={'Add'} open={openSubUnit} setOpen={setOpenSubUnit} subUnit={true} />}
      {openCategory && <ProductCategoryForm subCat={false} open={openCategory} setOpen={setOpenCategory} />}
      {openSubcategory && <ProductCategoryForm subCat={true} open={openSubcategory} setOpen={setOpenSubCategory} />}
    </Grid>
  )
}

export default ProductInfo
