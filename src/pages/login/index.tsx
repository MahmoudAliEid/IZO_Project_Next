// ** React Imports
import { useState, ReactNode, useEffect } from 'react'



import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import { fetchUsers } from 'src/store/apps/users'

// redux
import { login } from 'src/store/apps/auth/login/index.js'
import { useDispatch } from 'react-redux'

// import { RootStateRegister } from 'src/types/apps/rooteState'
import { RootStateUsers } from 'src/types/apps/rooteState'

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



// ** Configs
import { useSettings } from 'src/@core/hooks/useSettings'
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

import { RootState } from 'src/types/apps/rooteState'
import notify from 'src/utils/notify'


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

  const userData = await response.json()

  return {
    props: {
      userData
    },
    revalidate: 1, // In seconds
  }
}




const LoginPage: React.FC<{ userData: UserData }> & {
  getLayout: (page: ReactNode) => ReactNode
  guestGuard?: boolean
} = ({ userData }) => {

  const router = useRouter()
  const secretKey = "izo-"
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

  // **selecting
  const login_first_time = useSelector((state: RootState) => state.login.login_first_time)
  const usersDataNames = useSelector((state: RootStateUsers) => state.usersNames.data?.users)

  useEffect(() => {
    //fetching users
    //@ts-ignore
    dispatch(fetchUsers())


  }, [dispatch])


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
      if (!password || !username) notify(" يجب ملئ البيانات ولا تكون فارغة", "error");

      //@ts-ignore
      dispatch(login(loginData))
      setCookie("key", secretKey + password + username)

      setTimeout(() => {
        router.replace('/dashboards/analytics/');

      }, 2000);


      //to go into page login for first time
      if (login_first_time) {
        router.replace('/loginFirstTime')
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Var
  const { skin } = settings

  // **handle change functions
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

  let arrUsersData = null
  if (usersDataNames) {
    arrUsersData = Object.values(usersDataNames)
  } else {
    arrUsersData = Object.values(userData.users)
  }

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
                {arrUsersData?.map((user: any, index: number) => (
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
    </Box>
  )
}
LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// LoginPage.guestGuard = true

export default LoginPage
