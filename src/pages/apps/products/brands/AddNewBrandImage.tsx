
// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import toast from 'react-hot-toast'
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

const AddNewBrandImage = ({ image_url, setFieldValue }: any) => {
    // console.log(image_url, "image_url for edit");

    // ** State
    const [files, setFiles] = useState<File[]>([])

    // console.log(files, 'files for edit 🥵🥵')

    // ** Hooks
    const theme = useTheme()
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 2,
        maxSize: 2000000,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: (acceptedFiles: File[]) => {
            console.log(acceptedFiles, 'acceptedFiles for edit 👌👌👌👌👌👌')

            setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
            setFieldValue(
                'image',
                acceptedFiles.map((file: File) => Object.assign(file))
            )
        },
        onDropRejected: () => {
            toast.error('You can only upload 2 files & maximum size of 2 MB.', {
                duration: 2000
            })
        }
    })

    const renderFilePreview = (file: FileProp) => {
        if (file.type.startsWith('image')) {
            return <img width={80} height={80} alt={file.name} src={URL.createObjectURL(file as any)} />
        } else {
            return <Icon icon='bx:file' />
        }
    }

    const renderFilePreview2 = () => {
        if (image_url) {
            return <img width={150} height={150} alt={image_url} src={image_url} />
        } else {
            return <Icon icon='bx:file' />
        }
    }

    const handleRemoveFile = (file: FileProp) => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
        setFiles([...filtered])
    }

    const fileList = files.map((file: FileProp) => (
        <ListItem key={file.name}>
            <div className='file-details'>
                <div className='file-preview'>{renderFilePreview(file)}</div>
                <div>
                    <Typography className='file-name'>{file.name}</Typography>
                    <Typography className='file-size' variant='body2'>
                        {Math.round(file.size / 100) / 10 > 1000
                            ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                            : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                    </Typography>
                </div>
            </div>
            <IconButton onClick={() => handleRemoveFile(file)}>
                <Icon
                    icon='bx:x'
                    fontSize={20}
                    style={{
                        color: theme.palette.error.main,
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '50%'
                    }}
                />
            </IconButton>
        </ListItem>
    ))

    return (
        <Fragment>
            <Typography
                variant='h6'
                component='span'
                sx={{
                    textTransform: 'capitalize',
                    marginBottom: theme.spacing(5),
                    [theme.breakpoints.down('sm')]: {
                        marginBottom: theme.spacing(4)
                    },
                    textAlign: 'center'
                }}
            >
                Upload Image
            </Typography>

            {files.length ? null : (
                <div
                    {...getRootProps({ className: 'dropzone' })}
                    style={{ cursor: 'pointer', border: '1px dashed #ccc', padding: '1rem', borderRadius: '5px' }}
                >
                    <input {...getInputProps()} />
                    <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                        <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                            <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                            <Typography color='textSecondary'>Max 2 files and max size of 2 MB</Typography>
                        </Box>
                    </Box>
                </div>
            )}
            {files.length ? (
                <Fragment>
                    <List>{fileList}</List>
                </Fragment>
            ) : null}

            {image_url && typeof image_url === 'string' && files.length === 0 && image_url.startsWith('http') && (
                <List>
                    {' '}
                    <ListItem>
                        <div
                            className='file-details'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                        >
                            <div className='file-preview'>{renderFilePreview2()}</div>
                            <IconButton onClick={() => setFieldValue('image', '')}>
                                <Icon
                                    icon='bx:x'
                                    fontSize={20}
                                    style={{
                                        color: theme.palette.error.main,
                                        backgroundColor: theme.palette.secondary.main,
                                        borderRadius: '50%'
                                    }}
                                />
                            </IconButton>
                        </div>
                    </ListItem>
                </List>
            )}
        </Fragment>
    )
}

export default AddNewBrandImage
