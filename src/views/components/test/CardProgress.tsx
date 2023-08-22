// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'

const CardProgress = () => {
  return (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default CardProgress
