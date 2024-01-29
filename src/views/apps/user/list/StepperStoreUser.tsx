
// ** React Imports
import {  Fragment, useState, useEffect } from 'react'

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
import OutlinedInput from '@mui/material/OutlinedInput'
import MuiStep, { StepProps } from '@mui/material/Step'
import Select from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import { Formik,Field } from 'formik'
import * as Yup from 'yup'

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

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateUsers } from 'src/store/apps/izoUsers/createUserSlice'
import { AppDispatch } from 'src/store'
import { fetchIzoUsers } from 'src/store/apps/izoUsers/izoUsersSlice'
import useSubmitUser from 'src/hooks/useSubmitUser';
import { storeUser } from 'src/store/apps/izoUsers/storeUserSlice.js'
import { fetchEditUsers } from 'src/store/apps/izoUsers/editUsersSlice';
import { postEditUser } from 'src/store/apps/izoUsers/postEditUserSlice';


// icons
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

// Date Picker Imports
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { getCookie } from 'cookies-next'
import { convertDateFormat } from 'src/@core/layouts/utils';

// interface State {
//   password: string
//   password2: string
//   showPassword: boolean
//   showPassword2: boolean
// }

type RequirementsType = {
  BusinessLocation: []
  ProductPrice: []
  accounts: []
  agents: []
  contacts: []
  cost_center: []
  gender: []
  marital: []
  patterns: []
  roles: []
  taxes: []
  warehouse: []
}

