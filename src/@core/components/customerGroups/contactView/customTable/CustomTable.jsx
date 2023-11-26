import React from 'react'

// import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'

import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976D2' // Change this to your desired main color
//     }
//   }
// })

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: `${hexToRGBA(theme.palette.primary.main, 1)} !important`,
  color: theme.palette.primary.main
}))
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`
}))

const CustomTable = ({ data, title, range }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label='simple table'>
        <StyledTableHead>
          <TableRow>
            <TableCell colSpan={data.length}>
              <Typography variant='h6' sx={{ color: 'white' }}>
                {title} :
              </Typography>
              {range && (
                <Typography variant='p' sx={{ color: 'white' }}>
                  {range}
                </Typography>
              )}
            </TableCell>
          </TableRow>
        </StyledTableHead>
        {data && (
          <TableBody>
            {data.map(row => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </StyledTableContainer>
  )
}

export default CustomTable
