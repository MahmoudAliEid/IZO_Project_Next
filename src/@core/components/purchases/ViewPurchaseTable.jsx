// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
// {
//   // tableCellClasses
// }
import TableContainer from '@mui/material/TableContainer'
// import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { getCookie } from 'cookies-next'

// Box

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.footer}`]: {
//     color: theme.palette.text.primary,
//     backgroundColor: theme.palette.mode === 'light' ? '#f3f4f6' : '#424242',
//     border: 'none'
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14
//   }
// }))

const ViewPurchaseTable = ({ columns, rows }) => {
  const transText = getCookie('fontStyle')

  return (
    <>
      <>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%', width: '100%' }}>
          <Table stickyHeader stickyFooter aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns &&
                  columns.length > 0 &&
                  columns.map((column, idx) => (
                    <TableCell
                      key={idx}
                      align={column.align || 'center'}
                      sx={{
                        minWidth: column.minWidth,
                        flex: column.flex,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textTransform: transText
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) && rows && rows.length > 0 ? (
                rows.map((row, idx) => (
                  <TableRow
                    hover
                    role='checkbox'
                    key={idx}
                    sx={{ display: row.id === 0 || row.id === '' ? 'none' : 'default' }}
                  >
                    {columns.map((column, index) => {
                      const params = row[column.field]

                      return (
                        <TableCell key={index + 1} align={column.align} sx={{ textTransform: transText }}>
                          {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={6}>
                    <Typography variant='body2' align='center' sx={{ my: 10, textTransform: transText }}>
                      No Rows
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      {/* <Box
        style={{
          position: 'sticky',
          bottom: '0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: '#424242',
            textTransform: transText
          }}
        >
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }}>Total :</Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography sx={{ textTransform: transText }}>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.amount).toFixed(decimalFormat)} ${currency_code} `
                : `${currency_code} ${Number(values?.amount).toFixed(decimalFormat)} `}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }}>Remain:</Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography sx={{ textTransform: transText }}>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.table_total).toFixed(decimalFormat)} ${currency_code} `
                : `${currency_code} ${Number(values?.table_total).toFixed(decimalFormat)} `}
            </Typography>
          </StyledTableCell>
        </Box>
      </Box> */}
    </>
  )
}

export default ViewPurchaseTable
