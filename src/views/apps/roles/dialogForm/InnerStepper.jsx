// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStep from '@mui/material/Step'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    icon: 'bx:home',
    title: 'Account Details',
    subtitle: 'Enter your Account Details'
  },
  {
    icon: 'bx:user',
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    icon: 'bx:link',
    title: 'Social Links',
    subtitle: 'Add Social Links'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '&:not(.Mui-completed)': {
    '& .step-title': {
      color: theme.palette.text.secondary
    },
    '& + svg': {
      color: theme.palette.text.disabled
    }
  },
  '&.Mui-completed': {
    '& .step-title': {
      color: theme.palette.text.disabled
    },
    '& + svg': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiStepLabel-label.Mui-active .step-title': {
    color: theme.palette.primary.main
  }
}))

const InnerStepper = () => {
  // ** States

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <Fragment></Fragment>
      case 1:
        return <Fragment key={step}></Fragment>
      case 2:
        return <Fragment key={step}></Fragment>
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      )
    } else {
      return (
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {steps[activeStep].title}
            </Typography>
            <Typography variant='caption' component='p'>
              {steps[activeStep].subtitle}
            </Typography>
          </Grid>

          {getStepContent(activeStep)}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size='large' variant='outlined' color='secondary' disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button size='large' variant='contained' onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep} connector={<Icon icon='bx:chevron-right' />}>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <CustomAvatar
                        variant='rounded'
                        skin={activeStep === index ? 'filled' : 'light'}
                        color={activeStep >= index ? 'primary' : 'secondary'}
                        sx={{
                          mr: 2.5,
                          borderRadius: 1,
                          ...(activeStep === index && {
                            boxShadow: theme => `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                          })
                        }}
                        onClick={() => {
                          setActiveStep(index)
                        }}
                      >
                        <Icon icon={step.icon} />
                      </CustomAvatar>
                      <div>
                        <Typography variant='body2' className='step-title'>
                          {step.title}
                        </Typography>
                        <Typography variant='caption' className='step-subtitle'>
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default InnerStepper
