import React from 'react'

// ** Mui Components
import {
  CardContent,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  InputLabel
} from '@mui/material'

// ** Custom Components
import SearchSupplier from './SearchSupplier'
// ** cookies
import { getCookie } from 'cookies-next'

const RenderBusinessInfo = ({ values }) => {
  return (
    <Grid item xs={12} sm={12}>
      {values.business_info !== null && values.business_info !== undefined ? (
        <div>
          {values.business_info.businessName ? (
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{values.business_info.businessName}</Typography>
          ) : null}
          {values.business_info.contactNumber ? (
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{values.business_info.contactNumber}</Typography>
          ) : null}
          {values.business_info.mobile ? (
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{values.business_info.mobile}</Typography>
          ) : null}
          {values.business_info.tax_number ? (
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{values.business_info.tax_number}</Typography>
          ) : null}
          {values.business_info.email ? (
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{values.business_info.email}</Typography>
          ) : null}
        </div>
      ) : null}
    </Grid>
  )
}

const PurchaseThirdSection = ({
  setFieldValue,
  handleBlur,
  handleChange,
  searchSupplier,
  setSearchSupplier,
  errors,
  values,
  touched,
  data
}) => {
  const userName = getCookie('userName')

  const handleGlobalPriceChange = (event, setFieldValue, values) => {
    const price_id = event.target.value

    // set price value based on price_id in all items row if it's unit is null
    values.items.forEach((item, index) => {
      if (item.unit !== '' && item.list_prices.length > 0 && item.child_price === '') {
        const price = item.list_prices.find(price => price.line_id === price_id)

        if (price) {
          const priceValue = Number(price.price)
          const discountAmount = Number(item.amount_discount)
          const tax = Number(values.tax_value)
          const unitPriceAfterDis = Number(priceValue) - Number(discountAmount)
          const vatValueBefore = Number(priceValue) * Number(tax)
          const vatValueAfter = Number(unitPriceAfterDis) * Number(tax)
          const unitPriceAfterDisInCludeVat = Number(unitPriceAfterDis) + Number(vatValueAfter)
          const unitPriceBeforeDisInCludeVat = Number(priceValue) + Number(vatValueBefore)
          const unitPriceBeforeDisCurr = Number(priceValue) / Number(values.currency_id_amount)
          const unitPriceAfterDisCurr = Number(unitPriceBeforeDisCurr) - Number(discountAmount)

          setFieldValue(`items.${index}.unit_price_before_dis`, priceValue.toFixed(decimalFormate))
          setFieldValue(`items.${index}.unit_price_after_dis`, unitPriceAfterDis.toFixed(decimalFormate))
          setFieldValue(
            `items.${index}.unit_price_before_dis_include_vat`,
            unitPriceBeforeDisInCludeVat.toFixed(decimalFormate)
          )
          setFieldValue(
            `items.${index}.unit_price_after_dis_include_vat`,
            unitPriceAfterDisInCludeVat.toFixed(decimalFormate)
          )
          setFieldValue(`items.${index}.unit_price_before_dis_curr`, unitPriceBeforeDisCurr.toFixed(decimalFormate))
          setFieldValue(`items.${index}.unit_price_after_dis_curr`, unitPriceAfterDisCurr.toFixed(decimalFormate))
          setFieldValue(
            `items.${index}.total`,
            (Number(item.quantity) * unitPriceAfterDisInCludeVat).toFixed(decimalFormate)
          )
          setFieldValue(
            `items.${index}.total_currency`,
            (Number(item.quantity) * unitPriceAfterDisCurr).toFixed(decimalFormate)
          )
        } else if (price === null) {
          setFieldValue(`items.${index}.unit_price_before_dis`, 0)
          setFieldValue(`items.${index}.unit_price_after_dis`, 0)
          setFieldValue(`items.${index}.unit_price_before_dis_include_vat`, 0)
          setFieldValue(`items.${index}.unit_price_after_dis_include_vat`, 0)
          setFieldValue(`items.${index}.unit_price_before_dis_curr`, 0)
          setFieldValue(`items.${index}.unit_price_after_dis_curr`, 0)
          setFieldValue(`items.${index}.total`, 0)
          setFieldValue(`items.${index}.total_currency`, 0)
        } else {
          return
        }
      }
    })
  }

  const setFields = (fields, setFieldValue) => {
    Object.entries(fields).forEach(([key, value]) => {
      setFieldValue(key, value)
    })
  }

  const handleClickCurrency = (item, values, setFieldValue) => {
    if (!item) {
      setFieldValue('currency_id_amount', '')
      setFieldValue('currency_symbol', '')
    }
    setFieldValue('currency_symbol', item.symbol)
    setFieldValue('currency_id_amount', item.amount)

    // Iterate over each row in values.items and calculate new values
    values.items.forEach((row, rowIndex) => {
      const unitPriceBeforeDis = Number(row.unit_price_before_dis) || 0

      const discountPercentage = Number(row.percentage_discount) || 0
      const itemAmount = Number(item.amount) || 1 // Default to 1 to avoid division by 0

      // Perform calculations
      const unitPriceBeforeDisCurr = unitPriceBeforeDis / itemAmount

      const discountAmount = (discountPercentage * unitPriceBeforeDisCurr) / 100

      const unitPriceAfterDisCurr = unitPriceBeforeDisCurr - discountAmount
      const totalCurrency = Number(row.quantity) * unitPriceAfterDisCurr

      const unitPriceAfterDis = unitPriceAfterDisCurr * itemAmount
      const unitPriceAfterDisIncludeVat = unitPriceAfterDis + unitPriceAfterDis * Number(values.tax_value)
      const total = Number(row.quantity) * unitPriceAfterDisIncludeVat

      const fields = {
        [`items.${rowIndex}.unit_price_before_dis_curr`]: unitPriceBeforeDisCurr.toFixed(decimalFormate),
        [`items.${rowIndex}.amount_discount`]: discountAmount.toFixed(decimalFormate),
        [`items.${rowIndex}.unit_price_after_dis_curr`]: unitPriceAfterDisCurr.toFixed(decimalFormate),
        [`items.${rowIndex}.total_currency`]: totalCurrency.toFixed(decimalFormate),
        [`items.${rowIndex}.unit_price_after_dis`]: unitPriceAfterDis.toFixed(decimalFormate),
        [`items.${rowIndex}.unit_price_after_dis_include_vat`]: unitPriceAfterDisIncludeVat.toFixed(decimalFormate),
        [`items.${rowIndex}.total`]: total.toFixed(decimalFormate)
      }

      setFields(fields, setFieldValue)
    })
  }

  const handleClickEmptyCurrency = (values, setFieldValue) => {
    setFieldValue('currency_id_amount', '')
    setFieldValue('currency_symbol', '')

    values.items.forEach((row, rowIndex) => {
      const unitPriceBeforeDis = Number(row.unit_price_before_dis) || 0 // Default to 0 if not valid

      const discountPercentage = Number(row.percentage_discount) || 0 // Default to 0 if not valid
      const quantity = Number(row.quantity) || 0 // Default to 0 if not valid
      const taxValue = Number(values.tax_value) || 0 // Default to 0 if not valid

      // Calculations
      const amountDiscount = (discountPercentage * unitPriceBeforeDis) / 100
      const unitPriceAfterDis = unitPriceBeforeDis - amountDiscount
      const unitPriceAfterDisIncludeVat = unitPriceAfterDis + unitPriceAfterDis * taxValue
      const total = quantity * unitPriceAfterDisIncludeVat

      // Batch update form values for the current row

      const fields = {
        [`items.${rowIndex}.unit_price_after_dis`]: unitPriceAfterDis.toFixed(decimalFormate),
        [`items.${rowIndex}.amount_discount`]: amountDiscount.toFixed(decimalFormate),
        [`items.${rowIndex}.total`]: total.toFixed(decimalFormate),
        [`items.${rowIndex}.unit_price_after_dis_include_vat`]: unitPriceAfterDisIncludeVat.toFixed(decimalFormate)
      }

      setFields(fields, setFieldValue)
    })
  }

  return (
    <CardContent>
      <Grid container sx={{ px: { sm: 4, xs: 0 } }} spacing={3}>
        <Grid item xs={12} md={6} sm={12} sx={{ mb: { lg: 0, xs: 6 } }}>
          <Typography sx={{ mb: 4, fontWeight: 500 }}>Purchase From:</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <SearchSupplier
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  searchSupplier={searchSupplier}
                  setSearchSupplier={setSearchSupplier}
                />
                {errors.contact_id && touched.contact_id && (
                  <FormHelperText error>{String(errors.contact_id)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <RenderBusinessInfo values={values} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ mb: { lg: 0, xs: 6 } }}>
          <Typography sx={{ mb: 6, fontWeight: 500 }}>Salesman: {userName}</Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='Warehouse'>Warehouse</InputLabel>
                <Select
                  id='Warehouse'
                  name='store_id'
                  label='Warehouse'
                  value={values.store_id}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.store_id && touched.store_id}
                  fullWidth
                >
                  {data &&
                    data.stores.length > 0 &&
                    data.stores.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
                {errors.store_id && touched.store_id && (
                  <FormHelperText error>{String(errors.store_id)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='purchase_status'>Purchase Status</InputLabel>
                <Select
                  id='purchase_status'
                  name='status'
                  label='Purchase Status'
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.status && errors.status)}
                  required
                  fullWidth
                >
                  <MenuItem value=''>
                    <em>Please Select</em>
                  </MenuItem>
                  {data &&
                    data.status.length > 0 &&
                    data.status.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
                {errors.status && touched.status && <FormHelperText error>{String(errors.status)}</FormHelperText>}
              </FormControl>
            </Grid>
            {/* prices */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='parent_price'>Prices</InputLabel>
                <Select
                  id='parent_price'
                  name='parent_price'
                  label='Prices'
                  disabled={values.items.length === 0}
                  value={values.parent_price}
                  onChange={event => {
                    handleChange(event)
                    handleGlobalPriceChange(event, setFieldValue, values)
                  }}
                  onBlur={handleBlur}
                  error={errors.parent_price && touched.parent_price}
                  fullWidth
                >
                  {data && data?.prices?.length > 0
                    ? data?.prices.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.value}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {errors.store && touched.store && <FormHelperText error>{String(errors.store)}</FormHelperText>}
              </FormControl>
              {values.items.length === 0 ? (
                <FormHelperText error sx={{ ml: 2 }}>
                  <Typography color={'error'} variant='caption'>
                    Please add Rows to Table to show Prices
                  </Typography>
                </FormHelperText>
              ) : null}
            </Grid>
            {/* project_no */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <TextField
                  name='project_no'
                  label='Project No'
                  value={values.project_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.project_no && errors.project_no)}
                />
              </FormControl>
            </Grid>

            {/* currency */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='currency_id'>Currency</InputLabel>
                <Select
                  id='currency_id'
                  name='currency_id'
                  label='Currency'
                  value={values.currency_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={values.items.length === 0}
                  error={Boolean(touched.currency_id && errors.currency_id)}
                  fullWidth
                >
                  <MenuItem
                    value=''
                    onClick={() => {
                      handleClickEmptyCurrency(values, setFieldValue)
                    }}
                  >
                    <em>Please Select</em>
                  </MenuItem>
                  {data &&
                    data.currencies.length > 0 &&
                    data.currencies.map(item => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        onClick={() => {
                          handleClickCurrency(item, values, setFieldValue)
                        }}
                      >
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
                {values.items.length === 0 ? (
                  <FormHelperText error sx={{ ml: 2 }}>
                    <Typography color={'error'} variant='caption'>
                      Please add Rows to Table to show Currency
                    </Typography>
                  </FormHelperText>
                ) : null}
                {errors.currency_id && touched.currency_id && (
                  <FormHelperText error>{String(errors.currency_id)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <TextField
                  name='currency_id_amount'
                  label='Currency Amount'
                  value={values.currency_id_amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                  error={Boolean(touched.currency_id_amount && errors.currency_id_amount)}
                />
              </FormControl>
            </Grid>
            {/* Receipt Reference */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <TextField
                  name='sup_refe'
                  label='Receipt Reference'
                  value={values.sup_refe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.sup_refe && errors.sup_refe)}
                />
              </FormControl>
            </Grid>
            {/* cost center */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='cost_center'>Cost Center</InputLabel>
                <Select
                  id='cost_center'
                  name='cost_center_id'
                  label='Cost Center'
                  value={values.cost_center_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.cost_center_id && errors.cost_center_id)}
                  fullWidth
                >
                  <MenuItem value=''>
                    <em>Please Select</em>
                  </MenuItem>
                  {data &&
                    data.cost_center.length > 0 &&
                    data.cost_center.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
                {errors.cost_center_id && touched.cost_center_id && (
                  <FormHelperText error>{String(errors.cost_center_id)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default PurchaseThirdSection
