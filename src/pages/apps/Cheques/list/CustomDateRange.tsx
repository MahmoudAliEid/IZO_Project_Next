// ** React Imports
import React, {  forwardRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

// ** CSS Import for DatePicker
import 'react-datepicker/dist/react-datepicker.css';

const CustomDateRange = ({
  popperPlacement,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement'],
  startDate: Date,
  endDate: Date,
  setStartDate: (date: Date) => void,
  setEndDate: (date: Date) => void
}) => {
  const handleOnChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const CustomInput = forwardRef(({ value, onClick }: any, ref: React.Ref<HTMLInputElement>) => (
    <TextField
      inputRef={ref}
      onClick={onClick}
      value={value}
      label="Date Range"
      fullWidth
    />
  ));

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <DatePicker
          selectsRange
          endDate={endDate}
          selected={startDate}
          startDate={startDate}
          onChange={handleOnChange}
          shouldCloseOnSelect={false}
          popperPlacement={popperPlacement}
          customInput={<CustomInput />}
        />
      </div>
    </Box>
  );
};


export default CustomDateRange
