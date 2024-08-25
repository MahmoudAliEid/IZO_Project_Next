// ** React Imports
import React, { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import DatePicker from 'react-datepicker'

// ** CSS Import for DatePicker
import 'react-datepicker/dist/react-datepicker.css'

const CustomDateRange = ({  setFilterDate, filterDate, label }) => {
  const { startDate, endDate } = filterDate

  const handleOnChange = dates => {
    const [start, end] = dates
    setFilterDate(prevState => ({ ...prevState, startDate: start, endDate: end }))
  }

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <TextField inputRef={ref} onClick={onClick} value={value} label={label} fullWidth />
  ))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <DatePicker
        selectsRange
        showYearDropdown
        showMonthDropdown
        endDate={endDate}
        selected={startDate}
        startDate={startDate}
        onChange={handleOnChange}
        shouldCloseOnSelect={false}
        popperPlacement={'auto'}
        customInput={<CustomInput />}
      />
    </Box>
  )
}

export default CustomDateRange
