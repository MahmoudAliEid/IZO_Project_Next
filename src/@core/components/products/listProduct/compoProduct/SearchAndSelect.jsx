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
  productIndex,
  rows,
  searchProduct,
  setSearchProduct,
  setOpen,
  push
}) => {
  const [searchInfo, setSearchInfo] = useState([])
  const [productId, setProductId] = useState(null)
  const [field] = useField(`product_compo.${productIndex}.search_product`)
  const [loading, setLoading] = useState(false)
  const token = getCookie('token')
  const URL = getCookie('apiUrl')

  const debounceTimeoutRef = useRef(null)

  //** unused variables */
  console.log(values, rows, productId, 'values,rows,productId form search  😍😍')

  const handleSearchChange = async event => {
    handleChange(event)
    setLoading(true)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      //  **axios fetch
      const response = await axios.get(`${URL}/app/react/products/search-product?value=${event.target.value}`, {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
      const data = response.data
      setSearchInfo(data.info)
      setLoading(false)
    }, 1000) // Delay of 500 milliseconds
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
      push({
        name: itemToAdd.text,
        composition_variation_id: itemToAdd.variation_id,
        quantity: 1,
        unit: itemToAdd.unit,
        purchase_price_exc: itemToAdd.purchase_price,
        total_amount: 1 * itemToAdd.purchase_price,
        all_unit: itemToAdd.all_unit,
        initial: false,
        unit_quantity: 1
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
            setFieldValue(`product_compo.${productIndex}.search_product`, newValue.text)
            setFieldValue(`product_compo.${productIndex}.p_id`, newValue.product_id)
            setProductId(newValue.product_id)
            if (newValue.variation_id === 0) {
              const matchingOptions = searchInfo.filter(
                item => item.product_id === newValue.product_id && item.variation_id !== 0
              )
              if (matchingOptions.length > 1) {
                setOpen(true)
                matchingOptions.forEach(item =>
                  push({
                    name: item.text,
                    composition_variation_id: item.variation_id,
                    quantity: 1,
                    unit: item.unit,
                    purchase_price_exc: item.purchase_price,
                    total_amount: 1 * item.purchase_price,
                    all_unit: item.all_unit,
                    initial: false,
                    unit_quantity: 1
                  })
                )
              }
            } else {
              setOpen(true)
              push({
                name: newValue.text,
                composition_variation_id: newValue.variation_id,
                quantity: 1,
                unit: newValue.unit,
                purchase_price_exc: newValue.purchase_price,
                total_amount: 1 * newValue.purchase_price,
                all_unit: newValue.all_unit,
                initial: false,
                unit_quantity: 1
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
