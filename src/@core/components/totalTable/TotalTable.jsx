// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import CustomProgress from '../customProgress/CustomProgress'
import Grid from '@mui/material/Grid'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                {data ? (
                  columnNames.map(columnName => <StyledTableCell key={columnName}>{columnName}</StyledTableCell>)
                ) : (
                  <CustomProgress />
                )}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                {data ? (
                  data.map(item => <StyledTableCell key={item.name}>{item.value} AED</StyledTableCell>)
                ) : (
                  <CustomProgress />
                )}
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default TotalTable
