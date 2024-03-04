import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const GlobalScroll = ({ children }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '300px',
        overflowY: 'scroll',
        width: '100%',
        overflowX: 'hidden',
        paddingRight: '5px !important',
        scrollbarGutter: 'inherit',
        '&::-webkit-scrollbar': {
          width: '5px',
          //  marginLeft: "5px !important",
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-track': {
          // boxShadow: 'inset 0 0 5px transparent',
          borderRadius: '10px',
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: `${theme.palette.primary.light}`,
          borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: `${theme.palette.primary.main}`
        }
      }}
    >
      {children}
    </Box>
  )
}

export default GlobalScroll
