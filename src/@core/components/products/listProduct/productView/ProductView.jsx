// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Dialog,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Typography,
  CardActions,
  Button,
  Chip,
  FormControl
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Custom Components
import SwiperThumbnails from 'src/views/components/swiper/SwiperThumbnails'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import StoreTable from './StoreTable'

// ** Redux
import { fetchViewStockProduct } from 'src/store/apps/products/listProducts/actions/getViewStockSlice'
import { useDispatch, useSelector } from 'react-redux'
import TableAverage from './TableAverage'

//** Third part */
import ReactHtmlParser from 'react-html-parser'
import CustomTableView from './CustomTableView'
import CustomHeader from '../../../customDialogHeader/CustomHeader'

// Styled Grid component
// const StyledGrid = styled(Grid)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   [theme.breakpoints.down('md')]: {
//     borderBottom: `1px solid ${theme.palette.divider}`
//   },
//   [theme.breakpoints.up('md')]: {
//     borderRight: `1px solid ${theme.palette.divider}`
//   }
// }))

const ProductView = ({ open, setOpen, id }) => {
  // ** States
  const [productInfo, setProductInfo] = useState(null)

  // ** Selector
  const store = useSelector(state => state.getViewStockProduct?.data?.value)

  const dataNames = [
    {
      field: 'name',
      headerName: 'Name',
      size: 'small'
    },

    { field: 'alert_qty', headerName: 'Alert Qty' },
    { field: 'barcode_type', headerName: 'Barcode Type' },
    { field: 'brand', headerName: 'Brand' },
    { field: 'category', headerName: 'Category' },
    { field: 'code', headerName: 'Code' },
    { field: 'cost', headerName: 'Cost' },
    { field: 'manage_stock', headerName: 'Manage Stock' },
    { field: 'product_locations', headerName: 'Product Locations' },
    { field: 'product_type', headerName: 'Product Type' },
    { field: 'second_code', headerName: 'Second Code' },
    { field: 'sub_category', headerName: 'Sub Category' },
    { field: 'tax', headerName: 'Tax' },
    { field: 'total_quantity', headerName: 'Total Quantity' },
    { field: 'unit', headerName: 'Unit' },
    { field: 'weight', headerName: 'Weight' },
    { field: 'custom_field_1', headerName: 'Custom Field1' },
    { field: 'custom_field_2', headerName: 'Custom Field2' },
    { field: 'custom_field_3', headerName: 'Custom Field3' },
    { field: 'custom_field_4', headerName: 'Custom Field4' },
    { field: 'warranty', headerName: 'Warranty' },
    { field: 'description', headerName: 'Description', size: 'small' },
    { field: 'full_description', headerName: 'Full Description', size: 'small' }
  ]

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
    <Dialog open={open} onClose={handleCancel} scroll='body' fullWidth maxWidth='lg' fullScreen>
      <Card>
        <CustomHeader title={productInfo?.name || ''} handleClose={handleCancel} divider={false} />

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
                  <Chip label='Product Video' color='primary' variant='outlined' />
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
          <Chip label='Product Information' color='primary' variant='outlined' />
        </Divider>

        <CardContent>
          <Grid container spacing={2}>
            {productInfo &&
              dataNames.map((data, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    lg={
                      data.field === 'name' ||
                      data.field === 'full_description' ||
                      data.field === 'description' ||
                      data.field === 'warranty'
                        ? 12
                        : 4
                    }
                    md={
                      data.field === 'name' ||
                      data.field === 'full_description' ||
                      data.field === 'description' ||
                      data.field === 'warranty'
                        ? 12
                        : 4
                    }
                    sm={12}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        mb: 4,
                        gap: 2,
                        flexDirection:
                          data.field === 'full_description' || data.field === 'description' ? 'column' : 'row'
                      }}
                    >
                      <Typography sx={{ ml: 3, fontWeight: 700, color: 'text.secondary' }}>
                        {data.headerName}:
                      </Typography>
                      {(data.field === 'description' && productInfo[data.field]) ||
                      (data.field === 'full_description' && productInfo[data.field]) ? (
                        <FormControl fullWidth>
                          <Box
                            sx={{
                              marginTop: '1rem',
                              padding: '1rem',
                              border: '1px solid ',
                              borderRadius: '10px',
                              borderColor: theme => theme.palette.divider
                            }}
                          >
                            {ReactHtmlParser(productInfo[data.field]) || ''}
                          </Box>
                        </FormControl>
                      ) : (
                        <Chip label={productInfo[data.field]} size={'small'} />
                      )}
                      {/* {productInfo[data.field] ? <Chip label={productInfo[data.field] || ''} size={'small'} /> : null} */}
                    </Box>
                  </Grid>
                )
              })}

            {/* <Grid item xs={12} lg={4} md={4} sm={12}>
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

            <Grid item xs={12} lg={4} md={4} sm={12}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent:text-description-28-regular' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Full Description:
                </Typography>
                {ReactHtmlParser(productInfo?.full_description)}
              </Box>

              <Box sx={{ display: 'flex', mb: 4 }}>
                <Icon sx={{ mr: 4, color: 'text.secondary' }} icon='fluent:text-description-28-regular' />
                <Typography sx={{ ml: 3, mr: 2, fontWeight: 700, color: 'text.secondary' }}>description:</Typography>
                {ReactHtmlParser(productInfo?.description)}
              </Box>
            </Grid> */}
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
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>description</Typography>
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

      {productInfo?.rack && productInfo?.rack.length > 0 ? (
        <Card sx={{ pb: 2 }}>
          <Divider sx={{ mb: 2 }}>
            <Chip label='Racks' color='primary' variant='outlined' />
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTableView
                dataRows={productInfo?.rack}
                dataColumns={[
                  {
                    field: 'name',
                    headerName: 'Location',
                    align: 'left'
                  },
                  {
                    field: 'rack',
                    headerName: 'Rack',
                    align: 'left',
                    renderCell: row => <Typography>{row.rack}</Typography>
                  },
                  {
                    field: 'row',
                    align: 'left',
                    headerName: 'Row'
                  },
                  {
                    field: 'position',
                    align: 'left',
                    headerName: 'Position'
                  }
                ]}
              />
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {productInfo?.variable_rows && productInfo?.variable_rows.length > 0 ? (
        <Card sx={{ pb: 2 }}>
          <Divider sx={{ mb: 2 }}>
            <Chip label='Variations' color='primary' variant='outlined' />
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTableView
                dataRows={productInfo?.variable_rows}
                dataColumns={[
                  {
                    field: 'name',
                    headerName: 'variations',
                    flex: 0.35,
                    minWidth: 210,
                    renderCell: row => <Typography variant='body1'>{row.name}</Typography>
                  },
                  {
                    field: 'sub_sku',
                    flex: 0.2,
                    headerName: 'Item Code',
                    renderCell: row => <Typography variant='body1'>{row.sub_sku}</Typography>
                  },
                  {
                    field: 'default_purchase_price',
                    headerName: 'Default Purchase Price (Exc. tax)',
                    flex: 0.35,
                    minWidth: 180,
                    renderCell: row => <Typography variant='body1'>{row.default_purchase_price}</Typography>
                  },
                  {
                    field: 'dpp_inc_tax',
                    headerName: 'Default Purchase Price (Inc. tax)',
                    flex: 0.35,
                    minWidth: 180,
                    renderCell: row => <Typography variant='body1'>{row.dpp_inc_tax}</Typography>
                  },
                  {
                    field: 'profit_percent',
                    headerName: 'x Margin(%)',
                    flex: 0.2,
                    minWidth: 120,
                    renderCell: row => <Typography variant='body1'>{row.profit_percent}</Typography>
                  },
                  {
                    field: 'default_sell_price',
                    headerName: 'Default Sell Price (Exc. tax)',
                    flex: 0.35,
                    minWidth: 170,
                    renderCell: row => <Typography variant='body1'>{row.default_sell_price}</Typography>
                  },
                  {
                    field: 'sell_price_inc_tax',
                    headerName: 'Default Sell Price (Inc. tax)',
                    flex: 0.35,
                    minWidth: 170,
                    renderCell: row => <Typography variant='body1'>{row.sell_price_inc_tax}</Typography>
                  },
                  {
                    field: 'image',
                    headerName: 'Image',
                    align: 'center',
                    minWidth: 150,
                    renderCell: row => (
                      <>
                        {row.image ? (
                          <img
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '10px'
                            }}
                            src={row.image}
                            alt='product image'
                          />
                        ) : (
                          <Typography variant='body1'>No Image</Typography>
                        )}
                      </>
                    )
                  }
                ]}
              />
            </Grid>
          </Grid>
        </Card>
      ) : null}
      {productInfo?.combo_rows && productInfo?.combo_rows.length > 0 ? (
        <Card sx={{ pb: 2 }}>
          <Divider sx={{ mb: 2 }}>
            <Chip label='Combo' color='primary' variant='outlined' />
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTableView
                dataRows={productInfo?.combo_rows}
                dataColumns={[
                  {
                    field: 'name',
                    headerName: 'Product Name',
                    flex: 0.35,
                    minWidth: 240,
                    renderCell: row => <Typography variant='body1'>{row.name}</Typography>
                  },
                  {
                    field: 'sub_sku',
                    flex: 0.2,
                    headerName: 'Item Code',
                    renderCell: row => <Typography variant='body1'>{row.sub_sku}</Typography>
                  },
                  {
                    field: 'default_purchase_price',
                    headerName: 'Default Purchase Price (Exc. tax)',
                    flex: 0.35,
                    minWidth: 150,
                    renderCell: row => <Typography variant='body1'>{row.default_purchase_price}</Typography>
                  },
                  {
                    field: 'dpp_inc_tax',
                    headerName: 'Default Purchase Price (Inc. tax)',
                    flex: 0.35,
                    minWidth: 150,
                    renderCell: row => <Typography variant='body1'>{row.dpp_inc_tax}</Typography>
                  },
                  {
                    field: 'profit_percent',
                    headerName: 'x Margin(%)',
                    flex: 0.2,
                    minWidth: 120,
                    renderCell: row => <Typography variant='body1'>{row.profit_percent}</Typography>
                  },
                  {
                    field: 'default_sell_price',
                    headerName: 'Default Sell Price (Exc. tax)',
                    flex: 0.3,
                    minWidth: 150,
                    renderCell: row => <Typography variant='body1'>{row.default_sell_price}</Typography>
                  },
                  {
                    field: 'sell_price_inc_tax',
                    headerName: 'Default Sell Price (Inc. tax)',
                    flex: 0.3,
                    minWidth: 150,
                    renderCell: row => <Typography variant='body1'>{row.sell_price_inc_tax}</Typography>
                  },
                  {
                    field: 'quantity',
                    headerName: 'Quantity',
                    flex: 0.2,
                    minWidth: 80,
                    renderCell: row => <Typography variant='body1'>{row.quantity}</Typography>
                  },
                  {
                    field: 'net_amount',
                    headerName: 'Net Amount',
                    flex: 0.25,
                    minWidth: 90,
                    renderCell: row => <Typography variant='body1'>{row.net_amount}</Typography>
                  },
                  {
                    field: 'image',
                    headerName: 'Image',
                    align: 'center',
                    minWidth: 150,
                    renderCell: row => (
                      <>
                        {row.image ? (
                          <img
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '10px'
                            }}
                            src={row.image}
                            alt='product image'
                          />
                        ) : (
                          <Typography variant='body1'>No Image</Typography>
                        )}
                      </>
                    )
                  }
                ]}
              />
            </Grid>
            {/* for display total total_default_sell_price */}
            <Grid item xs={12} sx={{ m: 3 }}>
              <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                  Total Default Sell Price:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{productInfo?.total_default_sell_price}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      ) : null}

      <Card>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Store' color='primary' variant='outlined' />
        </Divider>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StoreTable tableData={productInfo?.stock || []} />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ pt: 10 }}>
        <Divider sx={{ mb: 2 }}>
          <Chip label='Average Sale Price' color='primary' variant='outlined' />
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
          <Chip label='Average  Purchase Price' color='primary' variant='outlined' />
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
          <Chip label='Actions' color='primary' variant='outlined' />
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
