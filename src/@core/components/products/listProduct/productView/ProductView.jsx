/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Dialog,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  Divider,
  Typography,
  CardActions,
  Button,
  Chip
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Components
import SwiperThumbnails from 'src/views/components/swiper/SwiperThumbnails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import StoreTable from './StoreTable'

// ** Redux
import { fetchViewStockProduct } from 'src/store/apps/products/listProducts/actions/getViewStockSlice'
import { useDispatch, useSelector } from 'react-redux'
import TableAverage from './TableAverage'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const ProductView = ({ open, setOpen, id }) => {
  // ** States
  const [productInfo, setProductInfo] = useState(null)

  // ** Selector
  const store = useSelector(state => state.getViewStockProduct?.data?.value)

  // ** Hook
  const {
    settings: { direction }
  } = useSettings()

  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    setProductInfo(store)
  }, [store])

  useEffect(() => {
    dispatch(fetchViewStockProduct({ id }))
  }, [id, dispatch])

  // ** Function to handle Close button click
  const handleCancel = () => {
    setOpen(prev => !prev)
  }

  return (
    <Dialog open={open} onClose={handleCancel} scroll='body' fullWidth maxWidth='lg'>
      <Card>
        <CardHeader title='Product Details' />

        <KeenSliderWrapper>
          <Grid container className='match-height'>
            <Grid item sx={{ pt: 0 }} xs={12} lg={productInfo?.video ? 6 : 12} md={productInfo?.video ? 6 : 12} sm={12}>
              <Divider sx={{ mb: 2 }}>
                <Chip label='Product Images' color='primary' variant='outlined' s />
              </Divider>

              <CardContent
                sx={{
                  borderRight: productInfo?.video ? `1px solid ${theme.palette.divider}` : null
                }}
              >
                {productInfo?.alter_images ? (
                  <SwiperThumbnails
                    images={[productInfo.image, ...productInfo.alter_images] || []}
                    direction={direction}
                  />
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', height: 340 }}>
                    {productInfo?.image ? (
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '10px'
                        }}
                        src={productInfo?.image || ''}
                        alt='product image'
                      />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: 340,
                          border: '1px dashed ',
                          borderColor: theme.palette.primary.main
                        }}
                      >
                        <Typography sx={{ color: 'text.secondary' }} variant='h3'>
                          No Image
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </CardContent>
            </Grid>
            {/* {productInfo?.video ? <Divider orientation='vertical' variant='fullWidth' /> : null} */}

            {productInfo?.video ? (
              <Grid item xs={12} lg={6} md={6} sm={12}>
                <Divider sx={{ mb: 2 }}>
                  <Chip label='Product Video' color='primary' variant='outlined' s />
                </Divider>

                <CardContent>
                  <video controls style={{ width: '100%', height: 340 }} src={productInfo?.video}></video>
                </CardContent>
              </Grid>
            ) : null}
            {/* {productInfo?.video ? <Divider orientation='vertical' variant='fullWidth' /> : null} */}
          </Grid>
        </KeenSliderWrapper>
      </Card>

      <Card>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Product Information' color='primary' variant='outlined' s />
        </Divider>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} md={4} sm={12}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent:number-symbol-16-filled' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Item Code:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.code || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent-mdl2:product-list' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Brand:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.brand || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent:puzzle-cube-piece-20-regular' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Unit:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.unit || ''}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} lg={4} md={4} sm={12}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='ph:barcode' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Barcode Type:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.barcode_type || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='mi:location' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Available in locations:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.business_location || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='material-symbols-light:category-outline' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Category:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.category || ''}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} lg={4} md={4} sm={12}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='material-symbols-light:category-outline' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Sub category:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.sub_category}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='material-symbols:manage-history' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Manage Stock?:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.manage_stock}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent:alert-12-regular' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Alert quantity:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.alert_qty || ''}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='simple-line-icons:calender' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Expires in:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.expires_in || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent-mdl2:money' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Applicable Tax:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.tax || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent-mdl2:money' />
                <Typography sx={{ mr: 2, ml: 3, fontWeight: 700, color: 'text.secondary' }}>
                  Selling Price Tax Type:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.selling_price_tax_type || ''}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='icon-park-outline:ad-product' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>Product Type:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.product_type || ''}</Typography>
              </Box>
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Item Code:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>6223007730563</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Brand:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>--</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Unit:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Bx</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Barcode Type:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>C128</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Available in locations:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>TEST</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Category:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>GENERAL</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Sub category:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>CARDEN</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Manage Stock?:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Yes</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Alert quantity:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>10.0000</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Expires in:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Not Applicable</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Applicable Tax:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Vat 5 %</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Selling Price Tax Type:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Exclusive</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Product Type:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Single</Typography>
              </Box>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Store' color='primary' variant='outlined' s />
        </Divider>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StoreTable tableData={productInfo?.stock || []} />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ pt: 10 }}>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Average Sale Price' color='primary' variant='outlined' s />
        </Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableAverage
              dataColumns={[
                { name: 'Average Sale Price' },
                { name: 'Highest Sale Price' },
                { name: 'Lowest Sale Price' },
                { name: 'Last Sale Price' }
              ]}
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ pt: 10 }}>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Average Sale Price' color='primary' variant='outlined' s />
        </Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableAverage
              dataColumns={[
                { name: 'Average Purchase Price' },
                { name: 'Highest Purchase Price' },
                { name: 'Lowest Purchase Price' },
                { name: 'Last Purchase Price' }
              ]}
            />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Actions' color='primary' variant='outlined' s />
        </Divider>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
            Close
          </Button>
          <Button size='large' color='primary' variant='contained'>
            Print
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}

export default ProductView
