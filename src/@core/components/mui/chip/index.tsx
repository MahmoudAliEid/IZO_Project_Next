// ** MUI Imports
import { Chip as MuiChip } from '@mui/material';


// ** Third Party Imports
import clsx from 'clsx'

// ** Types
import { CustomChipProps } from './types'

// ** Hooks Imports
import useBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'

const Chip = (props: CustomChipProps) => {
  // ** Props
  const { sx, skin, color, rounded } = props

  // ** Hook

   //@ts-ignore
  const bgColors: UseBgColorType = useBgColor()

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  }

  const propsToPass = { ...props }

  propsToPass.rounded = undefined

  return (
    <MuiChip
      {...propsToPass}
      variant='filled'
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light',
        textTransform: 'lowercase' // Override textTransform to be lowercase

      })}

      sx={{

        ...(skin === 'light' && color ? Object.assign(colors[color], sx) : sx),
        textTransform: 'lowercase' // Override textTransform to be lowercase
      }}
    />
  )
}

export default Chip
