// ** React Imports
import { useState, ReactNode, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// redux
import { login } from 'src/store/apps/auth/login/index.js'
import { useDispatch } from 'react-redux'
import { RootStateRegister } from 'src/types/apps/rooteState'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components

import MenuItem from '@mui/material/MenuItem'

// import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'

// import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { AccountCircle } from '@mui/icons-material'
import TranslateIcon from '@mui/icons-material/Translate'

// ** Third Party Imports
// import * as yup from 'yup'
// import { Controller } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'

import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const LoginIllustration = styled('img')({
  height: 'auto',
  maxWidth: '100%'
})

// ** styles css
import styles from './styles.module.css'

// import { useNavigateToDashboardAnalysisIfTokenMatches } from 'src/utils/checkLogin'
import { RootState } from 'src/types/apps/rooteState'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
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
  color: '#ec6608 '
}))

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(5).required()
// })

// const defaultValues = {
//   password: 'admin',
//   email: 'admin@sneat.com'
// }

interface FormData {
  username: string
  password: string
  logout_other: string
}

interface UserData {
  status: string
  users: object
}
export async function getStaticProps() {
  // Fetch data from the API
  const apiUrl = 'https://test.izocloud.com/api/get-user'
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${apiUrl}`)
  }

  const userData: UserData = await response.json()

  return {
    props: {
      userData
    }
  }
}

const LoginPage: React.FC<{ userData: UserData }> & {
  getLayout: (page: ReactNode) => ReactNode
  guestGuard?: boolean
} = ({ userData }) => {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [LogoutFromOtherDevices, setLogoutFromOtherDevices] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('')
  const [username, setUserName] = useState<string>('')
  const [Language, setLanguage] = useState<string>('')
  const [userNameError, setUserNameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const currentYear = new Date().getFullYear()
  const dispatch = useDispatch()
  console.log('username', username)
  const messageError = useSelector((state: RootState) => state.login.data.message)
  const messageStatus = useSelector((state: RootState) => state.login.data.status)
  const status = useSelector((state: RootStateRegister) => state.register.data.status)
  const login_first_time = useSelector((state: RootState) => state.login.login_first_time)

  useEffect(() => {
    if (messageStatus) {
      toast.success(`login successfully`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
    if (status === 200) {
      toast.success(`Register successfully, now you can Login`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
    if (messageError) {
      toast.error(`${messageError} user name or password isn't correct`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })


    }
  }, [messageStatus, messageError, status])

  // const login_first_time = useNavigateToDashboardAnalysisIfTokenMatches()

  const handleOnSubmit = (e: any) => {
    try {
      e.preventDefault()

      //handle errors
      if (!username || !username.length) {
        setUserNameError("The Username cannot be empty!")
      } else {
        setUserNameError("")
      }
      if (!password || !password.length) {
        setPasswordError("The Password cannot be empty!")
      } else if (password.length < 5) {
        setPasswordError("password is too short!")
      } else {
        setPasswordError("")
      }

      const loginData: FormData = {
        username: username,
        password: password,
        logout_other: LogoutFromOtherDevices ? '1' : '0'
      }
      console.log(loginData)

      //@ts-ignore
      dispatch(login(loginData))
      router.replace('/dashboards/analytics')

      //to go into page login for first time
      if (login_first_time) {
        router.replace('/loginFirstTime')
      }
      if (username == '' || password == '') {
        //handle message alerts errors
        toast.error(`User name or password can't be empty!!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  // secret key ="izo-+username+password"

  // const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Var
  const { skin } = settings

  // const {
  //   control,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues,
  //   mode: 'onBlur',
  //   resolver: yupResolver(schema)
  // })

  // const onSubmit = (data: FormData) => {
  //   const { email, password } = data
  //   auth.login({ email, password, rememberMe, LogoutFromOtherDevices }, () => {
  //     setError('email', {
  //       type: 'manual',
  //       message: 'Email or Password is invalid'
  //     })
  //   })
  // }

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value)
  }

  // const handleChangeRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRememberMe(event.target.checked)
  // }
  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const arrUsersData = Object.values(userData.users)

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustration width={500} alt='login-illustration' src={`/izoLogo/login_img.svg`} />
        </Box>
      ) : null}
      <RightWrapper
        sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
            <Image src={'/izoLogo/izo_logo_black.png'} alt='logo' width={40} height={40} background-color={'black'} />

            <Box sx={{ mx: 'auto', maxWidth: 400 }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  '& .Mui-focused': {
                    borderColor: '#ec6608 !important',
                    color: '#ec6608 !important',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ec6608 !important'
                    }
                  }
                }}
                size='small'
              >
                <TextField
                  select
                  label='Language'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <TranslateIcon />
                      </InputAdornment>
                    )
                  }}
                  value={Language}
                  onChange={handleChangeLanguage}
                >
                  <MenuItem value='ar'>Arabic</MenuItem>
                  <MenuItem value='en'>English</MenuItem>
                </TextField>
              </FormControl>
            </Box>
          </Box>

          <Typography variant='h6' sx={{ mb: 1.5 }}>
            Welcome to {themeConfig.templateName.toUpperCase()}! 👋🏻
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Please sign-in to your account and start the adventure
          </Typography>
          {/* <Alert
            icon={false}
            sx={{
              py: 3,
              mb: 6,
              backgroundColor: '#ec66086b',

              '& .MuiAlert-message': { p: 0 }
            }}
          >
            <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'text.secondary' }}>
              Admin: <strong>admin@sneat.com</strong> / Pass: <strong>admin</strong>
            </Typography>
            <Typography variant='caption' sx={{ display: 'block', color: 'text.secondary' }}>
              Client: <strong>client@sneat.com</strong> / Pass: <strong>client</strong>
            </Typography>
          </Alert> */}
          <form noValidate autoComplete='off'>
            <FormControl
              fullWidth
              sx={{
                mb: 2,
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
                id='outlined-select-currency'
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                label='User Name'
                error={userNameError ? true : false}
                value={username}
                helperText={userNameError}
                onChange={handleChangeUserName}
              >
                {arrUsersData.map((user: any, index: number) => (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mb: 2,
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
                error={passwordError ? true : false}
                required

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
                onChange={handleChangePassword}
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Logout From Other Device'
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    color: 'text.secondary'
                  }
                }}
                control={
                  <Checkbox
                    color='warning'
                    checked={LogoutFromOtherDevices}
                    onChange={e => setLogoutFromOtherDevices(e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label='Remember Me'
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: 'text.secondary' }
                }}
                control={
                  <Checkbox color='warning' checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                }
              />
              <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
            </Box>
            <Button
              onClick={handleOnSubmit}
              className={styles.custom__btn}
              fullWidth
              size='large'
              type='submit'
              sx={{
                mb: 4,
                backgroundColor: '#ec6608 !import',
                color: 'white',
                '&:hover': {
                  background: '#111111 !important',
                  color: '#ec6608 !important'
                },
                '&:focus': {
                  outline: '2px solid orange', // Change the focus outline to orange
                  boxShadow: 'none' // Remove the default focus box shadow
                }
              }}
            >
              Sign in
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2 }}>
                New on our platform?
              </Typography>
              <Typography>
                <LinkStyled href='/register'>Create an account</LinkStyled>
              </Typography>
            </Box>
            <Divider sx={{ my: `${theme.spacing(6)} !important` }}></Divider>
            <Typography sx={{ mb: 4, color: 'text.secondary', fontSize: 12, textAlign: 'center' }}>
              IZO CLOUD - V4.0 | Powered By AGT | +971-56-777-9250 | +971-4-23-55-919 | All Rights Reserved Copyright ©{' '}
              {currentYear}
            </Typography>
          </form>
        </Box>
      </RightWrapper>
      <ToastContainer />
    </Box>
  )
}
LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// LoginPage.guestGuard = true

export default LoginPage
