import { Fragment } from 'react'
// import { Fragment, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchViewVoucher } from 'src/store/apps/vouchers/getViewVoucher'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import CustomTableView from '../products/listProduct/productView/CustomTableView'
import { Grid, Typography, Chip, Divider, Button } from '@mui/material'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { Box } from '@mui/system'

const VouchersTransactionPopUp = ({ open, toggle }) => {
  // const [voucherData, setVoucherData] = useState(null) // Initially setting data as null

  const dataNames = [
    { headerName: 'First Number', field: 'first_number' },
    { headerName: 'Previous Number', field: 'previous_number' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Invoice No', field: 'invoice_no' },
    { headerName: 'Project No', field: 'project_no' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Payment Status', field: 'payment_status' },
    { headerName: 'Warehouse Name', field: 'warehouse_name' },
    { headerName: 'Customer Name', field: 'customer_name' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'Mobile', field: 'mobile' },
    { headerName: 'Service Staff', field: 'service_staff' },
    { headerName: 'Shipping', field: 'shipping' }
  ]

  const dataDammy = [
    {
      first_number: 'FN001',
      previous_number: 'PN001',
      date: '02/20/2024',
      invoice_no: 'DXB-0121',
      project_no: 'PR2024/00096',
      status: 'Final',
      payment_status: 'Paid',
      warehouse_name: 'Store',
      customer_name: 'John Doe',
      address: '123 Main St',
      mobile: '05511223366',
      service_staff: 'Jane Doe',
      shipping: 'DHL'
    }
  ]

  const handleClose = () => {
    toggle()
  }

  // const dispatch = useDispatch()

  // Fetch data when itemId changes
  // useEffect(() => {
  //   if (itemId) {
  //     dispatch(fetchViewVoucher({ itemId }))
  //   }
  // }, [itemId, dispatch])

  // Update data when fetchData changes
  // const fetchData = useSelector(state => state.getViewVoucher?.brands?.value)
  // useEffect(() => {
  //   if (fetchData && fetchData.length > 0) setVoucherData(fetchData[0])
  // }, [fetchData])

  // console.log('data of view voucher', voucherData)

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{ height: '100%' }}
      >
        {dataDammy ? (
          <Fragment>
            <CustomHeader title={`Sales Details (Invoice No. : DXB-0121)`} handleClose={handleClose} divider={false} />
            <DialogContent sx={{ padding: '0 !important' }}>
              <Divider sx={{ mb: 2 }}>
                <Chip label='Voucher Information' color='primary' variant='outlined' />
              </Divider>

              <Grid container spacing={2} sx={{ p: 3 }}>
                {dataNames.map((data, index) => {
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

                        {dataDammy[data.field] ? <Chip label={dataDammy[data.field] || ''} size={'small'} /> : null}
                      </Box>
                    </Grid>
                  )
                })}

                <Grid item xs={12}>
                  <Divider sx={{ mb: 2 }}>
                    <Chip label='Products' color='primary' variant='outlined' />
                  </Divider>
                  {/* <TableOfPayments data={voucherData?.payments} /> */}
                  <CustomTableView
                    dataRows={[
                      {
                        id: 1,
                        source_reference_no: 'SRN001',
                        reference_no: 'RN001',
                        amount: 100.0,
                        payment_for: 'Product Purchase',
                        balance: 50.0,
                        payment_method: 'Credit Card',
                        note: 'First payment',
                        date: '02/20/2024'
                      }
                    ]}
                    dataColumns={[
                      { field: 'id', headerName: 'Id', align: 'left' },
                      {
                        field: 'actions',
                        headerName: 'Actions',
                        align: 'left',
                        renderCell: row => {
                          return (
                            <Box>
                              <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                onClick={() => {
                                  alert('Edit , not implemented yet! by id: ' + row.id)
                                }}
                                sx={{ mr: 1 }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant='contained'
                                color='error'
                                size='small'
                                onClick={() => {
                                  alert('Delete , not implemented yet! by id: ' + row.id)
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          )
                        }
                      },
                      { field: 'product', headerName: 'Product', align: 'left' },
                      { field: 'quantity', headerName: 'Quantity', align: 'left' },
                      {
                        field: 'unit_price_before_dis',
                        headerName: 'Unit Price (Before Dis)',
                        align: 'left',
                        minWidth: 210
                      },
                      {
                        field: 'unit_price_before_dis_incl_vat',
                        headerName: 'Unit Price (Before Dis) Includ.vat',
                        align: 'left',
                        minWidth: 210
                      },
                      { field: 'discount', headerName: 'Discount', align: 'left' },
                      {
                        field: 'unit_price_after_dis_incl_vat',
                        headerName: 'Unit Price (After Dis) Includ.vat',
                        align: 'left',
                        minWidth: 210
                      },
                      { field: 'subtotal_before_tax', headerName: 'Subtotal (Before Tax)', align: 'left' },
                      { field: 'tax', headerName: 'Tax', align: 'left' },
                      { field: 'unit_cost_price_after_tax', headerName: 'Unit Cost Price (After Tax)', align: 'left' },
                      { field: 'subtotal', headerName: 'Subtotal', align: 'left', minWidth: 210 }
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
      </Dialog>
    </Fragment>
  )
}

export default VouchersTransactionPopUp
