import { Fragment } from 'react'

// ** Numeric Input
import { NumericFormat } from 'react-number-format'
// ** Cookies
import { getCookie } from 'cookies-next'
// ** MUI
import { Typography } from '@mui/material'

const CustomNumericStyle = ({ value }) => {
  // ** Cookies
  const transText = getCookie('fontStyle')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  return (
    <Fragment>
      {value !== '' ? (
        <Typography noWrap sx={{ color: 'text.secondary', textTransform: transText }}>
          {CurrencySymbolPlacement === 'after' ? (
            <>
              <NumericFormat
                value={value}
                isNumericString={true}
                displayType={'text'}
                disabled
                customInput={Typography}
                variant='outlined'
                thousandSeparator
              />
              {` ${currency_code}`}
            </>
          ) : (
            <>
              {`${currency_code} `}
              <NumericFormat
                value={value}
                isNumericString={true}
                displayType={'text'}
                disabled
                customInput={Typography}
                variant='outlined'
                thousandSeparator
              />
            </>
          )}
        </Typography>
      ) : (
        <Typography variant='caption' noWrap sx={{ color: 'text.secondary', textTransform: transText }}>
          Not available
        </Typography>
      )}
    </Fragment>
  )
}

export default CustomNumericStyle
