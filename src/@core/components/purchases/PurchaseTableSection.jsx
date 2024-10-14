// ** Mui
import { Alert, Box, CardContent, Divider, FormControl, Grid, TextField } from '@mui/material'
// ** Custom Components
import CustomPurchaseTable from './CustomPurchaseTable'

// ** formik
import { FieldArray } from 'formik'

const PurchaseTableSection = ({ values, handleChange, setFieldValue }) => {
  return (
    <CardContent>
      <FieldArray name={`items`}>
        {({ push, remove }) => (
          <Box>
            {values.items.length === 0 && (
              <Alert sx={{ my: 2 }} severity='error'>
                Please add at least one item to the table
              </Alert>
            )}
            <CustomPurchaseTable
              rows={values.items}
              handleChange={handleChange}
              values={values}
              push={push}
              remove={remove}
              setFieldValue={setFieldValue}
            />
            <Divider
              sx={{
                mb: 3
              }}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <TextField name='total_items' label='Total Items' value={values.total_items} disabled />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <TextField label='Sub Total' name='sub_total' value={values.sub_total} disabled />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
      </FieldArray>
    </CardContent>
  )
}

export default PurchaseTableSection
