// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

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
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UploadImage = ({ image, setImage }) => {
  // ** State
  // const [image, setImage] = useState([])

  // ** Hooks
  const theme = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
    // maxFiles: 2,
    // maxSize: 2000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setImage(acceptedFiles.map(file => Object.assign(file)))
    }

    // onDropRejected: () => {
    //   toast.error('You can only upload 2 files & maximum size of 2 MB.', {
    //     duration: 2000
    //   })
    // }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='bx:file' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = image
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setImage([...filtered])
  }

  const fileList = Array.isArray(image) ? (
    image.map(file => (
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: ['row', 'row', 'row'],
          justifyContent: 'space-between'
        }}
        key={file.name}
      >
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <div>
            <Typography className='file-name'>{file.name}</Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? ` ${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </ListItem>
    ))
  ) : (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: ['row', 'row', 'row'],
        justifyContent: 'space-between'
      }}
    >
      <div className='file-details'>
        <div>
          <Typography className='file-name'>The Image:</Typography>
        </div>
        <div className='file-preview'>
          <img width={38} height={38} alt={'preview-img'} src={image} />
        </div>
      </div>
      <IconButton onClick={() => setImage('')}>
        <Icon icon='bx:x' fontSize={20} />
      </IconButton>
    </ListItem>
  )

  // const handleRemoveAllFiles = () => {
  //   setImage([])
  // }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'column', 'column'],
            alignItems: 'center',
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.1)} !important`
          }}
        >
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'center'] }}>
            <HeadingTypography variant='h5'>Drop image here or click to upload.</HeadingTypography>
            <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
            {/* <Typography color='textSecondary'>Max 2 files and max size of 2 MB</Typography> */}
          </Box>
        </Box>
      </div>
      {image.length ? (
        <Fragment>
          <List
            sx={{
              margin: '10px 0',
              display: 'flex',
              flexDirection: ['column', 'column', 'column'],
              alignItems: 'center',
              border: `1px solid ${theme.palette.primary.main}`,
              backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.1)} !important`
            }}
          >
            {fileList}
          </List>
          {/* <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div> */}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default UploadImage
