import { useEffect, useMemo, useCallback } from 'react'

// ** Material UI Components
import { Grid, Typography, Box, Table, TableBody, TableCell, TableRow } from '@mui/material'

import { styled } from '@mui/material/styles'

import { getCookie } from 'cookies-next'

const StyledTableCell = styled(TableCell)(({ theme, border }) => ({
  borderBottom: 'none',
  borderTop: border ? `1px solid ${theme.palette.divider}` : 'none'
}))

const TotalSection = ({ values, setFieldValue }) => {
  const decimalFormate = getCookie('DecimalFormat')
  const currencyCode = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  // Memoize expensive calculations
  const SubTotal = useMemo(() => {
    return values.items.reduce((acc, item) => acc + Number(item.quantity) * Number(item.unit_price_after_dis), 0)
  }, [values.items])

  const SubCurrTotal = useMemo(() => {
    return values.items.reduce((acc, item) => acc + Number(item.quantity) * Number(item.unit_price_after_dis_curr), 0)
  }, [values.items])

  const calculateDiscountPure = useCallback(
    subTotal => subTotal - Number(values.discount_amount_value),
    [values.discount_amount_value]
  )

  const calculateDiscountCurr = useCallback(
    subTotal => subTotal - Number(values.discount_amount_curr),
    [values.discount_amount_curr]
  )

  const updateFinalDiscount = useCallback(() => {
    const discountAmount = Number(values.discount_amount)
    const discount_type = values.discount_type
    if (values.currency_id) {
      const currencyAmount = Number(values.currency_id_amount)
      if (discount_type === 'percentage') {
        const disAmount = (Number(values.sub_total_curr) * discountAmount) / 100
        setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))
        setFieldValue('discount_amount_value', (disAmount * currencyAmount).toFixed(decimalFormate))
      } else if (discount_type === 'fixed_after_vat') {
        const disAmount = (100 * discountAmount) / (100 + Number(values.tax))
        setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))
        setFieldValue('discount_amount_value', (disAmount * currencyAmount).toFixed(decimalFormate))
      } else if (discount_type === 'fixed_before_vat') {
        setFieldValue('discount_amount_curr', discountAmount.toFixed(decimalFormate))
        setFieldValue('discount_amount_value', (discountAmount * currencyAmount).toFixed(decimalFormate))
      }
    } else {
      if (discount_type === 'percentage') {
        const disAmount = (Number(values.sub_total) * discountAmount) / 100
        setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
      } else if (discount_type === 'fixed_after_vat') {
        const disAmount = (100 * discountAmount) / (100 + Number(values.tax))
        setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
      } else if (discount_type === 'fixed_before_vat') {
        setFieldValue('discount_amount_value', discountAmount.toFixed(decimalFormate))
      }
    }
  }, [
    values.discount_type,
    values.currency_id,
    values.sub_total,
    values.sub_total_curr,
    values.discount_amount,
    values.tax,
    values.currency_id_amount,
    decimalFormate,
    setFieldValue
  ])

  // Single optimized useEffect

  useEffect(() => {
    updateFinalDiscount()

    if (SubTotal !== values.sub_total) {
      setFieldValue('sub_total', SubTotal)
    }

    if (SubCurrTotal !== values.sub_total_curr) {
      setFieldValue('sub_total_curr', SubCurrTotal)
    }

    const tax = calculateDiscountPure(SubTotal) * Number(values.tax_value)
    if (tax !== values.tax_final) {
      setFieldValue('tax_final', tax)
    }

    const final_additional_supplier = calculateDiscountPure(SubTotal) + Number(values.additional_supplier_charges) + tax
    if (final_additional_supplier !== values.final_additional_supplier) {
      setFieldValue('final_additional_supplier', final_additional_supplier)
    }

    const final_additional_cost = final_additional_supplier + Number(values.additional_cost_charges)
    if (final_additional_cost !== values.final_additional_cost) {
      setFieldValue('final_additional_cost', final_additional_cost)
    }

    const finalTotalCurr = values.currency_id_amount ? final_additional_cost / Number(values.currency_id_amount) : 0
    const taxCurr = calculateDiscountCurr(SubCurrTotal) * Number(values.tax_value)
    if (taxCurr !== values.tax_curr) {
      setFieldValue('tax_curr', taxCurr)
    }

    if (final_additional_cost !== values.final_total) {
      setFieldValue('final_total', final_additional_cost)
    }

    if (finalTotalCurr !== values.final_total_curr) {
      setFieldValue('final_total_curr', finalTotalCurr)
    }
  }, [
    SubTotal,
    SubCurrTotal,
    updateFinalDiscount,
    values.sub_total,
    values.sub_total_curr,
    values.tax_final,
    calculateDiscountPure,
    calculateDiscountCurr,
    values.additional_supplier_charges,
    values.final_additional_supplier,
    values.final_additional_cost,
    values.additional_cost_charges,
    values.tax_value,
    values.currency_id_amount,
    decimalFormate,
    setFieldValue,
    values.tax_curr,
    values.final_total,
    values.final_total_curr
  ])
  // ** and currency of additional cost || supplier charges
  useEffect(() => {
    const updateField = (fieldName, total) => {
      // Parse string back to number if needed
      setFieldValue(fieldName, Number(total).toFixed(decimalFormate))
    }

    updateField(
      'additional_supplier_charges_curr',
      values.currency_id ? Number(values.additional_supplier_charges) / Number(values.currency_id_amount) : 0
    )

    updateField(
      'additional_cost_charges_curr',
      values.currency_id ? Number(values.additional_cost_charges) / Number(values.currency_id_amount) : 0
    )
  }, [
    values.additional_cost_charges,
    setFieldValue,
    decimalFormate,
    values.currency_id_amount,
    values.currency_id,
    values.additional_supplier_charges
  ])

  const subTotalCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? ` ${values.currency_symbol} ${values.sub_total_curr.toFixed(decimalFormate)}`
      : ` ${values.sub_total_curr.toFixed(decimalFormate)} ${values.currency_symbol}`
    : null

  const taxCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? ` ${values.currency_symbol} ${values.tax_curr.toFixed(decimalFormate)}`
      : ` ${values.tax_curr.toFixed(decimalFormate)} ${values.currency_symbol}`
    : null

  const finalTotalCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? ` ${values.currency_symbol} ${values.final_total_curr.toFixed(decimalFormate)}`
      : ` ${values.final_total_curr.toFixed(decimalFormate)} ${values.currency_symbol}`
    : null

  const discountCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? ` ${values.currency_symbol} ${Number(values.discount_amount_curr).toFixed(decimalFormate)}`
      : ` ${Number(values.discount_amount_curr).toFixed(decimalFormate)} ${values.currency_symbol}`
    : null
  const additionalSupplierCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? ` ${values.currency_symbol} ${Number(
          Number(values.values.final_additional_supplier) / Number(values.currency_id_amount)
        ).toFixed(decimalFormate)}`
      : ` ${Number(Number(values.final_additional_supplier) / Number(values.currency_id_amount)).toFixed(
          decimalFormate
        )} ${values.currency_symbol}`
    : null
  const additionalCostCurr = values.currency_id
    ? CurrencySymbolPlacement === 'left'
      ? ` ${values.currency_symbol} ${Number(
          Number(values.final_additional_cost) / Number(values.currency_id_amount)
        ).toFixed(decimalFormate)}`
      : ` ${Number(Number(values.final_additional_cost) / Number(values.currency_id_amount)).toFixed(decimalFormate)} ${
          values.currency_symbol
        }`
    : null

  return (
    <Grid item xs={12} sm={6} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Table>
          <TableBody>
            {/* Subtotal */}
            <TableRow>
              <StyledTableCell>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Subtotal:
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {CurrencySymbolPlacement === 'left'
                    ? `${currencyCode} ${values.sub_total.toFixed(decimalFormate)}`
                    : `${values.sub_total.toFixed(decimalFormate)} ${currencyCode}`}
                </Typography>
              </StyledTableCell>
              {subTotalCurr && (
                <StyledTableCell align='center'>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {`${subTotalCurr}`}
                  </Typography>
                </StyledTableCell>
              )}
            </TableRow>

            {/* Discount */}
            <TableRow>
              <StyledTableCell>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Discount:
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {CurrencySymbolPlacement === 'left'
                    ? `${currencyCode} ${Number(values.discount_amount_value).toFixed(decimalFormate)}`
                    : `${Number(values.discount_amount_value).toFixed(decimalFormate)} ${currencyCode}`}
                </Typography>
              </StyledTableCell>
              {discountCurr && (
                <StyledTableCell align='center'>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {`${discountCurr}`}
                  </Typography>
                </StyledTableCell>
              )}
            </TableRow>

            {/* Tax */}
            <TableRow>
              <StyledTableCell>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Tax:
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {CurrencySymbolPlacement === 'left'
                    ? `${currencyCode} ${Number(values.tax_final).toFixed(decimalFormate)}`
                    : `${Number(values.tax_final).toFixed(decimalFormate)} ${currencyCode}`}
                </Typography>
              </StyledTableCell>
              {taxCurr && (
                <StyledTableCell align='center'>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {`${taxCurr}`}
                  </Typography>
                </StyledTableCell>
              )}
            </TableRow>

            {/* Additional Supplier */}
            {values.additional_supplier_charges > 0 && (
              <TableRow>
                <StyledTableCell>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    Additional Supplier:
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {CurrencySymbolPlacement === 'left'
                      ? `${currencyCode} ${Number(values.final_additional_supplier).toFixed(decimalFormate)}`
                      : `${Number(values.final_additional_supplier).toFixed(decimalFormate)} ${currencyCode}`}
                  </Typography>
                </StyledTableCell>
                {additionalSupplierCurr && (
                  <StyledTableCell align='center'>
                    <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {`${additionalSupplierCurr}`}
                    </Typography>
                  </StyledTableCell>
                )}
              </TableRow>
            )}

            {/* Additional Cost */}
            {values.additional_cost_charges > 0 && (
              <TableRow>
                <StyledTableCell>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    Additional Cost:
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {CurrencySymbolPlacement === 'left'
                      ? `${currencyCode} ${Number(values.final_additional_cost).toFixed(decimalFormate)}`
                      : `${Number(values.final_additional_cost).toFixed(decimalFormate)} ${currencyCode}`}
                  </Typography>
                </StyledTableCell>
                {additionalCostCurr && (
                  <StyledTableCell align='center'>
                    <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {`${additionalCostCurr}`}
                    </Typography>
                  </StyledTableCell>
                )}
              </TableRow>
            )}

            {/* Total */}
            <TableRow>
              <StyledTableCell border>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Total:
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='center' border>
                <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {CurrencySymbolPlacement === 'left'
                    ? `${currencyCode} ${values.final_total.toFixed(decimalFormate)}`
                    : `${values.final_total.toFixed(decimalFormate)} ${currencyCode}`}
                </Typography>
              </StyledTableCell>
              {finalTotalCurr && (
                <StyledTableCell align='center' border>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {`${finalTotalCurr}`}
                  </Typography>
                </StyledTableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Grid>
  )
}

export default TotalSection
