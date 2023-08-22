// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardDivider = () => {
  return (
    <Card>
      <CardContent>
        <Typography>Simple Divider</Typography>
        <Divider />
        <Typography>Light Divider (below)</Typography>
        <Divider light />
        <Box sx={{ display: 'flex' }}>
          <Typography>Vertical</Typography>
          <Divider flexItem orientation='vertical' sx={{ ml: 4 }} />
        </Box>
      </CardContent>
      <Divider variant='middle'>Middle</Divider>
      <Divider variant='fullWidth'>Full Width</Divider>
      <Divider variant='inset'>Inset</Divider>
      <CardContent></CardContent>
      <CardContent sx={{ display: 'flex' }}>
        <Divider flexItem sx={{ height: 100 }} variant='middle' orientation='vertical'>
          Middle
        </Divider>
        <Divider flexItem variant='fullWidth' orientation='vertical'>
          Full Width
        </Divider>
        <Divider flexItem variant='inset' orientation='vertical'>
          Inset
        </Divider>
      </CardContent>
    </Card>
  )
}

export default CardDivider
