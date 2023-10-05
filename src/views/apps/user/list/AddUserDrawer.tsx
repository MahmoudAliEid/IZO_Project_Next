/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react'

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

// ** Third Party Imports
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

// formik imports
import { Formik, Form, Field } from 'formik';

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import { fetchCreateUsers } from 'src/store/apps/izoUsers/createUserSlice'

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
  BusinessLocation: '',
  ProductPrice: '',
  accounts: '',
  agents: '',
  contacts: '',
  cost_center: '',
  gender: '',
  marital: '',
  patterns: '',
  roles: '',
  taxes: '',
  warehouse: '',
  isActive: false
};


const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

// const schema = yup.object().shape({
//   company: yup.string().required(),
//   country: yup.string().required(),
//   billing: yup.string().required(),
//   email: yup.string().email().required(),
//   contact: yup
//     .number()
//     .typeError('Contact Number field is required')
//     .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
//     .required(),
//   fullName: yup
//     .string()
//     .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
//     .required(),
//   username: yup
//     .string()
//     .min(3, obj => showErrors('Username', obj.value.length, obj.min))
//     .required()
// })

// const defaultValues = {
//   email: '',
//   company: '',
//   country: '',
//   billing: '',
//   fullName: '',
//   username: '',
//   contact: Number('')
// }

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props
  const [Requirements, setRequirements] = useState<object>({
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




  const [businessLocation, setBusinessLocation] = useState<string>('')

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
      console.log(data.Requirement, '====> data')
    }
  }, [data])

  const handleClose = () => {
    toggle()
  }

  const handleSubmit = (values: Record<string, any>, { resetForm }: { resetForm: () => void }) => {
    // Handle form submission logic here
    console.log(values);
    resetForm();
  };


  return (

    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 900, md: 1000 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <Formik
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
          }) => (
            <form onSubmit={handleSubmit}>


              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 6
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
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Ms.">Ms.</MenuItem>
                  </Select>
                </FormControl>
                <Field as={TextField} name="firstName" label="First Name" variant="outlined" fullWidth margin="normal" />
                <Field as={TextField} name="lastName" label="Last Name" variant="outlined" fullWidth margin="normal" />
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                  mb: 6
                }}
              >
                <Field as={TextField} name="email" label="E-mail" variant="outlined" fullWidth margin="normal" />
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
                    />
                  }
                />
              </Box>


              {/* {Object.keys(Requirements).map((noun) => (
                <FormControl key={noun} fullWidth variant="outlined" sx={{ gridColumn: 'span 2', mb: 6 }}>

                  <InputLabel id={`${noun}-label`}>{noun}</InputLabel>
                  <Select
                    labelId={`${noun}-label`}
                    id={noun}
                    name={noun}
                    value={values[noun]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.prefix && !!errors.prefix}
                    label={noun}
                  >
                    <MenuItem value="">None</MenuItem>
                    {Requirements[noun].map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
              ))} */}

              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select BusinessLocation </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='businessLocation'
                  value={values.businessLocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select BusinessLocation"
                >
                  {
                    Object.keys(Requirements).length === 0 ? null :
                      Requirements.BusinessLocation.map((item: any) => (
                        <MenuItem
                          value={item.name}
                          key={item.id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>

              {/* 
                drop down for ProductPrice
              */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select ProductPrice </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='ProductPrice'
                  value={values.ProductPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select ProductPrice"
                >
                  {
                    Object.keys(Requirements).length === 0 ? null :
                      Requirements.ProductPrice.map((item: any) => (
                        <MenuItem
                          value={item.name}
                          key={item.id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>

              {/* 
                drop down for accounts
              */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select accounts </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='accounts'
                  value={values.accounts}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select accounts"
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

              {/* 
                drop down for agents
              */}

              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select agents </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='agents'
                  value={values.agents}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select agents"
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

              {/* 
                drop down for contacts
              */}

              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select contacts </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='contacts'
                  value={values.contacts}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select contacts"
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
              </FormControl>

              {/* 
                drop down for cost_center
              */}

              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select cost_center </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='cost_center'
                  value={values.cost_center}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select cost_center"
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

              {/* 
                drop down for gender
              */}

              <FormControl fullWidth sx={{ mb: 6 }}>
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
                  drop down for marital
                */}

              <FormControl fullWidth sx={{ mb: 6 }}>
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
                  drop down for patterns
                */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select patterns </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='patterns'
                  value={values.patterns}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select patterns"
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

              {/* 
                  drop down for roles
                */}

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

              {/* 
                  drop down for taxes
                */}

              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select taxes </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='taxes'
                  value={values.taxes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select taxes"
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

              {/* 
                  drop down for warehouse
                */}

              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                >Select warehouse </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  name='warehouse'
                  value={values.warehouse}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.prefix && !!errors.prefix}
                  label="Select warehouse"
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
        </Formik>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
