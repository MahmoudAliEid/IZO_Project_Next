// ** MUI Imports
import Paper from '@mui/material/Paper'
import { Table, TableBody, TableContainer, TableHead, TableRow, TableFooter } from '@mui/material'
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

// Define the table component
const StoreTable = ({ tableData }) => {
  // Calculate the total current amount
  // const totalCurrentAmount = tableData.reduce((acc, item) => acc + item.qty, 0)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Warehouse Name</StyledTableCell>
            <StyledTableCell colSpan={2}>Current Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.store}</StyledTableCell>
              <StyledTableCell colSpan={2}>{row.qty}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <StyledTableCell>Total: {0} </StyledTableCell>
            <StyledTableCell>Cost Of Unit: {0}</StyledTableCell>
            <StyledTableCell>Total Cost: {0}</StyledTableCell>
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default StoreTable
