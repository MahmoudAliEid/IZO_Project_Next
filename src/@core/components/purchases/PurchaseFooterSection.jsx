// ** Custom Components
import TotalSection from './TotalSection'

// ** Mui
import {
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
  Divider
} from '@mui/material'
// ** Icons
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'

// ** Cookies
import { getCookie } from 'cookies-next'

const PurchaseFooterSection = ({
  values,
  handleBlur,
  handleChange,
  setFieldValue,
  touched,
  data,
  errors,
  setAddExpense
}) => {
  // ** Cookies
  const decimalFormate = getCookie('DecimalFormat')

  // ** Functions
  const handleDiscountType = (discountType, discountAmount) => {
    const discount_type = discountType

    if (values.currency_id) {
      if (discount_type === 'percentage') {
        const disAmount = (Number(values.sub_total_curr) * Number(discountAmount)) / 100
        const currencyAmount = Number(values.currency_id_amount)

        setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))
        setFieldValue('discount_amount_value', (disAmount * currencyAmount).toFixed(decimalFormate))
      } else if (discount_type === 'fixed_after_vat') {
        const disAmount = (100 * Number(discountAmount)) / (100 + Number(values.tax)) // 100 * 10 / 100 + 5 = 9.52

        setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))

        setFieldValue(`discount_amount_value`, (disAmount * values.currency_id_amount).toFixed(decimalFormate))
      } else if (discount_type === 'fixed_before_vat') {
        setFieldValue('discount_amount_curr', Number(discountAmount).toFixed(decimalFormate))
        setFieldValue(`discount_amount_value`, (discountAmount * values.currency_id_amount).toFixed(decimalFormate))
      }
    } else {
      if (discount_type === 'percentage') {
        const disAmount = (Number(values.sub_total) * Number(discountAmount)) / 100

        setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
      } else if (discount_type === 'fixed_after_vat') {
        const disAmount = (100 * Number(discountAmount)) / (100 + Number(values.tax))
        // 100 * 10/ 100+5 = 1000/105 = 9.52

        setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
      } else if (discount_type === 'fixed_before_vat') {
        setFieldValue('discount_amount_value', Number(discountAmount).toFixed(decimalFormate))
      }
    }
  }

  const handleTaxClick = amount => {
    const taxValue = Number(amount) / 100
    setFieldValue('tax_value', Number(taxValue))
    setFieldValue('tax', Number(amount))

    if (values.discount_type === 'fixed_after_vat') {
      const { currency_id, currency_id_amount } = values
      const discountAmount = Number(values.discount_amount)
      const disAmount = (100 * Number(discountAmount)) / (100 + Number(values.tax))

      if (currency_id) {
        setFieldValue('discount_amount_curr', disAmount.toFixed(decimalFormate))
        setFieldValue(`discount_amount_value`, (disAmount * currency_id_amount).toFixed(decimalFormate))
      } else {
        setFieldValue('discount_amount_value', disAmount.toFixed(decimalFormate))
      }
    }

    // map over items and add tax value for input contain tax
    values.items.forEach((item, index) => {
      const taxValueBeforeDis = Number(item.unit_price_before_dis) * Number(taxValue)
      const taxValueAfterDis = Number(item.unit_price_after_dis) * Number(taxValue)
      const unitPriceAfterDisInCludeVat = (Number(item.unit_price_after_dis) + taxValueAfterDis).toFixed(decimalFormate)

      setFieldValue(
        `items.${index}.unit_price_before_dis_include_vat`,
        (Number(item.unit_price_before_dis) + taxValueBeforeDis).toFixed(decimalFormate)
      )
      setFieldValue(`items.${index}.unit_price_after_dis_include_vat`, unitPriceAfterDisInCludeVat)
      setFieldValue(
        `items.${index}.total`,
        (Number(item.quantity) * unitPriceAfterDisInCludeVat).toFixed(decimalFormate)
      )
    })
  }

  return (
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} sx={{ order: { sm: 1, xs: 2 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='discount_type'>Discount Type</InputLabel>
                <Select
                  id='discount_type'
                  name='discount_type'
                  label='Discount Type'
                  value={values.discount_type}
                  onChange={event => {
                    handleChange(event)
                    const discount_type = event.target.value
                    handleDiscountType(discount_type, Number(values.discount_amount))
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.discount_type && errors.discount_type)}
                  fullWidth
                >
                  {data &&
                    data.discount.length > 0 &&
                    data.discount.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
                {errors.discount && touched.discount && (
                  <FormHelperText error>{String(errors.discount)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <FormControl fullWidth>
                <TextField
                  name='discount_amount'
                  label='Discount Amount'
                  disabled={values.discount_type === '' || values.discount_type === null}
                  value={values.discount_amount}
                  onChange={event => {
                    handleChange(event)
                    const discount_type = values.discount_type
                    const discountAmount = Number(event.target.value)
                    handleDiscountType(discount_type, discountAmount)
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.discount_amount && errors.discount_amount)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='tax_amount'>Tax Amount</InputLabel>
                <Select
                  id='tax_amount'
                  name='tax_amount'
                  label='Tax Amount'
                  value={values.tax_amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.tax_amount && errors.tax_amount)}
                  fullWidth
                >
                  <MenuItem
                    value={0}
                    onClick={() => {
                      handleTaxClick(0)
                    }}
                  >
                    <em>Please Select</em>
                  </MenuItem>
                  {data &&
                    data.taxes.length > 0 &&
                    data.taxes.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.id}
                        onClick={() => {
                          handleTaxClick(Number(item.amount))
                        }}
                      >
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
                {errors.tax_amount && touched.tax_amount && (
                  <FormHelperText error>{String(errors.tax_amount)}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <FormControl fullWidth>
                <TextField
                  label='Shipping Details'
                  name='shipping_details'
                  value={values.shipping_details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={values.currency_id ? 4.5 : 9}
                    md={values.currency_id ? 5 : 10}
                    lg={values.currency_id ? 5 : 10}
                  >
                    <FormControl fullWidth>
                      <TextField
                        id='additional_supplier_charges'
                        name='additional_supplier_charges'
                        label='Additional Supplier charges'
                        value={values.additional_supplier_charges}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        error={Boolean(touched.additional_supplier_charges && errors.additional_supplier_charges)}
                      />
                    </FormControl>
                  </Grid>
                  {values.currency_id && (
                    <Grid item xs={4.5} md={5} lg={5}>
                      <FormControl fullWidth>
                        <TextField
                          id='additional_supplier_charges_curr'
                          name='additional_supplier_charges_curr'
                          label={`Additional Supplier charges ${values.currency_symbol}`}
                          value={values.additional_supplier_charges_curr}
                          disabled
                        />
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={3} md={2} lg={2}>
                    <Button
                      onClick={() => {
                        setAddExpense(true)
                      }}
                      sx={{ textAlign: 'center', height: '100%', width: '100%' }}
                      color='primary'
                      variant='contained'
                    >
                      <AddCircleOutline />
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={values.currency_id ? 4.5 : 9}
                    md={values.currency_id ? 5 : 10}
                    lg={values.currency_id ? 5 : 10}
                  >
                    <FormControl fullWidth>
                      <TextField
                        id='additional-cost-charges'
                        label='Additional Cost charges'
                        name='additional_cost_charges'
                        value={values.additional_cost_charges}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        error={Boolean(touched.additional_cost_charges && errors.additional_cost_charges)}
                      />
                    </FormControl>
                  </Grid>
                  {values.currency_id && (
                    <Grid item xs={4.5} md={5} lg={5}>
                      <FormControl fullWidth>
                        <TextField
                          id='additional-cost-charges'
                          label={`Additional Cost charges ${values.currency_symbol}`}
                          name='additional_cost_charges_curr'
                          value={Number(values.additional_cost_charges_curr)}
                          disabled
                        />
                      </FormControl>
                    </Grid>
                  )}
                  <Grid item xs={3} md={2} lg={2}>
                    <Button
                      onClick={() => {
                        setAddExpense(true)
                      }}
                      sx={{ textAlign: 'center', height: '100%', width: '100%' }}
                      color='primary'
                      variant='contained'
                    >
                      <AddCircleOutline />
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <TotalSection values={values} setFieldValue={setFieldValue} />
      </Grid>
      <Divider
        sx={{
          mt: theme => `${theme.spacing(10)} !important`,
          mb: theme => `${theme.spacing(1)} !important`
        }}
      />
      <CardContent>
        <InputLabel
          htmlFor='invoice-note'
          sx={{
            mb: 2,
            fontSize: '.75rem',
            fontWeight: 600,
            color: 'text.primary',
            textTransform: 'uppercase'
          }}
        >
          Note:
        </InputLabel>
        <TextField
          rows={2}
          fullWidth
          multiline
          name='additional_notes'
          value={values.additional_notes}
          onChange={handleChange}
          id='invoice-note'
          placeholder='Thank You!'
        />
      </CardContent>
    </CardContent>
  )
}

export default PurchaseFooterSection
