// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main
}))

const ImportContacts = () => {
  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={<TypographyStyled variant='h5'>Import Contacts </TypographyStyled>}
          subtitle={<Typography variant='body2'>Please install/enable PHP Zip archive for import</Typography>}
        />
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
                      <TypographyStyled noWrap>
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
      </Grid>
    </DropzoneWrapper>
  )
}

export default ImportContacts
