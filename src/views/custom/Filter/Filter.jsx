import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import FilterListIcon from '@mui/icons-material/FilterList'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

const data = ['year', 'month', 'today']

const yearData = ['2023', '2022', '2021', '2020', '2019']

export default function Filter({ handleOptionSelect, typeofData }) {
  // const [dataType, setDataType] = React.useState('')
  const [yearType, setYearType] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  function handleClick() {
    setLoading(true)
    const savedLayout = JSON.parse(localStorage.getItem('layout'))
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  const handleChange = event => {
    handleOptionSelect(event.target.value)
  }
  const orangeBoxStyle = {
    height: '55px',
    boxShadow: '0 1px 20px 1px #ff3e1d !important',
    '&:hover': {
      boxShadow: 'none !important'
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={6} lg={4}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              select
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FilterListIcon />
                  </InputAdornment>
                )
              }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={typeofData}
              label='Filter based on'
              onChange={handleChange}
            >
              {data.map(data => (
                <MenuItem value={data} key={data}>
                  {data}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              select
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CalendarMonthIcon />
                  </InputAdornment>
                )
              }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={yearType}
              label='Filter based on'
              onChange={handleChange}
            >
              {yearData.map(data => (
                <MenuItem value={data} key={data}>
                  {data}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <LoadingButton
              sx={orangeBoxStyle}
              onClick={handleClick}
              loading={loading}
              loadingPosition='end'
              startIcon={<SaveIcon />}
              variant='contained'
            >
              <span>Save Layout</span>
            </LoadingButton>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  )
}
