'use client'

// ** React Imports
import { ReactNode, useState, useEffect } from 'react'
import { fetchUsers } from 'src/store/apps/users'


// ** Next Import
import Link from 'next/link'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import axios from "axios"

// ** Styles
import * as styles from './styles.module.css'


// ** MUI Components
import {
  Button, Checkbox, TextField, InputLabel, IconButton, Box, Typography, FormControl, FormHelperText, OutlinedInput
  ,InputAdornment, FormControlLabel, MenuItem, Grid,Select
} from '@mui/material'
import Card , { CardProps } from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete';


// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Formik
import { Formik } from 'formik'
import * as Yup from 'yup'





// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { register } from 'src/store/apps/auth/register/index'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch } from 'src/store'
import { AccountCircle } from '@mui/icons-material'
import PhoneIcon from '@mui/icons-material/Phone'
import TranslateIcon from '@mui/icons-material/Translate'
// import PaidIcon from '@mui/icons-material/Paid'
import EmailIcon from '@mui/icons-material/Email'



//declare types
type RegisterData = {
  name: string
  alternate_number: number  | string
  mobile: number  | string
  currency_id: number | string
  surname: string
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  confirm_password: string
  language: string
}

const CenterWrapper = styled(Card)<CardProps>(({ theme }) => ({
  width: '100%',
  minHeight: '100vh', // Set the height to 100% of the viewport height for vertical centering
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '25px',
  boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.5)',

  padding: theme.spacing(10),
  // [theme.breakpoints.up('lg')]: {
  //   maxWidth: 1080
  // },
  // [theme.breakpoints.up('xl')]: {
  //   maxWidth: 635
  // },
  // [theme.breakpoints.up('sm')]: {
  //   padding: theme.spacing(12)
  // }
}))

const LinkStyled = styled(Link)(() => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: '#ec6608'
}))

type CurrenciesType = {
  data: {
    status: string
    currencies: object
  }
  currencies: object

}

