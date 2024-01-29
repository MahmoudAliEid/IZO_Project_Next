
// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationWrapper from 'src/views/pages/auth/AuthIllustrationWrapper'

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const ForgotPasswordV1 = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box className='content-center'>
      <AuthIllustrationWrapper>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(8, 8, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


              <Image
                src={`/izoLogo/izo-logo-${theme.palette.mode}.png`}
                alt='Logo'
                width={100}
                height={100}
              />



            </Box>
            <Typography variant='h6' sx={{ mb: 1.5 }}>
              Forgot Password? 🔒
            </Typography>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>
              Enter your email and we&prime;ll send you instructions to reset your password
            </Typography>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <TextField autoFocus type='email' label='Email' sx={{ display: 'flex', mb: 6 }} />
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                Send reset link
              </Button>
              <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LinkStyled href='/pages/auth/login-v1'>
                  <Icon icon='bx:chevron-left' />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  )
}

ForgotPasswordV1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPasswordV1
