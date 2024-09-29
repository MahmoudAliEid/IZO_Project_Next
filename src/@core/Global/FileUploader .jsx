import React, { Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import XLSX from 'xlsx'
import mammoth from 'mammoth'
import { Box, Typography, Button } from '@mui/material'
import FilePreview from './FilePreview' // Import the FilePreview component
import { styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 250,
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    width: 200,
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 150
  }
}))

const FileUploader = ({ setFieldValue, fieldName, files, multiple }) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 20000000, // 20MB
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/zip': ['.zip'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },

    multiple: multiple,
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader()

        // Handle Excel files
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          try {
            reader.onload = event => {
              try {
                const data = new Uint8Array(event.target.result)
                const workbook = XLSX.read(data, { type: 'array' })
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
                setFieldValue(fieldName, [...files, { ...file, excelData: sheetData }])
              } catch (error) {
                console.error('Error reading Excel file ❌❌:', error)
                // Optionally, display an error message to the user
              }
            }
            reader.readAsArrayBuffer(file)
          } catch (error) {
            console.error('Error creating file reader ❌❌:', error)
            // Optionally, display an error message to the user
          }
        }

        // Handle Word files
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          try {
            reader.onload = async event => {
              try {
                const result = await mammoth.extractRawText({ arrayBuffer: event.target.result })
                setFieldValue(fieldName, [...files, { ...file, docxText: result.value }])
              } catch (error) {
                console.error('Error reading Word file ❌❌:', error)
                // Optionally, display an error message to the user
              }
            }
            reader.readAsArrayBuffer(file)
          } catch (error) {
            console.error('Error creating file reader ❌❌:', error)
            // Optionally, display an error message to the user
          }
        }

        // Handle Image and PDF files
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          setFieldValue(fieldName, [...files, file])
        }
      })
    }
  })

  // ** hook for theme
  const theme = useTheme()

  const handleRemoveFile = fileToRemove => {
    setFieldValue(
      fieldName,
      files.filter(file => file.name !== fileToRemove.name)
    )
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'column'], alignItems: 'center' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <Typography variant='h5'>Drop files here or click to upload.</Typography>
            <Typography color='textSecondary'>
              {' '}
              Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
            </Typography>
            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Drop files here or click{' '}
              <Link href='/' onClick={e => e.preventDefault()}>
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </div>

      {files.length > 0 && (
        <Fragment>
          <FilePreview files={files} handleRemoveFile={handleRemoveFile} />
          <Button color='error' variant='outlined' onClick={() => setFieldValue(fieldName, [])}>
            Remove All Files
          </Button>
        </Fragment>
      )}
    </Fragment>
  )
}

export default FileUploader
