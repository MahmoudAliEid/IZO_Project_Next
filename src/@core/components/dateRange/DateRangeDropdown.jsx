import { useState, forwardRef } from 'react'
import { TextField, FormControl, Grid, InputLabel, Select, MenuItem } from '@mui/material'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import DatePicker from 'react-datepicker'

const DateRangeDropdown = ({ selectedRange, setSelectedRange }) => {
  const theme = useTheme() // Add this line to get the theme
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const [startDateRange, setStartDateRange] = useState(new Date())
  const [endDateRange, setEndDateRange] = useState(addDays(new Date(), 45))

  const handleDateChange = range => {
    setSelectedRange(range)
  }
  const handleOnChangeRange = dates => {
    const [start, end] = dates
    setStartDateRange(start)
    setEndDateRange(end)
    console.log(start, end, 'onChangeRange start end')
    console.log(dates, 'dates')
  }

  const CustomInput = forwardRef((props, ref) => {
    const startDateFormatted = format(props.start, 'MM/dd/yyyy')
    const endDateFormatted = props.end !== null ? format(props.end, 'MM/dd/yyyy') : null
    const value = `${startDateFormatted}${endDateFormatted !== null ? ` - ${endDateFormatted}` : ''}`

    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id='date-range-label'>Date Range</InputLabel>
          <Select
            fullWidth
            labelId='date-range-label'
            id='date-range'
            value={selectedRange}
            label='Date Range'
            onChange={e => handleDateChange(e.target.value)}
          >
            <MenuItem value='Today'>Today</MenuItem>
            <MenuItem value='Yesterday'>Yesterday</MenuItem>
            <MenuItem value='Last 7 Days'>Last 7 Days</MenuItem>
            <MenuItem value='Last 30 Days'>Last 30 Days</MenuItem>
            <MenuItem value='This Month'>This Month</MenuItem>
            <MenuItem value='Last Month'>Last Month</MenuItem>
            <MenuItem value='This month last year'>This month last year</MenuItem>
            <MenuItem value='This Year'>This Year</MenuItem>
            <MenuItem value='Last Year'>Last Year</MenuItem>
            <MenuItem value='Current financial year'>Current financial year</MenuItem>
            <MenuItem value='Last financial year'>Last financial year</MenuItem>
            <MenuItem value='Custom Range'>Custom Range</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {selectedRange === 'Custom Range' && (
        <Grid item xs={12}>
          <DatePickerWrapper>
            <DatePicker
              fullWidth
              selectsRange
              monthsShown={2}
              endDate={endDateRange}
              selected={startDateRange}
              startDate={startDateRange}
              shouldCloseOnSelect={false}
              id='date-range-picker-months'
              onChange={handleOnChangeRange}
              popperPlacement={popperPlacement}
              customInput={<CustomInput label='Custom Range' end={endDateRange} start={startDateRange} />}
            />
          </DatePickerWrapper>
        </Grid>
      )}

      {/* {getDateRange() && (
        <div xs={12} md={6}>
          <p>Start Date: {getDateRange()[0].toLocaleDateString()}</p>
          <p>End Date: {getDateRange()[1].toLocaleDateString()}</p>
        </div>
      )} */}
    </Grid>
  )
}

export default DateRangeDropdown
