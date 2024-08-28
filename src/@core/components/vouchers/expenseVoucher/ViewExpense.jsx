import { useState, useEffect } from 'react'

// ** MUI
import { Dialog, DialogActions, DialogContent, Box, Typography } from '@mui/material'
// ** Custom Components
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
// ** Cookies

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { viewExpenseVoucher } from 'src/store/apps/vouchers/expenseVoucher/Actions/getViewExpenseVoucher'

// ** Data Grid
import { DataGrid } from '@mui/x-data-grid'

const ViewExpense = ({ open, toggle, id }) => {
  // ** State
  const [data, setData] = useState([])

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.getViewExpenseVoucher.data?.value)

  // ** Get Expense Voucher
  useEffect(() => {
    dispatch(viewExpenseVoucher({ id }))
  }, [id, dispatch])

  // ** Set data to state
  useEffect(() => {
    if (store) {
      setData(store[0])
    }
  }, [store])

  // ** Function to handle close dialog
  const handleClose = () => {
    toggle()
  }
  console.log(data, 'data form view expense Voucher 🐣')

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <CustomHeader
        title={`Expense Voucher ( ${data?.ref_no ? data.ref_no : ''} )`}
        handleClose={handleClose}
        divider={false}
      />
      <DialogContent>
        {data && data.items && data.items.length ? (
          <>
            <DataGrid
              autoHeight
              rows={data.items}
              columns={[
                {
                  field: 'ref_no',
                  headerName: 'Reference No',
                  flex: 0.35,
                  minWidth: 170,
                  renderCell: () => {
                    return <Typography>{data.ref_no}</Typography>
                  }
                },
                { field: 'creditAccountName', headerName: 'Credit', flex: 0.35, minWidth: 170 },
                { field: 'debitAccountName', headerName: 'Debit', flex: 0.35, minWidth: 170 },
                {
                  field: 'total',
                  headerName: 'Amount',
                  flex: 0.3,
                  minWidth: 100,
                  renderCell: () => {
                    return <Typography>{data.total}</Typography>
                  }
                },
                { field: 'tax_percentage', headerName: 'Tax Account', flex: 0.25, minWidth: 100 },
                { field: 'tax_amount', headerName: 'Tax Amount', flex: 0.25, minWidth: 100 },
                { field: 'amount', headerName: 'Net Amount', flex: 0.25, minWidth: 100 },

                { field: 'date', headerName: 'Date', flex: 0.3, minWidth: 100 },
                { field: 'text', headerName: 'Note', flex: 0.35, minWidth: 170 },
                { field: 'costCenterName', headerName: 'Cost Center', flex: 0.35, minWidth: 150 }
              ]}
            />
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px'
            }}
          >
            <ProgressCustomization />
          </Box>
        )}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default ViewExpense
