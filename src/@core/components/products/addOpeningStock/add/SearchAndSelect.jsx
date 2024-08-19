import { useState, useEffect, useRef } from 'react'

// ** Material UI
import { Box, TextField, Autocomplete } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useField } from 'formik'
import { getCookie } from 'cookies-next'
import axios from 'axios'

const SearchAndSelect = ({
  values,
  setFieldValue,
  handleChange,
  rows,
  searchProduct,
  setSearchProduct,
  setOpen,
  push
}) => {
  const [searchInfo, setSearchInfo] = useState([])
  const [productId, setProductId] = useState(null)
  const [field] = useField(`search_product`)
  const [loading, setLoading] = useState(false)
  const token = getCookie('token')
  const URL = getCookie('apiUrl')

  const debounceTimeoutRef = useRef(null)

  //** unused variables */
  console.log(values, rows, productId, 'values,rows,productId form search  from add opening stock 😍😍')

  const handleSearchChange = async event => {
    handleChange(event)
    setLoading(true)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        // Logging for debugging
        console.log(
          'Sending request to:',
          `${URL}/app/react/opening-quantity/search-product?value=${event.target.value}`
        )
        console.log('With token:', token)

        const response = await axios.get(
          `${URL}/app/react/opening-quantity/search-product?value=${event.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        const data = response.data
        setSearchInfo(data.info)
        console.log('data information 🧀:', data.info)
      } catch (error) {
        console.error('Error fetching data 🥚🥚🥚🥚:', error)
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
  // ** auto adding
  //   if (search_info) {
  //     setSearchInfo(search_info)
  //   }
  // }, [search_info])

  // useEffect(() => {
  //   if (searchInfo.length === 1) {
  //     setAutoAdd(true)
  //     setOpen(true)
  //     setSearchProduct(null)
  //     setFieldValue(`product_compo.${productIndex}.search_product`, '')
  //     setFieldValue(`product_compo.${productIndex}.p_id`, searchInfo[0].product_id)
  //   } else {
  //     setAutoAdd(false)
  //   }
  // }, [searchInfo, setOpen, setFieldValue, productIndex, setSearchProduct])

  // useEffect(() => {
  //   if (autoAdd && searchInfo.length === 1) {
  //     // Check if autoAdd is true and searchInfo has exactly one item
  //     if (!previousSearchResult || previousSearchResult.product_id !== searchInfo[0].product_id) {
  //       // Check if the previous search result is null or different from the current one
  //       push({
  //         name: searchInfo[0].text,
  //         composition_variation_id: searchInfo[0].variation_id,
  //         quantity: 1,
  //         unit: searchInfo[0].unit,
  //         purchase_price_exc: searchInfo[0].purchase_price,
  //         total_amount: 1 * searchInfo[0].purchase_price,
  //         all_unit: searchInfo[0].all_unit,
  //         initial: false,
  //         unit_quantity: 1
  //       })
  //       setTriggerAdd(true)
  //       setPreviousSearchResult(searchInfo[0])
  //     }
  //     setAutoAdd(false)
  //   }
  // }, [autoAdd, push, searchInfo, previousSearchResult])

  // useEffect(() => {
  //   // reset searchInfo when triggerAdd is true
  //   if (triggerAdd) {
  //     setSearchInfo([])
  //   }
  // }, [triggerAdd])

  // !TESTING Important
  useEffect(() => {
    if (searchInfo.length === 1) {
      // Open Loading
      setOpen(true)

      // Push the data
      const itemToAdd = searchInfo[0] // Store the item to push to avoid stale closure
      // {
      //   name: itemToAdd.text,
      //   composition_variation_id: itemToAdd.variation_id,
      //   quantity: 1,
      //   unit: itemToAdd.unit,
      //   purchase_price_exc: itemToAdd.purchase_price,
      //   total_amount: 1 * itemToAdd.purchase_price,
      //   all_unit: itemToAdd.all_unit,
      //   initial: false,
      //   unit_quantity: 1
      // }
      push({
        id: itemToAdd.id,
        name: itemToAdd.text,
        total: itemToAdd?.total,
        variation_id: itemToAdd.variation_id,
        cost: itemToAdd.cost,
        line_store: '',
        product_id: itemToAdd.product_id,
        quantity: 1,
        price: itemToAdd.cost,
        unit: 1,
        store: '',
        all_unit: itemToAdd.all_units,
        initial: false,
        unit_quantity: 1,
        child_price: '',
        list_prices: []
      })

      // Clear searchInfo
      setSearchInfo([])
    }

    // Clean up
    return () => {
      setOpen(false)
    }
  }, [searchInfo, setOpen, push])

  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Autocomplete
        id='combo-box-demo'
        options={searchInfo}
        loading={loading}
        getOptionLabel={option => option.text}
        value={searchProduct}
        onChange={(event, newValue) => {
          if (newValue) {
            setSearchProduct(newValue)
            setFieldValue(`search_product`, newValue.text)
            console.log('new value from search product 🍗🍗🍗:', newValue)
            // setFieldValue(`product_compo.${productIndex}.p_id`, newValue.product_id)
            setProductId(newValue.product_id)
            if (newValue.variation_id === 0) {
              const matchingOptions = searchInfo.filter(
                item => item.product_id === newValue.product_id && item.variation_id !== 0
              )
              if (matchingOptions.length > 1) {
                setOpen(true)
                matchingOptions.forEach(item =>
                  push({
                    id: item.id,
                    name: item.text,
                    total: item?.total,
                    variation_id: item.variation_id,
                    cost: item.cost,
                    line_store: '',
                    product_id: item.product_id,
                    quantity: 1,
                    price: item.cost,
                    unit: 1,
                    store: '',
                    all_unit: item.all_units,
                    initial: false,
                    unit_quantity: 1,
                    child_price: '',
                    list_prices: []
                  })
                )
              }
            } else {
              setOpen(true)
              push({
                id: newValue.id,
                name: newValue.text,
                total: newValue?.total,
                variation_id: newValue.variation_id,
                cost: newValue.cost,
                line_store: '',
                product_id: newValue.product_id,
                quantity: 1,
                price: newValue.cost,
                unit: 1,
                store: '',
                all_unit: newValue.all_units,
                initial: false,
                unit_quantity: 1,
                child_price: '',
                list_prices: []
              })
            }
          }
        }}
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            {option.text}
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
            label='Search'
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
    </Box>
  )
}

export default SearchAndSelect
