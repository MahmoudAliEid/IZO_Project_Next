
// ** React Imports
import { Fragment} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { FormikErrors, FormikTouched } from 'formik'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

interface Props {
  image: string | File[]
  initialValues: any // replace 'any' with the actual type of your initialValues
  errors: FormikErrors<any> // replace 'any' with the actual type of your form values
  touched: FormikTouched<any> // replace 'any' with the actual type of your form values
  handleBlur: (field: string) => void
  handleChange: (e: React.ChangeEvent<any>) => void // replace 'any' with the actual type of your event
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
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

const Productimage = ({ image, setFieldValue }: Props) => {

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {

      setFieldValue(
        'productImage',
        acceptedFiles.map((file: File) => Object.assign(file))
      )
    },
    onDropRejected: () => {
      toast.error('You can only upload image with a maximum size of 2 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='bx:file' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = image
    //@ts-ignore
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFieldValue(
        'productImage',[...filtered])
  }

  const fileList =
    Array.isArray(image) && image.length > 0 ? (
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
          <div className='file-preview'>
            <img width={38} height={38} alt={'preview-img'} src={image as string} />
          </div>
          <div>
            <Typography className='file-name'>The Image</Typography>
          </div>
        </div>
        <IconButton onClick={() => setFieldValue('productImage',[])}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </ListItem>
    )
  const handleRemoveAllFiles = () => {

    setFieldValue(`productImage`,[])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary'>Allowed only 1 image</Typography>

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
{image.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default Productimage
