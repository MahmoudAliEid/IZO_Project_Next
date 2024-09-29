// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

import TableContainer from '@mui/material/TableContainer'

import { Typography } from '@mui/material'
import { getCookie } from 'cookies-next'

const AddExpenseTable = ({ columns, rows, values }) => {
  const transText = getCookie('fontStyle')
  const { currency_id } = values

  const filteredColumns = columns.filter(column => {
    if (currency_id) {
      return column
    } else {
      return column.field !== 'amount_curr' && column.field !== 'vat_curr' && column.field !== 'total_curr'
    }
  })

  return (
    <>
      <>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%', width: '100%' }}>
          <Table stickyHeader stickyFooter aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {filteredColumns &&
                  filteredColumns.length > 0 &&
                  filteredColumns.map((column, idx) => (
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
                    {filteredColumns.map((column, index) => {
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
    </>
  )
}

export default AddExpenseTable
