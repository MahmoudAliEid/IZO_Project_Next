// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Hooks
// import { useSettings } from 'src/@core/hooks/useSettings' // ** Hooks Imports
// import useBgColor from 'src/@core/hooks/useBgColor'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { sub, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'

import LedgerTable from 'src/@core/components/customerGroups/contactView'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import BusinessIcon from '@mui/icons-material/Business' // Business Icon
import DomainIcon from '@mui/icons-material/Domain' // Type Icon
import ThreePIcon from '@mui/icons-material/ThreeP'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import PersonIcon from '@mui/icons-material/Person' // Name Icon
import EmailIcon from '@mui/icons-material/Email' // Email Icon
import CallIcon from '@mui/icons-material/Call' // Mobile Icon
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import LocationOnIcon from '@mui/icons-material/LocationOn' // Address Icon
import EventIcon from '@mui/icons-material/Event' // Date of Birth Icon
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import RadarIcon from '@mui/icons-material/Radar'
import SourceIcon from '@mui/icons-material/Source'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance' // Payment Term Number Icon
import AccessTimeIcon from '@mui/icons-material/AccessTime' // Payment Term Type Icon
import ApprovalIcon from '@mui/icons-material/Approval'
import DeleteIcon from '@mui/icons-material/Delete' // Deleted At Icon
import CreateIcon from '@mui/icons-material/Create' // Created At Icon
import UpdateIcon from '@mui/icons-material/Update' // Updated At Icon
import PaymentIcon from '@mui/icons-material/Payment' // Price Group ID Icon
import CreditCardIcon from '@mui/icons-material/CreditCard' // Tax Number Icon
// import CheckIcon from '@mui/icons-material/Check' // Contact Status Icon
// import LocationCityIcon from '@mui/icons-material/LocationCity' // City Icon
// import LocationSearchingIcon from '@mui/icons-material/LocationSearching' // State Icon
// import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined' // Country Icon
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline' // Contact ID Icon
// import PlaceIcon from '@mui/icons-material/Place' // Zip Code Icon
import BadgeIcon from '@mui/icons-material/Badge'
import BorderColorIcon from '@mui/icons-material/BorderColor'

// import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import CropRotateIcon from '@mui/icons-material/CropRotate'

// ** React Imports
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchViewContact } from 'src/store/apps/contacts/getViewContactSlice'
import SidebarEditUser from 'src/views/apps/user/list/EditUserDrawer'
import DateRangeDropdown from 'src/@core/components/dateRange/DateRangeDropdown'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import AdapterDayjs from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'

// import MenuItem from '@mui/material/MenuItem'
// import { styled } from '@mui/material/styles'
// import TextField from '@mui/material/TextField'

// import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'

import CardActions from '@mui/material/CardActions'

// import DialogTitle from '@mui/material/DialogTitle'
// import FormControl from '@mui/material/FormControl'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'
// import InputAdornment from '@mui/material/InputAdornment'
// import LinearProgress from '@mui/material/LinearProgress'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
// import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

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
const IconBox = styled(Box)(({ theme }) => {
  // ** Hook
  // const { settings } = useSettings()
  // const bgColors = useBgColor()

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally and vertically
    flexDirection: 'column', // Stack the content vertically
    textAlign: 'center', // Center text content if any

    // color: theme.palette.text.primary,
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.06)} !important`,

    // boxShadow: theme.shadows[settings.skin === 'bordered' ? 0 : 7],
    border: `1px solid ${theme.palette.primary.main}`,

    // border: settings.skin === 'bordered' ? `1px solid ${theme.palette.divider}` : 'none',
    padding: 2, // Adjust the padding as needed
    minWidth: 50 // Set a minimum width for responsiveness
  }
})

const TabsIcon = ({ id, type }) => {
  // ** State
  const [value, setValue] = useState('1')
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')

  const [editOpen, setEditOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('This Year')
  const [ContactData, setContactData] = useState({
    business_id: 1,
    type: 'supplier',
    supplier_business_name: 'Helwan University',
    name: 'Ali',
    prefix: 'Mr.',
    first_name: 'Ali',
    middle_name: 'sd',
    last_name: 'Hatem',
    email: 'alihatem7201738@gmail.com',
    contact_id: '00019',
    contact_status: 'active',
    tax_number: '435',
    city: 'Giza',
    state: 'Qanater facility',
    country: 'Egypt',
    address_line_1: 'Egypt | Giza | The origin of the Qanater | BaHarmes',
    address_line_2: 'Egypt | Giza | The origin of the Qanater | BaHarmes',
    zip_code: '12966',
    dob: '0000-00-00',
    mobile: '1026159353',
    landline: '12',
    alternate_number: '1026159353',
    pay_term_number: 34,
    pay_term_type: 'days',
    credit_limit: 1,
    created_by: 3,
    converted_by: 1,
    converted_on: 1,
    balance: '0.0000',
    total_rp: 0,
    total_rp_used: 0,
    total_rp_expired: 0,
    is_default: 0,
    shipping_address: 'Egypt/Giza/The origin of the Qanater/BaHarmes',
    position: 1,
    customer_group_id: 1,
    crm_source: 1,
    crm_life_stage: 1,
    custom_field1: 'wewe',
    custom_field2: 'dfsdf',
    custom_field3: 'dsd',
    custom_field4: 'sdfsdf',
    custom_field5: 'sdfsdf',
    custom_field6: 'sdfsdf',
    custom_field7: 'sdfsdf',
    custom_field8: 'sdfs',
    custom_field9: 'sdfsd',
    custom_field10: 'sdf',
    deleted_at: 1,
    created_at: '2023-11-16T12:03:39.000000Z',
    updated_at: '2023-11-16T12:03:39.000000Z',
    price_group_id: 1
  })

  //** Variables
  const fullName = `${ContactData?.first_name} ${ContactData?.last_name} `

  // ** Hooks
  const dispatch = useDispatch()
  const dataFetch = useSelector(state => state.getViewContact?.contact)

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // ** Fetch data from redux
  useEffect(() => {
    if (token && url && id) {
      dispatch(fetchViewContact({ token, id }))
    }
  }, [token, url, id, dispatch])

  useEffect(() => {
    if (dataFetch) {
      setContactData(dataFetch)
    }
  }, [dataFetch])

  //** Functions

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
        break
      case 'Last financial year':
        // Add logic for your last financial year
        // Example: return [lastFinancialYearStart, lastFinancialYearEnd];
        break
      default:
        return null
    }
  }

  const handleViewMore = () => {
    console.log('handle view more')
  }

  const toggle = () => {
    setEditOpen(prevEditOpen => !prevEditOpen)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //test date range
  console.log(selectedRange)

  // print contact type
  console.log(type, 'print contact type')

  return (
    <>
      {ContactData ? (
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
                {ContactData.supplier_business_name && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Business Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.supplier_business_name}</Typography>
                  </Box>
                )}
                {ContactData.business_id && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Business Id:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.business_id}</Typography>
                  </Box>
                )}
                {ContactData.type && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <BadgeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Type:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.type}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
                {ContactData.name && ContactData.middle_name && ContactData.last_name && ContactData.prefix && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {ContactData.prefix} {ContactData.name} {ContactData.middle_name}
                      {ContactData.last_name}
                    </Typography>
                  </Box>
                )}
                {ContactData.email && (
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ContactData.email}</Typography>
                  </Box>
                )}
                {ContactData.contact_status && (
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
                )}
              </Grid>

              <Grid item xs={12} lg={6}>
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
              </Grid>
            </Grid>

            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
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
            </Grid>

            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
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
            </Grid>

            <Grid container spacing={6} sx={{ mt: 6, mb: 3 }}>
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
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={toggle}>
              Edit
            </Button>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleViewMore()}>
              View More
            </Button>
          </CardActions>
        </Card>
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
                <Tab value='2' label='Purchases' icon={<Icon icon='mdi:shopping-cart-outline' />} />
                <Tab value='3' label='Payment' icon={<Icon icon='streamline:payment-10' />} />
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
                        <Box>
                          <DateRangeDropdown
                            selectedRange={selectedRange}
                            setSelectedRange={setSelectedRange}
                            getDateRange={getDateRange}
                          />
                        </Box>
                        <Box
                          sx={{
                            gap: 4,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                          }}
                        >
                          <IconBox>
                            <Icon icon='fa-solid:file-pdf' />
                            <Typography variant='caption'>PDF</Typography>
                          </IconBox>
                          <IconBox>
                            <Icon icon='clarity:email-solid' />
                            <Typography variant='caption'>Email</Typography>
                          </IconBox>
                        </Box>
                      </Box>
                    </Grid>
                    {getDateRange() && (
                      <LedgerTable
                        title={`Showing all invoices and payments between ${getDateRange()[0].toLocaleDateString()} and ${getDateRange()[1].toLocaleDateString()}`}
                      />
                    )}
                  </TabPanel>
                </Grid>
              </Grid>
              <TabPanel value='2'>
                <Typography>
                  Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa
                  chups sesame snaps halvah.
                </Typography>
              </TabPanel>
              <TabPanel value='3'>
                <Typography>
                  Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie
                  roll carrot cake gummi bears.
                </Typography>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </TabsWrapper>
      {editOpen && <SidebarEditUser open={editOpen} toggle={toggle} itemId={id} />}
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
