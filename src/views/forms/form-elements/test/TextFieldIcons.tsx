// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FilledInput from '@mui/material/FilledInput'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TextFieldIcons = () => {
  return (
    <Card>
      <CardHeader title='Icons' />
      <CardContent>
        <form className='demo-space-x' noValidate autoComplete='off'>
          <FormControl>
            <InputLabel>With a start adornment</InputLabel>
            <OutlinedInput
              label='With a start adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <Icon icon='bx:user-circle' />
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            label='TextField'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='bx:user-circle' />
                </InputAdornment>
              )
            }}
          />
          <Box sx={{ display: 'inline-flex' }}>
            <Grid container alignItems='center'>
              <Grid item sx={{ mr: 2, '& svg': { color: 'action.active' } }}>
                <Box sx={{ display: 'flex' }}>
                  <Icon icon='bx:user-circle' />
                </Box>
              </Grid>
              <Grid item>
                <TextField label='With a grid' />
              </Grid>
            </Grid>
          </Box>
        </form>

        <form className='demo-space-x' noValidate autoComplete='off'>
          <FormControl variant='filled'>
            <InputLabel>With a start adornment</InputLabel>
            <FilledInput
              startAdornment={
                <InputAdornment position='start'>
                  <Icon icon='bx:user-circle' />
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            label='TextField'
            variant='filled'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='bx:user-circle' />
                </InputAdornment>
              )
            }}
          />
          <Box sx={{ display: 'inline-flex' }}>
            <Grid container alignItems='center'>
              <Grid item sx={{ mr: 2, '& svg': { color: 'action.active' } }}>
                <Box sx={{ display: 'flex' }}>
                  <Icon icon='mdi:account-circle-outline' />
                </Box>
              </Grid>
              <Grid item>
                <TextField variant='filled' label='With a grid' />
              </Grid>
            </Grid>
          </Box>
        </form>

        <form className='demo-space-x' noValidate autoComplete='off'>
          <FormControl variant='standard'>
            <InputLabel>With a start adornment</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position='start'>
                  <Icon icon='bx:user-circle' />
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            label='TextField'
            variant='standard'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='bx:user-circle' />
                </InputAdornment>
              )
            }}
          />
          <Box sx={{ display: 'inline-flex' }}>
            <Grid container alignItems='center'>
              <Grid item sx={{ mr: 2, '& svg': { mt: 3, color: 'action.active' } }}>
                <Box sx={{ display: 'flex' }}>
                  <Icon icon='mdi:account-circle-outline' />
                </Box>
              </Grid>
              <Grid item>
                <TextField variant='standard' label='With a grid' />
              </Grid>
            </Grid>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default TextFieldIcons
