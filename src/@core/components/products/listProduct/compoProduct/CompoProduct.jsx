/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, CardActions, Divider, CardHeader } from '@mui/material'

// ** formik
import { FieldArray, Form } from 'formik'
import CompoTable from './CompoTable'

const CompoProduct = ({ initialValues, setFieldValue, handleChange, handleBlur, errors, touched }) => {
  return (
    <Box padding={2}>
      <Form>
        <FieldArray name='product_compo'>
          {({ push, remove }) => (
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
                    {({ push: pushVariation, remove }) => (
                      <div>
                        <CompoTable
                          rows={product.rows}
                          handleChange={handleChange}
                          values={initialValues}
                          productIndex={productIndex}
                          pushVariation={pushVariation}
                          remove={remove}
                          setFieldValue={setFieldValue}
                        />
                        <CardActions>
                          <Button
                            type='button'
                            variant='contained'
                            color='primary'
                            sx={{ my: 2, px: 2, mr: 2 }}
                            onClick={() => {
                              pushVariation({
                                name: '',
                                composition_variation_id: '', //hide
                                quantity: 1,
                                unit: '',
                                purchase_price_exc: '',
                                total_amount: 1 // quantity * purchase_price_exc
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
                        </CardActions>
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
