import { TextField, Tooltip } from '@mui/material'
import { useField } from 'formik'

const CustomInputField = ({ name, value, onChange }) => {
  const [field] = useField(name)

  return (
    <>
      {String(value).length >= 5 ? (
        <Tooltip title={value}>
          <TextField
            type='text'
            {...field}
            value={value}
            onChange={e => {
              onChange(e)
            }}
          />
        </Tooltip>
      ) : (
        <TextField
          type='text'
          {...field}
          value={value}
          onChange={e => {
            onChange(e)
          }}
        />
      )}
    </>
  )
}
export default CustomInputField
