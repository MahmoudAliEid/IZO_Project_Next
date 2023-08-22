// ** MUI Imports
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'

const OutsideProgress = () => {
  return (
    <div>
      <Typography>Circular Progress</Typography>
      <div className='demo-space-x'>
        <CircularProgress />
        <CircularProgress value={75} color='secondary' variant='determinate' />
      </div>
      <Typography sx={{ mt: 4 }}>Linear Progress</Typography>
      <div className='demo-space-x'>
        <LinearProgress />
        <LinearProgress value={60} color='secondary' variant='determinate' />
      </div>
    </div>
  )
}

export default OutsideProgress
