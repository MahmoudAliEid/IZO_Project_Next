// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

const CircularProgressDeterminate = styled(CircularProgress)<CircularProgressProps>(({ theme }) => ({
  color: theme.palette.customColors.trackBg
}))

const CircularProgressIndeterminate = styled(CircularProgress)<CircularProgressProps>(() => ({
  left: 0,
  position: 'absolute',
  animationDuration: '550ms',

}))

const ProgressCircularCustomization = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgressDeterminate variant='determinate' size={40} thickness={5} />
      <CircularProgressIndeterminate variant='indeterminate' disableShrink size={40} thickness={5} />
    </Box>
  )
}

export default ProgressCircularCustomization
