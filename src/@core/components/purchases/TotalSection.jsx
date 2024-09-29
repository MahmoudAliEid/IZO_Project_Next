import { useEffect } from 'react'

// ** Material UI Components
import { Grid, Typography, Divider, Box } from '@mui/material'

import { styled } from '@mui/material/styles'

import { getCookie } from 'cookies-next'

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const TotalSection = ({ values, setFieldValue }) => {
  const decimalFormate = getCookie('DecimalFormat')
  const currencyCode = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  useEffect(() => {
    // function to calculate discount
    const calculateDiscountPure = subTotal => {
      return subTotal - Number(values.discount_amount_value)
    }
    const calculateDiscountCurr = subTotal => {
      return subTotal - Number(values.discount_amount_curr)
    }

    const SubTotal = values.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.unit_price_after_dis),
      0
    )
    if (SubTotal !== values.sub_total) {
      setFieldValue('sub_total', SubTotal)
    }

    const SubCurrTotal = values.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.unit_price_after_dis_curr),
      0
    )
    if (SubCurrTotal !== values.sub_total_curr) {
      setFieldValue('sub_total_curr', SubCurrTotal)
    }

    const tax = calculateDiscountPure(SubTotal) * Number(values.tax_value)
    if (tax !== values.tax_final) {
      setFieldValue('tax_final', tax)
    }

    const final_additional_supplier =
      calculateDiscountPure(Number(SubTotal)) + Number(values.additional_supplier_charges) + tax

    if (final_additional_supplier !== values.final_additional_supplier) {
      setFieldValue('final_additional_supplier', final_additional_supplier)
    }

    const final_additional_cost = final_additional_supplier + Number(values.additional_cost_charges)

    const finalTotal = final_additional_cost

    if (final_additional_cost !== values.final_additional_cost) {
      setFieldValue('final_additional_cost', final_additional_cost)
    }

    const finalTotalCurr = finalTotal / Number(values.currency_id_amount)

    const taxCurr = calculateDiscountCurr(Number(finalTotalCurr)) * Number(values.tax_value)
    if (taxCurr !== values.tax_curr) {
      setFieldValue('tax_curr', taxCurr)
    }

    if (finalTotal !== values.final_total) {
      setFieldValue('final_total', finalTotal)
    }

    if (finalTotalCurr !== values.final_total_curr) {
      setFieldValue('final_total_curr', finalTotalCurr)
    }
  }, [
    values.items,
    values.additional_supplier_charges,
    values.final_additional_supplier,
    values.final_additional_cost,
    values.additional_cost_charges,
    values.discount_amount_curr,
    values.discount_amount_value,
    values.tax,
    values.tax_final,
    values.currency_id_amount,
    values.tax_value,
    values.discount_amount,
    values.sub_total,
    values.sub_total_curr,
    setFieldValue,
    values.tax_curr,
    values.final_total,
    values.final_total_curr,
    values.discount_type
  ])

  const subTotalCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? `, ${values.currency_symbol} ${values.sub_total_curr.toFixed(decimalFormate)}`
      : `, ${values.sub_total_curr.toFixed(decimalFormate)} ${values.currency_symbol}`
    : ''

  const taxCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? `, ${values.currency_symbol} ${values.tax_curr.toFixed(decimalFormate)}`
      : `, ${values.tax_curr.toFixed(decimalFormate)} ${values.currency_symbol}`
    : ''

  const finalTotalCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? `, ${values.currency_symbol} ${values.final_total_curr.toFixed(decimalFormate)}`
      : `, ${values.final_total_curr.toFixed(decimalFormate)} ${values.currency_symbol}`
    : ''

  const discountCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? `, ${values.currency_symbol} ${Number(values.discount_amount_curr).toFixed(decimalFormate)}`
      : `, ${Number(values.discount_amount_curr).toFixed(decimalFormate)} ${values.currency_symbol}`
    : ''

  return (
    <Grid item xs={12} sm={4} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
      <CalcWrapper>
        <Typography variant='p' sx={{ color: 'text.secondary' }}>
          Subtotal:
        </Typography>
        <Typography variant='p' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {CurrencySymbolPlacement === 'left'
            ? `${currencyCode} ${values.sub_total.toFixed(decimalFormate)}`
            : `${values.sub_total.toFixed(decimalFormate)} ${currencyCode}`}
          {`${subTotalCurr}`}
        </Typography>
      </CalcWrapper>

      <CalcWrapper>
        <Typography variant='p' sx={{ color: 'text.secondary' }}>
          Discount:
        </Typography>
        <Typography variant='p' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {CurrencySymbolPlacement === 'left'
            ? `${currencyCode} ${Number(values.discount_amount_value).toFixed(decimalFormate)}`
            : `${Number(values.discount_amount_value).toFixed(decimalFormate)} ${currencyCode}`}
          {`${discountCurr}`}
        </Typography>
      </CalcWrapper>

      <CalcWrapper>
        <Typography variant='p' sx={{ color: 'text.secondary' }}>
          Tax:
        </Typography>
        <Typography variant='p' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {CurrencySymbolPlacement === 'left'
            ? `${currencyCode} ${Number(values.tax_final).toFixed(decimalFormate)}`
            : `${Number(values.tax_final).toFixed(decimalFormate)} ${currencyCode}`}
          {`${taxCurr}`}
        </Typography>
      </CalcWrapper>
      {values.additional_supplier_charges > 0 && (
        <CalcWrapper sx={{ mb: theme => `${theme.spacing(4)} !important` }}>
          <Typography variant='p' sx={{ color: 'text.secondary' }}>
            Additional Supplier:
          </Typography>
          <Typography variant='p' sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {CurrencySymbolPlacement === 'left'
              ? `${values.currency_symbol} ${values.final_additional_supplier.toFixed(decimalFormate)}`
              : `${values.final_additional_supplier.toFixed(decimalFormate)} ${values.currency_symbol}`}
          </Typography>
        </CalcWrapper>
      )}

      {values.additional_cost_charges > 0 && (
        <CalcWrapper>
          <Typography variant='p' sx={{ color: 'text.secondary' }}>
            Additional Cost:
          </Typography>
          <Typography variant='p' sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {CurrencySymbolPlacement === 'left'
              ? `${values.currency_symbol} ${values.final_additional_cost.toFixed(decimalFormate)}`
              : `${values.final_additional_cost.toFixed(decimalFormate)} ${values.currency_symbol}`}
          </Typography>
        </CalcWrapper>
      )}

      <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
      <CalcWrapper>
        <Typography variant='p' sx={{ color: 'text.secondary' }}>
          Total:
        </Typography>
        <Typography variant='p' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {CurrencySymbolPlacement === 'left'
            ? `${currencyCode} ${values.final_total.toFixed(decimalFormate)}`
            : `${values.final_total.toFixed(decimalFormate)} ${currencyCode}`}
          {`${finalTotalCurr}`}
        </Typography>
      </CalcWrapper>
    </Grid>
  )
}

export default TotalSection
