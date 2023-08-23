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
import FormValidationBasic from 'src/views/forms/form-validation/FormValidationBasic'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/StepperAlternativeLabel'
import RegisterMultiStepseps from 'src/views/pages/auth/register-multi-steps/index'

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
import BillingAddressCard from 'src/views/pages/account-settings/billing/BillingAddressCard'
import AccountSettings from 'src/views/pages/account-settings/AccountSettings'
import RegisterMultiSteps from '../pages/auth/register-multi-steps'
import TabBilling from 'src/views/pages/account-settings/TabBilling'
import AnalyticsTransactions from 'src/views/dashboards/analytics/AnalyticsTransactions'

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
        {/* <FormValidationBasic /> */}
        {/* <StepperAlternativeLabel /> */}
        {/* <BillingAddressCard /> */}
        {/* <AccountSettings tab='admin' /> */}
        {/* <RegisterMultiStepseps /> */}
        {/* <TabBilling /> */}
        <AnalyticsTransactions />
      </CenterWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
