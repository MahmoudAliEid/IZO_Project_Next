import { Button, CardContent, Dialog, DialogActions, DialogContent } from '@mui/material'
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
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{
          height: 'auto',
          '.MuiDialog-paper': {
            width: '100%',
            height: 'auto'
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
                      filterDate={filterDate}
                      setFilterDate={setFilterDate}
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

export default FilterRangePage
