import React from 'react'

// ** Mui Import
import { Box, Button, DialogActions, DialogContent, Typography } from '@mui/material'

// ** next navigate
import { useRouter } from 'next/router'

// ** Custom Components
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from '../customDialogHeader/CustomHeader'

const SupplierPurchasesPopUp = ({ open, toggle, Supplier, total, id }) => {
  const router = useRouter()

  return (
    <CustomDialog open={open} toggle={toggle} maxWidth='sm' width='600px'>
      <CustomHeader title={Supplier} handleClose={toggle} />
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            px: 2,
            py: 2
          }}
        >
          <Typography variant='h6' className='mb-1'>
            Total:
          </Typography>
          <Typography variant='body1'>{total}</Typography>
        </Box>

        <DialogActions>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              px: 2,
              py: 2
            }}
          >
            <Button
              variant='contained'
              onClick={() => router.replace(`/apps/contacts/viewStatement/${id}/?type=supplier`)}
            >
              Account Statement
            </Button>
            <Button variant='outlined'>General Ledger</Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </CustomDialog>
  )
}

export default SupplierPurchasesPopUp
