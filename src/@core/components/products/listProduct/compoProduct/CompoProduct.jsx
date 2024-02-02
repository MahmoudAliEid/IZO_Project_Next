import { Box, Divider, CardHeader, FormControl, Chip, Grid } from '@mui/material'

// ** formik
import { FieldArray, Form } from 'formik'
import CompoTable from './CompoTable'
import CustomInputField from '../productVariable/components/CustomInputField'

const CompoProduct = ({ initialValues, setFieldValue, handleChange }) => {
  return (
    <Box>
      <Form>
        <FieldArray name='product_compo'>
          {() => (
            <Box
              sx={{
                padding: '1rem'
              }}
            >
              {initialValues.product_compo.map((product, productIndex) => (
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
                  <CardHeader title={`Product Compositions`} />
                  <Divider
                    sx={{
                      mb: 2
                    }}
                  />
                  <FieldArray name={`product_compo.${productIndex}.rows`}>
                    {({ push, remove }) => (
                      <div>
                        <CompoTable
                          rows={product.rows}
                          handleChange={handleChange}
                          values={initialValues}
                          productIndex={productIndex}
                          push={push}
                          remove={remove}
                          setFieldValue={setFieldValue}
                        />
                        <Divider
                          sx={{
                            mb: 2
                          }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={12} sm={12}>
                            <FormControl fullWidth>
                              <Divider variant='middle' sx={{ mb: 2 }}>
                                <Chip label='Profit Margin' />
                              </Divider>
                              <CustomInputField
                                label={'Margin %'}
                                name={`product_compo.${productIndex}.profit_percent`}
                                value={product.profit_percent}
                                onChange={handleChange}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} md={12} sm={12}>
                            <FormControl fullWidth>
                              <Divider variant='middle' sx={{ mb: 2 }}>
                                <Chip label='Default Selling Price' />
                              </Divider>
                              <CustomInputField
                                label={'Default Sale Price'}
                                name={`product_compo.${productIndex}.selling_price_inc_tax`}
                                value={product.selling_price_inc_tax}
                                onChange={handleChange}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                        {/* <CardActions>
                          <Button
                            type='button'
                            variant='contained'
                            color='primary'
                            sx={{ my: 2, px: 2, mr: 2 }}
                            onClick={() => {
                              push({
                                name: '',
                                composition_variation_id: '', //hide
                                quantity: 1,
                                unit: '',
                                purchase_price_exc: '',
                                total_amount: 1, // quantity * purchase_price_exc
                                all_unit: []
                              })
                            }}
                          >
                            Add
                          </Button>
                          <Button
                            type='button'
                            variant='outlined'
                            color='error'
                            sx={{ my: 2, px: 2 }}
                            onClick={() => remove(initialValues.product_compo[productIndex].rows.length - 1)}
                          >
                            Remove
                          </Button>
                        </CardActions> */}
                      </div>
                    )}
                  </FieldArray>
                </Box>
              ))}
            </Box>
          )}
        </FieldArray>
      </Form>
    </Box>
  )
}

export default CompoProduct