export async function getStaticProps() {
  // Fetch data from the API
  const apiUrl = 'https://test.izocloud.com/api/app/react/currency/all'

  const response = await axios.get(apiUrl)

  if (!response) {
    throw new Error(`Failed to fetch data from ${apiUrl}`)
  }

  const data: CurrenciesType = response.data


  return {
    props: {
      currencies: data.currencies
    },
    revalidate: 10,
  }
}
const Register: React.FC<{ currencies: CurrenciesType }> & {
  getLayout: (page: ReactNode) => ReactNode
  guestGuard?: boolean
} = ({ currencies }) => {
  // const router = useRouter()

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // const [successMessage, setSuccessMessage] = useState<string>('')
  // const [registerError, setRegisterError] = useState<string>('')
  const [formDataRegister] = useState<RegisterData>({
    name: '',
    alternate_number: '',
    mobile: '',
    currency_id: '',
    surname: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    language: ''
  })

  const dispatch = useDispatch<AppDispatch>()
  //@ts-ignore
  const registerState = useSelector(state => state.register.register)
  //@ts-ignore
  const success = useSelector(state => state.register.status)

  const theme = useTheme()

  // ** UseEffect

  // useEffect(() => {
  //   if (success ) {
  //     setSuccessMessage(success )
  //   }

  //   if(registerState) {
  //     setRegisterError(registerState)
  //   }

  // }, [success,registerState])

  useEffect(() => {
    dispatch(fetchUsers)
  }, [dispatch])

  // if (successMessage==='success' && registerError === true) {

  //       setTimeout(() => { router.push("/login") }, 2000)
  // }

  console.log("registerState", registerState)
  console.log("success", success)




  // ** Functions for handle states
  //@ts-ignore
  const handleSubmit = (values, {resetForm}) => {
    console.log("values", values)
    dispatch(register(values)).then(() => {

      // Logic to redirect to login page after successful registration


      resetForm()
    })




  }

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormDataRegister(prevData => ({
  //     ...prevData,
  //     [event.target.name]: event.target.value
  //   }))
  // }




  // const handleMrMrsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMrMrs(event.target.value)
  // }

  // ** Validation Schema

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    currency_id: Yup.string().required('The currency id is required'),
    first_name: Yup.string().required('The first name is required'),
    password: Yup.string().required('The password is required'),
    username: Yup.string().required('The username is required'),
    // surname: Yup.string().required('The surname is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('The confirm password is required'),
    // last_name: Yup.string().required('The last name is required'),
    email: Yup.string().email('Invalid email').required('The email is required'),
    mobile: Yup.number().required('The mobile is required'),
    // alternate_number: Yup.number().required('The alternate number is required'),
    language: Yup.string().required('The language is required')

  })


  console.log("currencies 🎁🎁", currencies)



   return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12} lg={6} md={6} sm={12}>
        <CenterWrapper sx={{ margin: '20px 0' }}>
          <Image
            src={`/izoLogo/izo-logo-${theme.palette.mode}.png`}
            alt='izo-logo'
            width={200}
            height={200}
            className={styles.izo__logo}
          />

          <Formik initialValues={formDataRegister} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, handleBlur, handleChange, handleSubmit, touched, errors,setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid spacing={2} item xs={12} sx={{ padding: '20px 0' }}>
                    <fieldset style={{ border: '1px solid #ec6608', borderRadius: '10px', padding: '20px' }}>
                      <legend className={styles.gradientText}>Company Details</legend>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between'
                        }}
                        className={styles.inputField_container}
                      >
                        <FormControl
                          className={styles.varInput}
                          sx={{
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '5px',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                        >
                          <TextField
                            sx={{ margin: '7px 7px 0 0', width: '100%' }}
                            value={values.name}
                            required
                            autoFocus
                             placeholder='activity name'
                             //@ts-ignore
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ?  (errors.name) : ''}
                            onBlur={handleBlur}
                            name='name'
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <AccountCircle />
                                </InputAdornment>
                              )
                            }}
                          />
                          <TextField
                            sx={{ margin: '7px 7px 0 0', width: '100%' }}
                            value={values.mobile}
                            required
                            //@ts-ignore
                            error={errors.mobile && touched.mobile}
                            helperText={errors.mobile && touched.mobile ?  (errors.mobile) : ''}
                            type='tel'
                            name='mobile'
                            placeholder='activity phone number'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <PhoneIcon />
                                </InputAdornment>
                              )
                            }}
                          />
                        </FormControl>
                        <FormControl
                          className={styles.varInput}
                          sx={{
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '5px',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                        >
                          <TextField
                            type='tel'
                            name='alternate_number'
                            value={values.alternate_number}


                            placeholder='alternate phone number'
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <PhoneIcon />
                                </InputAdornment>
                              )
                            }}
                          />
                        </FormControl>

                        <FormControl
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                          className={(styles.dropdown, styles.varInput)}
                         >
                           <InputLabel htmlFor='language'>Language</InputLabel>
                          <Select
                                                          id='language'
                             fullWidth
                            value={values.language}
                             required
                             //@ts-ignore
                            error={errors.language && touched.language}
                            helperText={errors.language && touched.language ?  (errors.language) : ''}
                            onBlur={handleBlur}
                            label='Language'
                            defaultValue='EUR'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <TranslateIcon />
                                </InputAdornment>
                              )
                            }}
                            name='language'
                            onChange={handleChange}
                          >
                            <MenuItem value='ar'>Arabic</MenuItem>
                            <MenuItem value='en'>English</MenuItem>
                          </Select>
                          {errors.language && touched.language && (
                            <FormHelperText error id='component-helper-text'>
                              {errors.language && touched.language ?  (errors.language) : ''}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                          className={(styles.dropdown, styles.varInput)}
                        >
                          <Autocomplete
                             id='currency_id'
                             fullWidth
                             //@ts-ignore
                            options={currencies}

                            required
                            onChange={(event, newValue) => {

                              if (
                                newValue
                              ) {
                                //@ts-ignore
                                setFieldValue('currency_id', newValue.id)

                              }
                            }}
                            error={errors.currency_id && touched.currency_id}
                             helperText={errors.currency_id && touched.currency_id ? (errors.currency_id) : ''}
                             //@ts-ignore
                            getOptionLabel={option => option.value}

                             renderInput={params => <TextField {...params}
                               value={values.currency_id}
                               name='currency_id'

                               label='Currency' />}
                          />
                          {errors.currency_id && touched.currency_id && (
                            <FormHelperText error id='component-helper-text'>
                              {errors.currency_id && touched.currency_id ?  (errors.currency_id) : ''}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                    </fieldset>
                  </Grid>
                  <Grid item xs={12} sx={{}}>
                    <fieldset style={{ border: '1px solid #ec6608', borderRadius: '10px', padding: '20px' }}>
                      <legend className={styles.gradientText}>Details about the owner</legend>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between'
                        }}
                        className={styles.inputField_container}
                      >
                        <TextField
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                           className={styles.varInput}
                           //@ts-ignore
                          value={values.mrMrs}
                          name='mrMrs'

                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder='Mr/Mrs'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                        />
                        <TextField
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                          className={styles.varInput}
                          name='first_name'
                          value={values.first_name}
                          onChange={handleChange}
                           onBlur={handleBlur}
                           //@ts-ignore
                          error={errors.first_name && touched.first_name}
                          helperText={errors.first_name && touched.first_name ?  (errors.first_name) : ''}
                          placeholder='First Name'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                        />
                        <TextField
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                          className={styles.varInput}
                          value={values.last_name}
                          name='last_name'
                          onChange={handleChange}
                          onBlur={handleBlur}

                          placeholder='Last Name'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                        />
                        <TextField
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                          className={styles.varInput}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                          value={values.surname}
                          name='surname'
                          onChange={handleChange}
                          onBlur={handleBlur}

                          placeholder='Surname'
                        />

                        <TextField
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                          className={styles.varInput}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                          name='username'
                          required
                           value={values.username}
                           //@ts-ignore
                          error={errors.username && touched.username}
                          helperText={errors.username && touched.username ?  (errors.username) : ''}
                          onBlur={handleBlur}
                          placeholder='User Name'
                          onChange={handleChange}
                        />

                        <FormControl
                          className={(styles.dropdown, styles.varInput)}
                          sx={{
                            width: '100%',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                        >
                          <TextField
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <EmailIcon />
                                </InputAdornment>
                              )
                            }}
                            value={values.email}
                             required
                             //@ts-ignore
                            error={errors.email && touched.email}
                            helperText={errors.email && touched.email ?  (errors.email) : ''}
                            onBlur={handleBlur}
                            placeholder='user@email.com'
                            onChange={handleChange}
                            name='email'
                          />
                        </FormControl>

                        <FormControl
                          className={styles.varInput}
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                        >
                          <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                          <OutlinedInput
                            aria-describedby='component-helper-text'
                            label='Password'
                            id='auth-login-v2-password'
                            required
                             value={values.password}
                             //@ts-ignore
                            error={errors.password && touched.password}
                            helperText={errors.password && touched.password ?  (errors.password) : ''}
                            onBlur={handleBlur}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                </IconButton>
                              </InputAdornment>
                            }
                            name='password'
                            onChange={handleChange}
                           />
                           {
                            errors.password && touched.password && (
                              <FormHelperText error id='component-helper-text'>
                                {errors.password && touched.password ? (errors.password) : ''}
                              </FormHelperText>
                            )
                           }

                        </FormControl>

                        <FormControl
                          className={styles.varInput}
                          sx={{
                            margin: '5px 2px',
                            flex: '1',
                            '& .Mui-focused': {
                              borderColor: '#ec6608 !important',
                              color: '#ec6608 !important',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ec6608 !important'
                              }
                            }
                          }}
                        >
                          <InputLabel htmlFor='auth-login-v2-confirm-password'>Confirm Password</InputLabel>
                          <OutlinedInput
                            aria-describedby='component-helper-confirm'
                             value={values.confirm_password}
                             //@ts-ignore
                            error={errors.confirm_password && touched.confirm_password}
                            helperText={
                              errors.confirm_password && touched.confirm_password
                                ?  (errors.confirm_password)
                                : ''
                            }
                            onBlur={handleBlur}
                            required
                            label='Confirm Password'
                            id='auth-login-v2-confirm-password'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                </IconButton>
                              </InputAdornment>
                            }
                            name='confirm_password'
                            onChange={handleChange}
                           />
                           {
                            errors.confirm_password && touched.confirm_password && (
                              <FormHelperText error id='component-helper-confirm'>
                                {errors.confirm_password && touched.confirm_password ? (errors.confirm_password) : ''}
                              </FormHelperText>
                            )
                           }

                        </FormControl>
                      </Box>
                    </fieldset>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ justifyContent: 'center', margin: '20px 0' }}
                    className={styles.form__controllers}
                  >
                    <FormControlLabel
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#ec6608' } }}
                      control={<Checkbox color='warning' />}
                      label={
                        <>
                          <Typography variant='body2' component='span'>
                            I agree to{' '}
                          </Typography>
                          <LinkStyled href='/' onClick={e => e.preventDefault()}>
                            privacy policy & terms
                          </LinkStyled>
                        </>
                      }
                    />
                    <Button size='large' type='submit' variant='contained' sx={{ mb: 2 }}>
                      Sign up
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 2 }}>
                        Already have an account?
                      </Typography>
                      <Typography variant='body2'>
                        <LinkStyled href='/login'>Sign in instead</LinkStyled>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </CenterWrapper>
      </Grid>
    </Grid>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// Register.guestGuard = true

export default Register
