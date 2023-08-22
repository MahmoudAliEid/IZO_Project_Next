// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import Textarea from 'src/views/forms/form-elements/test/Textarea'
import TextFieldIcons from 'src/views/forms/form-elements/test/TextFieldIcons'
import SelectVariants from 'src/views/forms/form-elements/test/SelectVariants'
import SelectMultiple from 'src/views/forms/form-elements/test/SelectMultiple'
import TextFieldVariant from 'src/views/forms/form-elements/test/TextFieldVariant'
import TextFieldComponents from 'src/views/forms/form-elements/test/TextFieldComponents'
import AutocompleteVariants from 'src/views/forms/form-elements/test/AutocompleteVariants'
import TextFieldInputAdornment from 'src/views/forms/form-elements/test/TextFieldInputAdornment'
import SelectCustomizedAndGrouping from 'src/views/forms/form-elements/test/SelectCustomizedAndGrouping'

const Test = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Typography variant='h5'>TextField</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextFieldVariant />
      </Grid>
      <Grid item xs={12}>
        <TextFieldIcons />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInputAdornment />
      </Grid>
      <Grid item xs={12}>
        <TextFieldComponents />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Textarea</Typography>
      </Grid>
      <Grid item xs={12}>
        <Textarea />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Select</Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <SelectVariants />
      </Grid>
      <Grid item xs={12} md={5}>
        <SelectCustomizedAndGrouping />
      </Grid>
      <Grid item xs={12}>
        <SelectMultiple />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Autocomplete</Typography>
      </Grid>
      <Grid item xs={12}>
        <AutocompleteVariants />
      </Grid>
    </Grid>
  )
}

export default Test
