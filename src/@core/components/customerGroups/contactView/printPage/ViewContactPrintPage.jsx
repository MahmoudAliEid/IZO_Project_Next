// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import { fetchViewContact } from 'src/store/apps/contacts/getViewContactSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

//** customs */
import CustomTable from '../customTable/CustomTable'
import LedgerTable from '..'

// ** Types
// import { SingleInvoiceType, InvoiceLayoutProps } from 'src/types/apps/invoiceTypes'

// ** Third Party Components
// import axios from 'axios'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// const CalcWrapper =
//   styled(Box) <
//   BoxProps >
//   (({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     '&:not(:last-of-type)': {
//       marginBottom: theme.spacing(2)
//     }
//   }))

// const MUITableCell =
//   styled(TableCell) <
//   TableCellBaseProps >
//   (({ theme }) => ({
//     borderBottom: 0,
//     paddingLeft: '0 !important',
//     paddingRight: '0 !important',
//     paddingTop: `${theme.spacing(1)} !important`,
//     paddingBottom: `${theme.spacing(1)} !important`
//   }))

const ViewContactPrintPage = ({ id, type, startDate, endDate }) => {
  // ** State
  const [ContactData, setContactData] = useState({})
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [printData, setPrintData] = useState([])
  const [contactInfo, setContactInfo] = useState({})

  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const dataFetch = useSelector(state => state.getViewContact?.data?.response)

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // ** Fetch data from redux
  useEffect(() => {
    if (token && url && id) {
      dispatch(fetchViewContact({ token, id, startDate, endDate }))
    }
  }, [token, url, id, startDate, endDate, dispatch])

  useEffect(() => {
    if (dataFetch) {
      setContactData(dataFetch.contact)
      setContactInfo(dataFetch.ledger.info)
      setPrintData(dataFetch.ledger.rows)
    }
  }, [dataFetch])

  useEffect(() => {
    if (dataFetch) {
      setTimeout(() => {
        window.print()
      }, 400)
    }

    // setTimeout(() => {
    //   window.print()
    // }, 300)
  }, [dataFetch])

  //** Functions */
  const formatLabel = property => {
    // Remove hyphens and capitalize the first letter of each word
    const formattedProperty = property.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, match => match.toUpperCase())

    return formattedProperty
  }
  const To = () => {
    const contactProperties = [
      'supplier_business_name',
      'name',
      'address_line_1',
      'address_line_2',
      'country',
      'state',
      'city',
      'email',
      'mobile',
      'pay_term_number'
    ]

    const resultArray = contactProperties
      .map(property => {
        const value = ContactData[property]

        if (value) {
          return { label: formatLabel(property), value }
        }

        return null
      })
      .filter(item => item !== null)

    return resultArray
  }

  const resultArray = To()

  if (dataFetch) {
    return (
      <Box sx={{ p: 12, pb: 6 }}>
        <Grid container>
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <svg width={22} height={32} viewBox='0 0 55 81' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill={theme.palette.primary.main}
                    d='M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z'
                  />
                  <path
                    fillOpacity='0.2'
                    fill={theme.palette.common.white}
                    d='M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z'
                  />
                  <path
                    fillOpacity='0.2'
                    fill={theme.palette.common.white}
                    d='M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z'
                  />
                </svg>
                <Typography
                  variant='h5'
                  sx={{
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '-0.45px',
                    textTransform: 'lowercase',
                    fontSize: '1.75rem !important'
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <div>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>TEST 33002, Dubai,</Typography>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}> Dubai Dubai, 00426</Typography>
                {/* <Typography sx={{ color: 'text.secondary' }}>+1 (123) 456 7891, +44 (876) 543 2198</Typography> */}
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { sm: 'flex-end', xs: 'flex-start' }
              }}
            >
              <Typography variant='h5' sx={{ mb: 2, color: 'text.secondary' }}>
                {`Ledger ${type}: #${id}`}
              </Typography>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}> Start Date:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{startDate}</Typography>
              </Box>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}> Start End:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{endDate}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container spacing={6} sx={{ padding: '25px 0' }}>
          <Grid item xs={12} lg={6} md={12}>
            <CustomTable data={resultArray} title='To' />
          </Grid>
          <Grid item xs={12} lg={6} md={12}>
            {type === 'customer' && (
              <CustomTable
                data={[
                  { label: 'Total Sales', value: `${contactInfo.total_bill} AED` },
                  { label: 'Total Paid', value: `${contactInfo.total_paid} AED` },
                  { label: 'Advance Balance', value: `${contactInfo.advance_balance} AED` },
                  { label: 'Balance Due', value: `${contactInfo.balance_due} AED` }
                ]}
                title='Account Summary'
                range={`${startDate} - ${endDate}`}
              />
            )}
            {type === 'supplier' && (
              <CustomTable
                data={[
                  { label: 'Total Purchases', value: `${contactInfo.total_bill} AED` },
                  { label: 'Total Received', value: `${contactInfo.total_received} AED` },
                  { label: 'Advance Balance', value: `${contactInfo.advance_balance} AED` },
                  { label: 'Balance Due', value: `${contactInfo.balance_due} AED` }
                ]}
                title='Account Summary'
                range={`${startDate} - ${endDate}`}
              />
            )}
          </Grid>
        </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important' }} />

        <LedgerTable
          title={`Showing all invoices and payments between ${startDate} and ${endDate}`}
          printData={printData}
        />

        {/* <Grid container>
          <Grid item xs={8} sm={7} lg={9}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary' }}>Salesperson:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Tommy Shelby</Typography>
            </Box>

            <Typography sx={{ color: 'text.secondary' }}>Thanks for your business</Typography>
          </Grid>
          <Grid item xs={4} sm={5} lg={3}>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>$154.25</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>$00.00</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>$50.00</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>$204.25</Typography>
            </CalcWrapper>
          </Grid>
        </Grid> */}

        <Divider sx={{ color: 'text.secondary', my: `${theme.spacing(6)} !important` }} />
        <Typography sx={{ color: 'text.secondary' }}>
          <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind for
          future freelance projects. Thank You!
        </Typography>
      </Box>
    )
  } else if (dataFetch === undefined || dataFetch === null) {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Alert severity='error'>please wading until get your data to print</Alert>
          </Grid>
        </Grid>
      </Box>
    )
  } else {
    return null
  }
}

export default ViewContactPrintPage
