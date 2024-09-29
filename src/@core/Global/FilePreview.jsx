import React from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material'
import Icon from 'src/@core/components/icon' // Adjust path as per your project
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import '@cyntler/react-doc-viewer/dist/index.css'

const FilePreview = ({ files, handleRemoveFile }) => {
  console.log(files, 'files from preview 💘💘')

  return (
    <Grid container spacing={2} sx={{ mt: 3, width: '100%' }}>
      {files.map((file, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            {file.type?.startsWith('image/') && (
              <CardMedia
                component='img'
                src={URL.createObjectURL(file)}
                title='Image Preview'
                sx={{ height: 200, borderRadius: 2, objectFit: 'cover' }}
              />
            )}

            {file.type === 'application/pdf' && (
              <DocViewer
                documents={[{ uri: URL.createObjectURL(file) }]}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: { disableHeader: true },
                  search: { disableSearch: true },
                  textSelection: { disableTextSelection: true },
                  navigation: { disableNavigation: true },
                  pdfZoom: { disableZoom: true },
                  pageNavigation: { disablePageNavigation: true },
                  pdfVerticalScrollByDefault: { disableVerticalScrollByDefault: true }
                }}
              />
            )}

            {file.excelData && (
              <CardContent>
                <Typography variant='h6'>Excel Data Preview</Typography>
                <Box sx={{ overflowX: 'auto', mt: 2 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {file.excelData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              style={{
                                border: '1px solid #ccc',
                                padding: '8px',
                                textAlign: 'center'
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            )}

            {file.docxText && (
              <CardContent
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  height: 200,
                  width: '100%',
                  overflowY: 'hidden'
                }}
              >
                <Typography variant='h6'>Word Document Preview</Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                  {file.docxText}
                </Typography>
              </CardContent>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant='body1' noWrap>
                {file.name}
              </Typography>
              <IconButton onClick={() => handleRemoveFile(file)}>
                <Icon icon='bx:x' fontSize={20} />
              </IconButton>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default FilePreview

// import React from 'react'
// import dynamic from 'next/dynamic'
// import { Box, IconButton, Typography, Card, CardContent, Grid } from '@mui/material'
// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// const FileViewer = dynamic(() => import('react-file-viewer'), { ssr: false })

// const FilePreview = ({ files, handleRemoveFile }) => {
//   console.log(files.type, 'files from preview  type💘💘')
//   console.log(files, 'files from preview 💘💘')
//   const type = 'png'

//   return (
//     <Box display='flex' flexDirection='column' alignItems='center'>
//       <Grid container spacing={2} sx={{ mt: 3, width: '100%' }}>
//         {files.map((file, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card sx={{ maxWidth: 300, marginTop: 2 }}>
//               <CardContent>
//                 <Typography variant='h6' component='div'>
//                   {file.name} {file.type}
//                 </Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   {file.type.startsWith('image/') && <Icon icon='catppuccin:image' fontSize={20} />}
//                   {file.type === 'application/pdf' && <Icon icon='bi:file-earmark-pdf-fill' fontSize={20} />}
//                   {file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.') && (
//                     <Icon icon='vscode-icons:file-type-word' fontSize={20} />
//                   )}
//                   {file.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.') && (
//                     <Icon icon='vscode-icons:file-type-excel' fontSize={20} />
//                   )}
//                   <IconButton
//                     onClick={() => {
//                       /* Handle copy action */
//                     }}
//                   >
//                     <Icon icon='bi:clipboard' fontSize={20} />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => {
//                       /* Handle download action */
//                     }}
//                   >
//                     <Icon icon='bi:download' fontSize={20} />
//                   </IconButton>
//                 </Box>
//                 <FileViewer
//                   fileType={type}
//                   filePath={file}
//                   onError={e => {
//                     console.error('Error reading file ❌❌:', e)
//                   }}
//                 />

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//                   <Typography variant='body1'>{file.name}</Typography>

//                   <IconButton onClick={() => handleRemoveFile(file)}>
//                     <Icon icon='bx:x' fontSize={20} />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   )
// }

// export default FilePreview

// 'use client'
// import React, { useState, useRef } from 'react'

// import { Box, Button, IconButton, Typography, Card, CardContent } from '@mui/material'
// import CloudUploadIcon from '@mui/icons-material/CloudUpload'
// import ImageIcon from '@mui/icons-material/Image'
// import FileCopyIcon from '@mui/icons-material/FileCopy'
// import DownloadIcon from '@mui/icons-material/Download'
// import DescriptionIcon from '@mui/icons-material/Description'

// import * as XLSX from 'xlsx'

// import dynamic from 'next/dynamic'

// // Dynamically load the PDF viewer component with SSR disabled
// const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), {
//   ssr: false
// })
// const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), {
//   ssr: false
// })
// const FilePreview = () => {
//   const [file, setFile] = useState(null)
//   const [previewURL, setPreviewURL] = useState(null)
//   const [fileExtension, setFileExtension] = useState(null)
//   const [excelData, setExcelData] = useState(null)

//   const handleFileChange = e => {
//     const uploadedFile = e.target.files[0]
//     if (!uploadedFile) return

//     const fileURL = URL.createObjectURL(uploadedFile)
//     setFile(uploadedFile)
//     setPreviewURL(fileURL)

//     // Detect file extension instead of MIME type
//     const extension = uploadedFile.name.split('.').pop().toLowerCase()
//     setFileExtension(extension)

//     // If the file is Excel, handle it differently
//     if (extension === 'xlsx' || extension === 'xls') {
//       const reader = new FileReader()
//       reader.onload = event => {
//         const data = new Uint8Array(event.target.result)
//         const workbook = XLSX.read(data, { type: 'array' })
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]]
//         const jsonData = XLSX.utils.sheet_to_json(worksheet)
//         setExcelData(jsonData)
//       }
//       reader.readAsArrayBuffer(uploadedFile)
//     }
//   }

//   const renderPreview = () => {
//     if (!file) return null

//     switch (fileExtension) {
//       case 'jpeg':
//       case 'jpg':
//       case 'png':
//       case 'gif':
//         return <img src={previewURL} alt='Preview' width='300' />
//       case 'pdf':
//         return (
//           <Document file={previewURL}>
//             <Page pageNumber={1} />
//           </Document>
//         )
//       case 'xlsx':
//       case 'xls':
//         return (
//           <div>
//             <h3>Excel File Preview</h3>
//             <table>
//               <thead>
//                 <tr>{excelData && Object.keys(excelData[0]).map(key => <th key={key}>{key}</th>)}</tr>
//               </thead>
//               <tbody>
//                 {excelData &&
//                   excelData.map((row, i) => (
//                     <tr key={i}>
//                       {Object.values(row).map((val, j) => (
//                         <td key={j}>{val}</td>
//                       ))}
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )
//       case 'docx':
//       case 'doc':
//         return <p>Preview not supported for Word files, but ready for upload: {file.name}</p>
//       default:
//         return <p>Cannot preview this file type: {file.name}</p>
//     }
//   }

//   return (
//     <div>
//       <h2>Upload and Preview File</h2>
//       <input type='file' onChange={handleFileChange} />
//       <div className='preview'>{renderPreview()}</div>
//     </div>
//   )
// }

// export default FilePreview
