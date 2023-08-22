// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Imports
import Drawer from 'src/views/components/test/Drawer'
import CardAppBar from 'src/views/components/test/CardAppBar'
import PaperSimple from 'src/views/components/test/PaperSimple'
import CardDivider from 'src/views/components/test/CardDivider'
import CardPopover from 'src/views/components/test/CardPopover'
import CardTooltip from 'src/views/components/test/CardTooltip'
import PaperVariant from 'src/views/components/test/PaperVariant'
import CardProgress from 'src/views/components/test/CardProgress'
import OutsideAppBar from 'src/views/components/test/OutsideAppBar'
import OutsideDivider from 'src/views/components/test/OutsideDivider'
import CardBreadcrumb from 'src/views/components/test/CardBreadcrumb'
import OutsidePopover from 'src/views/components/test/OutsidePopover'
import OutsideTooltip from 'src/views/components/test/OutsideTooltip'
import OutsideProgress from 'src/views/components/test/OutsideProgress'
import OutsideBreadcrumb from 'src/views/components/test/OutsideBreadcrumb'
import TransferListBasic from 'src/views/components/test/TransferListBasic'
import TransferListEnhanced from 'src/views/components/test/TransferListEnhanced'

const Test = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6}>
        <PaperSimple />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PaperVariant />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Divider</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardDivider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OutsideDivider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Progress</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardProgress />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OutsideProgress />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Breadcrumbs</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardBreadcrumb />
      </Grid>
      <Grid item xs={12} md={6}>
        <OutsideBreadcrumb />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Popover</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardPopover />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OutsidePopover />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Tooltip</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardTooltip />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OutsideTooltip />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>AppBar</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardAppBar />
      </Grid>
      <Grid item xs={12} md={6}>
        <OutsideAppBar />
      </Grid>
      <Grid item xs={12} xl={6}>
        <Typography variant='h5' sx={{ mb: 6 }}>
          Basic Transfer List
        </Typography>
        <TransferListBasic />
      </Grid>
      <Grid item xs={12} xl={6}>
        <Typography variant='h5' sx={{ mb: 6 }}>
          Enhanced Transfer List
        </Typography>
        <TransferListEnhanced />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Drawer</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Drawer />
      </Grid>
    </Grid>
  )
}

export default Test
