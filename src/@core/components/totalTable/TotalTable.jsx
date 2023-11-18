// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// const StyledTableCell =
//   styled(TableCell) <
//   TableCellProps >
//   (({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       color: theme.palette.common.white,
//       backgroundColor: theme.palette.common.black
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14
//     }
//   }))

// const StyledTableRow =
//   styled(TableRow) <
//   TableRowProps >
//   (({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover
//     },

//     // hide last border
//     '&:last-of-type td, &:last-of-type th': {
//       border: 0
//     }
//   }))
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.06)} !important`,

  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  fontSize: 14
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.06)} !important`
  }
}))

const TotalTable = ({ data }) => {
  console.log(data)
  const columnNames = data.map(item => item.name)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            {columnNames.map(columnName => (
              <StyledTableCell key={columnName}>{columnName}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {data.map(item => (
              <StyledTableCell key={item.name}>{item.value}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TotalTable
