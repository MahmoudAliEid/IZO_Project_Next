
// ** React Imports
import { Fragment ,useState} from 'react'

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
import { getCookie } from 'cookies-next'

// **  notify
import notify from 'src/utils/notify'


// ** Link Next
import Link from 'next/link'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

// ** Import global alert
 import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import axios from 'axios'
import CustomSlider from 'src/@core/Global/CustomSlider'


interface FileProp {
  name: string
  type: string
  size: number
}

interface Props {
  image: string | File[] | any[] |[
  {
    oldImages: [
      {
        id: number ,
        value:string
      }
    ]
  }
  ]
  errors: FormikErrors<any> // replace 'any' with the actual type of your form values
  touched: FormikTouched<any> // replace 'any' with the actual type of your form values
  handleBlur: (field: string) => void
  handleChange: (e: React.ChangeEvent<any>) => void // replace 'any' with the actual type of your event
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  handleClose: () => void

}

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

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const Productmultipleimages: React.FC<Props> = ({
image,
  setFieldValue,
  handleClose
}) => {

  // ** States
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)

  const url = getCookie('apiUrl')
  // const fontStyle=getCookie('fontStyle')


  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {

      setFieldValue(
        'productmultipleimages',
        acceptedFiles.map((file: File) => Object.assign(file))
      )
    },
    onDropRejected: () => {
      toast.error('You can only upload files with a maximum size of 2 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (typeof file === 'string') {
      return <img width={38} height={38} alt={file} src={file as string} />
    }
    else if (file.type.startsWith('image')) {
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
        'productmultipleimages',
        [...filtered])

  }

  // ** Function to render old images
  const renderOldImages = () => {
    if (image.length > 0 && image[0]?.oldImages && image[0].oldImages.length > 0) {
      return (
        <List>
          {image[0].oldImages.map((file:{id:number,value:string}) => (
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: ['row', 'row', 'row'],
                justifyContent: 'space-between',

              }}
              key={file.id}
            >

              <div className='file-details'>
                <div className='file-preview'>{
                  //@ts-ignore
                  renderFilePreview(file.value)
                }</div>
                <div>
                  <Typography className='file-name'>The Image</Typography>
                </div>
              </div>
              <IconButton onClick={() => {
                console.log(file.id)
                setOpenDeleteAlert(true)
              }}>
                <Icon icon='bx:x' fontSize={20} />
              </IconButton>

              {openDeleteAlert &&
                <DeleteGlobalAlert
                name={'Product Image'}
                open={openDeleteAlert}
                close={() => {
                setOpenDeleteAlert(false)
                }
                }
                mainHandleDelete={
                  async () => {
                    const axiosInstance = axios.create({
                    headers: {
                      Authorization: `Bearer ${getCookie('token')}`,
                      "Content-Type": "application/json"
                      }
                    })
                    await axiosInstance.post(`${url}/app/react/products/delete-media/${file.id}`).then((res) => {
                      if (res.status === 200) {
                        notify('Product Image Deleted Successfully', 'success')
                        setTimeout(() => {
                          setOpenDeleteAlert(false)
                          handleClose()
                        }, 2000)
                      }
                    })
              }
            }



          />}

            </ListItem>

          ))}

        </List>
      )
    }
  }

  const handleTogglePreview = () => {
    setOpenPreview(!openPreview)
  }
  const fileList =
    Array.isArray(image) && image.length > 0 && !image[0]?.oldImages? (
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
              {
                file.size ?<Typography className='file-size' variant='body2'>
                {Math.round(file.size / 100) / 10 > 1000
                  ? ` ${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                  : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                </Typography> :
                  <Typography className='file-size' variant='body2'>
                    The Image
                  </Typography>
              }

            </div>
          </div>
          <IconButton onClick={() => handleRemoveFile(file)}>
            <Icon icon='bx:x' fontSize={20} />
          </IconButton>
        </ListItem>
      ))
    ) : renderOldImages()



  const handleRemoveAllFiles = () => {
    setFieldValue(
        'productmultipleimages',
        []
      )
  }
  console.log(openPreview,'openPreview')

  return (
    <Fragment>
      {
            openPreview && (
              <CustomSlider
                data={image}
                open={openPreview}
                toggle={handleTogglePreview}


              />
            )
          }
      <div {...getRootProps({ className: 'dropzone' })} >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'column'], alignItems: 'center' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Drop files here or click{' '}
              <Link href='/' onClick={e => e.preventDefault()}>
                browse
              </Link>
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </div>
      {image.length ? (
        <Fragment>
          <List>{fileList}</List>
          {
            image.length > 0 && !image[0]?.oldImages && (
              <div className='buttons'>
                <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                  Remove All
                </Button>
                <Button color='primary' variant='outlined'
                  onClick={() => {
                 handleTogglePreview()
                  }}
                >
                Preview
                </Button>
              </div>
            )
          }
          {/* <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
          </div> */}

        </Fragment>
      ) : null}

    </Fragment>
  )
}

export default Productmultipleimages
