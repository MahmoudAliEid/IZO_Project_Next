import React from 'react'
import { forwardRef } from 'react'
import { useField } from 'formik'
import TextField from '@mui/material/TextField'

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props
  const [field, meta] = useField(props)

  return <TextField inputRef={ref} {...field} {...meta} {...props} label={label || ''} readOnly={readOnly} />
})

export default CustomInput
