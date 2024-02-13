// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
// import { Theme } from '@mui/material/styles'
// import { styled,  } from '@mui/material/styles'
import { useTheme  } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
// import useMediaQuery from '@mui/material/useMediaQuery'

// const LinkStyled = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

const FooterContent = () => {
  // ** Var
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' ,flexDirection:{sx:'column', md:"row"} }}>
      <Typography sx={{ mr: 2 }}>
        {` IZO CLOUD - V5.0 | Copyright  © ${new Date().getFullYear()},  All rights reserved.`}

      </Typography>

      <Typography  variant='body2' sx={{ mr: 2  }}>
        Made with ❤️ by <span style={{ color: theme.palette.primary.main}}> Mahmoud Ali & Ibrahem Sai</span>
      </Typography>


      {/* {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <LinkStyled target='_blank' href='https://themeselection.com/license/'>
            License
          </LinkStyled>
          <LinkStyled target='_blank' href='https://themeselection.com/'>
            More Themes
          </LinkStyled>
          <LinkStyled
            target='_blank'
            href='https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/documentation/'
          >
            Documentation
          </LinkStyled>
          <LinkStyled target='_blank' href='https://themeselection.com/support/'>
            Support
          </LinkStyled>
        </Box>
      )} */}
    </Box>
  )
}

export default FooterContent
