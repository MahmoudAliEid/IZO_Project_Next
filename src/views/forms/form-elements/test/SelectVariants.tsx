// ** MUI Imports
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

const SelectVariants = () => {
  return (
    <Card>
      <CardHeader title='Select Variants' />
      <CardContent>
        <div className='demo-space-x'>
          <FormControl>
            <InputLabel>Age</InputLabel>
            <Select label='Age' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='filled'>
            <InputLabel>Age</InputLabel>
            <Select label='Age' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='standard'>
            <InputLabel>Age</InputLabel>
            <Select label='Age' defaultValue=''>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='demo-space-x'>
          <FormControl>
            <InputLabel>Disabled</InputLabel>
            <Select disabled label='Disabled' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='filled'>
            <InputLabel>Disabled</InputLabel>
            <Select disabled label='Disabled' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='standard'>
            <InputLabel>Disabled</InputLabel>
            <Select disabled label='Disabled' defaultValue=''>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='demo-space-x'>
          <FormControl size='small'>
            <InputLabel>Small</InputLabel>
            <Select label='Small' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl size='small' variant='filled'>
            <InputLabel>Small</InputLabel>
            <Select label='Small' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl size='small' variant='standard'>
            <InputLabel>Small</InputLabel>
            <Select label='Small' defaultValue=''>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </CardContent>

      <CardContent>
        <Typography variant='h6'>Native</Typography>
        <div className='demo-space-x'>
          <FormControl>
            <InputLabel>Age</InputLabel>
            <Select native label='Age' defaultValue=''>
              <option aria-label='None' value='' />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
          <FormControl variant='filled'>
            <InputLabel>Age</InputLabel>
            <Select native label='Age' defaultValue=''>
              <option aria-label='None' value='' />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
          <FormControl variant='standard'>
            <InputLabel>Age</InputLabel>
            <Select native label='Age' defaultValue=''>
              <option aria-label='None' value='' />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
        </div>
      </CardContent>
    </Card>
  )
}

export default SelectVariants
