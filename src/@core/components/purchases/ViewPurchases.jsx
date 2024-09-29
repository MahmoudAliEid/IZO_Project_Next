import { useState, useEffect, Fragment } from 'react'

// ** Import Custom Component
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from '../customDialogHeader/CustomHeader'
import CustomTableView from '../products/listProduct/productView/CustomTableView'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchViewPurchase } from 'src/store/apps/purchases/Actions/getViewPurchase'
// ** Mui
import { Box, Button, Chip, DialogContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { getCookie } from 'cookies-next'

const LinkStyled = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const ProductName = ({ params }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)

  const rowOptionsOpen = anchorEl
  // ** Cookie
  const transText = getCookie('fontStyle')

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box>
      <LinkStyled href={``}>{params.product_name}</LinkStyled>
      <Fragment>
        <Button variant='outlined' size='small' onClick={handleRowOptionsClick}>
          Actions
        </Button>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          sx={{ textTransform: transText }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='eva:person-fill' color='primary' width={16} height={16} />
            View
          </MenuItem>

          {/* {edit} */}
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:pencil' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            {/* history icon */}
            <Icon icon='solar:history-bold' fontSize={20} />
            Product History
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:bx-bar-chart-alt-2' fontSize={20} />
            View Stock
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:bx-transfer' fontSize={20} />
            Should Receive
          </MenuItem>
        </Menu>
      </Fragment>
    </Box>
  )
}

