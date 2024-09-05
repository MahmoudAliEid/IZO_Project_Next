// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** next cookies
import { getCookie } from 'cookies-next'

const CustomSpanningTable = ({ columns, rows }) => {
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  const transText = getCookie('fontStyle')

  // ** Totals
  const totalAmount = rows.reduce((acc, curr) => acc + curr.price, 0)
  const totalQuantity = rows.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  flex: column.flex,
                  justifyContent: column.align || 'left',
                  minWidth: column.minWidth || 'auto',
                  fontStyle: transText
                }}
                align={column.align || 'left'}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} hover role='checkbox'>
              {columns.map((column, index) => {
                const params = row[column.field]

                return (
                  <TableCell key={index + 1} align={column.align} sx={{ textTransform: transText }}>
                    {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
          <TableRow sx={{ textTransform: transText }}>
            <TableCell rowSpan={5} />
            <TableCell colSpan={4}>Total Quantity</TableCell>
            <TableCell align='right'>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(totalQuantity).toFixed(decimalFormat)} ${currency_code} `
                : `${currency_code} ${Number(totalQuantity).toFixed(decimalFormat)} `}
            </TableCell>
          </TableRow>

          <TableRow sx={{ textTransform: transText }}>
            <TableCell colSpan={4}>Total Amount</TableCell>
            <TableCell align='right'>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(totalAmount).toFixed(decimalFormat)} ${currency_code} `
                : `${currency_code} ${Number(totalAmount).toFixed(decimalFormat)} `}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomSpanningTable
