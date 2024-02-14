import { Box, Button, CardActions, Divider, CardHeader, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** formik
import { FieldArray, Form } from 'formik'
import TableVariationVariable from 'src/@core/components/products/listProduct/productVariable/TableVariationVariable'

const ProductVariable = ({ initialValues, setFieldValue, handleChange }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
      <Form>
        <FieldArray name='product_variation'>
          {({ push, remove }) => (
            <Box
              sx={{
                padding: '1rem'
              }}
            >
              {initialValues.product_variation.map((product, productIndex) => (
                <Box
                  key={productIndex}
                  sx={{
                    marginTop: '1rem',
                    padding: '1rem',
                    border: '1px solid ',
                    borderRadius: '10px',
                    borderColor: theme => theme.palette.divider
                  }}
                >
                  <CardHeader title={`Product Variation ${productIndex + 1}`} />
                  <Divider
                    sx={{
                      mb: 2
                    }}
                  />
                  <FieldArray name={`product_variation.${productIndex}.variations`}>
                    {({ push: pushVariation, remove }) => (
                      <div>
                        <TableVariationVariable
                          rows={product.variations}
                          handleChange={handleChange}
                          values={initialValues}
                          productIndex={productIndex}
                          product_variation={initialValues.product_variation}
                          pushVariation={pushVariation}
                          remove={remove}
                          setFieldValue={setFieldValue}
                        />
                        <CardActions
                          sx={{
                            flexDirection: ['column', 'row', 'row'],
                            justifyContent: 'center'
                          }}
                        >
                          <Button
                            type='button'
                            variant='contained'
                            color='primary'
                            sx={{
                              my: isMobile ? 1 : 2,
                              px: isMobile ? 1 : 2,
                              fontSize: isMobile ? '0.8rem' : 'inherit'
                            }}
                            onClick={() => {
                              pushVariation({
                                sub_sku: '',
                                type: '',
                                variation_value_id: '',
                                value: '',
                                default_purchase_price: 0,
                                dpp_inc_tax: 0,
                                profit_percent: 0,
                                default_sell_price: 0,
                                sell_price_inc_tax: 0,
                                image: []
                              })
                            }}
                          >
                            Add Variation
                          </Button>
                          <Button
                            type='button'
                            variant='outlined'
                            color='error'
                            sx={{
                              my: isMobile ? 1 : 2,
                              px: isMobile ? 1 : 2,
                              fontSize: isMobile ? '0.8rem' : 'inherit'
                            }}
                            onClick={() => remove(initialValues.product_variation[productIndex].variations.length - 1)}
                          >
                            Remove Variation
                          </Button>
                        </CardActions>
                      </div>
                    )}
                  </FieldArray>
                </Box>
              ))}
              <CardActions sx={{ justifyContent: 'center', flexDirection: ['column', 'row', 'row'] }}>
                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  sx={{
                    my: isMobile ? 1 : 2,
                    px: isMobile ? 1 : 2,
                    fontSize: isMobile ? '0.8rem' : 'inherit'
                  }}
                  onClick={() =>
                    push({
                      id: initialValues.product_variation.length + 1,
                      variation_template_id: '',
                      type: '',
                      variations: [
                        {
                          sub_sku: '',
                          type: '',
                          variation_value_id: '',
                          value: '',
                          default_purchase_price: 0,
                          dpp_inc_tax: 0,
                          profit_percent: 0,
                          default_sell_price: 0,
                          sell_price_inc_tax: 0,
                          image: []
                        }
                      ]
                    })
                  }
                >
                  Add Product Variation
                </Button>
                <Button
                  type='button'
                  variant='outlined'
                  color='error'
                  sx={{
                    my: isMobile ? 1 : 2,
                    px: isMobile ? 1 : 2,
                    fontSize: isMobile ? '0.8rem' : 'inherit'
                  }}
                  onClick={() => remove(initialValues.product_variation.length - 1)}
                >
                  Remove Product Variation
                </Button>
              </CardActions>
            </Box>
          )}
        </FieldArray>
      </Form>
    </Box>
  )
}

export default ProductVariable
