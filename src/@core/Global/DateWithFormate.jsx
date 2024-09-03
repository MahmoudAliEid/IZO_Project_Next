import { forwardRef, useEffect, useState } from 'react'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
// ** Cookies
import { getCookie } from 'cookies-next'
import { FormControl, TextField } from '@mui/material'

// ** Third Party Components
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Input Component
const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

const DateWithFormate = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  popperPlacement = 'bottom-start'
}) => {
  const [mainFormate, setMainFormate] = useState(getCookie('DateFormat'))
  // ** Get Cookies
  const transText = getCookie('fontStyle')
  // ** Hook
  const { settings } = useSettings()
  const { dateFormat } = settings

  useEffect(() => {
    if (dateFormat) {
      setMainFormate(dateFormat)
    } else {
      setMainFormate(getCookie('DateFormat'))
    }
  }, [dateFormat])

  return (
    <FormControl fullWidth>
      <DatePickerWrapper>
        <DatePicker
          name='date'
          selected={values.date}
          popperPlacement={popperPlacement}
          onChange={date => {
            setFieldValue('date', date)
          }}
          dateFormat={mainFormate}
          customInput={
            <CustomInput
              fullWidth
              label=' Date'
              sx={{ textTransform: transText }}
              readOnly={false}
              value={values.date}
              name='date'
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.date && errors.date)}
            />
          }
        />
      </DatePickerWrapper>
    </FormControl>
  )
}

export default DateWithFormate
