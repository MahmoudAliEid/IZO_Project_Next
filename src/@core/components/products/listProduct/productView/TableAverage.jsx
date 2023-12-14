// ** MUI Imports
import Paper from '@mui/material/Paper'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

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

const dataValue = [
  {
    average_sale_price: 100,
    heights_sale_price: 150,
    lowest_sale_price: 50,
    last_sale_price: 120
  },
  {
    average_sale_price: 200,
    heights_sale_price: 250,
    lowest_sale_price: 150,
    last_sale_price: 220
  }
]

// Define the table component
const TableAverage = ({ dataColumns }) => {
  // Calculate the total current amount
  // const totalCurrentAmount = tableData.reduce((acc, item) => acc + item.qty, 0)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {dataColumns.map(column => (
              <StyledTableCell key={column}>{column.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataValue?.map(row => (
            <StyledTableRow key={row}>
              <StyledTableCell>{row.average_sale_price}</StyledTableCell>
              <StyledTableCell>{row.heights_sale_price}</StyledTableCell>
              <StyledTableCell>{row.lowest_sale_price}</StyledTableCell>
              <StyledTableCell>{row.last_sale_price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableAverage
