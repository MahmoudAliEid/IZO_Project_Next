// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import TableBasic from 'src/views/table/mui/TableBasic'
import Alert from '@mui/material/Alert'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main
}))

const tableData = [
  {
    columnNumber: 1,
    columnName: 'Contact type (Required)',
    instruction: 'Available Options: 1 = Customer, 2 = Supplier, 3 = Both'
  },
  { columnNumber: 2, columnName: 'Prefix (Optional)', instruction: '' },
  { columnNumber: 3, columnName: 'First Name (Required)', instruction: '' },
  { columnNumber: 4, columnName: 'Middle name (Optional)', instruction: '' },
  { columnNumber: 5, columnName: 'Last Name (Optional)', instruction: '' },
  { columnNumber: 6, columnName: 'Business Name (Required if contact type is supplier or both)', instruction: '' },
  { columnNumber: 7, columnName: 'Contact ID (Optional)', instruction: 'Leave blank to auto generate Contact ID' },
  { columnNumber: 8, columnName: 'Tax number (Optional)', instruction: '' },
  { columnNumber: 9, columnName: 'Opening Balance (Optional)', instruction: '' },
  { columnNumber: 10, columnName: 'Pay term (Required if contact type is supplier or both)', instruction: '' },
  {
    columnNumber: 11,
    columnName: 'Pay term period (Required if contact type is supplier or both)',
    instruction: 'Available Options: days and months'
  },
  { columnNumber: 12, columnName: 'Credit Limit (Optional)', instruction: '' },
  { columnNumber: 13, columnName: 'Email (Optional)', instruction: '' },
  { columnNumber: 14, columnName: 'Mobile (Required)', instruction: '' },
  { columnNumber: 15, columnName: 'Alternate contact number (Optional)', instruction: '' },
  { columnNumber: 16, columnName: 'Landline (Optional)', instruction: '' },
  { columnNumber: 17, columnName: 'City (Optional)', instruction: '' },
  { columnNumber: 18, columnName: 'State (Optional)', instruction: '' },
  { columnNumber: 19, columnName: 'Country (Optional)', instruction: '' },
  { columnNumber: 20, columnName: 'Address line 1 (Optional)', instruction: '' },
  { columnNumber: 21, columnName: 'Address line 2 (Optional)', instruction: '' },
  { columnNumber: 22, columnName: 'Zip Code (Optional)', instruction: '' },
  { columnNumber: 23, columnName: 'Date of birth (Optional)', instruction: 'Format Y-m-d (2023-11-07)' },
  { columnNumber: 24, columnName: 'Custom Field 1 (Optional)', instruction: '' },
  { columnNumber: 25, columnName: 'Custom Field 2 (Optional)', instruction: '' },
  { columnNumber: 26, columnName: 'Custom Field 3 (Optional)', instruction: '' },
  { columnNumber: 27, columnName: 'Custom Field 4 (Optional)', instruction: '' }
]

const ImportContacts = () => {
  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader title={<TypographyStyled variant='h5'>Import Contacts </TypographyStyled>} />
        <Grid item xs={12}>
          <Alert severity='warning'>Please install/enable PHP Zip archive for import — check it out!</Alert>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography noWrap variant='h5' sx={{ color: 'text.secondary' }}>
                  File To Import:
                </Typography>
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FileUploaderSingle />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                      <TypographyStyled>
                        Follow the instructions carefully before importing the file. The columns of the file should be
                        in the following order.
                      </TypographyStyled>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Instructions' />
            <TableBasic tableData={tableData} />
          </Card>
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

export default ImportContacts
