// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled} from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 300,
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    width: 250,
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 200
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderSingle = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])



  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(files)
  }

  return (
    <form > {/* Add form element and onSubmit handler */}
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 150, display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' } : {}}>
        <input {...getInputProps()} />
        {files.length ? (
          files.map((file: FileProp) => (
            <Box key={file.name} sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                <HeadingTypography sx={{ color: 'primary.main' }} variant='h5'>Uploaded Successfully</HeadingTypography>
                <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                  {file.name}
                </Typography>

              </Box>

            </Box>
          ))
        ) : (
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={`/images/misc/uploadingFile.svg`} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                Drop files here or click{' '}
                <Link href='/' onClick={e => e.preventDefault()}>
                  browse
                </Link>{' '}
                through your machine
              </Typography>
            </Box>
          </Box>
        )}



      </Box>
      {files.length > 0 && (

        <Button onClick={handleSubmit} size='large' type='submit' variant='contained' sx={{ mr: 3, mt: 3 }}>
          Submit
        </Button>
      )}
    </form>
  )
}

export default FileUploaderSingle