const steps = [
  {
    icon: 'bx:font',
    title: 'Personal Information',
    subtitle: 'Manage Personal Information'
  },
  {
    icon: 'bx:mobile',
    title: 'Mobile App settings',
    subtitle: 'Configure your Mobile App'
  },
  {
    icon: 'bx:user-check',
    title: 'Rols and Permissions',
    subtitle: 'Manage Roles and Permissions'
  },
  {
    icon: 'bx:dollar-circle',
    title: 'Sales Section',
    subtitle: 'Manage Sales'
  },
  {
    icon: 'bx:info-circle',
    title: 'More Information',
    subtitle: 'Provide Additional Information'
  },

  {
    icon: 'bx:dollar-circle',
    title: 'Bank Details',
    subtitle: 'Manage Bank Details'
  },
  {
    icon: 'bx:group',
    title: 'HRM Details',
    subtitle: 'Manage HRM Details'
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

const StepperStoreUser = ({ isEdit, itemId }: any) => {
  // console.log(itemId, '====> itemId from stepper');
  // console.log(isEdit, '====> isEdit from stepper');

  console.log(isEdit, '====> isEdit from stepper');


  const [initialValues, setInitialValues] = useState<any>({
    prefix: '',
    firstName: '',
    lastName: '',
    email: '',
    ProductPriceItem: '',
    accounts: '',
    visa: '',
    agents: '',
    selectedContact: [],
    allowSlctdContacts: false,
    cost_center: '',
    gender: '',
    marital: '',
    userPattern: '',
    patternList: [],
    taxesItem: '',
    warehouse: '',
    isActive: false,
    allowlogin: false,
    username: '',
    password: '',
    confirmPassword: '',
    roles: '',
    allLocations: false,
    location_permissions: [],
    business_id: '',
    salesCommission: '',
    maxSalesDiscount: '',
    dateOfBirth: new Date(),
    bloodGroup: '',
    mobileNumber: '',
    alternativeMobileNumber: '',
    familyContactNumber: '',
    facebookLink: '',
    twitterLink: '',
    socialMedia1: '',
    socialMedia2: '',
    customField1: '',
    customField2: '',
    customField3: '',
    customField4: '',
    guardianName: '',
    idProofName: '',
    idProofNumber: '',
    permanentAddress: '',
    currentAddress: '',
    holderName: '',
    accountNumber: '',
    bankName: '',
    bankIdentifierCode: '',
    bankBranchName: '',
    taxPayerId: '',
    department: '',
    designation: ''
  })

  const [activeStep, setActiveStep] = useState<number>(0)


  const [Requirements, setRequirements] = useState<RequirementsType>({
    BusinessLocation: [],
    ProductPrice: [],
    accounts: [],
    agents: [],
    contacts: [],
    cost_center: [],
    gender: [],
    marital: [],
    patterns: [],
    roles: [],
    taxes: [],
    warehouse: []
  })
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCreateUsers())
  }, [dispatch])

  const data = useSelector((state: { createUser: { data: any } }) => state.createUser.data)

  // console.log(data, '====> data')

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setRequirements(data.Requirement)
    }
  }, [data])

  // ===================== hande part for edit user ===========================
  // ===========================================================================
  const token = getCookie('token')
  const url = getCookie('apiUrl')



  useEffect(() => {
    if (token && url && itemId) {
      //@ts-ignore
      isEdit ? dispatch(fetchEditUsers({ token, url, itemId })) : resetForm()
    }
  }, [dispatch, token, url, itemId , isEdit])

  const editData = useSelector((state: { editUsers: { data: any } }) => state.editUsers.data)


  useEffect(() => {
    if (editData?.UserInfo !== null && editData?.UserInfo !== undefined && isEdit) {
      const newDateOfBirth = convertDateFormat(editData.UserInfo.dateOfBirth)

      // @ts-ignore
      setInitialValues(prev => ({
        ...prev,
        business_id: editData.UserInfo.Location || prev.Location,
        prefix: editData.UserInfo.prefix || prev.prefix,
        firstName: editData.UserInfo.firstName || prev.firstName,
        lastName: editData.UserInfo.lastName || prev.lastName,
        email: editData.UserInfo.email || prev.email,
        businessLocation: editData.UserInfo.businessLocation || prev.businessLocation,
        ProductPriceItem: editData.UserInfo.ProductPriceItem || prev.ProductPriceItem,
        visa: editData.UserInfo.visa || prev.visa,
        agents: editData.UserInfo.agents || prev.agents,
        selectedContact: editData.UserInfo.selectedContact || prev.selectedContact,
        allowSlctdContacts: editData.UserInfo.allowSlctdContacts || prev.allowSlctdContacts,
        cost_center: editData.UserInfo.costCenter || prev.costCenter,
        gender: editData.UserInfo.gender || prev.gender,
        marital: editData.UserInfo.marital || prev.marital,
        userPattern: editData.UserInfo.userPattern || prev.userPattern,
        patternList: editData.UserInfo.patternId || prev.patternId,
        taxesItem: editData.UserInfo.taxesItem || prev.taxesItem,
        warehouse: editData.UserInfo.warehouse || prev.warehouse,
        isActive: editData.UserInfo.isActive || prev.isActive,
        allowlogin: editData.UserInfo.allowlogin || prev.allowlogin,
        username: editData.UserInfo.username || prev.username,
        password: editData.UserInfo.password || prev.password,
        confirmPassword: editData.UserInfo.confirmPassword || prev.confirmPassword,
        roles: editData.UserInfo.roles || prev.roles,
        allLocations: editData.UserInfo.allLocations || prev.allLocations,
        AGT: editData.UserInfo.AGT || prev.AGT,
        salesCommission: editData.UserInfo.salesCommission || prev.salesCommission,
        maxSalesDiscount: editData.UserInfo.maxSalesDiscount || prev.maxSalesDiscount,

        dateOfBirth: new Date(newDateOfBirth) || prev.dateOfBirth,
        bloodGroup: editData.UserInfo.bloodGroup || prev.bloodGroup,
        mobileNumber: editData.UserInfo.mobileNumber || prev.mobileNumber,
        accounts: editData.UserInfo.accounts || prev.accounts,
        alternativeMobileNumber: editData.UserInfo.alternativeMobileNumber || prev.alternativeMobileNumber,
        familyContactNumber: editData.UserInfo.familyContactNumber || prev.familyContactNumber,
        facebookLink: editData.UserInfo.facebookLink || prev.facebookLink,
        twitterLink: editData.UserInfo.twitterLink || prev.twitterLink,
        socialMedia1: editData.UserInfo.socialMedia1 || prev.socialMedia1,
        socialMedia2: editData.UserInfo.socialMedia2 || prev.socialMedia2,
        customField1: editData.UserInfo.customField1 || prev.customField1,
        customField2: editData.UserInfo.customField2 || prev.customField2,
        customField3: editData.UserInfo.customField3 || prev.customField3,
        customField4: editData.UserInfo.customField4 || prev.customField4,
        guardianName: editData.UserInfo.guardianName || prev.guardianName,
        idProofName: editData.UserInfo.idProofName || prev.idProofName,
        idProofNumber: editData.UserInfo.idProofNumber || prev.idProofNumber,
        permanentAddress: editData.UserInfo.permanentAddress || prev.permanentAddress,
        currentAddress: editData.UserInfo.currentAddress || prev.currentAddress,
        holderName: editData.UserInfo.holderName || prev.holderName,
        accountNumber: editData.UserInfo.accountNumber || prev.accountNumber,
        bankName: editData.UserInfo.bankName || prev.bankName,
        bankIdentifierCode: editData.UserInfo.bankIdentifierCode || prev.bankIdentifierCode,
        bankBranchName: editData.UserInfo.bankBranchName || prev.bankBranchName,
        taxPayerId: editData.UserInfo.taxPayerId || prev.taxPayerId,
        department: editData.UserInfo.department || prev.department,
        designation: editData.UserInfo.designation || prev.designation,
      }))

    }
  }, [editData?.UserInfo, isEdit])




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

  const getStepContent = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    step
  }: any) => {
    switch (step) {
      case 0:
        return (
          <Fragment key={step}>
            <Grid item lg={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name='firstName'
                label='First Name'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                sx={{ gridColumn: 'span 6' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name='lastName'
                label='Last Name'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                sx={{ gridColumn: 'span 6' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field as={TextField} name='email' label='E-mail' variant='outlined' fullWidth margin='normal' required />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <FormControlLabel
                label='Is Active'
                control={
                  <Checkbox
                    checked={values.isActive}
                    onChange={handleChange}
                    name='isActive'
                    color='primary'
                    onClick={() => {
                      values.isActive = !values.isActive
                    }}
                    required
                  />
                }
                sx={{ gridColumn: 'span 6' }}
              />
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                mb: 2,
                width: '100%'
              }}
            >
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='demo-simple-select-standard-label'>Acount Cash </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='accounts'
                  value={values.accounts}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Acount Cash'
                >
                  {Object.keys(Requirements).length === 0
                    ? null
                    : Requirements.accounts.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='demo-simple-select-standard-label'>Visa Account </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='visa'
                  value={values.visa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Visa Account'
                >
                  {Object.keys(Requirements).length === 0
                    ? null
                    : Requirements.accounts.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 2
                }}
              >
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='demo-simple-select-standard-label'> agents </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-standard-label'
                    name='agents'
                    value={values.agents}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label=' agents'
                  >
                    {Object.keys(Requirements).length === 0
                      ? null
                      : Requirements.agents.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='demo-simple-select-standard-label'> cost_center </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-standard-label'
                    name='cost_center'
                    value={values.cost_center}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label=' cost_center'
                  >
                    {Object.keys(Requirements).length === 0
                      ? null
                      : Requirements.cost_center.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 2
                }}
              >
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='demo-simple-select-standard-label'> Warehouse name </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-standard-label'
                    name='warehouse'
                    value={values.warehouse}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label='Warehouse name'
                  >
                    {Object.keys(Requirements).length === 0
                      ? null
                      : Requirements.warehouse.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='demo-simple-select-standard-label'>User Pattern </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-standard-label'
                    name='userPattern'
                    value={values.userPattern}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label='User Pattern'
                  >
                    {Object.keys(Requirements).length === 0
                      ? null
                      : Requirements.patterns.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              {/*
                  drop down for ProductPrice
                */}

              {

                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='demo-simple-select-standard-label'>Product Price </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-standard-label'
                    name='ProductPriceItem'
                    value={values.ProductPriceItem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label='Product Price'
                  >
                    {Object.keys(Requirements).length === 0
                      ? null
                      : Requirements.ProductPrice.map((item: any) => (
                        <MenuItem value={parseInt(item.id)} key={parseInt(item.id)}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

              }
              {/*
                  drop down for taxes
                */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='demo-simple-select-standard-label'>Taxes </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='taxesItem'
                  value={values.taxesItem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Taxes'
                >
                  {Object.keys(Requirements).length === 0
                    ? null
                    : Requirements.taxes.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                width: '100%'
              }}
            >
              {/* check box  */}
              <FormControlLabel
                label='allow login'
                control={
                  <Checkbox
                    checked={values.allowlogin}
                    onChange={handleChange}
                    name='allowlogin'
                    color='primary'
                    onClick={() => {
                      values.allowlogin = !values.allowlogin
                    }}
                  />
                }
                required
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                  mb: 2,
                  width: '100%'
                }}
              >
                <Field
                  as={TextField}
                  name='username'
                  label='Username'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  required
                />
                <TextField
                  label='Password'
                  type='password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  value={values.password}
                  name='password'
                  onChange={handleChange}
                  required
                />
                <TextField
                  label='Confirm Password'
                  type='password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  value={values.confirmPassword}
                  name='confirmPassword'
                  onChange={handleChange}
                  required
                />
              </Box>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='demo-simple-select-standard-label'>Select roles </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='roles'
                  value={values.roles}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Select roles'
                  required
                >
                  <MenuItem value=''>None</MenuItem>
                  {Object.keys(Requirements).length === 0
                    ? null
                    : Requirements.roles.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 2
                }}
              >
                <Typography variant='body1' gutterBottom component='div'>
                  Access Location <PriorityHighIcon />
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    label='All Locations'
                    control={
                      <Checkbox
                        checked={values.allLocations}
                        onChange={handleChange}
                        name='allLocations'
                        color='primary'
                        onClick={() => {
                          values.allLocations = !values.allLocations
                        }}
                      />
                    }
                  />
                </Box>

                {values.allLocations ? null : (
                  <FormControl>
                    <InputLabel id='demo-multiple-chip-label'>Location Permissions</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      name='location_permissions'
                      multiple
                      value={values.location_permissions}
                      onChange={e => {
                        setFieldValue('location_permissions', e.target.value)
                      }}
                      input={<OutlinedInput id='select-multiple-chip' label='location_permissions' />}
                      renderValue={selected => (
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            padding: '0.5rem'
                          }}
                        >
                          {

                          //@ts-ignore
                            selected.map(value => (
                            <Box key={value}>
                              <Chip
                                variant='outlined'

                                //@ts-ignore
                                label={Requirements?.BusinessLocation?.find((option: any) => option?.id === value).name}
                                onDelete={value => {
                                  setFieldValue(
                                    'location_permissions',

                                    //@ts-ignore
                                    values.location_permissions.filter(option => option !== value)
                                  )
                                }}
                              />
                            </Box>
                          ))}
                        </Box>
                      )}
                    >
                      {Requirements?.BusinessLocation.map((option: any) => (
                        <MenuItem key={option?.id} value={option?.id}>
                          {option?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-standard-label'>Select location </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-standard-label'
                    name='business_id'
                    value={values.business_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label='Select Location'
                    sx={{
                      height: '100%'
                    }}
                  >
                    {Object.keys(Requirements).length === 0
                      ? null
                      : Requirements.BusinessLocation.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                mb: 2,
                width: '100%'
              }}
            >
              {/*
                    sales commission precentage (%) FIELD INPUT
                  */}
              <Field
                as={TextField}
                name='salesCommission'
                value={values.salesCommission}
                onChange={handleChange}
                label='Sales Commission Precentage (%)'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='sales commission precentage (%)'
              />
              {/*
                  max sales discount precentage (%) FIELD INPUT
                */}
              <Field
                as={TextField}
                name='maxSalesDiscount'
                label='Max Sales Discount Precentage (%)'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='max sales discount precentage (%)'
                value={values.maxSalesDiscount}
                onChange={handleChange}
              />

              <FormControl>
                <InputLabel id='demo-multiple-chip-label'>List Patterns</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  name='patternList'
                  multiple
                  value={values.patternList}
                  onChange={e => {
                    setFieldValue('patternList', e.target.value)
                  }}
                  input={<OutlinedInput id='select-multiple-chip' label='list patterns' />}
                  renderValue={selected => (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        padding: '0.5rem'
                      }}
                    >
                      {

                        //@ts-ignore
                        selected.map(value => (
                        <Box key={value}>
                          <Chip
                            variant='outlined'

                            //@ts-ignore
                            label={Requirements?.patterns?.find((option: any) => option?.id === value)?.name}
                            onDelete={value => {
                              setFieldValue(
                                'patternList',

                                //@ts-ignore
                                values.patternList.filter(option => option !== value)
                              )
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                >
                  {Requirements.patterns.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/*
                  check box for allow selected contacts
                */}

              <FormControlLabel
                label='Allow selected contacts'
                control={
                  <Checkbox
                    checked={values.allowSlctdContacts}
                    onChange={handleChange}
                    name='allowlogin'
                    color='primary'
                    onClick={() => {
                      values.allowSlctdContacts = !values.allowSlctdContacts
                    }}
                  />
                }
              />

              {/*
                  filed selected contacts if allow selected contacts is true
                */}
              {values.allowSlctdContacts ? (
                <FormControl>
                  <InputLabel id='demo-multiple-chip-label'>selected contacts</InputLabel>
                  <Select
                    labelId='demo-multiple-chip-label'
                    id='demo-multiple-chip'
                    name='selectedContact'
                    multiple
                    value={values.selectedContact}
                    onChange={e => {
                      setFieldValue('selectedContact', e.target.value)
                    }}
                    input={<OutlinedInput id='select-multiple-chip' label='selectedContact' />}
                    renderValue={selected => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          padding: '0.5rem'
                        }}
                      >
                        {

                          //@ts-ignore
                          selected.map(value => (
                          <Box key={value}>
                            <Chip
                              variant='outlined'

                              //@ts-ignore
                              label={Requirements?.contacts?.find((option: any) => option?.id === value).name}
                              onDelete={value => {
                                setFieldValue(
                                  'selectedContact',

                                  //@ts-ignore
                                  values.selectedContact.filter(option => option !== value)
                                )
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  >
                    {Requirements.contacts.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </Box>
          </Fragment>
        )
      case 4:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
                mb: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              {/*
                filed date of birth using date picker
                  */}
              <DatePickerWrapper>
                <DatePicker
                  selected={values.dateOfBirth}
                  id='basic-input'
                  onChange={(date: any) => {
                    values.dateOfBirth = date

                  }}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput label='Date of Birth' />}
                />
              </DatePickerWrapper>

              {/*
                  drop down for Gender
                */}

              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-standard-label'>Select gender </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Select gender'
                >
                  {Object.keys(Requirements).length === 0
                    ? null
                    : Requirements.gender.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {/*
                  drop down for marital status
                */}

              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-standard-label'>Select marital </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='marital'
                  value={values.marital}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Select marital'
                >
                  {Object.keys(Requirements).length === 0
                    ? null
                    : Requirements.marital.map((item: any) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/*
                  filed Blood Group
                */}
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-standard-label'>Select blood group </InputLabel>
                <Select
                  fullWidth
                  labelId='demo-simple-select-standard-label'
                  name='bloodGroup'
                  value={values.bloodGroup}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label='Select blood group'
                >
                  {bloodTypes.map((item: any) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/*
                  filel Mobile Number type number
                */}
              <Field
                as={TextField}
                name='mobileNumber'
                label='Mobile Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='mobile number'
                value={values.mobileNumber}
                onChange={handleChange}
              />

              {/*
                    filed alternative mobile number
                  */}
              <Field
                as={TextField}
                name='alternativeMobileNumber'
                label='Alternative Mobile Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='alternative mobile number'
                value={values.alternativeMobileNumber}
                onChange={handleChange}
              />

              {/*
                  filed family contact number
                */}
              <Field
                as={TextField}
                name='familyContactNumber'
                label='Family Contact Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='family contact number'
                value={values.familyContactNumber}
                onChange={handleChange}
              />

              {/*
                  filed facebook link
                */}
              <Field
                as={TextField}
                name='facebookLink'
                label='Facebook Link'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='facebook link'
                value={values.facebookLink}
                onChange={handleChange}
              />

              {/*
                    filed twitter link
                  */}

              <Field
                as={TextField}
                name='twitterLink'
                label='Twitter Link'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='twitter link'
                value={values.twitterLink}
                onChange={handleChange}
              />

              {/*
                  filed social media 1
                */}
              <Field
                as={TextField}
                name='socialMedia1'
                label='Social Media 1'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='social media 1'
                value={values.socialMedia1}
                onChange={handleChange}
              />

              {/*
                    filed social media 2
                  */}
              <Field
                as={TextField}
                name='socialMedia2'
                label='Social Media 2'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='social media 2'
                value={values.socialMedia2}
                onChange={handleChange}
              />

              {/*
                    filed custom field 1
                  */}
              <Field
                as={TextField}
                name='customField1'
                label='Custom Field 1'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='custom field 1'
                value={values.customField1}
                onChange={handleChange}
              />

              {/*
                    filed custom field 2
                  */}
              <Field
                as={TextField}
                name='customField2'
                label='Custom Field 2'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='custom field 2'
                value={values.customField2}
                onChange={handleChange}
              />

              {/*
                    filed custom field 3
                  */}
              <Field
                as={TextField}
                name='customField3'
                label='Custom Field 3'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='custom field 3'
                value={values.customField3}
                onChange={handleChange}
              />

              {/*
                      filed custom field 4
                    */}

              <Field
                as={TextField}
                name='customField4'
                label='Custom Field 4'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='custom field 4'
                value={values.customField4}
                onChange={handleChange}
              />

              {/*
                      filed cuardiand name
                    */}
              <Field
                as={TextField}
                name='guardianName'
                label='Guardian Name'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='guardian name'
                value={values.guardianName}
                onChange={handleChange}
              />

              {/*
                        filed ID Proof name
                      */}
              <Field
                as={TextField}
                name='idProofName'
                label='ID Proof Name'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='id proof name'
                value={values.idProofName}
                onChange={handleChange}
              />

              {/*
                            filed ID Proof Number
                          */}
              <Field
                as={TextField}
                name='idProofNumber'
                label='ID Proof Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='id proof number'
                value={values.idProofNumber}
                onChange={handleChange}
              />

              {/*
                  filed premanent address
                  */}

              <Field
                as={TextField}
                name='permanentAddress'
                label='Permanent Address'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='permanent address'
                value={values.permanentAddress}
                onChange={handleChange}
              />

              {/*
                    filed current address
                    */}

              <Field
                as={TextField}
                name='currentAddress'
                label='Current Address'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='current address'
                value={values.currentAddress}
                onChange={handleChange}
              />
            </Box>
          </Fragment>
        )
      case 5:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
                mb: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              {/*

                fild Acount Holder Name
              */}
              <Field
                as={TextField}
                name='holderName'
                label='Acount Holder Name'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='acount holder name'
                value={values.holderName}
                onChange={handleChange}
              />

              {/*
                filed Account Name
              */}
              <Field
                as={TextField}
                name='accountNumber'
                label='Account Number'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='account name'
                value={values.accountNumber}
                onChange={handleChange}
              />

              {/*
                filed Bank Name
              */}

              <Field
                as={TextField}
                name='bankName'
                label='Bank Name'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='bank name'
                value={values.bankName}
                onChange={handleChange}
              />

              {/*
                filed Bank identifier name
              */}
              <Field
                as={TextField}
                name='bankIdentifierCode'
                label='Bank Identifier Code'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='bank identifier code'
                value={values.bankIdentifierCode}
                onChange={handleChange}
              />

              {/*
                filed Bank Branch Name
              */}

              <Field
                as={TextField}
                name='bankBranchName'
                label='Bank Branch Name'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='bank branch name'
                value={values.bankBranchName}
                onChange={handleChange}
              />

              {/*
                filed tax payer id
              */}
              <Field
                as={TextField}
                name='taxPayerId'
                label='Tax Payer Id'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='tax payer id'
                value={values.taxPayerId}
                onChange={handleChange}
              />
            </Box>
          </Fragment>
        )
      case 6:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 3,
                mb: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              {/*

                  filed department
                */}
              <Field as={TextField}
                name="department"
                label="Department" variant="outlined" fullWidth margin="normal"
                placeholder="department"
                value={values.department}
                onChange={handleChange}
                sx={{ gridColumn: 'span 6' }}
              />
              {/*
                  filed designation
                */}

              <Field as={TextField}
                name="designation"
                label="Designation" variant="outlined" fullWidth margin="normal"
                placeholder="designation"
                value={values.designation}
                onChange={handleChange}
                sx={{ gridColumn: 'span 6' }}
              />

            </Box>
          </Fragment>
        )
      case 7:
        return (
          <Fragment key={step}>

          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const validationSchema = Yup.object().shape({
    prefix: Yup.string(),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required')
  })

  const { handleSubmitData } = useSubmitUser();

  const handleSubmitForm = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    // Handle form submission logic here

    console.log(values)

    if (isEdit) {
      handleSubmitData(postEditUser, fetchIzoUsers, values, itemId);
    } else {
      handleSubmitData(storeUser, fetchIzoUsers, values);

    }

    // activeStep === steps.length - 1 ? toast.success('Form Submitted') : null
    setActiveStep(activeStep + 1)
    resetForm()
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography align="center">All steps are completed! 🎉</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      )
    } else {
      return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmitForm} enableReinitialize={true}
        >
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue, resetForm }) => (
            <form >
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
                  {
                    activeStep === steps.length - 1 ?
                      <Button
                        size='large'
                        variant='contained'
                        color='primary'
                        onClick={() => handleSubmitForm(values, { resetForm })}
                      >
                        {isEdit ? "Update User" : "Create User"}
                      </Button>
                      :
                      <Button size='large' variant='contained' color='primary' onClick={handleNext}>
                        Next
                      </Button>
                  }
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
        height: '600px',
      }}
    >
      <CardContent
        sx={{
          overflowY: 'auto',
          gridColumn: 'span 3',
          borderRight: theme => `1px solid ${theme.palette.divider}`,
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
              gap: '2rem',

            }}
          >
            {steps.map((step, index) => {
              return (
                <Step key={index} sx={{
                  padding: '0px !important',
                }}>
                  <StepLabel StepIconComponent={StepperCustomDot}

                  >
                    <div
                      className='step-label'
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
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
      </CardContent>
      <CardContent
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          gridColumn: 'span 9',
          padding: '2rem',

        }}
      >{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperStoreUser
