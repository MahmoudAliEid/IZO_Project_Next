import { useState, useEffect, useRef } from 'react'

// ** Material UI
import { Box, TextField, Autocomplete } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useField } from 'formik'
import { getCookie } from 'cookies-next'
import axios from 'axios'

const SearchPurchase = ({
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
  const decimalFormate = getCookie('DecimalFormat')

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
        console.log('Sending request to:', `${URL}/app/react/purchase/search-product?value=${event.target.value}`)
        console.log('With token:', token)

        const response = await axios.get(`${URL}/app/react/purchase/search-product?value=${event.target.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = response.data
        setSearchInfo(data.info || [])
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
    if (Array.isArray(searchInfo) && searchInfo.length === 1) {
      // Open Loading
      setOpen(true)
      const decimalFormate = getCookie('DecimalFormat')
      // Push the data
      const itemToAdd = searchInfo[0] // Store the item to push to avoid stale closure
      const vat = Number(values.tax_value)

      const unitPriceBeforeDis =
        itemToAdd.cost === 0
          ? Number(itemToAdd.all_unit[0].list_price[0].price).toFixed(decimalFormate)
          : Number(itemToAdd.cost).toFixed(decimalFormate)

      const vatValue = Number(unitPriceBeforeDis) * vat

      const unitPriceBeforeDisIncludeVat = Number(Number(unitPriceBeforeDis) + vatValue).toFixed(decimalFormate)

      const unitPriceBeforeDisCurr = values.currency_id_amount
        ? (unitPriceBeforeDis / Number(values.currency_id_amount)).toFixed(decimalFormate)
        : 0

      push({
        id: itemToAdd.id,
        name: itemToAdd.name,
        description: itemToAdd.description,
        product_id: itemToAdd.product_id,
        variation_id: itemToAdd.variation_id,
        cost: itemToAdd.cost === 0 ? itemToAdd.all_unit[0].list_price[0].price : itemToAdd.cost,
        quantity: 1,
        unit: '',
        initial: false,
        stock: itemToAdd.stock,
        unit_price_before_dis: unitPriceBeforeDis,
        purchase_price: itemToAdd.purchase_price,
        unit_price_before_dis_include_vat: unitPriceBeforeDisIncludeVat,
        list_prices: [],
        all_unit: itemToAdd.all_unit,
        child_price: '',
        unit_price_after_dis: unitPriceBeforeDis,
        unit_price_after_dis_include_vat: unitPriceBeforeDisIncludeVat,
        amount_discount: 0,
        percentage_discount: 0,
        unit_price_after_dis_curr: unitPriceBeforeDisCurr,
        unit_price_before_dis_curr: unitPriceBeforeDisCurr,
        total: unitPriceBeforeDisIncludeVat,
        total_currency: unitPriceBeforeDisCurr,
        mfg_date: '',
        unit_quantity: 1,
        line_sort: values.items.length + 1,
        unit_quantity: '',
        exp_date: ''
      })

      // Clear searchInfo
      setSearchInfo([])
    }

    // Clean up
    return () => {
      setOpen(false)
    }
  }, [searchInfo, setOpen, push, values.tax_value, values.currency_id_amount, values.items])

  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Autocomplete
        id='combo-box-demo'
        options={searchInfo}
        loading={loading}
        getOptionLabel={option => option.name}
        value={searchProduct}
        onChange={(event, newValue) => {
          if (newValue) {
            setSearchProduct(newValue)
            setFieldValue(`search_product`, newValue.name)

            setProductId(newValue.product_id)
            if (searchInfo && Array.isArray(searchInfo)) {
              const matchingOptions = searchInfo.filter(
                item => item.product_id === newValue.product_id && item.variation_id !== 0
              )

              if (matchingOptions.length > 1) {
                setOpen(true)
                matchingOptions.forEach(item => {
                  const vat = Number(values.tax_value)

                  const unitPriceBeforeDis =
                    item.cost === 0
                      ? Number(item.all_unit[0].list_price[0].price).toFixed(decimalFormate)
                      : Number(item.cost).toFixed(decimalFormate)

                  const vatValue = unitPriceBeforeDis * vat

                  const unitPriceBeforeDisIncludeVat = (Number(unitPriceBeforeDis) + vatValue).toFixed(decimalFormate)

                  const unitPriceBeforeDisCurr = values.currency_id_amount
                    ? (unitPriceBeforeDis / Number(values.currency_id_amount)).toFixed(decimalFormate)
                    : 0

                  push({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    product_id: item.product_id,
                    variation_id: item.variation_id,
                    cost: item.cost === 0 ? item.all_unit[0].list_price[0].price : item.cost,
                    quantity: 1,
                    unit: '',
                    initial: false,
                    stock: item.stock,
                    unit_price_before_dis: unitPriceBeforeDis,
                    purchase_price: item.purchase_price,
                    unit_price_before_dis_include_vat: unitPriceBeforeDisIncludeVat,
                    list_prices: [],
                    all_unit: item.all_unit,
                    child_price: '',
                    unit_price_after_dis: unitPriceBeforeDis,
                    unit_price_after_dis_include_vat: unitPriceBeforeDisIncludeVat,
                    amount_discount: 0,
                    percentage_discount: 0,
                    unit_price_after_dis_curr: unitPriceBeforeDisCurr,
                    unit_price_before_dis_curr: unitPriceBeforeDisCurr,
                    total: unitPriceBeforeDisIncludeVat,
                    total_currency: unitPriceBeforeDisCurr,
                    mfg_date: '',
                    unit_quantity: 1,
                    line_sort: values.items.length + 1,
                    unit_quantity: '',
                    exp_date: ''
                  })
                })
              } else {
                setOpen(true)
                const vat = Number(values.tax_value)

                const unitPriceBeforeDis =
                  newValue.cost === 0
                    ? Number(newValue.all_unit[0].list_price[0].price).toFixed(decimalFormate)
                    : Number(newValue.cost).toFixed(decimalFormate)

                const vatValue = unitPriceBeforeDis * vat
                const unitPriceBeforeDisIncludeVat = (Number(unitPriceBeforeDis) + vatValue).toFixed(decimalFormate)

                const unitPriceBeforeDisCurr = values.currency_id_amount
                  ? unitPriceBeforeDis / Number(values.currency_id_amount)
                  : (0).toFixed(decimalFormate)

                push({
                  id: newValue.id,
                  name: newValue.name,
                  description: newValue.description,
                  product_id: newValue.product_id,
                  variation_id: newValue.variation_id,
                  cost: newValue.cost === 0 ? newValue.all_unit[0].list_price[0].price : newValue.cost,
                  quantity: 1,
                  unit: '',
                  initial: false,
                  stock: newValue.stock,
                  unit_price_before_dis: unitPriceBeforeDis,
                  purchase_price: newValue.purchase_price,
                  unit_price_before_dis_include_vat: unitPriceBeforeDisIncludeVat,
                  list_prices: [],
                  all_unit: newValue.all_unit,
                  child_price: '',
                  unit_price_after_dis: unitPriceBeforeDis,
                  unit_price_after_dis_include_vat: unitPriceBeforeDisIncludeVat,
                  amount_discount: 0,
                  percentage_discount: 0,
                  unit_price_after_dis_curr: unitPriceBeforeDisCurr,
                  unit_price_before_dis_curr: unitPriceBeforeDisCurr,
                  total: unitPriceBeforeDisIncludeVat,
                  total_currency: unitPriceBeforeDisCurr,
                  mfg_date: '',
                  unit_quantity: 1,
                  line_sort: values.items.length + 1,
                  unit_quantity: '',
                  exp_date: ''
                })
              }
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

export default SearchPurchase
