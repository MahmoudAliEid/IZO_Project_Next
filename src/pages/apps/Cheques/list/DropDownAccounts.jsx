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
  InputLabel
} from '@mui/material'
// ** Next Imports
import { getCookie } from 'cookies-next'

const DropDownAccounts = ({ open, handleClose, handleCollect, id }) => {
  const [accountList, setAccountList] = useState([]) // Renamed for clarity and initialized as an empty array
  const [selectedAccount, setSelectedAccount] = useState('') // Separate state for the selected account
  const transText = getCookie('fontStyle')

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
      scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle sx={{ textTransform: transText }}>Selecting an Account</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            color='error'
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
              handleCollect({ id, account_id: selectedAccount }) // Corrected object properties
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
