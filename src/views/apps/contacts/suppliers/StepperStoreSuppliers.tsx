
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

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
// import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { Formik, Field} from 'formik'
import * as Yup from 'yup'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
// import PublicIcon from '@mui/icons-material/Public'
// import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'
import { fetchViewContact } from 'src/store/apps/contacts/getViewContactSlice'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { getCookie } from 'cookies-next'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'src/store'
import { fetchCreateContactData } from 'src/store/apps/contacts/contactCreateSlice'
import { saveNewContact } from 'src/store/apps/contacts/contactStoreSlice'
import { fetchContactData } from 'src/store/apps/contacts/contactEditSlice'
import { updateContact } from 'src/store/apps/contacts/contactUpdateSlice'

// Date Picker Imports
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'
import { fetchSuppliers } from 'src/store/apps/contacts/getSuppliersSlice'
import { fetchCustomers } from 'src/store/apps/contacts/getCustomersSlice'

const steps = [
  {
    icon: 'bx:user-circle',
    title: 'Personal Information',
    subtitle: 'Manage Personal Information'
  },
  {
    icon: 'bx:info-circle',
    title: 'More Information',
    subtitle: 'Provide Additional Information'
  },
  {
    icon: 'bx:wrench',
    title: 'Custom Field',
    subtitle: 'Provide Additional Information'
  }
]

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
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

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  gridColumn: 'span 3',

  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))



