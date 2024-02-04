import { useState, useEffect, useRef } from 'react'

// ** Material UI
import { Box, TextField, Autocomplete } from '@mui/material'
import { fetchSearchProductCompo } from 'src/store/apps/products/listProducts/search/getSearchProductCompo'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import { useField } from 'formik'

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
  const [autoAdd, setAutoAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const search_info = useSelector(state => state.getSearchProductCompo.data?.info)

  const debounceTimeoutRef = useRef(null)

  //** unused variables */
  console.log(values, rows, productId, 'values,rows,productId form search  😍😍')

  const handleSearchChange = event => {
    handleChange(event)
    setLoading(true)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    debounceTimeoutRef.current = setTimeout(() => {
      dispatch(fetchSearchProductCompo({ query: event.target.value }))
      setLoading(false)
    }, 1000) // Delay of 500 milliseconds
  }

  useEffect(() => {
    if (search_info) {
      setSearchInfo(search_info)
    }
  }, [search_info])

  useEffect(() => {
    if (searchInfo.length === 1) {
      setAutoAdd(true)
      setOpen(true)
      setSearchProduct(null)
      setFieldValue(`product_compo.${productIndex}.search_product`, '')
      setFieldValue(`product_compo.${productIndex}.p_id`, searchInfo[0].product_id)
    } else {
      setAutoAdd(false)
    }
  }, [searchInfo, setOpen, setFieldValue, productIndex, setSearchProduct])

  // useEffect(() => {
  //   let timeoutId = null
  //   if (searchInfo.length === 1) {
  //     timeoutId = setTimeout(() => {
  //       setAutoAdd(true)
  //       setOpen(true)
  //       setSearchProduct(null)
  //       setFieldValue(`product_compo.${productIndex}.search_product`, '')
  //       setFieldValue(`product_compo.${productIndex}.p_id`, searchInfo[0].product_id)
  //     }, 1000)
  //   } else {
  //     setAutoAdd(false)
  //   }

  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId)
  //     }
  //   }
  // }, [searchInfo, setOpen, setFieldValue, productIndex, setSearchProduct])

  useEffect(() => {
    if (autoAdd) {
      // Auto-add a row if autoAdd is true
      push({
        name: searchInfo[0].text,
        composition_variation_id: searchInfo[0].variation_id,
        quantity: 1,
        unit: searchInfo[0].unit,
        purchase_price_exc: searchInfo[0].purchase_price,
        total_amount: 1 * searchInfo[0].purchase_price,
        all_unit: searchInfo[0].all_unit,
        initial: false,
        unit_quantity: 1
      })

      // Reset autoAdd after successfully pushing the row
    }

    return () => {
      setAutoAdd(false)
    }
  }, [autoAdd, push, searchInfo])

  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Autocomplete
        id='combo-box-demo'
        options={searchInfo}
        loading={loading}
        getOptionLabel={option => option.text}
        disabled={autoAdd}
        value={searchProduct}
        onChange={(event, newValue) => {
          if (newValue) {
            setSearchProduct(newValue)
            setFieldValue(`product_compo.${productIndex}.search_product`, newValue.text)
            setFieldValue(`product_compo.${productIndex}.p_id`, newValue.product_id)
            setProductId(newValue.product_id)

            const matchingOptions = searchInfo.filter(item => item.product_id === newValue.product_id)
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
