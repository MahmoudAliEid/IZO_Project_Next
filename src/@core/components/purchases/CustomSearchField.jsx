import { useState, useEffect, useRef } from 'react'

// ** Material UI
import { Box, TextField, Autocomplete, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useField } from 'formik'
import { getCookie } from 'cookies-next'
import axios from 'axios'

const CustomSearchField = ({
  setFieldValue,
  handleChange,
  searchValue,
  setSearchValue,
  searchName,
  searchUrl,
  fieldNameToChange,
  label
}) => {
  const [searchInfo, setSearchInfo] = useState([])
  const [field] = useField(searchName)
  const [loading, setLoading] = useState(false)
  const token = getCookie('token')
  const URL = getCookie('apiUrl')

  const debounceTimeoutRef = useRef(null)

  const handleSearchChange = async event => {
    handleChange(event)
    setLoading(true)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        // Logging for debugging
        console.log('Sending request to:', `${URL}${searchUrl} ${event.target.value}`)
        console.log('With token:', token)

        const response = await axios.get(`${URL}${searchUrl} ${event.target.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = response.data
        setSearchInfo(data.value)
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Response data:', error.response.data)
          console.error('Response status:', error.response.status)
          console.error('Response headers:', error.response.headers)
        } else if (error.request) {
          // Request was made but no response received
          console.error('Request data:', error.request)
        } else {
          // Something else happened
          console.error('Error message:', error.message)
        }
      } finally {
        setLoading(false)
      }
    }, 1000) // Delay of 1000 milliseconds
  }

  // !TESTING Important
  useEffect(() => {
    if (searchInfo.length === 1) {
      // Push the data
      const itemToAdd = searchInfo[0] // Store the item to push to avoid stale closure

      setFieldValue(`${fieldNameToChange}`, itemToAdd.id)

      // Clear searchInfo
      setSearchInfo([])
    }
  }, [searchInfo, setFieldValue, fieldNameToChange])

  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={9} lg={10} md={10}>
          <Autocomplete
            id='combo-box-demo'
            options={searchInfo}
            loading={loading}
            getOptionLabel={option => option.name}
            value={searchValue}
            onChange={(event, newValue) => {
              if (newValue) {
                setSearchValue(newValue)
                setFieldValue(`${searchName}`, newValue.name)

                const matchingOptions = searchInfo.filter(item => item.id === newValue.id)

                if (matchingOptions.length > 1) {
                  matchingOptions.forEach(item => {
                    setFieldValue(`${fieldNameToChange}`, item.id)
                  })
                } else {
                  setFieldValue(`${fieldNameToChange}`, newValue.id)
                }
              }
            }}
            renderOption={(props, option) => (
              <Box component='li' {...props}>
                {option.name}
              </Box>
            )}
            clearOnBlur
            selectOnFocus
            fullWidth
            renderInput={params => (
              <TextField
                fullWidth
                {...params}
                {...field}
                onChange={handleSearchChange}
                label={label}
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color='inherit' size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomSearchField
