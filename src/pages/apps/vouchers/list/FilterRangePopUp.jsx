import { Button, CardContent, Dialog, DialogActions, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomDateRange from './CustomDateRange'

import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'

const FilterRangePopUp = ({ open, handleClose, popperPlacement, setStartDate, setEndDate, startDate, endDate }) => {
  return (
    <>
      <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{
          height: '100%',
          '.MuiDialog-paper': {
            width: '100%',
            height: '100%'
          }
        }}
      >
        <CustomHeader title='Date Range' handleClose={handleClose} divider={true} />
        <DialogContent>
          <Box>
            <CardContent>
              <Box sx={{ p: 6, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ p: 6 }}>
                  <DatePickerWrapper>
                    <CustomDateRange
                      popperPlacement={popperPlacement}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      startDate={startDate}
                      endDate={endDate}
                      label='Date Range'
                    />
                  </DatePickerWrapper>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button
              onClick={() => {
                setStartDate(null)
                setEndDate(null)

                handleClose()
              }}
              variant='outlined'
              color='error'
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{ ml: 2 }}
              onClick={() => {
                handleClose()
              }}
            >
              Apply
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FilterRangePopUp
