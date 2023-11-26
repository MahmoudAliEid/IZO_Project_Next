/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ChangeEvent, Fragment, useState, useEffect } from 'react'

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

import PublicIcon from '@mui/icons-material/Public'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'

import BusinessIcon from '@mui/icons-material/Business' // Business Icon
import DomainIcon from '@mui/icons-material/Domain' // Type Icon
import ThreePIcon from '@mui/icons-material/ThreeP'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import PersonIcon from '@mui/icons-material/Person' // Name Icon
import EmailIcon from '@mui/icons-material/Email' // Email Icon
import CallIcon from '@mui/icons-material/Call' // Mobile Icon

import LocationOnIcon from '@mui/icons-material/LocationOn' // Address Icon
import EventIcon from '@mui/icons-material/Event' // Date of Birth Icon
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import RadarIcon from '@mui/icons-material/Radar'
import SourceIcon from '@mui/icons-material/Source'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance' // Payment Term Number Icon
import AccessTimeIcon from '@mui/icons-material/AccessTime' // Payment Term Type Icon
import ApprovalIcon from '@mui/icons-material/Approval'
import DeleteIcon from '@mui/icons-material/Delete' // Deleted At Icon
import CreateIcon from '@mui/icons-material/Create' // Created At Icon
import UpdateIcon from '@mui/icons-material/Update' // Updated At Icon
import PaymentIcon from '@mui/icons-material/Payment' // Price Group ID Icon
import CreditCardIcon from '@mui/icons-material/CreditCard' // Tax Number Icon
import CropRotateIcon from '@mui/icons-material/CropRotate'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from 'src/views/apps/contacts/suppliers/StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// import { AppDispatch } from 'src/redux/store'
import { fetchCreateContactData } from 'src/store/apps/contacts/contactCreateSlice'
import { saveNewContact } from 'src/store/apps/contacts/contactStoreSlice'
import { fetchContactData } from 'src/store/apps/contacts/contactEditSlice'
import { updateContact } from 'src/store/apps/contacts/contactUpdateSlice'
import BadgeIcon from '@mui/icons-material/Badge'

// Date Picker Imports
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const steps = [
  {
    icon: 'bx:font',
    title: 'Personal Information',
    subtitle: 'Manage Personal Information'
  },
  {
    icon: 'bx:info-circle',
    title: 'More Information',
    subtitle: 'Provide Additional Information'
  },
  {
    icon: 'bx:info-circle',
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

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}


const StepperView = ({ isEdit, itemId, contact, ContactData }: any) => {
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
  const [date, setDate] = useState<any>(new Date())
  const [customer_group, setCustomerGroup] = useState<any>([])
  const [ContactType, setContactType] = useState<any>([
    { id: 1, name: 'customer' },
    { id: 2, name: 'supplier' },
    { id: 3, name: 'Both' }
  ])

  const [PayTermType, setPayTermType] = useState<any>([
    { id: 1, name: 'days' },
    { id: 2, name: 'months' }
  ])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCreateContactData(contact))
  }, [dispatch])

  // ** States
  const data = useSelector((state: { createUser: { data: any } }) => state.contactCreateSlice?.data)

  useEffect(() => {
    if (data !== null && data !== undefined && data.type !== undefined) {
      setCustomerGroup(data.customer_group)

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

  const getStepContent = ({ step, ContactData }: any) => {
    switch (step) {
      case 0:
        return (
          <Fragment key={step}>
            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Business Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.supplier_business_name}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Business Id:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.business_id}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <BadgeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Type:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.type}</Typography>
                </Box>

              </Grid>

              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {ContactData.prefix} {ContactData.name} {ContactData.middle_name}
                    {ContactData.last_name}
                  </Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.email}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <ThreePIcon sx={{ mr: 2, color: 'text.secondary' }}></ThreePIcon>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={ContactData.contact_status}
                    sx={{ fontWeight: 500 }}
                    color={statusColors[ContactData.contact_status]}
                  />
                </Box>

              </Grid>

              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact Id:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.contact_id}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CallIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Mobile:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.mobile}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CallIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Landline:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.landline}</Typography>
                </Box>

              </Grid>
            </Grid>

            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CallIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Alternate Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.alternate_number}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CreditCardIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tax Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.tax_number}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>City:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.city}</Typography>
                </Box>

              </Grid>

              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>State:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.state}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Country:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.country}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Zip Code:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.zip_code}</Typography>
                </Box>

              </Grid>

              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Address Line 1:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.address_line_1}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Address Line 2:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.address_line_2}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <EventIcon sx={{ mr: 2, color: 'text.secondary' }}></EventIcon>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Date of Birth:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.dob}</Typography>
                </Box>

              </Grid>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <AccountBalanceIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    Payment Term Number:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.pay_term_number}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <AccessTimeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Payment Term Type:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.pay_term_type}</Typography>
                </Box>

              </Grid>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CreditCardIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Credit Limit:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.credit_limit}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <BorderColorIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Created By:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.created_by}</Typography>
                </Box>

              </Grid>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CropRotateIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Converted On:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.converted_on}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <CropRotateIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Converted By:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.converted_by}</Typography>
                </Box>

              </Grid>
            </Grid>
            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <AccountBalanceWalletIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Balance:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.balance}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <PaymentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Price Group ID:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.price_group_id}</Typography>
                </Box>


              </Grid>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Shipping Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.shipping_address}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <RadarIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Position:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.position}</Typography>
                </Box>

              </Grid>
              <Grid item xs={12} lg={6}>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <DomainIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Customer Group ID:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.customer_group_id}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <SourceIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>CRM Source:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.crm_source}</Typography>
                </Box>

              </Grid>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <ApprovalIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>CRM Life Stage:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.crm_life_stage}</Typography>
                </Box>

              </Grid>
            </Grid>

          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Custom Field 1:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field1}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 2:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field2}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 3:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field3}</Typography>
                </Box>

              </Grid>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 4:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field4}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 5:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field5}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 6:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field6}</Typography>
                </Box>

              </Grid>
            </Grid>
            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 7:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field7}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 8:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field8}</Typography>
                </Box>


                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    Custom Field 9:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field9}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Custom Field 10:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field10}</Typography>
                </Box>

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
  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    supplier_business_name: Yup.string().required('Supplier business name is required'),
    prefix: Yup.string().required('Prefix is required'),
    first_name: Yup.string().required('First name is required'),
    middle_name: Yup.string(),
    last_name: Yup.string().required('Last name is required'),
    tax_number: Yup.string().required('Tax number is required'),
    pay_term_number: Yup.string(),
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
      dispatch(fetchContactData({ itemId }))
    }
  }, [dispatch, itemId, isEdit])

  const contactEditData = useSelector((state: { contactEditSlice: { data: any } }) => state.contactEditSlice?.contact)

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
      dispatch(saveNewContact(values))
    } else {
      dispatch(updateContact({ updateData: values, id: itemId }))
    }

    // activeStep === steps.length - 1 ? toast.success('Form Submitted') : null
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

            step: activeStep,
            ContactData
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
            {activeStep === steps.length - 1 ? null : (
              <Button size='large' variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            )}
          </Grid>
        </Grid>

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

export default StepperView
