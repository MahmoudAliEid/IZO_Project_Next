'use client';


// ** React Imports
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { getCookie } from 'cookies-next';
import { fetchIzoUsers } from 'src/store/apps/izoUsers/izoUsersSlice'
import useSubmitUser from 'src/hooks/useSubmitUser';
import { fetchEditUsers } from 'src/store/apps/izoUsers/editUsersSlice';
import { postEditUser } from 'src/store/apps/izoUsers/postEditUserSlice';
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Checkbox, FormControlLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { convertDateFormat } from 'src/@core/layouts/utils';

// ** Third Party Imports
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';



// formik imports
import { Formik,  Field } from 'formik';

// ** Types Imports
import { AppDispatch } from 'src/store'


import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  itemId: number
}




const validationSchema = Yup.object().shape({
  prefix: Yup.string(),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});


// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))
type RequirementsType = {
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
}

const SidebarEditUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, itemId } = props

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
  });
  const [initialValues, setInitialValues] = useState({

    prefix: '',
    firstName: '',
    lastName: '',
    email: '',
    businessLocation: '',
    ProductPriceItem: '',
    accounts: '',
    visa: '',
    agents: '',
    selectedContact: '',
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
    AGT: false,
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
    designation: '',
  }
  )


  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const { handleSubmitData } = useSubmitUser();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()


  const data = useSelector((state: { editUsers: { data: any } }) => state.editUsers.data)



  useEffect(() => {
    if (data !== null && data !== undefined) {
      setRequirements(data.Requirement)

      console.log(data.Requirement, '====> data from update page')

      // print now date
      console.log("now date", new Date());
    }
  }, [data])


  useEffect(() => {
    if (data?.UserInfo !== null && data?.UserInfo !== undefined) {
      const newDateOfBirth = convertDateFormat(data.UserInfo.dateOfBirth)

      // @ts-ignore
      setInitialValues(prev => ({
        ...prev,

        prefix: data.UserInfo.prefix || prev.prefix,
        firstName: data.UserInfo.firstName || prev.firstName,
        lastName: data.UserInfo.lastName || prev.lastName,
        email: data.UserInfo.email || prev.email,
        businessLocation: data.UserInfo.businessLocation || prev.businessLocation,
        ProductPriceItem: data.UserInfo.ProductPriceItem || prev.ProductPriceItem,
        visa: data.UserInfo.visa || prev.visa,
        agents: data.UserInfo.agents || prev.agents,
        selectedContact: data.UserInfo.selectedContact || prev.selectedContact,
        allowSlctdContacts: data.UserInfo.allowSlctdContacts || prev.allowSlctdContacts,
        cost_center: data.UserInfo.cost_center || prev.cost_center,
        gender: data.UserInfo.gender || prev.gender,
        marital: data.UserInfo.marital || prev.marital,
        userPattern: data.UserInfo.userPattern || prev.userPattern,
        patternList: data.UserInfo.patternList || prev.patternList,
        taxesItem: data.UserInfo.taxesItem || prev.taxesItem,
        warehouse: data.UserInfo.warehouse || prev.warehouse,
        isActive: data.UserInfo.isActive || prev.isActive,
        allowlogin: data.UserInfo.allowlogin || prev.allowlogin,
        username: data.UserInfo.username || prev.username,
        password: data.UserInfo.password || prev.password,
        confirmPassword: data.UserInfo.confirmPassword || prev.confirmPassword,
        roles: data.UserInfo.roles || prev.roles,
        allLocations: data.UserInfo.allLocations || prev.allLocations,
        AGT: data.UserInfo.AGT || prev.AGT,
        salesCommission: data.UserInfo.salesCommission || prev.salesCommission,
        maxSalesDiscount: data.UserInfo.maxSalesDiscount || prev.maxSalesDiscount,

        dateOfBirth: new Date(newDateOfBirth) || prev.dateOfBirth,
        bloodGroup: data.UserInfo.bloodGroup || prev.bloodGroup,
        mobileNumber: data.UserInfo.mobileNumber || prev.mobileNumber,
        accounts: data.UserInfo.accounts || prev.accounts,
        alternativeMobileNumber: data.UserInfo.alternativeMobileNumber || prev.alternativeMobileNumber,
        familyContactNumber: data.UserInfo.familyContactNumber || prev.familyContactNumber,
        facebookLink: data.UserInfo.facebookLink || prev.facebookLink,
        twitterLink: data.UserInfo.twitterLink || prev.twitterLink,
        socialMedia1: data.UserInfo.socialMedia1 || prev.socialMedia1,
        socialMedia2: data.UserInfo.socialMedia2 || prev.socialMedia2,
        customField1: data.UserInfo.customField1 || prev.customField1,
        customField2: data.UserInfo.customField2 || prev.customField2,
        customField3: data.UserInfo.customField3 || prev.customField3,
        customField4: data.UserInfo.customField4 || prev.customField4,
        guardianName: data.UserInfo.guardianName || prev.guardianName,
        idProofName: data.UserInfo.idProofName || prev.idProofName,
        idProofNumber: data.UserInfo.idProofNumber || prev.idProofNumber,
        permanentAddress: data.UserInfo.permanentAddress || prev.permanentAddress,
        currentAddress: data.UserInfo.currentAddress || prev.currentAddress,
        holderName: data.UserInfo.holderName || prev.holderName,
        accountNumber: data.UserInfo.accountNumber || prev.accountNumber,
        bankName: data.UserInfo.bankName || prev.bankName,
        bankIdentifierCode: data.UserInfo.bankIdentifierCode || prev.bankIdentifierCode,
        bankBranchName: data.UserInfo.bankBranchName || prev.bankBranchName,
        taxPayerId: data.UserInfo.taxPayerId || prev.taxPayerId,
        department: data.UserInfo.department || prev.department,
        designation: data.UserInfo.designation || prev.designation,
      }))
      console.log("form set intit user info", data.UserInfo)

    }
  }, [data?.UserInfo])






  const token = getCookie('token')
  const url = getCookie('apiUrl')

  useEffect(() => {
    if (token && url && itemId) {
      //@ts-ignore
      dispatch(fetchEditUsers({ token, url, itemId }))
    }
  }, [dispatch, token, url, itemId])






  console.log(data?.Requirement, '===> data')
  console.log(data?.UserInfo, '===> user info')


  const handleClose = () => {
    toggle()
  }




  const handleSubmit = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    // Handle form submission logic here
    console.log(values, "form edit user");
    console.log("update btn clicked")

    handleSubmitData(postEditUser, fetchIzoUsers, values, itemId);

    resetForm();
  };








  return (

    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: '100%' } }}
    >
      <Header>
        <Typography variant='h6'>Edit User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {Requirements ? (<Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>

              {/*
                header first section
              */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 2
                }}
              >
                <FormControl fullWidth variant="outlined" sx={{ gridColumn: 'span 2' }}>
                  <InputLabel id="prefix-label">Prefix</InputLabel>
                  <Select
                    labelId="prefix-label"
                    id="prefix"
                    name="prefix"
                    value={values.prefix}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Prefix"
                    required
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Ms.">Ms.</MenuItem>
                  </Select>
                </FormControl>
                <Field as={TextField} name="firstName" value={values.firstName} label="First Name" variant="outlined" fullWidth margin="normal" required />
                <Field as={TextField} name="lastName" value={values.lastName} label="Last Name" variant="outlined" fullWidth margin="normal" required />
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 6
                }}
              >
                <Field as={TextField} name="email" value={values.email} label="E-mail" variant="outlined" fullWidth margin="normal" required />
                {/*
                 check box for is active
               */}

                <FormControlLabel
                  label="Is Active"
                  control={
                    <Checkbox
                      checked={values.isActive}
                      onChange={handleChange}
                      name="isActive"
                      color="primary"
                      onClick={() => {
                        values.isActive = !values.isActive
                      }}
                      required
                    />
                  }
                />
              </Box>

              <Divider style={{ margin: '16px 0' }} />

              {/*
                second section header
              */}

              <Typography variant="h6" gutterBottom component="div">
                Mobile App settings
              </Typography>


              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 2
                }}
              >
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Account Cash </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='accounts'
                    value={values.accounts}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Acount Cash"
                  >
                    {
                      Object.keys(Requirements).length === 0 ? null :
                        Requirements.accounts.map((item: any) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Visa Account </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='visa'
                    value={values.visa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Visa Account"
                  >
                    {
                      Object.keys(Requirements).length === 0 ? null :
                        Requirements.accounts.map((item: any) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                          >
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
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    > agents </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='agents'
                      value={values.agents}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label=" agents"
                    >
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements.agents.map((item: any) => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    > cost_center </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='cost_center'
                      value={values.cost_center}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label=" cost_center"
                    >
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements.cost_center.map((item: any) => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                            >
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
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    > Warehouse name </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='warehouse'
                      value={values.warehouse}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label="Warehouse name"
                    >
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements.warehouse.map((item: any) => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    >User Pattern </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='userPattern'
                      value={values.userPattern}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label="User Pattern"
                    >
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements.patterns.map((item: any) => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Box>
                {/*
                  drop down for ProductPrice
                */}

                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Product Price </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='ProductPriceItem'
                    value={values.ProductPriceItem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Product Price"
                  >
                    {
                      Object.keys(Requirements).length === 0 ? null :
                        data?.Requirement?.pPrice.map((item: any) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
                {/*
                  drop down for taxes
                */}
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Taxes </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='taxesItem'
                    value={values.taxesItem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Taxes"
                  >
                    {
                      Object.keys(Requirements).length === 0 ? null :
                        Requirements.taxes.map((item: any) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>

              </Box>

              <Divider style={{ margin: '16px 0' }} />
              {/*

              third section header
              */}

              <Typography variant="h6" gutterBottom component="div">
                Rols and Permissions
              </Typography>

              <Box>
                {/* check box  */}
                <FormControlLabel
                  label="allow login"
                  control={
                    <Checkbox
                      checked={values.allowlogin}
                      onChange={handleChange}
                      name="allowlogin"
                      color="primary"
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
                    mb: 2
                  }}
                >

                  <Field as={TextField} name="username" label="Username" variant="outlined" fullWidth margin="normal" required />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.password}
                    name='password'
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                    mb: 2
                  }}
                >
                  <FormControl sx={{ mb: 6 }} fullWidth>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    >Select roles </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='roles'
                      value={values.roles}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label="Select roles"
                      required
                    >
                      <MenuItem value="">None</MenuItem>
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements.roles.map((item: any) => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 6 }} fullWidth>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    >Business Location
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='businessLocation
'
                      value={values.businessLocation
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label="Business Location
"
                      required
                    >
                      <MenuItem value="">None</MenuItem>
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements?.BusinessLocation
                            .map((item: any) => (
                              <MenuItem
                                value={item.id}
                                key={item.id}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 3,
                    mb: 2
                  }}
                >


                  <Typography variant="body1" gutterBottom component="div">
                    Access Location  <PriorityHighIcon />
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      label="all locations"
                      control={
                        <Checkbox
                          checked={values.allLocations}
                          onChange={handleChange}
                          name="allLocations"
                          color="primary"
                          onClick={() => {
                            values.allLocations = !values.allLocations
                          }}
                        />
                      }
                    />

                    <FormControlLabel
                      label="ACT"
                      control={
                        <Checkbox
                          checked={values.AGT}
                          onChange={handleChange}
                          name="AGT"
                          color="primary"
                          onClick={() => {
                            values.AGT = !values.AGT
                          }}
                        />
                      }
                    />
                  </Box>
                </Box>

              </Box>
              <Divider style={{ margin: '16px 0' }} />
              {/*

              fourth section header
              */}

              <Typography variant="h6" gutterBottom component="div">
                Sales
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 2
                }}
              >

                {/*
                    sales commission precentage (%) FIELD INPUT
                  */}
                <Field as={TextField}
                  name="salesCommission"
                  value={values.salesCommission}
                  onChange={handleChange}
                  label="Sales Commission Precentage (%)" variant="outlined" fullWidth margin="normal"
                  placeholder="sales commission precentage (%)"
                />
                {/*
                  max sales discount precentage (%) FIELD INPUT
                */}
                <Field as={TextField}
                  name="maxSalesDiscount"
                  label="Max Sales Discount Precentage (%)" variant="outlined" fullWidth margin="normal"
                  placeholder="max sales discount precentage (%)"
                  value={values.maxSalesDiscount}
                  onChange={handleChange}
                />

                {/*
                list patterns FIELD INPUT
                */}
                <Box sx={{ gridColumn: 'span 2' }}>
                  <FormControl sx={{ m: 0, width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label">
                      List Patterns
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      name="patternList"
                      multiple
                      value={values.patternList}
                      onChange={(e) => {
                        setFieldValue("patternList", e.target.value);
                      }}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="list patterns"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            padding: "0.5rem",
                          }}
                        >

                          {
                            selected.map((value) => (
                              <Box key={value}>
                                <Chip
                                  variant="outlined"

                                  //@ts-ignore
                                  label={Requirements?.patterns?.find(
                                    (option: any) => option?.id === value).name}

                                  onDelete={(value) => {
                                    setFieldValue(
                                      "patternList",
                                      values.patternList.filter(
                                        (option) => option !== value
                                      )
                                    );
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
                </Box>
                {/*
                  check box for allow selected contacts
                */}

                <FormControlLabel
                  label="Allow selected contacts"
                  control={
                    <Checkbox
                      checked={values.allowSlctdContacts}
                      onChange={handleChange}
                      name="allowlogin"
                      color="primary"
                      onClick={() => {
                        values.allowSlctdContacts = !values.allowSlctdContacts
                      }}
                    />
                  }
                />

                {/*
                  filed selected contacts if allow selected contacts is true
                */}
                {
                  values.allowSlctdContacts ?
                    <FormControl
                      fullWidth
                      sx={{ m: 0 }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                      >Select contact </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-standard-label"
                        name='selectedContact'
                        value={values.selectedContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.prefix && !!errors.prefix}
                        label="Select contact"
                      >
                        {
                          Object.keys(Requirements).length === 0 ? null :
                            Requirements.contacts.map((item: any) => (
                              <MenuItem
                                value={item.id}
                                key={item.id}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl> : null
                }




              </Box>

              <Divider style={{ margin: '16px 0' }} />
              {/*
                fifth section header
              */}
              <Typography variant="h6" gutterBottom component="div">
                More Information
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                  mb: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >

                {/*
                filed date of birth using date picker
                  */}
                <DatePickerWrapper  >

                  <DatePicker

                    selected={values.dateOfBirth}
                    id='basic-input'
                    popperPlacement={popperPlacement}
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

                <FormControl fullWidth >
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Select gender </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Select gender"
                  >
                    {
                      Object.keys(Requirements).length === 0 ? null :
                        Requirements.gender.map((item: any) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>

                {/*
                  drop down for marital status
                */}


                <FormControl fullWidth >
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Select marital </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='marital'
                    value={values.marital}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Select marital"
                  >
                    {
                      Object.keys(Requirements).length === 0 ? null :
                        Requirements.marital.map((item: any) => (
                          <MenuItem
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
                {/*
                  filed Blood Group
                */}
                <FormControl fullWidth >
                  <InputLabel
                    id="demo-simple-select-standard-label"
                  >Select blood group </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    name='bloodGroup'
                    value={values.bloodGroup}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label="Select blood group"
                  >
                    {
                      bloodTypes.map((item: any) => (
                        <MenuItem
                          value={item}
                          key={item}
                        >
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>


                {/*
                  filel Mobile Number type number
                */}
                <Field as={TextField}
                  name="mobileNumber"
                  label="Mobile Number" variant="outlined" fullWidth margin="normal"
                  placeholder="mobile number"
                  value={values.mobileNumber}
                  onChange={handleChange}
                />

                {/*
                    filed alternative mobile number
                  */}
                <Field as={TextField}
                  name="alternativeMobileNumber"
                  label="Alternative Mobile Number" variant="outlined" fullWidth margin="normal"
                  placeholder="alternative mobile number"
                  value={values.alternativeMobileNumber}
                  onChange={handleChange}
                />

                {/*
                  filed family contact number
                */}
                <Field as={TextField}
                  name="familyContactNumber"
                  label="Family Contact Number" variant="outlined" fullWidth margin="normal"
                  placeholder="family contact number"
                  value={values.familyContactNumber}
                  onChange={handleChange}
                />

                {/*
                  filed facebook link
                */}
                <Field as={TextField}
                  name="facebookLink"
                  label="Facebook Link" variant="outlined" fullWidth margin="normal"
                  placeholder="facebook link"
                  value={values.facebookLink}
                  onChange={handleChange}
                />

                {/*
                    filed twitter link
                  */}

                <Field as={TextField}
                  name="twitterLink"
                  label="Twitter Link" variant="outlined" fullWidth margin="normal"
                  placeholder="twitter link"
                  value={values.twitterLink}
                  onChange={handleChange}
                />

                {/*
                  filed social media 1
                */}
                <Field as={TextField}
                  name="socialMedia1"
                  label="Social Media 1" variant="outlined" fullWidth margin="normal"
                  placeholder="social media 1"
                  value={values.socialMedia1}
                  onChange={handleChange}
                />

                {/*
                    filed social media 2
                  */}
                <Field as={TextField}
                  name="socialMedia2"
                  label="Social Media 2" variant="outlined" fullWidth margin="normal"
                  placeholder="social media 2"
                  value={values.socialMedia2}
                  onChange={handleChange}
                />

                {/*
                    filed custom field 1
                  */}
                <Field as={TextField}
                  name="customField1"
                  label="Custom Field 1" variant="outlined" fullWidth margin="normal"
                  placeholder="custom field 1"
                  value={values.customField1}
                  onChange={handleChange}
                />

                {/*
                    filed custom field 2
                  */}
                <Field as={TextField}
                  name="customField2"
                  label="Custom Field 2" variant="outlined" fullWidth margin="normal"
                  placeholder="custom field 2"
                  value={values.customField2}
                  onChange={handleChange}
                />

                {/*
                    filed custom field 3
                  */}
                <Field as={TextField}
                  name="customField3"
                  label="Custom Field 3" variant="outlined" fullWidth margin="normal"
                  placeholder="custom field 3"
                  value={values.customField3}
                  onChange={handleChange}
                />

                {/*
                      filed custom field 4
                    */}

                <Field as={TextField}
                  name="customField4"
                  label="Custom Field 4" variant="outlined" fullWidth margin="normal"
                  placeholder="custom field 4"
                  value={values.customField4}
                  onChange={handleChange}
                />

                {/*
                      filed cuardiand name
                    */}
                <Field as={TextField}
                  name="guardianName"
                  label="Guardian Name" variant="outlined" fullWidth margin="normal"
                  placeholder="guardian name"
                  value={values.guardianName}
                  onChange={handleChange}
                />

                {/*
                        filed ID Proof name
                      */}
                <Field as={TextField}
                  name="idProofName"
                  label="ID Proof Name" variant="outlined" fullWidth margin="normal"
                  placeholder="id proof name"
                  value={values.idProofName}
                  onChange={handleChange}
                />

                {/*
                            filed ID Proof Number
                          */}
                <Field as={TextField}
                  name="idProofNumber"
                  label="ID Proof Number" variant="outlined" fullWidth margin="normal"
                  placeholder="id proof number"
                  value={values.idProofNumber}
                  onChange={handleChange}
                />

                {/*
                  filed premanent address
                  */}

                <Field as={TextField}
                  name="permanentAddress"
                  label="Permanent Address" variant="outlined" fullWidth margin="normal"
                  placeholder="permanent address"
                  value={values.permanentAddress}
                  onChange={handleChange}
                />

                {/*
                    filed current address
                    */}

                <Field as={TextField}
                  name="currentAddress"
                  label="Current Address" variant="outlined" fullWidth margin="normal"
                  placeholder="current address"
                  value={values.currentAddress}
                  onChange={handleChange}
                />


              </Box>

              <Divider style={{ margin: '16px 0' }} />
              {/*
                sixth section header
              */}
              <Typography variant="h6" gutterBottom component="div">
                Bank Details
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                  mb: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >

                {/*

                fild Acount Holder Name
              */}
                <Field as={TextField}
                  name="holderName"
                  label="Acount Holder Name" variant="outlined" fullWidth margin="normal"
                  placeholder="acount holder name"
                  value={values.holderName}
                  onChange={handleChange}
                />

                {/*
                filed Account Name
              */}
                <Field as={TextField}
                  name="accountNumber"
                  label="Account Number" variant="outlined" fullWidth margin="normal"
                  placeholder="account name"
                  value={values.accountNumber}
                  onChange={handleChange}
                />

                {/*
                filed Bank Name
              */}

                <Field as={TextField}
                  name="bankName"
                  label="Bank Name" variant="outlined" fullWidth margin="normal"
                  placeholder="bank name"
                  value={values.bankName}
                  onChange={handleChange}
                />

                {/*
                filed Bank identifier name
              */}
                <Field as={TextField}
                  name="bankIdentifierCode"
                  label="Bank Identifier Code" variant="outlined" fullWidth margin="normal"
                  placeholder="bank identifier code"
                  value={values.bankIdentifierCode}
                  onChange={handleChange}
                />

                {/*
                filed Bank Branch Name
              */}

                <Field as={TextField}
                  name="bankBranchName"
                  label="Bank Branch Name" variant="outlined" fullWidth margin="normal"
                  placeholder="bank branch name"
                  value={values.bankBranchName}
                  onChange={handleChange}
                />

                {/*
                filed tax payer id
              */}
                <Field as={TextField}
                  name="taxPayerId"
                  label="Tax Payer Id" variant="outlined" fullWidth margin="normal"
                  placeholder="tax payer id"
                  value={values.taxPayerId}
                  onChange={handleChange}
                />
              </Box>

              <Divider style={{ margin: '16px 0' }} />

              {/*
                seventh section header
              */}

              <Typography variant="h6" gutterBottom component="div">
                HRM Details
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                  mb: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
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
                />

              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                  Update
                </Button>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>) : (<Grid>
          <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <ProgressCustomization />
          </Box>

        </Grid>)}
      </Box>
    </Drawer>
  )
}

export default SidebarEditUser