const ViewPurchases = ({ toggle, open, id }) => {
  const [data, setData] = useState()

  // ** Cookie
  const transText = getCookie('fontStyle')

  // ** Store Vars
  const store = useSelector(state => state.getViewPurchase?.data?.value)

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()

  // ** Get data on mount
  useEffect(() => {
    dispatch(fetchViewPurchase({ id }))
  }, [dispatch, id])

  // ** set data
  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

  console.log('data from view Purchase :>> ', data)

  const dataNames = [
    { headerName: ' Contact Name', field: 'contact_name' },
    { headerName: 'Contact Address', field: 'contact_address' },
    { headerName: 'Contact Mobile', field: 'contact_mobile' },
    { headerName: 'Contact Tax', field: 'contact_tax' },
    { headerName: 'Business Number', field: 'business_number' },
    { headerName: 'Business Name', field: 'business_name' },
    { headerName: 'Business Landmark', field: 'business_landmark' },
    { headerName: 'Business City', field: 'business_city' },
    { headerName: 'Business State', field: 'business_state' },
    { headerName: 'Bill Date', field: 'bill_date' },
    { headerName: 'Bill Reference', field: 'bill_reference' },
    { headerName: 'Bill Status', field: 'bill_status' },
    { headerName: 'Bill Payment Status', field: 'bill_payment_status' },
    { headerName: 'Bill Store Name', field: 'bill_store_name' },
    { headerName: 'Bill Main Currency Symbol', field: 'bill__main_currency_symbol' },
    { headerName: 'Bill Currency Symbol', field: 'bill_currency_symbol' },
    { headerName: 'Currency Exchange', field: 'currency_exchange' }
  ]

  return (
    <CustomDialog toggle={toggle} open={open}>
      {data ? (
        <Fragment>
          <CustomHeader title={`Purchase ( Ref No: )`} handleClose={toggle} divider={false} />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Divider sx={{ mb: 2 }}>
              <Chip
                label='Purchase Information'
                color='primary'
                variant='outlined'
                sx={{
                  '& .MuiChip-label': { textTransform: transText }
                }}
              />
            </Divider>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
              <Typography variant='body1' sx={{ fontWeight: 300, textTransform: transText }}>
                date: {new Date(data.sectionOne.bill_date).toLocaleDateString()}
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid
                item
                xs={12}
                // add glass effect
                // For Light Theme
                sx={{
                  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#191919', // Light background
                  borderRadius: '16px',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(6.3px)',
                  WebkitBackdropFilter: 'blur(6.3px)', // Ensuring compatibility with Webkit browsers
                  border:
                    theme.palette.mode === 'light'
                      ? '1px solid rgba(0, 0, 0, 0.1)'
                      : '1px solid rgba(176, 170, 170, 0.3)', // Adjusted for lighter theme
                  textTransform: transText
                }}
              >
                <Grid container spacing={2}>
                  {data &&
                    data?.sectionOne &&
                    dataNames.map((obj, index) => {
                      return (
                        <Grid item xs={12} lg={4} md={4} sm={12} key={index}>
                          <Box
                            sx={{
                              display: 'flex',
                              mb: 4,
                              gap: 2,
                              flexDirection: 'row',
                              textTransform: transText
                            }}
                          >
                            <Typography
                              sx={{ ml: 3, fontWeight: 500, color: 'text.secondary', textTransform: transText }}
                            >
                              {obj.headerName}:&nbsp;
                              {data.sectionOne[obj.field] ? (
                                <Chip
                                  label={data.sectionOne[obj.field] || ''}
                                  size={'small'}
                                  sx={{
                                    '& .MuiChip-label': { textTransform: transText },
                                    wordWrap: 'break-word'
                                  }}
                                />
                              ) : null}
                            </Typography>
                          </Box>
                        </Grid>
                      )
                    })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 3,
                    m: 3
                  }}
                >
                  <Button variant='contained' sx={{ m: 3 }} color='primary'>
                    Entry
                  </Button>
                  <Button variant='outlined' sx={{ m: 3 }} color='primary'>
                    Edit
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}>
                  <Chip
                    label='All Payments'
                    color='primary'
                    variant='outlined'
                    sx={{
                      '& .MuiChip-label': { textTransform: transText }
                    }}
                  />
                </Divider>

                <CustomTableView
                  dataRows={data.sectionTwo.rows}
                  dataColumns={[
                    {
                      field: 'product_name',
                      headerName: 'Product Name',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => <ProductName params={params} />
                    },
                    {
                      field: 'product_code',
                      headerName: 'Product Code',
                      align: 'left',
                      minWidth: 120,
                      flex: 1
                    },
                    {
                      field: 'quantity',
                      headerName: 'Quantity',
                      align: 'left',
                      minWidth: 100,
                      flex: 0.8
                    },
                    {
                      field: 'unit_price_before_dis_exc_vat',
                      headerName: 'Unit Price Before Discount (Excl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    },
                    {
                      field: 'unit_price_before_dis_inc_vat',
                      headerName: 'Unit Price Before Discount (Incl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    },
                    {
                      field: 'unit_price_before_dis_exc_vat_currency',
                      headerName: 'Unit Price Before Discount (Excl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1
                    },
                    {
                      field: 'unit_price_before_dis_inc_vat_currency',
                      headerName: 'Unit Price Before Discount (Incl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1
                    },
                    {
                      field: 'discount',
                      headerName: 'Discount',
                      align: 'left',
                      minWidth: 120,
                      flex: 0.8
                    },
                    {
                      field: 'unit_price_after_dis_exc_vat',
                      headerName: 'Unit Price After Discount (Excl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    },
                    {
                      field: 'unit_price_after_dis_inc_vat',
                      headerName: 'Unit Price After Discount (Incl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    },
                    {
                      field: 'unit_price_after_dis_exc_vat_currency',
                      headerName: 'Unit Price After Discount (Excl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1
                    },
                    {
                      field: 'unit_price_after_dis_inc_vat_currency',
                      headerName: 'Unit Price After Discount (Incl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1
                    },
                    {
                      field: 'subtotal_before_tax',
                      headerName: 'Subtotal Before Tax',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    },
                    {
                      field: 'tax',
                      headerName: 'Tax',
                      align: 'left',
                      minWidth: 100,
                      flex: 0.8
                    },
                    {
                      field: 'subtotal_after_tax',
                      headerName: 'Subtotal After Tax',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    },
                    {
                      field: 'mfg_date',
                      headerName: 'Manufacturing Date',
                      align: 'left',
                      minWidth: 140,
                      flex: 1
                    },
                    {
                      field: 'exp_date',
                      headerName: 'Expiration Date',
                      align: 'left',
                      minWidth: 140,
                      flex: 1,
                      renderCell: params => <span>{new Date(params.exp_date).toLocaleDateString()}</span>
                    }
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}>
                  <Chip
                    label='Payment Info'
                    color='primary'
                    variant='outlined'
                    sx={{
                      '& .MuiChip-label': { textTransform: transText }
                    }}
                  />
                </Divider>

                <CustomTableView
                  dataRows={data.sectionThree}
                  dataColumns={[
                    {
                      field: 'amount',
                      headerName: 'Amount',
                      align: 'left',
                      minWidth: 150,
                      flex: 1
                    },
                    {
                      field: 'date',
                      headerName: 'Date',
                      align: 'left',
                      minWidth: 150,
                      flex: 1,
                      renderCell: params => <span>{new Date(params.date).toLocaleDateString()}</span>
                    },
                    {
                      field: 'payment_mode',
                      headerName: 'Payment Mode',
                      align: 'left',
                      minWidth: 150,
                      flex: 1
                    },
                    {
                      field: 'payment_note',
                      headerName: 'Payment Note',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => <span>{params.payment_note || 'N/A'}</span>
                    },
                    {
                      field: 'reference_no',
                      headerName: 'Reference Number',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    }
                  ]}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Fragment>
      ) : (
        <Grid>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <Box>
              <ProgressCustomization />
            </Box>
          </Box>
        </Grid>
      )}
    </CustomDialog>
  )
}

export default ViewPurchases
