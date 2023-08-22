// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { alpha, styled } from '@mui/material/styles'
import MuiInputBase, { InputBaseProps } from '@mui/material/InputBase'

// Styled InputBase component
const InputBase = styled(MuiInputBase)<InputBaseProps>(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiInputBase-input': {
    fontSize: 16,
    width: 'auto',
    borderRadius: 4,
    padding: '10px 12px',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: theme.palette.mode === 'light' ? '1px solid #ced4da' : `1px solid ${theme.palette.divider}`,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
    }
  }
}))

const TextFieldVariant = () => {
  return (
    <Card>
      <CardHeader title='Variants' />
      <CardContent>
        <form className='demo-space-x' noValidate autoComplete='off'>
          <TextField label='Outlined' />
          <TextField label='Filled' variant='filled' />
          <TextField label='Standard' variant='standard' />
        </form>
        <form className='demo-space-x' noValidate autoComplete='off'>
          <TextField disabled label='Disabled Outlined' />
          <TextField disabled label='Disabled Filled' variant='filled' />
          <TextField disabled label='Disabled Standard' variant='standard' />
        </form>
        <form className='demo-space-x' noValidate autoComplete='off'>
          <TextField size='small' label='Small Outlined' />
          <TextField size='small' label='Small Filled' variant='filled' />
          <TextField size='small' label='Small Standard' variant='standard' />
        </form>
      </CardContent>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Customized
        </Typography>
        <form noValidate autoComplete='off'>
          <FormControl variant='standard'>
            <InputLabel shrink htmlFor='bootstrap-input' sx={{ transform: 'translate(0, -4px) scale(0.75)' }}>
              Bootstrap
            </InputLabel>
            <InputBase defaultValue='react-bootstrap' id='bootstrap-input' />
          </FormControl>
        </form>
      </CardContent>
    </Card>
  )
}

export default TextFieldVariant
