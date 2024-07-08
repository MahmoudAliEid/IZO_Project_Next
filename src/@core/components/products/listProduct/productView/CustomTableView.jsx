// ** MUI Imports
import Paper from '@mui/material/Paper'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { getCookie } from 'cookies-next'

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
const CustomTableView = ({ dataRows, dataColumns, totalDebit, totalCredit }) => {
  const transText = getCookie('fontStyle')

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {dataColumns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align || 'center'}
                  sx={{
                    minWidth: column.minWidth || 100,
                    flex: column.flex || 1,
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
            {dataRows ? (
              dataRows?.map((row, idR) => (
                <StyledTableRow
                  key={idR}
                  sx={{
                    height: '90px',
                    textTransform: transText
                  }}
                >
                  {dataColumns.map((column, idx) => {
                    const value = row[column.field]

                    return (
                      <TableCell
                        key={idx}
                        sx={{
                          textTransform: transText
                        }}
                      >
                        {column.renderCell ? column.renderCell(row) : value}
                      </TableCell>
                    )
                  })}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell sx={{ textTransform: transText }}>No Rows</TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        {totalDebit && (
          <Table>
            <TableHead>
              <TableRow>
                {totalDebit.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align || 'center'}
                    sx={{
                      minWidth: column.minWidth || 100,
                      flex: column.flex || 1,
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
          </Table>
        )}
        {totalCredit && (
          <Table>
            <TableHead>
              <TableRow>
                {totalCredit.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align || 'center'}
                    sx={{
                      minWidth: column.minWidth || 100,
                      flex: column.flex || 1,
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
          </Table>
        )}
      </TableContainer>
    </>
  )
}

export default CustomTableView
