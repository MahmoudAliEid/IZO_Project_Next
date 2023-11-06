// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
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

  // ** Hook
  const theme = useTheme()
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



  const img = files.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={"data:image/jpeg;base64,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"} />
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Drop files here or click{' '}
              <Link href='/' onClick={e => e.preventDefault()}>
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FileUploaderSingle
