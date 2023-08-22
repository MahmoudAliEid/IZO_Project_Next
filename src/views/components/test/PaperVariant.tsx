// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiPaper, { PaperProps } from '@mui/material/Paper'

// Styled Paper component
const Paper = styled(MuiPaper)<PaperProps>(({ theme }) => ({
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  marginRight: theme.spacing(4)
}))

const PaperVariant = () => {
  return (
    <div>
      <Typography variant='h6'>Paper Variants</Typography>
      <Box sx={{ display: 'flex' }}>
        <Paper variant='outlined'>Default</Paper>
        <Paper variant='outlined' square>
          Square
        </Paper>
      </Box>
    </div>
  )
}

export default PaperVariant
