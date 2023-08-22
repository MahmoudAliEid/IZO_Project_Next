// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete'

// ** Data
import { top100Films } from 'src/@fake-db/autocomplete'

const AutocompleteVariants = () => {
  return (
    <Card>
      <CardHeader title='Autocomplete Variants' />
      <CardContent>
        <Box className='demo-space-x' sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Autocomplete
            sx={{ width: 250 }}
            options={top100Films}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='Combo box' />}
          />
          <Autocomplete
            sx={{ width: 250 }}
            options={top100Films}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='Combo box' variant='filled' />}
          />
          <Autocomplete
            sx={{ width: 250 }}
            options={top100Films}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='Combo box' variant='standard' />}
          />
        </Box>
        <Box className='demo-space-x' sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Autocomplete
            disabled
            sx={{ width: 250 }}
            options={top100Films}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='Disabled' />}
          />
          <Autocomplete
            disabled
            sx={{ width: 250 }}
            options={top100Films}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='Disabled' variant='filled' />}
          />
          <Autocomplete
            disabled
            sx={{ width: 250 }}
            options={top100Films}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='Disabled' variant='standard' />}
          />
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='h6'>Multiple Values</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Autocomplete
            multiple
            options={top100Films}
            filterSelectedOptions
            defaultValue={[top100Films[13]]}
            getOptionLabel={option => option.title || ''}
            sx={{ width: 250, mt: 5, mr: 5 }}
            renderInput={params => <TextField {...params} label='filterSelectedOptions' placeholder='Favorites' />}
          />
          <Autocomplete
            freeSolo
            multiple
            defaultValue={[top100Films[13].title]}
            sx={{ width: 250, mt: 5, mr: 5 }}
            options={top100Films.map(option => option.title || '')}
            renderInput={params => <TextField {...params} variant='filled' label='freeSolo' placeholder='Favorites' />}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip variant='outlined' label={option} {...(getTagProps({ index }) as {})} key={index} />
              ))
            }
          />
          <Autocomplete
            multiple
            options={top100Films}
            defaultValue={[top100Films[13]]}
            sx={{ width: 250, mt: 5 }}
            getOptionLabel={option => option.title || ''}
            renderInput={params => (
              <TextField {...params} label='Multiple values' placeholder='Favorites' variant='standard' />
            )}
          />
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='h6' sx={{ mb: 4 }}>
          Small Size
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              size='small'
              options={top100Films}
              defaultValue={top100Films[13]}
              getOptionLabel={option => option.title || ''}
              renderInput={params => <TextField {...params} label='Size small' placeholder='Favorites' />}
            />
            <Autocomplete
              multiple
              size='small'
              sx={{ mt: 5 }}
              options={top100Films}
              defaultValue={[top100Films[13]]}
              getOptionLabel={option => option.title || ''}
              renderInput={params => <TextField {...params} label='Size small' placeholder='Favorites' />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              size='small'
              options={top100Films}
              defaultValue={top100Films[13]}
              getOptionLabel={option => option.title || ''}
              renderInput={params => (
                <TextField {...params} variant='filled' label='Size small' placeholder='Favorites' />
              )}
            />
            <Autocomplete
              multiple
              size='small'
              sx={{ mt: 5 }}
              defaultValue={[top100Films[13].title]}
              options={top100Films.map(option => option.title || '')}
              renderInput={params => (
                <TextField {...params} variant='filled' label='Size small' placeholder='Favorites' />
              )}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip variant='outlined' label={option} {...(getTagProps({ index }) as any)} key={index} />
                ))
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              size='small'
              options={top100Films}
              defaultValue={top100Films[13]}
              getOptionLabel={option => option.title || ''}
              renderInput={params => (
                <TextField {...params} variant='standard' label='Size small' placeholder='Favorites' />
              )}
            />
            <Autocomplete
              multiple
              size='small'
              sx={{ mt: 5 }}
              options={top100Films}
              defaultValue={[top100Films[13]]}
              getOptionLabel={option => option.title || ''}
              renderInput={params => (
                <TextField {...params} variant='standard' label='Size small' placeholder='Favorites' />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AutocompleteVariants
