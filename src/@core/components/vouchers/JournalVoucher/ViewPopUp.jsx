import { useState, useEffect, Fragment } from 'react'

// ** MUI Components
import { Dialog, Typography, Chip, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Custom Components
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { ViewJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/Actions/getViewJVSlice'

// ** Cookies
import { getCookie } from 'cookies-next'

const ViewPopUp = ({ open, toggle, id }) => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const store = useSelector(state => state.getViewJVSlice.data)
  const transText = getCookie('fontStyle')
  const theme = useTheme()

  useEffect(() => {
    dispatch(ViewJournalVoucher({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (store.value?.length > 0) {
      setData(store.value[0])
    }
  }, [store])

  const handleCloseDialog = () => {
    toggle()
  }

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'AED'
    }).format(amount)
  }

  const renderInfoItem = (label, value) => (
    <Typography
      sx={{
        ml: 3,
        fontWeight: 700,
        color: 'text.secondary',
        textTransform: transText,
        mb: 2
      }}
    >
      {label}:&nbsp;
      <Chip
        label={value}
        size='small'
        sx={{
          '& .MuiChip-label': value > 0 ? {} : { textTransform: transText },
          wordWrap: 'break-word'
        }}
      />
    </Typography>
  )

  const renderDataItems = (info, index) => (
    <Box
      key={index}
      sx={{
        background: theme.palette.mode === 'light' ? '#FFFFFF' : '#191919',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(6.3px)',
        WebkitBackdropFilter: 'blur(6.3px)',
        border: theme.palette.mode === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(176, 170, 170, 0.3)',
        textTransform: transText,
        p: 3,
        mb: 3
      }}
    >
      {renderInfoItem('Account', info.accountName)}
      {renderInfoItem('Credit', formatCurrency(info.credit))}
      {renderInfoItem('Debit', formatCurrency(info.debit))}
    </Box>
  )

  return (
    <Fragment>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='lg' scroll='body' sx={{ width: '100%' }}>
        <CustomHeader title='View Journal Voucher' handleClose={handleCloseDialog} divider={false} />
        <Box
          sx={{
            p: 3,
            m: 3
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, mb: 3 }}>
            <Typography sx={{ ml: 3, fontWeight: 700, color: 'text.secondary', textTransform: transText }}>
              Amount:&nbsp;
              <Chip
                label={data.amount ? formatCurrency(data.amount) : ''}
                sx={{
                  '& .MuiChip-label': { textTransform: transText },
                  wordWrap: 'break-word'
                }}
              />
            </Typography>
            <Typography sx={{ ml: 3, fontWeight: 700, color: 'text.secondary', textTransform: transText }}>
              Date:&nbsp;
              <Chip
                label={
                  data.date
                    ? new Date(data.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : ''
                }
                sx={{
                  '& .MuiChip-label': { textTransform: transText },
                  wordWrap: 'break-word'
                }}
              />
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 3,
              m: 3,
              flexWrap: 'wrap',
              flexFlow: 'row wrap',
              flexShrink: 2,
              gap: 4
            }}
          >
            {data?.items && data.items.length > 0 && data.items.map(renderDataItems)}
          </Box>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default ViewPopUp
