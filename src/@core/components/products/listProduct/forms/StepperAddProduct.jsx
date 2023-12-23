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
import ProductPrices from '../productprices/ProductPrices'

// import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperCustomDot from './StepperCustomDot'
import ProductInfo from '../productInfo/ProductInfo'
import ProductMedia from '../productmedia'

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
import ProductAdditionalInfo from '../productAdditionalInfo/ProductAdditionalInfo'

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
  const [unitId, setUnitId] = useState('')
  const [initialValues, setInitialValues] = useState({
    name: '',
    code: '',
    code2: '',
    barcode_type: '',
    unit_id: '',
    sub_unit_id: [],
    brand_id: '',
    category_id: '',
    sub_category_id: '',
    enable_stock: false,
    alert_quantity: null,
    warranty_id: '',
    long_description: EditorState.createEmpty(),
    short_description: EditorState.createEmpty(),
    location: '',
    productimage: [],
    productmultipleimages: [],
    productbrochure: [],
    productvideo: [],
    expiry_period_type: 'no Applicable',
    not_for_sale: false,
    expiry_period: '',
    weight: '',
    custom_field_1: '',
    custom_field_2: '',
    custom_field_3: '',
    custom_field_4: '',
    product_type: 'single',
    tableData: [
      {
        id: 1,
        unit_id: unitId,
        value: 'default_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 2,
        unit_id: unitId,
        value: 'whole_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 3,
        unit_id: unitId,
        value: 'retail_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 4,
        unit_id: unitId,
        value: 'minimum_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 5,
        unit_id: unitId,
        value: 'last_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 6,
        unit_id: unitId,
        value: 'ecm_before_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 7,
        unit_id: unitId,
        value: 'ecm_after_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 8,
        unit_id: unitId,
        value: 'custom_price_1',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 9,
        unit_id: unitId,
        value: 'custom_price_2',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 10,
        unit_id: unitId,
        value: 'custom_price_3',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 11,
        unit_id: unitId,
        value: 'custom_price_4',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      }
    ],
    tableDataChildOne: [
      {
        id: 1,
        unit_id: unitId,
        value: 'default_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 2,
        unit_id: unitId,
        value: 'whole_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 3,
        unit_id: unitId,
        value: 'retail_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 4,
        unit_id: unitId,
        value: 'minimum_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 5,
        unit_id: unitId,
        value: 'last_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 6,
        unit_id: unitId,
        value: 'ecm_before_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 7,
        unit_id: unitId,
        value: 'ecm_after_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 8,
        unit_id: unitId,
        value: 'custom_price_1',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 9,
        unit_id: unitId,
        value: 'custom_price_2',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 10,
        unit_id: unitId,
        value: 'custom_price_3',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 11,
        unit_id: unitId,
        value: 'custom_price_4',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      }
    ],
    tableDataChildTwo: [
      {
        id: 1,
        unit_id: unitId,
        value: 'default_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 2,
        unit_id: unitId,
        value: 'whole_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 3,
        unit_id: unitId,
        value: 'retail_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 4,
        unit_id: unitId,
        value: 'minimum_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 5,
        unit_id: unitId,
        value: 'last_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 6,
        unit_id: unitId,
        value: 'ecm_before_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 7,
        unit_id: unitId,
        value: 'ecm_after_price',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 8,
        unit_id: unitId,
        value: 'custom_price_1',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 9,
        unit_id: unitId,
        value: 'custom_price_2',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 10,
        unit_id: unitId,
        value: 'custom_price_3',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 11,
        unit_id: unitId,
        value: 'custom_price_4',
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      }
    ]
  })

  // ** Test
  console.log('from stepper product isEdit & itemId 🎶', isEdit, itemId)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (initialValues.unit_id) {
      setUnitId(initialValues.unit_id)
    }
  }, [initialValues.unit_id])

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

  console.log(unitId, 'from stepper unitId 🎶')
  console.log(initialValues.unit_id, 'from stepper initialValues 🎶')

  const getStepContent = ({ values, errors, touched, handleBlur, handleChange, setFieldValue, step }) => {
    switch (step) {
      case 0:
        return (
          <Fragment key={step}>
            {/* // **Done: Create Product Information Section here  */}
            <ProductInfo
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <ProductMedia
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <ProductAdditionalInfo
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={step}>
            <ProductPrices
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              setInitialValues={setInitialValues}
            />
          </Fragment>
        )
      case 4:
        return <Fragment key={step}></Fragment>
      default:
        return 'Unknown Step'
    }
  }

  //** Validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
    code2: Yup.string(),
    barcode_type: Yup.string(),
    unit_id: Yup.string(),
    brand_id: Yup.string(),
    category_id: Yup.string(),
    sub_category_id: Yup.string(),
    enable_stock: Yup.string(),
    alert_quantity: Yup.string().required('Alert quantity is required when stock is enabled'),
    warranty_id: Yup.string(),
    location: Yup.string()
  })

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize={true}
        >
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
