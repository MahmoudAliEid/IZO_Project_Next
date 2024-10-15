import React from 'react'

// ** Mui Components
import { CardContent, Grid, Box, Typography, TextField, InputAdornment, FormHelperText } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Cookies
import { getCookie } from 'cookies-next'

// ** Custom Components
import CustomInput from 'src/@core/Global/CustomInput'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const PurchaseSecondSection = ({ values, handleBlur, handleChange, data, touched, errors, setFieldValue }) => {
  // ** Get Cookies
  const transText = getCookie('fontStyle')
  // ** Hooks
  const theme = useTheme()
  // ** Vars
  const { direction } = theme
  const { settings } = useSettings()
  const { dateFormat } = settings
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <CardContent>
      <Grid container sx={{ px: { sm: 4, xs: 0 } }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: { sm: 'row', xs: 'column' },
                alignItems: { sm: 'center', xs: 'flex-start' }
              }}
            >
              <Typography variant='h5' sx={{ mr: 2, mb: { sm: 0, xs: 3 }, width: '105px' }}>
                Purchase
              </Typography>
              <TextField
                size='small'
                value={data?.invoice_number}
                sx={{ width: '150px' }}
                InputProps={{
                  disabled: true,
                  startAdornment: <InputAdornment position='start'>#</InputAdornment>
                }}
              />
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                mt: { sm: 0, xs: 2 },
                flexDirection: { sm: 'row', xs: 'column' },
                alignItems: { sm: 'center', xs: 'flex-start' }
              }}
            >
              <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                Date Issued:
              </Typography>
              <DatePicker
                name='transaction_date'
                selected={values.transaction_date}
                popperPlacement={popperPlacement}
                onChange={date => {
                  setFieldValue('transaction_date', date)
                }}
                dateFormat={dateFormat}
                customInput={
                  <CustomInput
                    fullWidth
                    sx={{ textTransform: transText }}
                    readOnly={false}
                    value={values.transaction_date}
                    name='transaction_date'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    error={Boolean(touched.transaction_date && errors.transaction_date)}
                  />
                }
              />
              {errors.transaction_date && touched.transaction_date && (
                <FormHelperText error>{String(errors.transaction_date)}</FormHelperText>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: { sm: 0, xs: 2 },
                flexDirection: { sm: 'row', xs: 'column' },
                alignItems: { sm: 'center', xs: 'flex-start' }
              }}
            >
              <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                Date Due:
              </Typography>
              <DatePicker
                name='due_date'
                selected={values.due_date}
                popperPlacement={popperPlacement}
                onChange={date => {
                  setFieldValue('due_date', date)
                }}
                dateFormat={dateFormat}
                customInput={
                  <CustomInput
                    fullWidth
                    sx={{ textTransform: transText }}
                    readOnly={false}
                    value={values.due_date}
                    name='due_date'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.due_date && errors.due_date)}
                  />
                }
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default PurchaseSecondSection
