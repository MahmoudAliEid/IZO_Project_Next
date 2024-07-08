import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
  Grid
} from '@mui/material'
// ** Next Imports
import { getCookie } from 'cookies-next'
// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'

const DropDownAccounts = ({ open, handleClose, handleCollect, id, dueDate }) => {
  const [accountList, setAccountList] = useState([]) // Renamed for clarity and initialized as an empty array
  const [selectedAccount, setSelectedAccount] = useState('') // Separate state for the selected account
  const transText = getCookie('fontStyle')
  const [year, setYear] = useState(new Date())

  const store = useSelector(state => state.getCheques.brands?.value?.requirement?.account_collect)

  useEffect(() => {
    if (store) {
      setAccountList(store)
    }
  }, [store])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
      sx={{
        height: '100vh',
        boxSizing: 'border-box',
        '.MuiDialog-paper': {
          width: '100%',
          height: '100%'
        }
      }}
      // scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle sx={{ textTransform: transText }}>Selecting an Account & Date</DialogTitle>
      <DialogContent>
        <DatePickerWrapper>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel sx={{ textTransform: transText }}>Accounts</InputLabel>
                <Select
                  name='account'
                  label='Accounts'
                  sx={{ textTransform: transText }}
                  value={selectedAccount} // Controlled component
                  onChange={e => setSelectedAccount(e.target.value)} // Set selected account
                >
                  {accountList.length > 0
                    ? accountList.map((item, index) => (
                        <MenuItem sx={{ textTransform: transText }} key={index} value={item.id}>
                          {item.value}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>

            {/* add input of date just choose year */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <DatePicker
                  selected={year}
                  minDate={new Date(dueDate)}
                  showYearDropdown
                  showMonthDropdown
                  dateFormat={'yyyy/MM/dd'}
                  style={{
                    textTransform: transText,
                    width: '100%'
                  }} // Ensure DatePicker takes full width
                  popperPlacement={
                    'auto' // Set popperPlacement to auto to ensure DatePicker is always visible on the screen
                  }
                  onChange={date => setYear(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput label={'Date'} sx={{ textTransform: transText, width: '100%' }} />}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DatePickerWrapper>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            color='error'
            variant='outlined'
            sx={{ textTransform: transText }}
            onClick={() => {
              setSelectedAccount('') // Reset selected account
              handleClose()
            }}
          >
            Cancel
          </Button>
          <Button
            color='primary'
            sx={{ textTransform: transText }}
            variant='contained'
            onClick={() => {
              handleCollect({ id, account_id: selectedAccount, date: year }) // Corrected object properties
              handleClose()
            }}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default DropDownAccounts
