

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router';

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'


const CardStatsVertical = (props: CardStatsVerticalProps) => {

  // ** Props
  const {
    title,
    stats,
    avatarSrc,
    avatarIcon,
    trendNumber,
    optionsMenuProps,
    trend = 'positive',
    avatarColor = 'primary',
    path
  } = props
  console.log("stats in card stats vertical", stats)

  const router = useRouter();

  const handleOptionSelect = () => {
    router.push(path)
  }


  return (
    <Card style={{ width: "100%", height: "100%" }
    }>
      <CardContent sx={{ p: theme => `${theme.spacing(5, 5, 4)} !important` }}>
        <Box sx={{ display: 'flex', mb: 4, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={avatarColor}
            src={avatarSrc ?? ''}
            sx={{ width: 42, height: 42 }}
          >
            {avatarIcon && !avatarSrc ? avatarIcon : null}
          </CustomAvatar>


          {optionsMenuProps ? (
            <OptionsMenu {...optionsMenuProps} />
          ) : (
            <OptionsMenu
              options={['see details']}
              iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}

              //@ts-ignore
              // go to dashboards/sales
              handleOptionSelect={handleOptionSelect}

            // Assuming that onSelectOption is a callback provided by OptionsMenu

            />
          )}
        </Box>
        <Typography sx={{ mb: 0.5, fontWeight: 600, color: 'text.secondary' }}>{title}</Typography>
        <Typography variant='h5' sx={{ mb: 2 }}>
          {Math.floor(Number(stats))}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& svg': { mr: 1, color: `${trend === 'positive' ? 'success' : 'error'}.main` }
          }}
        >
          <Icon fontSize={16} icon={trend === 'positive' ? 'bx:up-arrow-alt' : 'bx:down-arrow-alt'} />
          <Typography
            variant='body2'
            sx={{ fontWeight: 500, color: `${trend === 'positive' ? 'success' : 'error'}.main` }}
          >
            {`${trendNumber}%`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
