import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchViewEntry } from 'src/store/apps/vouchers/Actions/getViewEntry'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import CustomTableView from '../products/listProduct/productView/CustomTableView'
import { Grid, Typography, Chip, Divider, Box } from '@mui/material'
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// ** cookies
import { getCookie } from 'cookies-next'
import { fetchChequeEntry } from 'src/store/apps/Cheques/Actions/getEntryChequesSlice'

// const LinkStyled = styled(Box)(({ theme }) => ({
//   fontWeight: 400,
//   fontSize: '1rem',
//   cursor: 'pointer',
//   textDecoration: 'none',
//   color: theme.palette.text.secondary,
//   '&:hover': {
//     color: theme.palette.primary.main
//   }
// }))

const EntryPopUp = ({ open, toggle, itemId, type, name }) => {
  const [entryData, setEntryData] = useState(null) // Initially setting data as null
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  const fontStyling = getCookie('fontStyle')

  // const dataNames = [
  //   { headerName: 'Ref No', field: 'ref_no' },
  //   {
  //     headerName: 'Contact',
  //     field: 'contact_id'
  //   },
  //   {
  //     headerName: 'Phone',
  //     field: 'phone'
  //   },
  //   {
  //     headerName: 'Account',
  //     field: 'account_id'
  //   },

  //   { headerName: 'Amount', field: 'currency_amount' },
  //   { headerName: 'Date', field: 'date' }
  // ]

  const handleClose = () => {
    toggle()
  }

  const dispatch = useDispatch()

  // Fetch data when itemId changes
  useEffect(() => {
    if (itemId) {
      if (type === 'cheque') {
        dispatch(fetchChequeEntry({ id: itemId }))
      } else {
        dispatch(fetchViewEntry({ id: itemId }))
      }
    }
  }, [itemId, dispatch, type])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state[name]?.data?.value)
  useEffect(() => {
    if (fetchData) setEntryData(fetchData)
  }, [fetchData])

  console.log('data of view entry', entryData)

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
        <Fragment>
          <CustomHeader
            title={`Entry ( Ref No: ${entryData?.source_reference ? entryData?.source_reference : ''})`}
            handleClose={handleClose}
            divider={false}
          />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Divider sx={{ mb: 2 }}>
              <Chip
                label='Entry Information'
                color='primary'
                variant='outlined'
                sx={{
                  '& .MuiChip-label': { textTransform: fontStyling }
                }}
              />
            </Divider>

            <Grid container spacing={2} sx={{ p: 3 }}>
              {entryData?.entries && entryData?.entries.length > 0 ? (
                entryData?.entries.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Divider sx={{ mb: 2 }}>
                      <Chip
                        sx={{
                          '& .MuiChip-label': { textTransform: fontStyling }
                        }}
                        label={`${item.entry_reference}`}
                        color='primary'
                        variant='outlined'
                      />
                    </Divider>
                    <CustomTableView
                      dataRows={item.allData}
                      dataColumns={[
                        {
                          field: 'account_id',
                          headerName: 'Account',
                          align: 'left',
                          minWidth: 200
                        },
                        {
                          field: 'operation_date',
                          headerName: 'Date',
                          align: 'left'
                        },
                        {
                          field: 'debit',
                          headerName: 'Debit',
                          align: 'left',
                          renderCell: params => (
                            <Typography variant='body2' color='textSecondary'>
                              {params.type === 'debit'
                                ? CurrencySymbolPlacement === 'after'
                                  ? `${Number(params.amount).toFixed(decimalFormat)} ${currency_code} `
                                  : `${currency_code} ${Number(params.amount).toFixed(decimalFormat)} `
                                : ''}
                            </Typography>
                          )
                        },
                        {
                          field: 'Credit',
                          headerName: 'Credit',
                          align: 'left',
                          renderCell: params => (
                            <Typography variant='body2' color='textSecondary'>
                              {params.type === 'credit'
                                ? CurrencySymbolPlacement === 'after'
                                  ? `${Number(params.amount).toFixed(decimalFormat)} ${currency_code} `
                                  : `${currency_code} ${Number(params.amount).toFixed(decimalFormat)} `
                                : ''}
                            </Typography>
                          )
                        }
                      ]}
                      totalDebit={[
                        {
                          field: '',
                          headerName: '',
                          align: 'left',
                          minWidth: 270
                        },
                        {
                          field: '',
                          headerName: '',
                          align: 'left'
                        },
                        {
                          field: '',
                          align: 'left',
                          headerName: `${
                            CurrencySymbolPlacement === 'after'
                              ? `${Number(item.balance.total_debit).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(item.balance.total_debit).toFixed(decimalFormat)} `
                          }`
                        },
                        {
                          field: '',
                          headerName: `${
                            CurrencySymbolPlacement === 'after'
                              ? `${Number(item.balance.total_credit).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(item.balance.total_credit).toFixed(decimalFormat)} `
                          }`,
                          align: 'left'
                        }
                      ]}
                      // totalCredit={[
                      //   {
                      //     field: '',
                      //     headerName: 'Total Credit',
                      //     align: 'left',
                      //     minWidth: 300
                      //   },
                      //   {
                      //     field: '',
                      //     headerName: '',
                      //     align: 'left'
                      //   },
                      //   {
                      //     field: '',
                      //     align: 'left',
                      //     headerName: ``
                      //   },
                      //   {
                      //     field: '',
                      //     headerName: `${
                      //       CurrencySymbolPlacement === 'after'
                      //         ? `${Number(item.balance.total_credit).toFixed(decimalFormat)} ${currency_code} `
                      //         : `${currency_code} ${Number(item.balance.total_credit).toFixed(decimalFormat)} `
                      //     }`,
                      //     align: 'left'
                      //   }
                      // ]}
                    />
                  </Grid>
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography variant='h6' color='textSecondary' sx={{ textAlign: 'center' }}>
                    No Data Found
                  </Typography>
                </Box>
              )}
            </Grid>
          </DialogContent>
        </Fragment>
      </Dialog>
    </Fragment>
  )
}

export default EntryPopUp
