'use client';

/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { fetchIzoUsers } from 'src/store/apps/izoUsers/izoUsersSlice'
import useSubmitUser from 'src/hooks/useSubmitUser';
import { storeUser } from 'src/store/apps/izoUsers/storeUserSlice.js'
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
import FormHelperText from '@mui/material/FormHelperText'
import { Checkbox, FormControlLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";

// ** Third Party Imports
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

// formik imports
import { Formik, Form, Field } from 'formik';

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import { fetchCreateUsers } from 'src/store/apps/izoUsers/createUserSlice'

// import { isLoading, error, data, createUser } from 'src/hooks/useCreateUser'

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** React Imports
import { forwardRef } from 'react'
interface PickerProps {
  label?: string
  readOnly?: boolean
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})


interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

// interface UserData {
//   email: string
//   billing: string
//   company: string
//   country: string
//   contact: number
//   fullName: string
//   username: string
// }

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

const validationSchema = Yup.object().shape({
  prefix: Yup.string(),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const initialValues = {
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
  business_id: "",
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
};


export const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props
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
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [date, setDate] = useState<any>(new Date())


  const { handleSubmitData } = useSubmitUser();

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

      // console.log(data.Requirement, '====> data')
    }
  }, [data])

  const handleClose = () => {
    toggle()
  }



  const handleSubmit = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    handleSubmitData(storeUser, fetchIzoUsers, values);
    resetForm();
  };


  return (

    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: '100%' } }}    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {Requirements ? (<Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                <Field as={TextField} name="firstName" label="First Name" variant="outlined" fullWidth margin="normal" required />
                <Field as={TextField} name="lastName" label="Last Name" variant="outlined" fullWidth margin="normal" required />
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 6
                }}
              >
                <Field as={TextField} name="email" label="E-mail" variant="outlined" fullWidth margin="normal" required />
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
                    label="Account Cash"
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
                        Requirements.ProductPrice.map((item: any) => (
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
                <FormControl fullWidth sx={{ mb: 6 }}>
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
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
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

                  </Box>

                  {values.allLocations ? null :
                    <FormControl>
                      <InputLabel id="demo-multiple-chip-label">
                        location permissions
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        name="location_permissions"
                        multiple
                        value={values.location_permissions}
                        onChange={(e) => {
                          setFieldValue("location_permissions", e.target.value);
                        }}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="location_permissions"
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
                                    label={Requirements?.BusinessLocation?.find(
                                      (option: any) => option?.id === value).name}


                                    onDelete={(value) => {
                                      setFieldValue(
                                        "location_permissions",
                                        values.location_permissions.filter(
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
                        {Requirements.BusinessLocation.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  }


                  <FormControl fullWidth >
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    >Select location </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      name='business_id'
                      value={values.business_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.prefix && !!errors.prefix}
                      label="Select Location"
                      sx={{
                        height: '100%'
                      }}
                    >
                      {
                        Object.keys(Requirements).length === 0 ? null :
                          Requirements.BusinessLocation.map((item: any) => (
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
                {

                  //    <Box sx={{ gridColumn: 'span 2' }}>
                  //    <FormControl
                  //      sx={{ m: 0, width: '100%' }}
                  //    >
                  //      <InputLabel
                  //        id="demo-simple-select-standard-label"
                  //      >List Patterns </InputLabel>
                  //      <Select
                  //        fullWidth
                  //        labelId="demo-simple-select-standard-label"
                  //        name='patternId'
                  //        value={values.patternId}
                  //        onChange={handleChange}
                  //        onBlur={handleBlur}
                  //        error={!!touched.prefix && !!errors.prefix}
                  //        label="List patterns"
                  //      >
                  //        {
                  //          Object.keys(Requirements).length === 0 ? null :
                  //            Requirements.patterns.map((item: any) => (
                  //              <MenuItem
                  //                value={item.id}
                  //                key={item.id}
                  //              >
                  //                {item.name}
                  //              </MenuItem>
                  //            ))}
                  //      </Select>
                  //    </FormControl>
                  //  </Box>

                }

                <FormControl>
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
                    <FormControl>
                      <InputLabel id="demo-multiple-chip-label">
                        selected contacts
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        name="selectedContact"
                        multiple
                        value={values.selectedContact}
                        onChange={(e) => {
                          setFieldValue("selectedContact", e.target.value);
                        }}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="selectedContact"
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
                                    label={Requirements?.contacts?.find(
                                      (option: any) => option?.id === value).name}


                                    onDelete={(value) => {
                                      setFieldValue(
                                        "selectedContact",
                                        values.selectedContact.filter(
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
                        {Requirements.contacts.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
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
                <DatePickerWrapper>

                  <DatePicker
                    selected={values.dateOfBirth}
                    id='basic-input'
                    popperPlacement={popperPlacement}
                    onChange={(date: any) => {
                      values.dateOfBirth = date
                      setDate(date)
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

                fild Account Holder Name
              */}
                <Field as={TextField}
                  name="holderName"
                  label="Account Holder Name" variant="outlined" fullWidth margin="normal"
                  placeholder="Account holder name"
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
                  Submit
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

export default SidebarAddUser
