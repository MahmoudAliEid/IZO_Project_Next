/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ChangeEvent, Fragment, useState, useEffect } from 'react'
import { EditorState } from 'draft-js'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import MuiStep, { StepProps } from '@mui/material/Step'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PublicIcon from '@mui/icons-material/Public'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'
import { fetchViewContact } from 'src/store/apps/contacts/getViewContactSlice'

// import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperCustomDot from './StepperCustomDot'
import ProductInfo from '../productInfo/ProductInfo'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { getCookie } from 'cookies-next'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// import { AppDispatch } from 'src/redux/store'

// Date Picker Imports
import DatePicker from 'react-datepicker'

// import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const steps = [
  {
    icon: 'fluent-mdl2:product-variant',
    title: 'Product Information',
    subtitle: 'Manage Product Information'
  },
  {
    icon: 'ic:baseline-perm-media',
    title: 'Product Media',
    subtitle: 'Provide Product Media'
  },
  {
    icon: 'bx:info-circle',
    title: 'Product Additional Info',
    subtitle: 'Provide Additional Information'
  },
  {
    icon: 'tdesign:money',
    title: 'Product Prices',
    subtitle: 'Manage Product Prices'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '&:not(.Mui-completed)': {
    '& .step-title': {
      color: theme.palette.text.secondary
    },
    '& + svg': {
      color: theme.palette.text.disabled
    }
  },
  '&.Mui-completed': {
    '& .step-title': {
      color: theme.palette.text.disabled
    },
    '& + svg': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiStepLabel-label.Mui-active .step-title': {
    color: theme.palette.primary.main
  }
}))

const StepperAddProduct = ({ isEdit, itemId }) => {
  //** States */
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [initialValues, setInitialValues] = useState({
    productInfo: {
      name: '',
      code: '',
      code2: '',
      barcode_type: '',
      unit_id: '',
      brand_id: '',
      category_id: '',
      sub_category_id: '',
      enable_stock: false,
      alert_quantity: '',
      warranty_id: '',
      long_description: EditorState.createEmpty(),
      short_description: EditorState.createEmpty(),
      location: ''
    }
  })

  // ** Test
  console.log('from stepper product isEdit & itemId 🎶', isEdit, itemId)

  console.log('Hello Word ✨✨✨✨✨')

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // useEffect(() => {
  //   dispatch(fetchCreateProduct())
  // }, [dispatch])

  // ** Functions
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = ({ values, errors, touched, handleBlur, handleChange, setFieldValue, step }) => {
    switch (step) {
      case 0:
        return (
          <Fragment key={step}>
            {/* // **Done: Create Product Information Section here  */}
            {/* // initialValues={values}
            // handleChange={handleChange}
            // handleBlur={handleBlur}
            // setFieldValue={setFieldValue} */}

            <ProductInfo initialValues={values} handleChange={handleChange} setFieldValue={setFieldValue} />

            {/* <h1> test {console.log(' hi my name Mahmoud')}</h1> */}
          </Fragment>
        )
      case 1:
        return <Fragment key={step}>{/* //TODO: Create Product Media */}</Fragment>
      case 2:
        return <Fragment key={step}>{/* //TODO: Create Product Additional Info*/}</Fragment>
      case 3:
        return <Fragment key={step}>{/* //TODO: Create Product Prices*/}</Fragment>
      case 4:
        return <Fragment key={step}></Fragment>
      default:
        return 'Unknown Step'
    }
  }

  //** Validation

  // const validationSchema = Yup.object().shape({
  //   type: Yup.string().required('Type is required'),
  //   supplier_business_name: Yup.string().required('Supplier business name is required'),
  //   prefix: Yup.string().required('Prefix is required'),
  //   first_name: Yup.string().required('First name is required'),
  //   middle_name: Yup.string(),
  //   last_name: Yup.string().required('Last name is required'),
  //   tax_number: Yup.string().required('Tax number is required'),
  //   pay_term_number: Yup.string(),
  //   pay_term_type: Yup.string(),
  //   mobile: Yup.string().required('Mobile number is required'),
  //   landline: Yup.string().required('Landline is required'),
  //   alternate_number: Yup.string(),
  //   city: Yup.string().required('City is required'),
  //   state: Yup.string().required('State is required'),
  //   country: Yup.string().required('Country is required'),
  //   address_line_1: Yup.string(),
  //   address_line_2: Yup.string(),
  //   customer_group_id: Yup.string().required('Customer group ID is required'),
  //   zip_code: Yup.string().required('Zip code is required'),
  //   contact_id: Yup.string(),
  //   custom_field1: Yup.string(),
  //   custom_field2: Yup.string(),
  //   custom_field3: Yup.string(),
  //   custom_field4: Yup.string(),
  //   custom_field5: Yup.string(),
  //   custom_field6: Yup.string(),
  //   custom_field7: Yup.string(),
  //   custom_field8: Yup.string(),
  //   custom_field9: Yup.string(),
  //   custom_field10: Yup.string(),
  //   email: Yup.string().email('Invalid email address').required('Email is required'),
  //   shipping_address: Yup.string().required('Shipping address is required'),
  //   position: Yup.string().required('Position is required'),
  //   dob: Yup.date().required('Date of birth is required'),
  //   credit_limit: Yup.string().required('Credit limit is required'),
  //   opening_balance: Yup.string().required('Opening balance is required'),
  // });

  // ** Submit
  const handleSubmitForm = (values, { resetForm }) => {
    // ** Test
    console.log(values, 'from submit Product 🐱‍🏍')

    setActiveStep(activeStep + 1)
    resetForm()
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography align='center'>All steps are completed! 🎉</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      )
    } else {
      return (
        <Formik initialValues={initialValues.productInfo} onSubmit={handleSubmitForm} enableReinitialize={true}>
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue, resetForm }) => (
            <form>
              <Grid container spacing={5} mt={5}>
                <Grid item xs={12} mb={5}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[activeStep].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[activeStep].subtitle}
                  </Typography>
                </Grid>

                {getStepContent({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                  step: activeStep
                })}

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    size='large'
                    variant='outlined'
                    color='secondary'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      size='large'
                      variant='contained'
                      color='primary'
                      onClick={() => handleSubmitForm(values, { resetForm })}
                    >
                      {isEdit ? 'Update Product' : 'Add Product'}
                    </Button>
                  ) : (
                    <Button size='large' variant='contained' color='primary' onClick={handleNext}>
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )
    }
  }

  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 3,
        height: '600px'
      }}
    >
      <CardContent
        sx={{
          overflowY: 'auto',
          gridColumn: 'span 3',
          borderRight: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={<Icon icon='bx:chevron-down' width='20px' height='20px' />}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '2rem'
            }}
          >
            {steps.map((step, index) => {
              return (
                <Step
                  key={index}
                  sx={{
                    padding: '0px !important'
                  }}
                >
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div
                      className='step-label'
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                      }}
                      onClick={() => {
                        setActiveStep(index)
                      }}
                    >
                      <CustomAvatar
                        variant='rounded'
                        skin={activeStep === index ? 'filled' : 'light'}
                        color={activeStep >= index ? 'primary' : 'secondary'}
                        sx={{
                          borderRadius: 1,
                          ...(activeStep === index && {
                            boxShadow: theme => `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                          })
                        }}
                      ></CustomAvatar>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          marginTop: '0.5rem'
                        }}
                      >
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <CardContent
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          gridColumn: 'span 9',
          padding: '2rem'
        }}
      >
        {renderContent()}
      </CardContent>
    </Card>
  )
}

export default StepperAddProduct
