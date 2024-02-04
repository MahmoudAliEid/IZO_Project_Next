import { TextField, Tooltip } from '@mui/material'
import { useField } from 'formik'

const CustomInputField = props => {
  const { name, value, onChange, label, disabled } = props
  const [field] = useField(name)

  return (
    <>
      {String(value).length >= 5 ? (
        <Tooltip title={value}>
          <TextField
            type='text'
            label={label ? label : ''}
            {...field}
            value={value}
            onChange={e => {
              onChange(e)
            }}
            disabled={disabled ? true : false}
          />
        </Tooltip>
      ) : (
        <TextField
          type='text'
          {...field}
          label={label ? label : ''}
          value={value}
          onChange={e => {
            onChange(e)
          }}
          disabled={disabled ? true : false}
        />
      )}
    </>
  )
}
export default CustomInputField
