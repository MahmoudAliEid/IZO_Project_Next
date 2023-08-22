// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Input from '@mui/material/Input'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

const TextFieldComponents = () => {
  // ** State
  const [name, setName] = useState<string>('Composed TextField')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <Card>
      <CardHeader title='Components' />
      <CardContent>
        <form className='demo-space-x' noValidate autoComplete='off'>
          <FormControl variant='standard'>
            <InputLabel>Name</InputLabel>
            <Input value={name} onChange={handleChange} />
          </FormControl>
          <FormControl variant='standard'>
            <InputLabel>Name</InputLabel>
            <Input value={name} onChange={handleChange} />
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
          <FormControl disabled variant='standard'>
            <InputLabel>Name</InputLabel>
            <Input value={name} onChange={handleChange} />
            <FormHelperText>Disabled</FormHelperText>
          </FormControl>
          <FormControl error variant='standard'>
            <InputLabel>Name</InputLabel>
            <Input value={name} onChange={handleChange} aria-describedby='component-error-text' />
            <FormHelperText>Error</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <OutlinedInput size='small' value={name} onChange={handleChange} label='Name' />
          </FormControl>
          <FormControl variant='filled'>
            <InputLabel>Name</InputLabel>
            <FilledInput value={name} onChange={handleChange} />
          </FormControl>
        </form>
      </CardContent>
    </Card>
  )
}

export default TextFieldComponents
