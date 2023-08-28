'use client'

// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

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

// import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import { MenuItem, Select, Grid } from '@mui/material'

// images

// import logo from '/public/izoLogo/Logo.ico'

// /import loginImage from '/izoLogo/loginImage.svg'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// import { color } from '@mui/system'

// ** Hooks
// import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
// const RegisterIllustration = styled('img')({
//   height: 'auto',
//   maxWidth: '100%'
// })

import { register } from 'src/store/apps/auth/register/index'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

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

// interface FormData {
//   username: string
//   password: string
//   name: string
//   alternate_number: string
//   mobile: string
//   currency_id: string
//   surname: string
//   first_name: string
//   last_name: string
//   email: string
//   confirm_password: string
//   language: string
// }

const Register = () => {
  // ** States
  const currencies: string[] = ['USD', 'EUR', 'AED']
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<number>(0)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [activityPhoneNumber, setActivityPhoneNumber] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState()
  const [mrMrs, setMrMrs] = useState('')
  const [activityName, setActivityName] = useState('')
  const [surname, setSurname] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  // ** Hooks
  // const theme = useTheme()
  // const { settings } = useSettings()
  // const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Vars
  // const { skin } = settings

  // ** Functions for handle states
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const registerData = {
      name: firstName + ' ' + lastName,
      alternate_number: alternatePhoneNumber || '', // Use an empty string if alternatePhoneNumber is undefined
      mobile: activityPhoneNumber,
      currency_id: selectedCurrencyIndex.toString(),
      surname: surname,
      first_name: firstName,
      last_name: lastName,
      username: userName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      language: selectedLanguage
    }

    console.log(registerData)
    dispatch(register(registerData))
  }

  const handleChangeCurrency = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrencyIndex(event.target.value as number)
  }

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value as string)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleActivityPhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivityPhoneNumber(event.target.value)
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  const handleAlternatePhoneNumberChange = (event: any) => {
    setAlternatePhoneNumber(event.target.value)
  }

  const handleMrMrsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMrMrs(event.target.value)
  }

  const handleActivityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivityName(event.target.value)
  }
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value)
  }

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
                {/* <Typography
                className={styles.gradientText}
                variant='h4'
                sx={{
                  width: 'fit-content',
                  textAlign: 'center',
                  margin: '10px auto',
                  color: '#ec6608',
                  padding: '10px 0'
                }}
              >
                Company Details
              </Typography> */}
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
                      value={activityName}
                      autoFocus
                      label='Activity Name'
                      placeholder='activity name'
                      onChange={handleActivityNameChange}
                    />
                    <TextField
                      sx={{ margin: '7px 7px 0 0', width: '100%' }}
                      type='tel'
                      label='Activity Phone Number'
                      placeholder='activity phone number'
                      onChange={handleActivityPhoneNumberChange}
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
                      value={alternatePhoneNumber}
                      label='Alternate Phone Number'
                      placeholder='alternate phone number'
                      onChange={handleAlternatePhoneNumberChange}
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
                    <InputLabel>Language</InputLabel>
                    <Select label='Language' value={selectedLanguage} onChange={handleChangeLanguage}>
                      <MenuItem value='ar'>Arabic</MenuItem>
                      <MenuItem value='en'>English</MenuItem>
                    </Select>
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
                    <InputLabel>Choose Currency</InputLabel>
                    <Select label='Choose Currency' value={selectedCurrencyIndex} onChange={handleChangeCurrency}>
                      {currencies.map((currency, index) => (
                        <MenuItem key={index} value={index}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
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
                    label='Mr/Mrs'
                    value={mrMrs}
                    placeholder='Mr/Mrs'
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
                    label='Firstname'
                    value={firstName}
                    placeholder='johndoe'
                    onChange={handleFirstNameChange}
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
                    label='Lastname'
                    value={lastName}
                    placeholder='johndoe'
                    onChange={handleLastNameChange}
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
                    label='Surname'
                    value={surname}
                    placeholder='doe'
                    onChange={handleSurnameChange}
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
                    label='Username'
                    value={userName}
                    placeholder='johndoe'
                    onChange={handleUserNameChange}
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
                    <TextField label='Email' placeholder='user@email.com' onChange={handleEmailChange} value={email} />
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
                      label='Password'
                      value={password}
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
                      onChange={handlePasswordChange}
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
                    <InputLabel htmlFor='auth-login-v2-confirm-password'>Confirm Password</InputLabel>
                    <OutlinedInput
                      value={confirmPassword}
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
                      onChange={handleConfirmPasswordChange}
                    />
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

Register.guestGuard = true

export default Register

// <Box className={`content-center ${styles.register__container}`}>
//   {/* {!hidden ? (
//     <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <RegisterIllustration width={700} alt='register-illustration' src={'/izoLogo/loginImage.svg'} />
//     </Box>
//   ) : null} */}
//   <CenterWrapper
//     className={styles.center_wrapper}
//     sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
//   >
//     <Box sx={{ mx: 'auto', maxWidth: 2000 }}>
//       <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
//         <Image src={'/izoLogo/Logo.ico'} alt='izo-logo' width={200} height={200} className={styles.izo__logo} />
//         {/* <Typography
//           variant='h5'
//           sx={{
//             ml: 2,
//             lineHeight: 1,
//             fontWeight: 700,
//             letterSpacing: '-0.45px',
//             textTransform: 'lowercase',
//             fontSize: '1.75rem !important'
//           }}
//         >
//           {themeConfig.templateName}
//         </Typography> */}
//       </Box>
//       <Typography variant='h6' sx={{ mb: 1.5 }}>
//         Adventure starts here 🚀
//       </Typography>
//       <Typography sx={{ mb: 6, color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
//       <form noValidate autoComplete='off' onSubmit={e => handleSubmit(e)} className={styles.form__custom}>
//         <div className={styles.parts__container}>
//           <div className={styles.part_1}>
//             <TextField  label='Activity Name' placeholder='activity name' />
//             <TextField type='tel' label='Activity Phone umber' placeholder='activity phone number' />
//             <TextField type='tel' label='Alternate phone number' placeholder='alternate phone number' />
//             <FormControl className={styles.dropdown}>
//               <InputLabel>Choose Currency</InputLabel>
//               <Select label='Choose Currency' value={selectedOption} onChange={handleChange}>
//                 <MenuItem value='USD'>USD</MenuItem>
//                 <MenuItem value='EUR'>EUR</MenuItem>
//                 <MenuItem value='AED '>AED </MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//           <div className={styles.part_2}>
//             <TextField  label='Mr/Mrs' placeholder='Mr/Mrs' />
//             <TextField  label='Firstname' placeholder='johndoe' />
//             <TextField  label='Lastname' placeholder='johndoe' />
//             <TextField  label='Username' placeholder='johndoe' />

//             <FormControl
//               className={styles.dropdown}
//               sx={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
//             >
//               <TextField label='Email' placeholder='user@email.com' />
//             </FormControl>
//             <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
//               <FormControl>
//                 <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
//                 <OutlinedInput
//                   label='Password'
//                   id='auth-login-v2-password'
//                   type={showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     <InputAdornment position='end'>
//                       <IconButton
//                         edge='end'
//                         onMouseDown={e => e.preventDefault()}
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </FormControl>

//               <FormControl>
//                 <InputLabel htmlFor='auth-login-v2-password'>confirm Password</InputLabel>
//                 <OutlinedInput
//                   label='Password'
//                   id='auth-login-v2-password'
//                   type={showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     <InputAdornment position='end'>
//                       <IconButton
//                         edge='end'
//                         onMouseDown={e => e.preventDefault()}
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </FormControl>
//             </div>
//           </div>
//         </div>
//         <div className={styles.form__controllers}>
//           <FormControlLabel
//             sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#ec6608' } }}
//             control={<Checkbox />}
//             label={
//               <>
//                 <Typography variant='body2' component='span'>
//                   I agree to{' '}
//                 </Typography>
//                 <LinkStyled href='/' onClick={e => e.preventDefault()}>
//                   privacy policy & terms
//                 </LinkStyled>
//               </>
//             }
//           />
//           <Button size='large' type='submit' variant='contained' sx={{ mb: 2 }}>
//             Sign up
//           </Button>
//           <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//             <Typography variant='body2' sx={{ mr: 2 }}>
//               Already have an account?
//             </Typography>
//             <Typography variant='body2'>
//               <LinkStyled href='/login'>Sign in instead</LinkStyled>
//             </Typography>
//           </Box>
//         </div>
//       </form>
//     </Box>
//   </CenterWrapper>
// </Box>
