'use client'

// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** Styles
import styles from './styles.module.css'

// ** MUI Components
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
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import { MenuItem, Select } from '@mui/material'

// images

// import logo from '/public/izoLogo/Logo.ico'

// /import loginImage from '/izoLogo/loginImage.svg'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
// const RegisterIllustration = styled('img')({
//   height: 'auto',
//   maxWidth: '100%'
// })

const CenterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minHeight: '100vh', // Set the height to 100% of the viewport height for vertical centering
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,

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

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState('')

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Vars
  const { skin } = settings

  // ** Functions
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  return (
    <Box className={`content-center ${styles.register__container}`}>
      {/* {!hidden ? (
        <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustration width={700} alt='register-illustration' src={'/izoLogo/loginImage.svg'} />
        </Box>
      ) : null} */}
      <CenterWrapper
        className={styles.center_wrapper}
        sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 2000 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
            <Image src={'/izoLogo/Logo.ico'} alt='izo-logo' width={200} height={200} className={styles.izo__logo} />
            {/* <Typography
              variant='h5'
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.45px',
                textTransform: 'lowercase',
                fontSize: '1.75rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography> */}
          </Box>
          <Typography variant='h6' sx={{ mb: 1.5 }}>
            Adventure starts here 🚀
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
          <form noValidate autoComplete='off' onSubmit={e => handleSubmit(e)} className={styles.form__custom}>
            <div className={styles.parts__container}>
              <div className={styles.part_1}>
                <TextField autoFocus label='Activity Name' placeholder='activity name' />
                <TextField type='tel' label='Activity Phone umber' placeholder='activity phone number' />
                <TextField type='tel' label='Alternate phone number' placeholder='alternate phone number' />
                <FormControl className={styles.dropdown}>
                  <InputLabel>Choose Currency</InputLabel>
                  <Select label='Choose Currency' value={selectedOption} onChange={handleChange}>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='AED '>AED </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.part_2}>
                <TextField autoFocus label='Mr/Mrs' placeholder='Mr/Mrs' />
                <TextField autoFocus label='Firstname' placeholder='johndoe' />
                <TextField autoFocus label='Lastname' placeholder='johndoe' />
                <TextField autoFocus label='Username' placeholder='johndoe' />

                <FormControl
                  className={styles.dropdown}
                  sx={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
                >
                  <TextField label='Email' placeholder='user@email.com' style={{ width: '100%' }} />
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                  <FormControl>
                    <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                    <OutlinedInput
                      label='Password'
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
                    />
                  </FormControl>

                  <FormControl>
                    <InputLabel htmlFor='auth-login-v2-password'>confirm Password</InputLabel>
                    <OutlinedInput
                      label='Password'
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
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={styles.form__controllers}>
              <FormControlLabel
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#ec6608' } }}
                control={<Checkbox />}
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
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2 }}>
                  Already have an account?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login'>Sign in instead</LinkStyled>
                </Typography>
              </Box>
            </div>
          </form>
        </Box>
      </CenterWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