const StepperStoreSuppliers = ({  isEdit, itemId, contact }: any) => {
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [openLoading, setOpenLoading] = useState(false)


  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    //@ts-ignore
    setToken(token)

     //@ts-ignore
    setUrl(url)
  }, [token, url])
  const [initialValues, setInitialValues] = useState<any>({
    type: '',
    supplier_business_name: '',
    prefix: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    tax_number: '',
    pay_term_number: '',
    pay_term_type: '',
    mobile: '',
    landline: '',
    alternate_number: '',
    city: '',
    state: '',
    country: '',
    address_line_1: '',
    address_line_2: '',
    customer_group_id: '',
    zip_code: '',
    contact_id: '',
    custom_field1: '',
    custom_field2: '',
    custom_field3: '',
    custom_field4: '',
    custom_field5: '',
    custom_field6: '',
    custom_field7: '',
    custom_field8: '',
    custom_field9: '',
    custom_field10: '',
    email: '',
    shipping_address: '',
    position: '',
    dob: new Date(),
    credit_limit: '',
    opening_balance: ''
  })

  const [activeStep, setActiveStep] = useState<number>(0)

  const [ContactType] = useState<any>([
    { id: 1, name: 'customer' },
    { id: 2, name: 'supplier' },
    { id: 3, name: 'Both' }
  ])

  const [PayTermType] = useState<any>([
    { id: 1, name: 'days' },
    { id: 2, name: 'months' }
  ])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {

     //@ts-ignore
    dispatch(fetchCreateContactData(contact))
  }, [dispatch, contact])



   //@ts-ignore
  const data = useSelector((state: { createUser: { contactCreateSlice: any } }) => state.contactCreateSlice?.data)

  useEffect(() => {
    if (data !== null && data !== undefined && data.type !== undefined) {


      // set type of contact in initial values
      setInitialValues((prev: any) => ({
        ...prev,
        type: data.type.value
      }))
    }
  }, [data])

  // Handle Stepper
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

  const getStepContent = ({ values, errors, touched, handleBlur, handleChange, setFieldValue,step }: any) => {
    switch (step) {
      case 0:
        return (
          <Fragment key={step}>
           <Grid container spacing={5} justifyContent={'center'} alignContent={'center'} margin={'auto'}>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-standard-label'>Contact type </InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-standard-label'
                      name='type'
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    label='Contact type'

                    >
                      {ContactType.map((item: any) => (
                        <MenuItem value={item.name} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

              </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel id='prefix-label'>Prefix</InputLabel>
                <Select
                  labelId='prefix-label'
                  id='prefix'
                  name='prefix'
                  value={values.prefix}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                    label='Prefix'

                  required
                >
                  <MenuItem value=''>None</MenuItem>
                  <MenuItem value='Mr.'>Mr.</MenuItem>
                  <MenuItem value='Mrs.'>Mrs.</MenuItem>
                  <MenuItem value='Ms.'>Ms.</MenuItem>
                </Select>
              </FormControl>
            </Grid>

              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}

              >
                <FormControl fullWidth>
                  {/* form input for Business Name */}

                <Field
                  as={TextField}
                  name='supplier_business_name'
                  label='Business Name'
                    variant='outlined'
                    fullWidth
                  margin='normal'
                  required
                  sx={{ gridColumn: 'span 6' }}
                  />
                </FormControl>
              </Grid>




            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Field
                as={TextField}
                name='first_name'
                label='First Name'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                sx={{ gridColumn: 'span 6' }}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Field
                as={TextField}
                name='middle_name'
                label='Middle Name'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                sx={{ gridColumn: 'span 6' }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Field
                as={TextField}
                name='last_name'
                label='Last Name'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                sx={{ gridColumn: 'span 6' }}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Field
                as={TextField}
                name='mobile'
                label='Mobile Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='mobile number'
                value={values.mobile}
                onChange={handleChange}
                required
                type='number'
              />
            </Grid>

            {/*
                    filed alternative mobile number
                  */}
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Field
                as={TextField}
                name='alternate_number'
                label='Alternative Mobile Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='alternative mobile number'
                value={values.alternate_number}
                onChange={handleChange}
                type='number'
              />
            </Grid>

            {/* Landline number*/}
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Field
                as={TextField}
                name='landline'
                label='Landline Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='family contact number'
                value={values.landline}
                  onChange={handleChange}
                   type='number'
              />
            </Grid>


              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Field
                  as={TextField}
                  name='email'
                  label='E-mail'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  required
                  type='email'
                  sx={{ gridColumn: 'span 6' }}
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                <DatePickerWrapper>
                  <DatePicker
                    selected={values.dob}
                    id='basic-input'
                    onChange={(date: any) => {
                      values.dob = date
                      setFieldValue('dob', date)

                    }}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput label='Date of Birth' />}
                  />
                  </DatePickerWrapper>
                  </FormControl>
              </Grid>

               </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            {/* Tax number input  */}
            <Grid container spacing={3} justifyContent={'center'} alignContent={'center'} alignItems={'center'} margin={'auto'}>
            <Grid item lg={6} xs={12} sm={12} md={6}>
              <Field
                as={TextField}
                name='tax_number'
                label='Tax Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='tax number'
                value={values.tax_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={6} xs={12} sm={12} md={6}>
              {/* opening Balance input */}
              <Field
                as={TextField}
                name='opening_balance'
                label='Opening Balance'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='opening balance'
                value={values.opening_balance}
                onChange={handleChange}
                type='number'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Grid container spacing={3}>
                <Grid item  xs={3} md={2} lg={2} sm={6}>

                <FormControl fullWidth>
                  <TextField
                    label='Pay Term '
                    variant='outlined'
                    fullWidth
                    placeholder='Pay Term'
                    value={values.pay_term_number}
                    onChange={handleChange}
                        type='number'
                        name='pay_term_number'
                      />

                    </FormControl>

                </Grid>
                <Grid item  xs={9} md={10} lg={10} sm={6}>
                    <FormControl
                fullWidth
              >
                <InputLabel id='demo-simple-select-standard-label'>Select pay term type </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='pay_term_type'
                  value={values.pay_term_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Select pay term type'
                >
                  {PayTermType.map((item: any) => (
                    <MenuItem
                      value={item.name}
                      key={item.id}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                  </Grid>
              </Grid>
            </Grid>

            {/*  filed for address line 1 and 2 */}
            <Grid item lg={6} xs={12} sm={12} md={6}>

              <Field
                as={TextField}
                name='address_line_1'
                label='Address Line 1'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='address line 1'
                value={values.address_line_1}
                onChange={handleChange}

              />
            </Grid>
            <Grid item lg={6} xs={12} sm={12} md={6}>
              <Field
                as={TextField}
                name='address_line_2'
                label='Address Line 2'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='address line 2'
                value={values.address_line_2}
                onChange={handleChange}

              />
              </Grid>


              <Grid item lg={6} xs={12} sm={12} md={6}>
                {/* filed for city */}
                <Field
                  as={TextField}
                  name='city'
                  label='City'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='city'
                  value={values.city}
                  onChange={handleChange}

                />
              </Grid>
              <Grid item lg={6} xs={12} sm={12} md={6}>
                {/*  filed for state */}
                <Field
                  as={TextField}
                  name='state'
                  label='State'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='state'
                  value={values.state}
                  onChange={handleChange}

                />
              </Grid>
              <Grid item lg={6} xs={12} sm={12} md={6}>
                {/* filed for country */}
                <Field
                  as={TextField}
                  name='country'
                  label='Country'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='country'
                  value={values.country}
                  onChange={handleChange}

                />
              </Grid>
              <Grid item lg={6} xs={12} sm={12} md={6}>
                {/* filed for zip code */}
                <Field
                  as={TextField}
                  name='zip_code'
                  label='Zip Code'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='zip code'
                  value={values.zip_code}
                  onChange={handleChange}

                  type='number'
                />
              </Grid>

              </Grid>

          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid container spacing={3} justifyContent={'center'} alignContent={'center'} alignItems={'center'} margin={'auto'}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <Grid item lg={6} xs={12} sm={12} md={6} key={num}>
                <Field
                  as={TextField}
                  name={`custom_field${num}`}
                  label={`Custom Field ${num}`}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder={`custom field ${num}`}
                  value={values[`custom_field${num}`]}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            {/* Shipping Address input */}
            <Grid item  xs={12} >
              <Field
                as={TextField}
                name='shipping_address'
                label='Shipping Address'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='shipping address'
                value={values.shipping_address}
                onChange={handleChange}
              />
              </Grid>
              </Grid>
          </Fragment>
        )
      case 3:
        return <Fragment key={step}></Fragment>
      default:
        return 'Unknown Step'
    }
  }

  // ======================== Validation Schema ==============================

  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    supplier_business_name: Yup.string().required('Supplier business name is required'),
    prefix: Yup.string().required('Prefix is required'),
    first_name: Yup.string().required('First name is required'),
    middle_name: Yup.string(),
    last_name: Yup.string().required('Last name is required'),
    tax_number: Yup.string().required('Tax number is required'),

    pay_term_type: Yup.string(),
    mobile: Yup.string().required('Mobile number is required'),
    landline: Yup.string().required('Landline is required'),
    alternate_number: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    address_line_1: Yup.string(),
    address_line_2: Yup.string(),
    customer_group_id: Yup.string().required('Customer group ID is required'),
    zip_code: Yup.string().required('Zip code is required'),
    contact_id: Yup.string(),
    custom_field1: Yup.string(),
    custom_field2: Yup.string(),
    custom_field3: Yup.string(),
    custom_field4: Yup.string(),
    custom_field5: Yup.string(),
    custom_field6: Yup.string(),
    custom_field7: Yup.string(),
    custom_field8: Yup.string(),
    custom_field9: Yup.string(),
    custom_field10: Yup.string(),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    shipping_address: Yup.string().required('Shipping address is required'),
    position: Yup.string().required('Position is required'),
    dob: Yup.date().required('Date of birth is required'),
    credit_limit: Yup.string().required('Credit limit is required'),
    opening_balance: Yup.string().required('Opening balance is required'),
  });

  // ======================== handle Edit contact ==============================

  useEffect(() => {
    if (itemId && isEdit) {

       //@ts-ignore
      dispatch(fetchContactData({ itemId }))
    }
  }, [dispatch, itemId, isEdit])

 //@ts-ignore
  const contactEditData = useSelector((state: { contactEditSlice: { data: any } }) => state.contactEditSlice?.contact)
  const saveStatus = useSelector((state: { contactStoreSlice: { status: string } }) => state.contactStoreSlice)
  const editStatus = useSelector((state: { contactUpdateSlice: { status: string } }) => state.contactUpdateSlice)

  useEffect(() => {
    if (
      isEdit &&
      contactEditData !== null &&
      contactEditData !== undefined &&
      contactEditData.contact !== null &&
      contactEditData.contact !== undefined
    ) {

      console.log('contactEditData ✨', contactEditData);

      // Update initial values with edit data
      const {
        type,
        supplier_business_name,
        prefix,
        first_name,
        middle_name,
        last_name,
        tax_number,
        pay_term_number,
        pay_term_type,
        mobile,
        landline,
        alternate_number,
        city,
        state,
        country,
        address_line_1,
        address_line_2,
        customer_group_id,
        zip_code,
        contact_id,
        custom_field1,
        custom_field2,
        custom_field3,
        custom_field4,
        custom_field5,
        custom_field6,
        custom_field7,
        custom_field8,
        custom_field9,
        custom_field10,
        email,
        shipping_address,
        position,
        dob,
        credit_limit,
        opening_balance
      } = contactEditData.contact
      setInitialValues({
        type,
        supplier_business_name,
        prefix,
        first_name,
        middle_name,
        last_name,
        tax_number,
        pay_term_number,
        pay_term_type,
        mobile,
        landline,
        alternate_number,
        city,
        state,
        country,
        address_line_1,
        address_line_2,
        customer_group_id,
        zip_code,
        contact_id,
        custom_field1,
        custom_field2,
        custom_field3,
        custom_field4,
        custom_field5,
        custom_field6,
        custom_field7,
        custom_field8,
        custom_field9,
        custom_field10,
        email,
        shipping_address,
        position,

        dob: new Date(dob),
        credit_limit,
        opening_balance
      })
    }
  }, [contactEditData, isEdit])

  const handleSubmitForm = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    if (!isEdit) {
       //@ts-ignore
      dispatch(saveNewContact(values)).then(() => {
        if (contact === 'supplier') {
          //@ts-ignore
          dispatch(fetchSuppliers(token, url))
        } else {
          //@ts-ignore
           dispatch(fetchCustomers(token, url))
        }
         //@ts-ignore
        dispatch(fetchViewContact({ token, id: itemId }))

      })
    } else {
      dispatch(
        //@ts-ignore
        updateContact({ updateData: values, id: itemId })
      ).then(() => {
         if (contact === 'supplier') {
          //@ts-ignore
           dispatch(fetchSuppliers(token, url))
        } else {
          //@ts-ignore
       dispatch(fetchCustomers(token, url))
        }
         //@ts-ignore
        dispatch(fetchViewContact({ token, id: itemId }))

      })


      // activeStep === steps.length - 1 ? toast.success('Form Submitted') : null
    }
    setActiveStep(activeStep + 1)
    resetForm()
    setOpenLoading(true)
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
       return(<>
          <Grid
            container
            spacing={2}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            padding={3}
          >
            <Grid item xs={12} sx={{ margin: 'auto' }}>
              <Typography align='center'>All steps are completed! 🎉</Typography>
            </Grid>
            <Grid item xs={12} sx={{ margin: 'auto', mt: 4 }}>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button size='large' variant='contained' onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>)

    } else {
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue,resetForm}) => (
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
                      {isEdit ? 'Update' : 'Create'}
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
        sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: { xs: 'column', md: 'row', lg: 'row' } }}
    >
       <LoadingAnimation
        open={openLoading}
        onClose={() => setOpenLoading(false)}
        statusType={isEdit ? editStatus : saveStatus}
      />
        <StepperHeaderContainer>
        <StepperWrapper >
          <Stepper
            activeStep={activeStep}
            connector={<></>}

            orientation='vertical'
            sx={{ height: '100%', minWidth: '15rem' }}

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
                        width: '100%',
                        height: '100%',
                        padding: '2rem 0'
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
                      >
                         <Icon icon={step.icon} />
                      </CustomAvatar>
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
        </StepperHeaderContainer>

      <CardContent
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          gridColumn: 'span 9',
          padding: '2rem',

          height: '100%',
          width: '100%'
        }}
      >
        {renderContent()}
      </CardContent>
    </Card>
  )
}

export default StepperStoreSuppliers
