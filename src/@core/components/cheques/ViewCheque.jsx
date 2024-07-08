import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import CustomTableView from '../products/listProduct/productView/CustomTableView'
import { Grid, Typography, Chip, Divider } from '@mui/material'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import { fetchViewCheque } from 'src/store/apps/Cheques/Actions/getViewChequesSlice'

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

const ViewCheque = ({ open, toggle, itemId }) => {
  const [chequeData, setChequeData] = useState(null) // Initially setting data as null
  const transText = getCookie('fontStyle')

  const dataNames = [
    { headerName: 'Cheque No', field: 'cheque_no' },
    {
      headerName: 'Contact',
      field: 'contactText'
    },
    {
      headerName: 'Phone',
      field: 'phone'
    },
    {
      headerName: 'Account',
      field: 'accountText'
    },

    {
      headerName: 'Contact Bank',
      field: 'contact_bank'
    },
    {
      headerName: 'Status',
      field: 'status'
    },
    { headerName: 'Amount', field: 'amount' },
    { headerName: 'Write Date', field: 'write_date' },
    { headerName: 'Due Date', field: 'due_date' },
    { headerName: 'Date', field: 'date' }
  ]

  const handleClose = () => {
    toggle()
  }

  const dispatch = useDispatch()

  // Fetch data when itemId changes
  useEffect(() => {
    if (itemId) {
      dispatch(fetchViewCheque({ itemId }))
    }
  }, [itemId, dispatch])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state.getViewCheque?.brands?.value)
  useEffect(() => {
    if (fetchData && fetchData.length > 0) setChequeData(fetchData[0])
  }, [fetchData])

  console.log('data of view cheque', chequeData)

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
        {chequeData ? (
          <Fragment>
            <CustomHeader title={` Cheque ( Ref No: ${chequeData.ref_no})`} handleClose={handleClose} divider={false} />
            <DialogContent sx={{ padding: '0 !important' }}>
              <Divider sx={{ mb: 2 }}>
                <Chip
                  label='Cheque Information'
                  color='primary'
                  variant='outlined'
                  sx={{
                    '& .MuiChip-label': { textTransform: transText }
                  }}
                />
              </Divider>

              <Grid
                container
                spacing={2}
                sx={{
                  p: 3,
                  textTransform: transText
                }}
              >
                <Grid
                  item
                  xs={12}
                  // add glass effect
                  sx={{
                    background: '#191919',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px  rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(6.3px)',
                    WebkitBackdropFilter: 'blur(6.3px)', // Ensuring compatibility with Webkit browsers
                    border: '1px solid rgba(176, 170, 170, 0.3)',
                    textTransform: transText
                  }}
                >
                  <Grid container spacing={2}>
                    {chequeData &&
                      dataNames.map((data, index) => {
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
                                sx={{ ml: 3, fontWeight: 700, color: 'text.secondary', textTransform: transText }}
                              >
                                {data.headerName}:&nbsp;
                                {chequeData[data.field] ? (
                                  <Chip
                                    label={chequeData[data.field] || ''}
                                    size={'small'}
                                    sx={{
                                      '& .MuiChip-label': { textTransform: transText }
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
                  {/* <TableOfPayments data={chequeData?.payments} /> */}
                  <CustomTableView
                    dataRows={chequeData.payments}
                    dataColumns={[
                      {
                        field: 'transaction_id',
                        headerName: 'Source Reference no',
                        align: 'left',
                        renderCell: params => (
                          <LinkStyled
                            onClick={() => {
                              alert(`this id of transaction 🤖: ${params.link}`)
                            }}
                          >
                            {params.transaction_id}
                          </LinkStyled>
                        )
                      },
                      {
                        field: 'payment_ref_no',
                        headerName: 'Reference No',
                        align: 'left',
                        renderCell: params => <LinkStyled>{params.payment_ref_no}</LinkStyled>
                      },
                      { field: 'amount', headerName: 'Amount', align: 'left' },
                      { field: 'payment_for', headerName: 'Payment For', align: 'left' },
                      { field: 'balance', headerName: 'Balance', align: 'left' },
                      { field: 'method', headerName: 'Payment Method', align: 'left' },
                      { field: 'note', headerName: 'Note', align: 'left' },
                      { field: 'paid_on', headerName: 'Date', align: 'left' }
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

// const TableOfPayments = ({ data }) => {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Source Reference no</TableCell>
//           <TableCell>Reference No</TableCell>
//           <TableCell>Amount</TableCell>
//           <TableCell>Payment For</TableCell>
//           <TableCell>Balance</TableCell>
//           <TableCell>Payment Method</TableCell>
//           <TableCell>Note</TableCell>
//           <TableCell>Date</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data?.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell>{item.source_reference_no}</TableCell>
//             <TableCell>{item.reference_no}</TableCell>
//             <TableCell>{Number(item.amount).toFixed(2)}</TableCell>
//             <TableCell>{item.payment_for}</TableCell>
//             <TableCell>{item.balance}</TableCell>
//             <TableCell>{item.payment_method}</TableCell>
//             <TableCell>{item?.note || ''}</TableCell>
//             <TableCell>{item.date}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }

export default ViewCheque
