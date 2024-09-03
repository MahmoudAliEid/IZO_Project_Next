import { Button, ButtonGroup } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Cookies

const PageFilter = ({ setFilterDate, setOpenDateRange }) => {
  // ** Cookies
  const FilterInitial = getCookie('FilterInitial')
  const transText = getCookie('fontStyle')
  // ** Hook
  const { settings } = useSettings()
  const { searchFilter } = settings
  const [btnValue, setBtnValue] = useState(FilterInitial)

  useEffect(() => {
    if (searchFilter) {
      setBtnValue(searchFilter)
      if (searchFilter === 'month') {
        setFilterDate(prev => {
          return {
            ...prev,
            active: 'month',
            startDate: null,
            endDate: null,
            month: new Date(),
            week: null,
            day: null
          }
        })
      }
      if (searchFilter === 'week') {
        setFilterDate(prev => {
          return {
            ...prev,
            active: 'week',
            startDate: null,
            endDate: null,
            month: null,
            week: new Date(),
            day: null
          }
        })
      }
      if (searchFilter === 'day') {
        setFilterDate(prev => {
          return {
            ...prev,
            active: 'day',
            startDate: null,
            endDate: null,
            month: null,
            week: null,
            day: new Date()
          }
        })
      }
      if (searchFilter === 'range') {
        setOpenDateRange(true)
        setFilterDate(prev => {
          return {
            ...prev,
            active: 'range'
          }
        })
      }
    } else {
      setBtnValue(FilterInitial)
    }
  }, [searchFilter, FilterInitial, setFilterDate, setOpenDateRange])

  return (
    <ButtonGroup variant='outlined' aria-label='Basic button group'>
      <Button
        onMouseEnter={() => {
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'month'
            }
          })
        }}
        onClick={() => {
          setBtnValue('month')

          setFilterDate(prev => {
            return {
              ...prev,
              active: 'month',
              startDate: null,
              endDate: null,
              month: new Date(),
              week: null,
              day: null
            }
          })
        }}
        variant={btnValue === 'month' ? 'contained' : 'outlined'}
        sx={{ textTransform: transText }}
      >
        Month
      </Button>
      <Button
        variant={btnValue === 'week' ? 'contained' : 'outlined'}
        sx={{ textTransform: transText }}
        onMouseEnter={() => {
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'week'
            }
          })
        }}
        onClick={() => {
          setBtnValue('week')
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'week',
              startDate: null,
              endDate: null,
              month: null,
              week: new Date(),
              day: null
            }
          })
        }}
      >
        Week
      </Button>
      <Button
        onMouseEnter={() => {
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'day'
            }
          })
        }}
        variant={btnValue === 'day' ? 'contained' : 'outlined'}
        sx={{ textTransform: transText }}
        onClick={() => {
          setBtnValue('day')
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'day',
              startDate: null,
              endDate: null,
              month: null,
              week: null,
              day: new Date()
            }
          })
        }}
      >
        Day
      </Button>
      <Button
        onMouseEnter={() => {
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'range'
            }
          })
        }}
        variant={btnValue === 'range' ? 'contained' : 'outlined'}
        sx={{ textTransform: transText }}
        onClick={() => {
          setBtnValue('range')
          setOpenDateRange(true)
          setFilterDate(prev => {
            return {
              ...prev,
              active: 'range'
            }
          })
        }}
      >
        Range
      </Button>
    </ButtonGroup>
  )
}

export default PageFilter
