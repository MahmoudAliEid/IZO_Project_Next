import { useState, useEffect, useRef } from 'react'

// ** Material UI
import { Box, TextField, Autocomplete, Grid, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useField } from 'formik'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { AddCircleOutline } from '@mui/icons-material'
import DialogAddSuppliers from 'src/views/apps/contacts/suppliers/DialogAddSuppliers'

const SearchSupplier = ({ setFieldValue, handleChange, searchSupplier, setSearchSupplier }) => {
  const [searchInfo, setSearchInfo] = useState([])
  const [supplierId, setSupplierId] = useState(null)
  const [openAddSupplier, setOpenAddSupplier] = useState(false)
  const [field] = useField(`search_supplier`)
  const [loading, setLoading] = useState(false)
  const token = getCookie('token')
  const URL = getCookie('apiUrl')

  const debounceTimeoutRef = useRef(null)

  //** unused variables */
  console.log(supplierId, 'values, supplierId form search  from add opening stock 😍😍')

  const handleSearchChange = async event => {
    handleChange(event)
    setLoading(true)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${URL}/app/react/purchase/supplier?letters=${event.target.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = response.data
        setSearchInfo(data.value || [])
      } catch (error) {
        // throw error
        console.error(error)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  useEffect(() => {
    if (searchInfo.length === 1) {
      // Push the data
      const itemToAdd = searchInfo[0]
      setFieldValue(`business_info`, {
        name: itemToAdd.name,
        businessName: itemToAdd.businessName,
        contactNumber: itemToAdd.contactNumber,
        mobile: itemToAdd.mobile,
        tax_number: itemToAdd.tax_number,
        email: itemToAdd.email,
        balance: itemToAdd.balance
      })
      setFieldValue('contact_id', itemToAdd.id)
      setSearchSupplier(itemToAdd)

      // Clear searchInfo
      setSearchInfo([])
    }
  }, [searchInfo, setFieldValue, setSearchSupplier])

  const handleToggleSupplier = () => {
    setOpenAddSupplier(!openAddSupplier)
  }

  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {openAddSupplier && (
        <DialogAddSuppliers
          open={openAddSupplier}
          toggle={handleToggleSupplier}
          isEdit={false}
          contact='supplier'
          isFromPurchase={true}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={9} lg={10} md={10}>
          <Autocomplete
            id='combo-box-demo'
            options={searchInfo}
            loading={loading}
            getOptionLabel={option => option.name}
            value={searchSupplier}
            onChange={(event, newValue) => {
              if (newValue) {
                setSearchSupplier(newValue)
                setFieldValue(`search_supplier`, newValue.name)

                setSupplierId(newValue.product_id)

                const matchingOptions = searchInfo.filter(item => item.id === newValue.id)

                if (matchingOptions.length > 1) {
                  matchingOptions.forEach(item => {
                    setFieldValue('business_info', {
                      name: item.name,
                      businessName: item.businessName,
                      contactNumber: item.contactNumber,
                      mobile: item.mobile,
                      tax_number: item.tax_number,
                      email: item.email,
                      balance: item.balance
                    })
                    setFieldValue('contact_id', item.id)
                  })
                } else {
                  setFieldValue('business_info', {
                    name: newValue.name,
                    businessName: newValue.businessName,
                    contactNumber: newValue.contactNumber,
                    mobile: newValue.mobile,
                    tax_number: newValue.tax_number,
                    email: newValue.email,
                    balance: newValue.balance
                  })
                  setFieldValue('contact_id', newValue.id)
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
                required
                onChange={handleSearchChange}
                label='Supplier'
                variant='outlined'
                value={searchSupplier}
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
        <Grid item xs={3} lg={2} md={2}>
          <Button
            onClick={() => {
              handleToggleSupplier()
            }}
            sx={{ textAlign: 'center', height: '100%', width: '100%' }}
            color='primary'
            variant='contained'
          >
            <AddCircleOutline />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchSupplier
