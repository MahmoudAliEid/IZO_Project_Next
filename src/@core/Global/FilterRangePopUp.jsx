import { Button, Dialog, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomDateRange from './CustomDateRange'

import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'

const FilterRangePage = ({ open, handleClose, popperPlacement, filterDate, setFilterDate }) => {
  return (
    <>
      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{
          height: 'auto',
          '.MuiDialog-paper': {
            height: 'auto',
            width: 'auto',
            overflow: 'visible'
          }
        }}
      >
        <CustomHeader title='Date Range' handleClose={handleClose} divider={true} />
        <DialogContent>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Box>
              <DatePickerWrapper>
                <CustomDateRange
                  popperPlacement={popperPlacement}
                  filterDate={filterDate}
                  setFilterDate={setFilterDate}
                  label='Date Range'
                />
              </DatePickerWrapper>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                setFilterDate(prev => {
                  return {
                    ...prev,
                    startDate: null,
                    endDate: null
                  }
                })

                handleClose()
              }}
              variant='outlined'
              color='error'
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FilterRangePage
