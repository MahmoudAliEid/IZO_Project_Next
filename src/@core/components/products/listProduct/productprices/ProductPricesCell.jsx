// ProductPriceCell.js
import React from 'react'
import { useField } from 'formik'
import { TextField } from '@mui/material'

const ProductPriceCell = ({ name, value, onChange }) => {
  const [field] = useField(name)

  return (
    <>
      <TextField
        type='text'
        {...field}
        value={value}
        onChange={e => {
          onChange(e)
        }}
      />
    </>
  )
}

export default ProductPriceCell
