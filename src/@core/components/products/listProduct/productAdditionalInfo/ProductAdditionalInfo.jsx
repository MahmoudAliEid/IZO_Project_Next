// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import {
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CardHeader,
  Chip,
  Divider,
  InputLabel
} from '@mui/material'

// ** Store & Actions
import { useSelector } from 'react-redux'

const ProductAdditionalInfo = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  // ** State
  const [positionDetails, setPositionDetails] = useState(null)

  // const [positionDetailsValue, setPositionDetailsValue] = useState([])

  // ** Store Vars
  const store = useSelector(state => state.getCreateProduct?.data?.value?.product_racks)

  // ** Get data on mount
  useEffect(() => {
    setPositionDetails(store)
  }, [store])

  // ** Functions

  // useEffect(() => {
  //   if (positionDetailsValue.length > 0) {
  //     setFieldValue('product_racks', positionDetailsValue)
  //   }
  //  }, [positionDetailsValue])

  /// ** set initial values for position details
  useEffect(() => {
    if (store && positionDetails && initialValues.positionDetailsValue.length === 0) {
      const handleAddPosition = () => {
        const positionDetailsValue = positionDetails.map(item => {
          return {
            id: item.id,
            type: item.value.type,
            value: item.value.value.map(item => {
              return { [item]: '' }
            }) //{ id ,value:[{row: ''}, {column: ''}, {shelf: ''}, {position: '']}
          }
        })
        setFieldValue('positionDetailsValue', positionDetailsValue)

        // setPositionDetailsValue(positionDetailsValue)
      }

      handleAddPosition()
    }
  }, [positionDetails, store, setFieldValue, initialValues.positionDetailsValue])

  // ** Function to Handle Position Details updates
  // const updateValue = (name, value, index, innerIndex) => {
  //   const updatedTableData = initialValues.positionDetailsValue.map((item, indexMain) => {
  //     if (indexMain === index) {
  //       return {
  //         ...item,
  //         value: item.value.map((item, i) => {
  //           if (i === innerIndex) {
  //             return {
  //               ...item,
  //               [name]: value
  //             }
  //           } else {
  //             return item
  //           }
  //         })
  //       }
  //     } else {
  //       return item
  //     }
  //   })

  //   setFieldValue(`positionDetailsValue`, updatedTableData)
  // }

  // const positionHandleChange = (e, item) => {
  //   const { name, value } = e.target

  //   setPositionDetailsValue(prev => [{ ...prev, [name]: value }])
  // }

  const PositionComponent = () => {
    if (initialValues.positionDetailsValue.length > 0 && !positionDetails) {
      return (
        <>
          <Grid item xs={12}>
            <Divider>
              <Chip label='Position Details' variant='outlined' color='primary' />
            </Divider>
            <Grid container spacing={3}>
              {initialValues.positionDetailsValue.map((position, index) => (
                <Grid item xs={12} lg={6} md={6} sm={12} key={index}>
                  <CardHeader title={position.name} />
                  {position.value.map((item, innerIndex) => (
                    <Grid container spacing={4} sx={{ py: 3 }} key={innerIndex}>
                      {Object.entries(item).map(([key, value]) => (
                        <Grid item xs={12} key={key}>
                          <FormControl fullWidth>
                            <TextField
                              fullWidth
                              label={key}
                              value={value}
                              onChange={handleChange}
                              name={`positionDetailsValue.${index}.value.${innerIndex}.${key}`}
                            />
                          </FormControl>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )
    } else if (positionDetails && positionDetails.length > 0 && initialValues.positionDetailsValue.length > 0) {
      return (
        <Grid item xs={12}>
          <Divider>
            <Chip label='Position Details' variant='outlined' color='primary' />
          </Divider>
          <Grid container spacing={3}>
            {positionDetails.map((position, index) => (
              <Grid item xs={12} lg={6} md={6} sm={12} key={index}>
                <CardHeader title={position.value.name} />
                {position.value.value.map((item, innerIndex) => (
                  <Grid container spacing={4} sx={{ py: 3 }} key={innerIndex}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          label={item}
                          value={initialValues.positionDetailsValue[index]?.value[innerIndex][item]}
                          name={`positionDetailsValue.${index}.value.${innerIndex}.${item}`}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      )
    } else {
      return null
    }
  }

  return (
    <Grid container spacing={6} padding={3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2} lg={2}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label='Expires in'
                value={initialValues.expiry_period}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.expiry_period && !!errors.expiry_period}
                helperText={touched.expiry_period && errors.expiry_period ? String(errors.expiry_period) : ''}
                name='expiry_period'
                disabled={initialValues.expiry_period_type === 'no Applicable'}
              />
            </FormControl>
          </Grid>
          <Grid item xs={9} md={10} lg={10}>
            <FormControl fullWidth>
              <InputLabel id='expiry_period_type'>Type</InputLabel>
              <Select
                labelId='expiry_period_type'
                label='Type'
                fullWidth
                value={initialValues.expiry_period_type}
                onChange={handleChange}
                name='expiry_period_type'
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} // Adjusted to handle text overflow
              >
                <MenuItem value='days'>Days</MenuItem>
                <MenuItem value='months'>Months</MenuItem>
                <MenuItem value='no Applicable'>No Applicable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Weight'
            value={initialValues.weight}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.weight && !!errors.weight}
            helperText={touched.weight && errors.weight ? String(errors.weight) : ''}
            name='weight'
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6} md={6} sm={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={initialValues.not_for_sale}
              onChange={e => {
                if (e.target.checked) {
                  setFieldValue('not_for_sale', true)
                } else {
                  setFieldValue('not_for_sale', false)
                }
              }}
              name='not_for_sale'
              onBlur={handleBlur}
              error={touched.not_for_sale && !!errors.not_for_sale}
              helperText={touched.not_for_sale && errors.not_for_sale ? String(errors.not_for_sale) : ''}
            />
          }
          label='Not for sale'
        />
      </Grid>

      <Grid item xs={12} lg={3} md={3} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Custom Field 1'
            value={initialValues.custom_field_1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.custom_field_1 && !!errors.custom_field_1}
            helperText={touched.custom_field_1 && errors.custom_field_1 ? String(errors.custom_field_1) : ''}
            name='custom_field_1'
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={3} md={3} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Custom Field 2'
            value={initialValues.custom_field_2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.custom_field_2 && !!errors.custom_field_2}
            helperText={touched.custom_field_2 && errors.custom_field_2 ? String(errors.custom_field_2) : ''}
            name='custom_field_2'
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={3} md={3} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Custom Field 3'
            value={initialValues.custom_field_3}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.custom_field_3 && !!errors.custom_field_3}
            helperText={touched.custom_field_3 && errors.custom_field_3 ? String(errors.custom_field_3) : ''}
            name='custom_field_3'
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={3} md={3} sm={12}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label='Custom Field 4'
            value={initialValues.custom_field_4}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.custom_field_4 && !!errors.custom_field_4}
            helperText={touched.custom_field_4 && errors.custom_field_4 ? String(errors.custom_field_4) : ''}
            name='custom_field_4'
          />
        </FormControl>
      </Grid>

      {PositionComponent()}
    </Grid>
  )
}

export default ProductAdditionalInfo
