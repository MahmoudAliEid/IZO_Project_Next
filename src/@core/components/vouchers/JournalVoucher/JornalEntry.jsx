import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import CustomTableView from '../../products/listProduct/productView/CustomTableView'
import { Grid, Typography, Chip, Divider, Box } from '@mui/material'
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// ** cookies
import { getCookie } from 'cookies-next'
import { fetchViewJournalEntry } from 'src/store/apps/vouchers/journalVoucher/Actions/getViewJournalEntry'

const JournalEntry = ({ open, toggle, itemId }) => {
  const [entryData, setEntryData] = useState(null) // Initially setting data as null
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  const fontStyling = getCookie('fontStyle')

  const handleClose = () => {
    toggle()
  }

  const dispatch = useDispatch()

  // Fetch data when itemId changes
  useEffect(() => {
    if (itemId) {
      dispatch(fetchViewJournalEntry({ id: itemId }))
    }
  }, [itemId, dispatch])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state.getViewJournalEntry?.data?.value)
  useEffect(() => {
    if (fetchData) setEntryData(fetchData)
  }, [fetchData])

  console.log('data of view entry 🤩🤩', entryData)

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
            title={`Entry ( Ref No: ${
              entryData?.entry[0].source_reference ? entryData?.entry[0].source_reference : ''
            })`}
            handleClose={handleClose}
            divider={false}
          />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Grid container spacing={2} sx={{ p: 3 }}>
              {entryData && (
                <Grid item xs={12}>
                  <Divider sx={{ mb: 2 }}>
                    <Chip
                      sx={{
                        '& .MuiChip-label': { textTransform: fontStyling }
                      }}
                      label={`Entry Information`}
                      color='primary'
                      variant='outlined'
                    />
                  </Divider>
                  <CustomTableView
                    dataRows={entryData?.allData}
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
                            ? `${Number(entryData.balance.total_debit).toFixed(decimalFormat)} ${currency_code} `
                            : `${currency_code} ${Number(entryData.balance.total_debit).toFixed(decimalFormat)} `
                        }`
                      },
                      {
                        field: '',
                        headerName: `${
                          CurrencySymbolPlacement === 'after'
                            ? `${Number(entryData.balance.total_credit).toFixed(decimalFormat)} ${currency_code} `
                            : `${currency_code} ${Number(entryData.balance.total_credit).toFixed(decimalFormat)} `
                        }`,
                        align: 'left'
                      }
                    ]}
                  />
                </Grid>
              )}
              {!entryData?.allData?.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    alignContent: 'center'
                  }}
                >
                  <Box>
                    <Typography variant='h6' color='textSecondary' sx={{ textAlign: 'center', width: '100%' }}>
                      No Data has been found.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        </Fragment>
      </Dialog>
    </Fragment>
  )
}

export default JournalEntry
