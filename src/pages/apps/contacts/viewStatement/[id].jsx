// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CustomTable from 'src/@core/components/customerGroups/contactView/customTable/CustomTable'
import SalesTable from 'src/@core/components/customerGroups/contactView/salesTable/SalesTable'
import PurchasesTable from 'src/@core/components/customerGroups/contactView/purchasesTable/PurchasesTable'
import FormSendEmail from 'src/@core/components/customerGroups/contactView/formSendEmail/FormSendEmail'

// ** Next Import
import Link from 'next/link'

// ** Util Import
import { MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material'
import { sub, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'

import LedgerTable from 'src/@core/components/customerGroups/contactView'
import PaymentTable from 'src/@core/components/customerGroups/contactView/paymentTable/PaymentTable'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import BusinessIcon from '@mui/icons-material/Business' // Business Icon
// import { Button } from '@mui/material'

// import DomainIcon from '@mui/icons-material/Domain' // Type Icon
import ThreePIcon from '@mui/icons-material/ThreeP'

// import FilePresentIcon from '@mui/icons-material/FilePresent'
import PersonIcon from '@mui/icons-material/Person' // Name Icon
import EmailIcon from '@mui/icons-material/Email' // Email Icon
import CreditCardIcon from '@mui/icons-material/CreditCard' // Tax Number Icon

// ** React Imports
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { useEffect, useState, useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchViewContact } from 'src/store/apps/contacts/getViewContactSlice'

// import SidebarEditUser from 'src/views/apps/user/list/EditUserDrawer'
import DialogAddSuppliers from 'src/views/apps/contacts/suppliers/DialogAddSuppliers'
import DateRangeDropdown from 'src/@core/components/dateRange/DateRangeDropdown'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ViewPopUp from 'src/@core/components/customerGroups/contactView/contactViewPopUp/ViewPopUp'

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'

const data = {
  id: 1,
  role: 'admin',
  name: 'Mahmoud',
  status: 'active',
  username: 'gslixby0',
  billing: 'Enterprise',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/10.png'
}

//** Styled Components */
// const ButtonStyled = styled(Button)(({ theme }) => {
//   // ** Hook
//   // const { settings } = useSettings()
//   // const bgColors = useBgColor()

//   return {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center', // Center the content horizontally and vertically
//     flexDirection: 'column', // Stack the content vertically
//     textAlign: 'center', // Center text content if any

//     // color: theme.palette.text.primary,
//     color: 'white',
//     borderRadius: theme.shape.borderRadius,
//     fontFamily: theme.typography.fontFamily,
//     backgroundColor: `${hexToRGBA(theme.palette.primary.main, 1)} !important`,

//     // boxShadow: theme.shadows[settings.skin === 'bordered' ? 0 : 7],
//     border: `1px solid ${theme.palette.primary.main}`,

//     // border: settings.skin === 'bordered' ? `1px solid ${theme.palette.divider}` : 'none',
//     padding: 2, // Adjust the padding as needed
//     minWidth: 50 // Set a minimum width for responsiveness
//   }
// })

const TabsIcon = ({ id, type }) => {
  // ** State
  const [value, setValue] = useState('1')
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('All')
  const [agent, setAgent] = useState('')
  const [listPatterns, setListPatterns] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [openSendEmail, setOpenSendEmail] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('This Year')
  const [ContactData, setContactData] = useState({})
  const [contactInfo, setContactInfo] = useState({})
  const contentRef = useRef()

  useEffect(() => {
    if (contentRef.current) {
      // Trigger the print action when the component mounts
      contentRef.current.handlePrint()
    }
  }, []) // Run this effect once when the component mounts
  const getDateRange = () => {
    const today = new Date()
    switch (selectedRange) {
      case 'Today':
        return [startOfDay(today), endOfDay(today)]
      case 'Yesterday':
        const yesterday = sub(today, { days: 1 })

        return [startOfDay(yesterday), endOfDay(yesterday)]
      case 'Last 7 Days':
        return [sub(today, { days: 6 }), endOfDay(today)]
      case 'Last 30 Days':
        return [sub(today, { days: 29 }), endOfDay(today)]
      case 'This Month':
        return [startOfMonth(today), endOfMonth(today)]
      case 'Last Month':
        const firstDayLastMonth = sub(startOfMonth(today), { months: 1 })
        const lastDayLastMonth = sub(endOfMonth(today), { months: 1 })

        return [firstDayLastMonth, lastDayLastMonth]
      case 'This month last year':
        const firstDayLastYearMonth = sub(startOfMonth(today), { years: 1 })
        const lastDayLastYearMonth = sub(endOfMonth(today), { years: 1 })

        return [firstDayLastYearMonth, lastDayLastYearMonth]
      case 'This Year':
        return [startOfYear(today), endOfYear(today)]
      case 'Last Year':
        const firstDayLastYear = sub(startOfYear(today), { years: 1 })
        const lastDayLastYear = sub(endOfYear(today), { years: 1 })

        return [firstDayLastYear, lastDayLastYear]
      case 'Current financial year':
        // Add logic for your financial year
        // Example: return [financialYearStart, financialYearEnd];
        return [startOfYear(today), endOfYear(today)]
        break
      case 'Last financial year':
        // Add logic for your last financial year
        // Example: return [lastFinancialYearStart, lastFinancialYearEnd];
        const lastFinancialYearStart = sub(startOfYear(today), { years: 1 })
        const lastFinancialYearEnd = sub(endOfYear(today), { years: 1 })

        return [lastFinancialYearStart, lastFinancialYearEnd]
        break
      default:
        return null
    }
  }

  const startDate = getDateRange()[0].toLocaleDateString()
  const endDate = getDateRange()[1].toLocaleDateString()

  // const [responseData, setResponseData] = useState({})

  // const [dataAccountSummary, setDataAccountSummary] = useState([])
  console.log(selectedRange, 'selectedRange')
  console.log(startDate, endDate, 'start date, and end date')

  //** Variables
  const fullName = `${ContactData?.first_name} ${ContactData?.last_name} `

  // ** Hooks
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
    }
  }, [dataFetch])

  //** Functions

  //** data for CustomTable
  // if (type === 'customer') {
  //   setDataAccountSummary(prev => [
  //     ...prev,
  //     { label: 'Total Bill', value: 'AED' },
  //     { label: 'Total Payment', value: 'AED 0.00' },
  //     { label: 'Total Sales', value: 'AED 0.00' },
  //     { label: 'Total Received', value: 'AED 0.00' },
  //     { label: 'Advance Balance', value: 'AED 0.00' },
  //     { label: 'Balance due', value: 'AED 0.00' }
  //   ])
  // } else if (type === 'supplier') {
  //   setDataAccountSummary(prev => [
  //     ...prev,
  //     { label: 'Total Bill', value: 'AED' },
  //     { label: 'Total Payments', value: 'AED 0.00' },
  //     { label: 'Total Purchases', value: 'AED 0.00' },
  //     { label: 'Total paid', value: 'AED 0.00' },
  //     { label: 'Advance Balance', value: 'AED 0.00' },
  //     { label: 'Balance due', value: 'AED 0.00' }
  //   ])
  // }

  //second box
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

  const handleViewMore = () => {
    setViewOpen(prev => !prev)
  }

  const toggle = () => {
    setEditOpen(prevEditOpen => !prevEditOpen)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handlePaymentStatusChange = event => {
    setPaymentStatus(event.target.value)
  }
  const handleAgentChange = event => {
    setAgent(event.target.value)
  }
  const handleListPatternsChange = event => {
    setListPatterns(event.target.value)
  }
  const handleCheckBoxChange = () => {
    setCheckBox(prev => !prev)
  }
  const handleToggleSendEmail = () => {
    setOpenSendEmail(prev => !prev)
  }

  //test date range
  console.log(selectedRange)

  // print contact type
  console.log(type, 'print contact type')
  console.log(ContactData, 'ContactData')

  return (
    <>
      {ContactData ? (
        <>
          <Card>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {ContactData?.avatar ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={data.fullName}
                  sx={{ width: 110, height: 110, mb: 6 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                >
                  {getInitials(fullName)}
                </CustomAvatar>
              )}
              <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                {fullName}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={ContactData?.type}
                sx={{ fontWeight: 500 }}
                color={roleColors[data.role]}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
              <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Business Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {ContactData.supplier_business_name ? ContactData.supplier_business_name : ''}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Location:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.business_id}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CreditCardIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tax Number:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.tax_number}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {ContactData.prefix} {ContactData.name} {ContactData.middle_name} {ContactData.last_name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.email}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <ThreePIcon sx={{ mr: 2, color: 'text.secondary' }}></ThreePIcon>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact Status:</Typography>
                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={ContactData.contact_status}
                      sx={{ fontWeight: 500 }}
                      color={statusColors[ContactData.contact_status]}
                    />
                  </Box>
                </Grid>

                {/* <Grid item xs={12} lg={6}>
                {ContactData.contact_id && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact Id:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.contact_id}</Typography>
                  </Box>
                )}
                {ContactData.mobile && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CallIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Mobile:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.mobile}</Typography>
                  </Box>
                )}
                {ContactData.landline && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CallIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Landline:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.landline}</Typography>
                  </Box>
                )}
              </Grid> */}
              </Grid>

              {/* <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>
                {ContactData.alternate_number && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CallIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Alternate Number:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.alternate_number}</Typography>
                  </Box>
                )}
                {ContactData.tax_number && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CreditCardIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tax Number:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.tax_number}</Typography>
                  </Box>
                )}
                {ContactData.city && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>City:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.city}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.state && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>State:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.state}</Typography>
                  </Box>
                )}
                {ContactData.country && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Country:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.country}</Typography>
                  </Box>
                )}
                {ContactData.zip_code && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Zip Code:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.zip_code}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.address_line_1 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Address Line 1:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.address_line_1}</Typography>
                  </Box>
                )}
                {ContactData.address_line_2 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Address Line 2:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.address_line_2}</Typography>
                  </Box>
                )}
                {ContactData.dob && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <EventIcon sx={{ mr: 2, color: 'text.secondary' }}></EventIcon>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Date of Birth:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.dob}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid> */}

              {/* <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>
                {ContactData.pay_term_number && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <AccountBalanceIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      Payment Term Number:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.pay_term_number}</Typography>
                  </Box>
                )}
                {ContactData.pay_term_type && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <AccessTimeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Payment Term Type:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.pay_term_type}</Typography>
                  </Box>
                )}
                {ContactData.credit_limit !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CreditCardIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Credit Limit:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.credit_limit}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.created_by !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <BorderColorIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Created By:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.created_by}</Typography>
                  </Box>
                )}
                {ContactData.converted_on !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CropRotateIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Converted On:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.converted_on}</Typography>
                  </Box>
                )}
                {ContactData.converted_by !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CropRotateIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Converted By:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.converted_by}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.balance !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <AccountBalanceWalletIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Balance:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.balance}</Typography>
                  </Box>
                )}
                {ContactData.is_default !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <ChromeReaderModeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Is Default:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.is_default}</Typography>
                  </Box>
                )}
                {ContactData.shipping_address && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Shipping Address:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.shipping_address}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid> */}

              {/* <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>
                {ContactData.position && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <RadarIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Position:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.position}</Typography>
                  </Box>
                )}
                {ContactData.customer_group_id && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <DomainIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Customer Group ID:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.customer_group_id}</Typography>
                  </Box>
                )}
                {ContactData.crm_source && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <SourceIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>CRM Source:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.crm_source}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.crm_life_stage && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <ApprovalIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>CRM Life Stage:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.crm_life_stage}</Typography>
                  </Box>
                )}
                {ContactData.custom_field1 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Custom Field 1:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field1}</Typography>
                  </Box>
                )}
                {ContactData.custom_field2 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 2:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field2}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.custom_field3 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 3:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field3}</Typography>
                  </Box>
                )}
                {ContactData.custom_field4 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 4:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field4}</Typography>
                  </Box>
                )}
                {ContactData.custom_field5 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 5:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field5}</Typography>
                  </Box>
                )}
                {ContactData.custom_field6 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 6:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field6}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
              <Grid item xs={12} lg={6}>
                {ContactData.custom_field7 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 7:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field7}</Typography>
                  </Box>
                )}
                {ContactData.custom_field8 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 8:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field8}</Typography>
                  </Box>
                )}
                {ContactData.custom_field9 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                      <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      Custom Field 9:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field9}</Typography>
                  </Box>
                )}
                {ContactData.custom_field10 && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <FilePresentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Custom Field 10:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.custom_field10}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.deleted_at !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <DeleteIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Deleted At:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.deleted_at}</Typography>
                  </Box>
                )}
                {ContactData.created_at && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <CreateIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Created At:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.created_at}</Typography>
                  </Box>
                )}
                {ContactData.updated_at && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <UpdateIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Updated At:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.updated_at}</Typography>
                  </Box>
                )}
                {ContactData.price_group_id !== null && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <PaymentIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Price Group ID:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.price_group_id}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid> */}
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={toggle}>
                Edit
              </Button>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleViewMore}>
                View More
              </Button>
            </CardActions>
          </Card>
          <FormSendEmail data={ContactData} open={openSendEmail} close={handleToggleSendEmail} />
        </>
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

      <TabsWrapper panelTopRound='right' sx={{ mt: 12 }}>
        <Card sx={{ mt: 12 }}>
          <CardContent>
            <TabContext value={value}>
              <TabList variant='fullWidth' onChange={handleChange} aria-label='icon tabs example'>
                <Tab value='1' label='Legder' icon={<Icon icon='emojione-monotone:ledger' />} />
                {type === 'supplier' && (
                  <Tab value='2' label='Purchases' icon={<Icon icon='mdi:shopping-cart-outline' />} />
                )}
                {type === 'both' && (
                  <Tab value='2' label='Purchases' icon={<Icon icon='mdi:shopping-cart-outline' />} />
                )}

                {type === 'customer' && (
                  <Tab value='3' label='Sales' icon={<Icon icon='mdi:shopping-cart-outline' />} />
                )}
                {type === 'both' && <Tab value='3' label='Sales' icon={<Icon icon='mdi:shopping-cart-outline' />} />}

                <Tab value='4' label='Payment' icon={<Icon icon='streamline:payment-10' />} />
              </TabList>

              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TabPanel value='1'>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 6,
                          gap: 4,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Grid
                          item
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          sx={{
                            mb: 5,
                            mt: 5
                          }}
                        >
                          <FormControl fullWidth>
                            <DateRangeDropdown
                              selectedRange={selectedRange}
                              setSelectedRange={setSelectedRange}
                              getDateRange={getDateRange}
                            />
                          </FormControl>
                        </Grid>
                        <Box
                          sx={{
                            gap: 4,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                          }}
                        >
                          {/* <Button variant='contained' endIcon={<Icon icon='fa-solid:file-pdf' />}>
                            PDF
                          </Button> */}
                          {/* <PrintButton /> */}
                          <Button
                            target='_blank'
                            component={Link}
                            variant='contained'
                            href={`/apps/contacts/print/${id}/?type=${type}&startDate=${startDate}&endDate=${endDate}`}
                            endIcon={<Icon icon='fa-solid:file-pdf' />}
                          >
                            Print
                          </Button>
                          <Button
                            onClick={handleToggleSendEmail}
                            variant='contained'
                            endIcon={<Icon icon='clarity:email-solid' />}
                          >
                            Email
                          </Button>
                          {/* <IconBox>
                            <Icon icon='fa-solid:file-pdf' />
                            <Typography variant='caption'>PDF</Typography>
                          </IconBox>
                          <IconBox>
                            <Icon icon='clarity:email-solid' />
                            <Typography variant='caption'>Email</Typography>
                          </IconBox> */}
                        </Box>
                      </Box>
                    </Grid>
                    <Divider sx={{ m: '0 !important' }} />
                    <div id='yourPrintableAreaId'>
                      <Box sx={{ display: 'flex', padding: '10px 0', justifyContent: 'flex-start' }}>
                        <Typography sx={{ color: 'text.secondary' }}>
                          TEST 33002, Dubai,<br></br> Dubai Dubai, 00426
                        </Typography>
                      </Box>
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
                              range={`${getDateRange()[0].toLocaleDateString()} - ${getDateRange()[1].toLocaleDateString()}`}
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
                              range={`${getDateRange()[0].toLocaleDateString()} - ${getDateRange()[1].toLocaleDateString()}`}
                            />
                          )}
                        </Grid>
                      </Grid>
                      {getDateRange() && (
                        <LedgerTable
                          title={`Showing all invoices and payments between ${getDateRange()[0].toLocaleDateString()} and ${getDateRange()[1].toLocaleDateString()}`}
                        />
                      )}
                    </div>
                  </TabPanel>
                </Grid>
              </Grid>

              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TabPanel value='2'>
                    <Grid container spacing={6}>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mb: 5,
                          mt: 5
                        }}
                      >
                        <FormControl fullWidth>
                          <DateRangeDropdown
                            selectedRange={selectedRange}
                            setSelectedRange={setSelectedRange}
                            getDateRange={getDateRange}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Divider sx={{ m: '0 !important' }} />
                    <PurchasesTable />
                  </TabPanel>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TabPanel value='3'>
                    <Grid container spacing={6}>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mb: 2
                        }}
                      >
                        <FormControl fullWidth>
                          <DateRangeDropdown
                            selectedRange={selectedRange}
                            setSelectedRange={setSelectedRange}
                            getDateRange={getDateRange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mb: 2
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-standard-label'>Agent</InputLabel>
                          <Select
                            value={agent}
                            onChange={handleAgentChange}
                            displayEmpty
                            label='Agent'
                            labelId='demo-simple-select-standard-label'
                            inputProps={{ 'aria-label': 'Agent' }}
                          >
                            <MenuItem value='ashraf'>Ashraf</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mb: 2
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-standard-label'>Payment Status</InputLabel>
                          <Select
                            value={paymentStatus}
                            onChange={handlePaymentStatusChange}
                            displayEmpty
                            label='Payment Status'
                            labelId='demo-simple-select-standard-label'
                            inputProps={{ 'aria-label': 'Payment Status' }}
                          >
                            <MenuItem value='Due'>Due</MenuItem>
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Paid'>Paid</MenuItem>
                            <MenuItem value='Partial'>Partial</MenuItem>
                            <MenuItem value='Overdue'>Overdue</MenuItem>
                            <MenuItem value='Unclassified'>Unclassified</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mb: 2
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-standard-label'>List Patterns</InputLabel>
                          <Select
                            value={listPatterns}
                            onChange={handleListPatternsChange}
                            displayEmpty
                            label=' List Patterns'
                            labelId='demo-simple-select-standard-label'
                            inputProps={{ 'aria-label': ' List Patterns' }}
                          >
                            <MenuItem value='default'>Default</MenuItem>
                            <MenuItem value='agt'>AGT</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mb: 2
                        }}
                      >
                        <FormControl fullWidth>
                          <FormControlLabel
                            label='Subscriptions'
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                fontSize: '0.875rem',
                                color: 'text.secondary'
                              }
                            }}
                            control={<Checkbox checked={checkBox} color='primary' onChange={handleCheckBoxChange} />}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Divider sx={{ m: '0 !important' }} />
                    <SalesTable />
                  </TabPanel>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TabPanel value='4'>
                    <Divider sx={{ m: '0 !important' }} />
                    <PaymentTable />
                  </TabPanel>
                </Grid>
              </Grid>
            </TabContext>
          </CardContent>
        </Card>
      </TabsWrapper>

      {viewOpen && ContactData && (
        <ViewPopUp
          open={viewOpen}
          isEdit={true}
          toggle={setViewOpen}
          itemId={id}
          contact={type}
          contactData={ContactData}
        />
      )}

      {editOpen && (
        <DialogAddSuppliers isView={true} open={editOpen} isEdit={true} contact={type} toggle={toggle} itemId={id} />
      )}
    </>
  )
}

export const getServerSideProps = async context => {
  return {
    props: {
      id: context.params?.id || '',
      type: context.query?.type || ''
    }
  }
}

export default TabsIcon
