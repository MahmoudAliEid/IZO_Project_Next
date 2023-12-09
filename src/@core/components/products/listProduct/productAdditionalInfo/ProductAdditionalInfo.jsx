/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
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

const ProductAdditionalInfo = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <Select
              fullWidth
              value={initialValues.expiry_period_type}
              onChange={handleChange}
              name='expiry_period_type'
            >
              <MenuItem value='days'>Days</MenuItem>
              <MenuItem value='months'>Months</MenuItem>
              <MenuItem value='no Applicable'>No Applicable</MenuItem>
            </Select>
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
    </Grid>
  )
}

export default ProductAdditionalInfo
