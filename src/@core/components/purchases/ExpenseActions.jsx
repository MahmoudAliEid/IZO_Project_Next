// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'

import CardContent from '@mui/material/CardContent'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import MultipleUploadFile from 'src/@core/Global/MultipleUploadFile'

const ExpenseActions = ({ setFieldValue, values, isSubmitting, edit }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MultipleUploadFile image={values.attachment} setFieldValue={setFieldValue} name='attachment' />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {/* <Button fullWidth sx={{ mb: 4 }} variant='contained' startIcon={<Icon icon='bx:paper-plane' />}>
              Send Invoice
            </Button>
            <Button fullWidth sx={{ mb: 4 }} component={Link} color='secondary' variant='outlined' href=''>
              Preview
            </Button> */}
            <Button
              type='submit'
              fullWidth
              color='primary'
              sx={{
                textWrap: 'wrap'
              }}
              variant={isSubmitting ? 'outlined' : 'contained'}
              disabled={isSubmitting || values.items.length === 0}
            >
              {isSubmitting ? 'Please wait...' : edit ? 'Update' : 'Create'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ExpenseActions
