// ** MUI Imports
import Paper from '@mui/material/Paper'
import { Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Box } from '@mui/system'

// ** cookies
import { getCookie } from 'cookies-next'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

// Define the table component
const CustomTableView = ({ dataRows, dataColumns, footer }) => {
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {dataColumns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align={column.align || 'center'}
                  sx={{
                    minWidth: column.minWidth || 100,
                    flex: column.flex || 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  {column.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows ? (
              dataRows?.map((row, idR) => (
                <StyledTableRow key={idR} sx={{ height: '90px' }}>
                  {dataColumns.map((column, idx) => {
                    const value = row[column.field]

                    return (
                      <StyledTableCell key={idx}>{column.renderCell ? column.renderCell(row) : value}</StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell>No Rows</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {footer && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: 'black'
            }}
          >
            <StyledTableCell>
              <Typography color={'white'}>Total Debit:</Typography>
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Typography color={'white'}>
                {CurrencySymbolPlacement === 'after'
                  ? `  ${Number(footer.balance.total_debit).toFixed(decimalFormat)} ${currency_code}`
                  : `
                  ${currency_code} ${Number(footer.balance.total_debit).toFixed(decimalFormat)}`}
              </Typography>
            </StyledTableCell>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: 'black'
            }}
          >
            <StyledTableCell>
              <Typography color={'white'}>Total Credit:</Typography>
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Typography color={'white'}>
                {CurrencySymbolPlacement === 'after'
                  ? `  ${Number(footer.balance.total_credit).toFixed(decimalFormat)} ${currency_code}`
                  : `
                  ${currency_code} ${Number(footer.balance.total_credit).toFixed(decimalFormat)}`}
              </Typography>
            </StyledTableCell>
          </Box>
        </Box>
      )}
    </>
  )
}

export default CustomTableView
