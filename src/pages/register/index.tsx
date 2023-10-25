'use client'

// ** React Imports
import { ReactNode, useState, useEffect } from 'react'
import { fetchUsers } from 'src/store/apps/users'




// ** Next Import
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from "axios"

// ** Styles
import * as styles from './styles.module.css'



// ** MUI Components
import Button from '@mui/material/Button'

// import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import { MenuItem, Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { register } from 'src/store/apps/auth/register/index'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { AccountCircle } from '@mui/icons-material'
import PhoneIcon from '@mui/icons-material/Phone'
import TranslateIcon from '@mui/icons-material/Translate'
import PaidIcon from '@mui/icons-material/Paid'
import EmailIcon from '@mui/icons-material/Email'



//declare types
type RegisterData = {
  name: string
  alternate_number: number
  mobile: number
  currency_id: number
  surname: string
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  confirm_password: string
  language: string
}

const CenterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minHeight: '100vh', // Set the height to 100% of the viewport height for vertical centering
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white !important',
  borderRadius: '25px',
  boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.5)',

  padding: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    maxWidth: 1080
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
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
  const apiUrl = 'https://test.izocloud.net/api/app/react/currency/all'

  const response = await axios.get(apiUrl)

  if (!response) {
    throw new Error(`Failed to fetch data from ${apiUrl}`)
  }

  const data: CurrenciesType = response.data
  console.log("from register currency:", data)

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
  const router = useRouter()

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [mrMrs, setMrMrs] = useState('')
  const [nameError, setNameError] = useState<string>('')
  const [currencyIDError, setCurrencyIDError] = useState<string>('')
  const [surnameError, setSurnameError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  const [firstNameError, setFirstNameError] = useState<string>('')
  const [usernameError, setUsernameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [formDataRegister, setFormDataRegister] = useState<RegisterData>({
    name: '',
    alternate_number: 0,
    mobile: 0,
    currency_id: 0,
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


  useEffect(() => {
    dispatch(fetchUsers)
  }, [dispatch])


  // ** Functions for handle states
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //handle inputs errors
    if (!formDataRegister.name || !formDataRegister.name.length) {
      setNameError(" The Name field is required and cannot be empty.")
    } else if (formDataRegister.name.length > 255) {
      setNameError(" The Name field is too long.")
    } else if (!formDataRegister.currency_id) {
      setCurrencyIDError("The Currency id cannot be empty.")
    } else if (!formDataRegister.first_name || !formDataRegister.first_name.length) {
      setFirstNameError("The first name cannot be empty.")
    } else if (formDataRegister.first_name.length > 255) {
      setFirstNameError("The first name is too long.")
    } else if (!formDataRegister.password || !formDataRegister.password.length) {
      setPasswordError("The password cannot be empty")
    } else if (formDataRegister.password.length > 255) {
      setPasswordError("The password is too long.")
    } else if (!formDataRegister.username || !formDataRegister.username.length) {
      setUsernameError("The username  cannot be empty.")
    } else if (formDataRegister.username.length > 255) {
      setPasswordError("The user name is too long.")
    } else if (!formDataRegister.surname || !formDataRegister.surname.length) {
      setSurnameError("The surname  cannot be empty.")
    } else if (formDataRegister.surname.length > 10) {
      setSurnameError("The surname is too long.")
    } else if (formDataRegister.password !== formDataRegister.confirm_password) {
      setConfirmPasswordError(" The password does not match the confirm password!")
    } else {
      setNameError("")
      setCurrencyIDError('')
      setFirstNameError("")
      setPasswordError('')
      setUsernameError("")
      setSurnameError("")
      if (typeof formDataRegister.currency_id === "string") {
        const currencyId = Number(formDataRegister.currency_id);
        const phone = Number(formDataRegister.mobile)
        const alternativePhone = Number(formDataRegister.alternate_number)
        console.log("currencyId", currencyId)
        setFormDataRegister({
          ...formDataRegister,
          currency_id: currencyId,
          mobile: phone,
          alternate_number: alternativePhone,

        })
        console.log(formDataRegister)

        //@ts-ignore
        dispatch(register(formDataRegister))
        setTimeout(() => { router.push("/login") }, 2000)

        console.log("status", status)




        // console.log("currency_id", typeof formDataRegister.currency_id)
      }


    }


  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataRegister(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }




  const handleMrMrsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMrMrs(event.target.value)
  }

  //array of currencies

  const arrCurrenciesValues = Object.values(currencies)
  const arrCurrenciesKeys = Object.keys(currencies)

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        backgroundColor: '#f4f4f4',
        minHeight: '100vh'
      }}
    >
      <CenterWrapper sx={{ margin: '20px 0' }}>
        <Image
          src={'/izoLogo/izo_logo_black.png'}
          alt='izo-logo'
          width={200}
          height={200}
          className={styles.izo__logo}
        />

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
                      value={formDataRegister.name}
                      required
                      autoFocus
                      placeholder='activity name'
                      error={nameError ? true : false}
                      helperText={nameError}
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
                      type='tel'
                      name='mobile'
                      placeholder='activity phone number'
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
                    <TextField
                      id='outlined-select-currency'
                      select
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
                    </TextField>
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
                    <TextField
                      id='outlined-select-currency'
                      select
                      name='currency_id'
                      required
                      error={currencyIDError ? true : false}
                      helperText={currencyIDError}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <PaidIcon />
                          </InputAdornment>
                        )
                      }}
                      label='Choose Currency ID'
                      onChange={handleChange}
                    >
                      {arrCurrenciesValues.map((currency: any, index: number) => (


                        <MenuItem key={index} value={arrCurrenciesKeys[index]}>
                          {arrCurrenciesKeys[index]} - {currency}
                        </MenuItem>



                      ))}
                    </TextField>
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
                    value={mrMrs}
                    placeholder='Mr/Mrs'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleMrMrsChange}
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
                    required
                    name='first_name'
                    error={firstNameError ? true : false}
                    helperText={firstNameError}
                    placeholder='First Name'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleChange}
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
                    name='last_name'
                    placeholder='Last Name'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleChange}
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
                    name='surname'
                    error={surnameError ? true : false}
                    helperText={surnameError}
                    placeholder='Surname'
                    onChange={handleChange}
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
                    error={usernameError ? true : false}
                    helperText={usernameError}
                    required
                    value={formDataRegister.username}
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
                      placeholder='user@email.com'
                      onChange={handleChange}
                      value={formDataRegister.email}
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
                      aria-describedby="component-helper-text"
                      label='Password'
                      error={passwordError ? true : false}

                      value={formDataRegister.password}
                      id='auth-login-v2-password'
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
                    <FormHelperText error id="component-helper-text">
                      {passwordError}
                    </FormHelperText>
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
                      aria-describedby="component-helper-confirm"
                      error={confirmPasswordError ? true : false}
                      value={formDataRegister.confirm_password}
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
                    <FormHelperText error id="component-helper-confirm">
                      {confirmPasswordError}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </fieldset>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'center', margin: '20px 0' }} className={styles.form__controllers}>
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
      </CenterWrapper>

    </Grid>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// Register.guestGuard = true

export default Register
