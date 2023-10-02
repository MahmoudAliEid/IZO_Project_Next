'use client'

// ** React Imports
import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { loginFirstTime } from 'src/store/apps/auth/loginFirstTime'


// import axios from 'axios'

// ** Next Import
// import Link from 'next/link'
import Image from 'next/image'

// ** Styles
import styles from './styles.module.css'

// ** MUI Components
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { AccountCircle } from '@mui/icons-material'

// import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import { Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

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
    maxWidth: 835
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
}))

// const LinkStyled = styled(Link)(() => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: '#ec6608'
// }))
interface FormData {
  username: string
  password: string

}

const LoginFirstTime = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  // const [confirmPassword, setConfirmPassword] = useState('')
  const [userNameError, setUserNameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const dispatch = useDispatch()

  //@ts-ignore
  const statusCode = useSelector(state => state.loginFirstTime.statusCode)
  const router = useRouter()

  useEffect(() => {
    if (statusCode === 200) { router.replace("/login") }
  }, [statusCode, router])



  //to get ip address
  //Regarding the MAC address, it's not possible to access it through
  //a web browser due to security and privacy restrictions.The MAC address is
  // a low - level hardware address and is not exposed to websites for security reasons.


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //handle errors
    if (!userName || !userName.length) {
      setUserNameError("The Username cannot be empty!")
    } else if (userName.length >= 256) {
      setUserNameError("The User name must be between 3 and 255 characters")
    } else if (!password || !password.length) {
      setPasswordError("The Password cannot be empty!")
    } else if (password.length < 5) {
      setPasswordError("password is too short!")
    } else {

      setUserNameError("")
      setPasswordError("")
      const loginData: FormData = {
        username: userName,
        password: password,

      }
      console.log("from login first time", loginData)

      //@ts-ignore
      dispatch(loginFirstTime(loginData))
      if (statusCode === 200) router.replace("/login")
    }

  }

  // const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   setConfirmPassword(e.target.value)
  // }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
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
                <legend className={styles.gradientText}>Login for first time</legend>

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
                      required
                      error={userNameError ? true : false}
                      helperText={userNameError}
                      sx={{ margin: '7px 7px 0 0', width: '100%' }}
                      value={userName}
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                      placeholder='user name'
                      onChange={handleUserNameChange}
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
                      required
                      label='Password'
                      error={passwordError ? true : false}
                      value={password}
                      aria-describedby='component-helper-text'
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
                    <FormHelperText error id="component-helper-text">
                      {passwordError}
                    </FormHelperText>
                  </FormControl>

                  {/* <FormControl
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
                      required
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
                      onChange={handleConfirmPassword}
                    />
                  </FormControl> */}
                </Box>
              </fieldset>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'center', margin: '20px 0' }} className={styles.form__controllers}>
              <Button size='large' type='submit' variant='contained' sx={{ mb: 2, fontSize: 12 }}>
                Login first time
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: `10px !important` }}></Divider>
          <Typography sx={{ mb: 4, color: 'text.secondary', fontSize: 12, textAlign: 'center' }}>
            IZO CLOUD - V4.0 | Powered By AGT | +971-56-777-9250 | +971-4-23-55-919 | All Rights Reserved Copyright ©{' '}
            {new Date().getFullYear()}
          </Typography>
        </form>
      </CenterWrapper>
    </Grid>
  )
}

LoginFirstTime.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginFirstTime.guestGuard = true

export default LoginFirstTime
