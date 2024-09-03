import { useState, useEffect } from 'react'

// ** MUI
import { Dialog, DialogActions, DialogContent, Box, Chip } from '@mui/material'
// ** Custom Components
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { viewOpeningStock } from 'src/store/apps/products/addOpeningStock/getViewOpeningStock'

// ** Data Grid
import CustomSpanningTable from './CustomSpanningTable'

const ViewOpeningStock = ({ open, toggle, id }) => {
  // ** State
  const [data, setData] = useState([])

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.getViewOpeningStock.data?.value)

  // ** Get Opening Stock
  useEffect(() => {
    dispatch(viewOpeningStock({ id }))
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <CustomHeader
        title={`View Opening Stock ( ${data.ref_no ? data.ref_no : ''} )`}
        handleClose={handleClose}
        divider={false}
      />
      <DialogContent>
        {data && data.items && data.items.length ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                pb: '1rem'
              }}
            >
              Date:&nbsp;
              <Chip label={`${data.date}`} />
            </Box>
            <CustomSpanningTable
              columns={[
                { field: 'productName', headerName: 'Product Name', flex: 1 },
                { field: 'quantity', headerName: 'Quantity', flex: 1 },
                { field: 'storeName', headerName: 'Warehouse', flex: 1 },
                { field: 'date', headerName: 'Date', flex: 1 }
              ]}
              rows={data.items}
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

export default ViewOpeningStock
