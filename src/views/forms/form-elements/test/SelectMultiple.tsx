// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// Styled component for a wrapper
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    maxWidth: 500,
    marginTop: theme.spacing(4)
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

const SelectMultiple = () => {
  // ** State
  const [personName, setPersonName] = useState<string[]>([])
  const [personNameNative, setPersonNameNative] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  const handleChangeMultipleNative = (event: ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target
    const value: string[] = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setPersonNameNative(value)
  }

  return (
    <Card>
      <CardHeader title='Multiple Select' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Wrapper>
              <FormControl>
                <InputLabel>Name</InputLabel>
                <Select multiple label='Name' value={personName} MenuProps={MenuProps} onChange={handleChange}>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Tag</InputLabel>
                <Select
                  multiple
                  label='Tag'
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  renderValue={selected => (selected as string[]).join(', ')}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Chip</InputLabel>
                <Select
                  multiple
                  label='Chip'
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(selected as string[]).map(value => (
                        <Chip key={value} label={value} sx={{ m: 0.75 }} />
                      ))}
                    </Box>
                  )}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={selected => {
                    if ((selected as string[]).length === 0) {
                      return <em>Placeholder</em>
                    }

                    return (selected as string[]).join(', ')
                  }}
                >
                  <MenuItem disabled value=''>
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel shrink htmlFor='select-multiple-native'>
                  Native
                </InputLabel>
                <Select
                  native
                  multiple
                  label='Native'
                  value={personNameNative} // @ts-ignore
                  onChange={handleChangeMultipleNative}
                  inputProps={{ id: 'select-multiple-native' }}
                >
                  {names.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Wrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Wrapper>
              <FormControl variant='filled'>
                <InputLabel>Name</InputLabel>
                <Select multiple label='Name' value={personName} MenuProps={MenuProps} onChange={handleChange}>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled'>
                <InputLabel>Tag</InputLabel>
                <Select
                  multiple
                  label='Tag'
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  renderValue={selected => (selected as string[]).join(', ')}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled'>
                <InputLabel>Chip</InputLabel>
                <Select
                  multiple
                  label='Chip'
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(selected as string[]).map(value => (
                        <Chip key={value} label={value} sx={{ m: 0.75 }} />
                      ))}
                    </Box>
                  )}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled'>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={selected => {
                    if ((selected as string[]).length === 0) {
                      return <em>Placeholder</em>
                    }

                    return (selected as string[]).join(', ')
                  }}
                >
                  <MenuItem disabled value=''>
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled'>
                <InputLabel shrink htmlFor='select-multiple-native'>
                  Native
                </InputLabel>
                <Select
                  native
                  multiple
                  label='Native'
                  value={personNameNative} // @ts-ignore
                  onChange={handleChangeMultipleNative}
                  inputProps={{ id: 'select-multiple-native' }}
                >
                  {names.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Wrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Wrapper>
              <FormControl variant='standard'>
                <InputLabel>Name</InputLabel>
                <Select multiple label='Name' value={personName} MenuProps={MenuProps} onChange={handleChange}>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='standard'>
                <InputLabel>Tag</InputLabel>
                <Select
                  multiple
                  label='Tag'
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  renderValue={selected => (selected as string[]).join(', ')}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='standard'>
                <InputLabel>Chip</InputLabel>
                <Select
                  multiple
                  label='Chip'
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(selected as string[]).map(value => (
                        <Chip key={value} label={value} sx={{ m: 0.75 }} />
                      ))}
                    </Box>
                  )}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='standard'>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  MenuProps={MenuProps}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={selected => {
                    if ((selected as string[]).length === 0) {
                      return <em>Placeholder</em>
                    }

                    return (selected as string[]).join(', ')
                  }}
                >
                  <MenuItem disabled value=''>
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='standard'>
                <InputLabel shrink htmlFor='select-multiple-native'>
                  Native
                </InputLabel>
                <Select
                  native
                  multiple
                  label='Native'
                  value={personNameNative} // @ts-ignore
                  onChange={handleChangeMultipleNative}
                  inputProps={{ id: 'select-multiple-native' }}
                >
                  {names.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Wrapper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SelectMultiple
