/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import toast from 'react-hot-toast'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Icon from 'src/@core/components/icon'

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

const renderFilePreview = (file: FileProp) => {
  if (file.type.startsWith('image')) {
    return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
  } else {
    return <Icon icon='bx:file' />
  }
}

const Productbrochure = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 20000000, // 20MB in bytes
    accept: [
      'application/pdf',
      'text/csv',
      'application/zip',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ],
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload files with a maximum size of 20 MB.', {
        duration: 2000
      })
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(files, 'files from productbrochure')
  }

  return (
    <form > {/* Add form element and onSubmit handler */}
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 150, display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' } : {}}>
        <input {...getInputProps()} />
        {files.length ? (
          files.map((file: FileProp) => (
            <Box key={file.name} sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                <div className='file-preview'>{renderFilePreview(file)}</div>
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
              <Typography color='textSecondary'>Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png </Typography>

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
          Upload Files
        </Button>
      )}
    </form>
  )
}

export default Productbrochure
