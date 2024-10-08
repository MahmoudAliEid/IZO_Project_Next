const RowOptions = ({ idx, remove }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = anchorEl

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    remove(idx)

    handleRowOptionsClose()
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='bx:dots-vertical-rounded' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <Tooltip title={`Delete this Row `}>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='bx:trash-alt' fontSize={20} />
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>
    </Fragment>
  )
}

// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Checkbox
} from '@mui/material'

// ** Formik
import { useField } from 'formik'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

import { getCookie } from 'cookies-next'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SearchPurchase from './SearchPurchase'

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

const CustomInputField = ({ name, value, onChange, disabled, multiline, rows }) => {
  const [field] = useField(name)

  return (
    <TextField
      {...field}
      value={value}
      onChange={onChange}
      fullWidth
      disabled={disabled}
      multiline={multiline}
      rows={rows}
    />
  )
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const CustomPurchaseTable = ({ rows, values, handleChange, remove, setFieldValue, push }) => {
  const [open, setOpen] = useState(false)
  const [searchProduct, setSearchProduct] = useState(null)

  const lastProduct = useSelector(state => state.getLastProduct?.data?.info)

  const [hiddenColumns, setHiddenColumns] = useState({})

  const toggleColumnVisibility = columnField => {
    setHiddenColumns(prevHidden => ({
      ...prevHidden,
      [columnField]: !prevHidden[columnField]
    }))
  }

  // ** Cookies
  const decimalFormate = getCookie('DecimalFormat')
  const currencyCode = getCookie('currency_code')

  // ** Functions
  // Utility function for formatting numbers
  const formatNumber = num => Number(num).toFixed(decimalFormate)

  // Utility function to calculate VAT
  const calculateVAT = (amount, vatRate) => Number(amount) * vatRate

  // Utility function for currency conversion
  const convertToCurrency = (amount, conversionRate) => Number(amount) / conversionRate

  // Utility function to convert back to currency
  // const convertBackToCurrency = (amount, conversionRate) => Number(amount) * conversionRate

  const calcAmountDiscount = discountAmount => {
    if (!discountAmount) return 0
    if (values.currency_id) {
      return Number(discountAmount) / Number(values.currency_id_amount)
    } else {
      return Number(discountAmount)
    }
  }

  const handleColumCurrency = (unitPriceBeforeDis, discountAmount, params) => {
    const currencyId = values.currency_id
    const currencyAmount = Number(values.currency_id_amount)
    const quantity = Number(values.items[params.idx].quantity)

    if (!currencyId) return

    if (currencyId) {
      // set unit price before discount currency
      // set unit price after discount currency
      // set total currency
      // const unitPriceBeforeDisCurr = (Number(unitPriceBeforeDis) / currencyAmount).toFixed(decimalFormate)
      const unitPriceBeforeDisCurr = convertToCurrency(unitPriceBeforeDis, currencyAmount)
      const unitPriceAfterDisCurr = unitPriceBeforeDisCurr - discountAmount
      const totalCurrency = quantity * unitPriceAfterDisCurr
      setFieldValue(`items.${params.idx}.unit_price_before_dis_curr`, formatNumber(unitPriceBeforeDisCurr))
      setFieldValue(`items.${params.idx}.unit_price_after_dis_curr`, formatNumber(unitPriceAfterDisCurr))
      setFieldValue(`items.${params.idx}.total_currency`, formatNumber(totalCurrency))
    }
  }

  const handleBeforeDiscount = (params, event) => {
    // field that will be calculated based on the unit price before discount
    // 1- unit_price_before_dis_include_vat
    // 2- unit_price_after_dis
    // 3- unit_price_after_dis_include_vat
    // 4- total
    // 100  vat ==0.05 ,
    // also change the unit_price_before_dis_curr
    // also change  the unit_price_after_dis_curr if (currency_id)
    const vat = Number(values.tax_value)

    const discountAmount = calcAmountDiscount(values.items[params.idx].amount_discount)

    const unitPriceBeforeDis = Number(event.target.value)

    const vatValueBeforeDis = calculateVAT(unitPriceBeforeDis, vat)

    const unitPriceBeforeDisIncludeVat = Number(unitPriceBeforeDis) + Number(vatValueBeforeDis)

    const unitPriceAfterDis = Number(unitPriceBeforeDis) - Number(discountAmount)

    const vatValueAfterDis = calculateVAT(unitPriceAfterDis, vat)

    const unitPriceAfterDisIncludeVat = Number(unitPriceAfterDis) + Number(vatValueAfterDis)

    setFieldValue(`items.${params.idx}.unit_price_after_dis`, formatNumber(unitPriceAfterDis))
    setFieldValue(`items.${params.idx}.unit_price_after_dis_include_vat`, formatNumber(unitPriceAfterDisIncludeVat))
    setFieldValue(`items.${params.idx}.unit_price_before_dis_include_vat`, formatNumber(unitPriceBeforeDisIncludeVat))
    setFieldValue(
      `items.${params.idx}.total`,
      formatNumber(Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisIncludeVat))
    )

    handleColumCurrency(unitPriceBeforeDis, discountAmount, params)
  }

  const handleBeforeDisIncludeVat = (params, event) => {
    // field that will be calculated based on the unit price before discount
    //  1- unit_price_before_dis
    // 2- unit_price_after_dis
    // 3- unit_price_after_dis_include_vat
    // 4- total
    const vat = Number(values.tax_value).toFixed(decimalFormate)
    const discountAmount = values.currency_id
      ? (Number(values.items[params.idx].amount_discount) / Number(values.currency_id_amount)).toFixed(decimalFormate)
      : Number(values.items[params.idx].amount_discount).toFixed(decimalFormate)

    const unitPriceBeforeDisIncludeVat = Number(event.target.value).toFixed(decimalFormate)

    const unitPriceBeforeDis = (Number(unitPriceBeforeDisIncludeVat) * 100) / (100 + Number(vat) * 100) //0.05

    const unitPriceAfterDis = (Number(unitPriceBeforeDis) - Number(discountAmount)).toFixed(decimalFormate)
    const vatValue = (unitPriceAfterDis * vat).toFixed(decimalFormate)
    const unitPriceAfterDisIncludeVat = (Number(unitPriceAfterDis) + Number(vatValue)).toFixed(decimalFormate)

    setFieldValue(`items.${params.idx}.unit_price_before_dis`, unitPriceBeforeDis)
    setFieldValue(`items.${params.idx}.unit_price_after_dis`, unitPriceAfterDis)
    setFieldValue(`items.${params.idx}.unit_price_after_dis_include_vat`, unitPriceAfterDisIncludeVat)
    setFieldValue(
      `items.${params.idx}.total`,
      (Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisIncludeVat)).toFixed(decimalFormate)
    )
    handleColumCurrency(unitPriceBeforeDis, discountAmount, params)
  }

  const handleBeforeDiscountCurrency = (params, event) => {
    //ToDo : Add logic for currency
    // field that will be calculated based on the unit price before discount
    // 1- unit_price_before_dis
    // 2- unit_price_after_dis
    // 3- unit_price_after_dis_include_vat
    // 4- total
    // 5- unit_price_after_dis_curr
    // 6- total_currency
    const vat = Number(values.tax_value)
    const discountAmount = calcAmountDiscount(values.items[params.idx].amount_discount)
    const discountAmountCurr = Number(values.items[params.idx].amount_discount)
    const unitPriceBeforeDisCurr = Number(event.target.value)
    const currencyAmount = Number(values.currency_id_amount)

    const unitPriceBeforeDis = Number(unitPriceBeforeDisCurr) * currencyAmount

    const vatValueBeforeDis = calculateVAT(unitPriceBeforeDis, vat)

    const unitPriceBeforeDisIncludeVat = Number(unitPriceBeforeDis) + Number(vatValueBeforeDis)
    const unitPriceAfterDis = Number(unitPriceBeforeDis) - Number(discountAmount)

    const vatValueAfterDis = calculateVAT(unitPriceAfterDis, vat)
    const unitPriceAfterDisCurr = Number(unitPriceBeforeDisCurr) - discountAmountCurr
    const unitPriceAfterDisIncludeVat = Number(unitPriceAfterDis) + Number(vatValueAfterDis)
    const totalCurrency = Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisCurr)
    const total = Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisIncludeVat)

    setFieldValue(`items.${params.idx}.unit_price_before_dis`, formatNumber(unitPriceBeforeDis))
    setFieldValue(`items.${params.idx}.unit_price_after_dis`, formatNumber(unitPriceAfterDis))
    setFieldValue(`items.${params.idx}.unit_price_before_dis_include_vat`, formatNumber(unitPriceBeforeDisIncludeVat))
    setFieldValue(`items.${params.idx}.unit_price_after_dis_include_vat`, formatNumber(unitPriceAfterDisIncludeVat))
    setFieldValue(`items.${params.idx}.unit_price_after_dis_curr`, formatNumber(unitPriceAfterDisCurr))
    setFieldValue(`items.${params.idx}.total`, formatNumber(total))
    setFieldValue(`items.${params.idx}.total_currency`, formatNumber(totalCurrency))
  }

  const updateAmountDiscount = (params, event) => {
    // ToDo : Add logic for currency
    // field that will be calculated based on the unit price before discount
    // 1- unit_price_after_dis
    // 2- unit_price_after_dis_include_vat
    // 3- total
    // 4- discount_percentage
    // 5- unit_price_after_dis_curr
    // 6- total_currency
    const { currency_id_amount, tax_value, currency_id } = values

    const vat = Number(tax_value) // 0.05

    const discountAmount = Number(event.target.value) // 10

    const unitPriceBeforeDis = Number(values.items[params.idx].unit_price_before_dis) // 100

    const unitPriceBeforeDisCurr = currency_id ? Number(values.items[params.idx].unit_price_before_dis_curr) : 0 // 100 / 3.67 = 27.32 || 100

    const unitPriceAfterDis = currency_id
      ? Number(unitPriceBeforeDis) - Number(discountAmount) * Number(currency_id_amount) // 100 - 10 * 3.67 = 63.3
      : Number(unitPriceBeforeDis) - Number(discountAmount) // 100 - 10 = 90

    const vatValue = calculateVAT(unitPriceAfterDis, vat) // 63.3 * 0.05 = 3.165 || 90 * 0.05 = 4.5

    const unitPriceAfterDisIncludeVat = Number(unitPriceAfterDis) + Number(vatValue) // 63.3 + 3.165 = 66.465 || 90 + 4.5 = 94.5

    const newDisPercentage = currency_id
      ? (discountAmount / unitPriceBeforeDisCurr) * 100 // (10 / 27.32) * 100 = 36.6
      : (discountAmount / unitPriceBeforeDis) * 100 // (10 / 100) * 100 = 10

    const unitPriceAfterDisCurr = currency_id ? Number(unitPriceBeforeDisCurr) - Number(discountAmount) : 0 // 27.32 - 10 = 17.32 || 0

    setFieldValue(`items.${params.idx}.percentage_discount`, newDisPercentage) // 36.6 || 10

    setFieldValue(`items.${params.idx}.unit_price_after_dis`, formatNumber(unitPriceAfterDis)) //63.3 || 90
    setFieldValue(`items.${params.idx}.unit_price_after_dis_include_vat`, formatNumber(unitPriceAfterDisIncludeVat)) // 66.465 || 94.5
    setFieldValue(
      `items.${params.idx}.total`,
      formatNumber(Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisIncludeVat))
    )
    setFieldValue(`items.${params.idx}.unit_price_after_dis_curr`, formatNumber(unitPriceAfterDisCurr)) // 17.32 || 0
    setFieldValue(
      `items.${params.idx}.total_currency`,
      formatNumber(Number(values.items[params.idx].quantity) * Number(unitPriceAfterDis))
    )
  }

  const updatePercentageDiscount = (params, event) => {
    // all fields that will be change is after dis and dis amount and total and total Currency
    const { currency_id_amount, tax_value, currency_id } = values

    const vat = Number(tax_value)

    const discountPercentage = Number(event.target.value)

    const discountAmount = (Number(values.items[params.idx].unit_price_before_dis) * discountPercentage) / 100

    const unitPriceBeforeDis = Number(values.items[params.idx].unit_price_before_dis)

    const unitPriceAfterDis = currency_id
      ? Number(unitPriceBeforeDis) - Number(discountAmount) * Number(currency_id_amount)
      : Number(unitPriceBeforeDis) - Number(discountAmount)

    const vatValue = Number(unitPriceAfterDis) * Number(vat)
    const unitPriceAfterDisIncludeVat = Number(unitPriceAfterDis) + Number(vatValue)
    // const discountAmount = (unitPriceBeforeDis * discountPercentage) / 100

    const unitPriceBeforeDisCurr = currency_id ? Number(unitPriceBeforeDis) / Number(currency_id_amount) : 0

    const unitPriceAfterDisCurr = currency_id ? Number(unitPriceBeforeDisCurr) - Number(discountAmount) : 0

    const totalCurrency = Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisCurr)

    setFieldValue(`items.${params.idx}.amount_discount`, formatNumber(discountAmount))
    setFieldValue(`items.${params.idx}.unit_price_after_dis`, formatNumber(unitPriceAfterDis))
    setFieldValue(`items.${params.idx}.unit_price_after_dis_include_vat`, formatNumber(unitPriceAfterDisIncludeVat))
    setFieldValue(
      `items.${params.idx}.total`,
      formatNumber(Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisIncludeVat))
    )

    setFieldValue(`items.${params.idx}.unit_price_after_dis_curr`, formatNumber(unitPriceAfterDisCurr))
    setFieldValue(`items.${params.idx}.total_currency`, formatNumber(totalCurrency))
  }

  // const handleUpdateAfterDiscountCurrency = (params, event) => {
  //   //ToDo : Add logic for currency

  //   const vat = Number(values.tax_value)

  //   const unitPiceAfterDisCurr = Number(event.target.value)

  //   const discountAmount = calcAmountDiscount(values.items[params.idx].amount_discount)

  //   const unitPriceBeforeDis =
  //     (Number(unitPiceAfterDisCurr) + Number(discountAmount)) * Number(values.currency_id_amount)
  //   const vatValueBeforeDis = calculateVAT(unitPriceBeforeDis, vat)

  //   const unitPriceBeforeDisIncludeVat = Number(unitPriceBeforeDis) + Number(vatValueBeforeDis)

  //   const unitPriceAfterDis = Number(unitPriceBeforeDis) - Number(discountAmount)

  //   const vatValueAfterDis = calculateVAT(unitPriceAfterDis, vat)

  //   const unitPriceAfterDisIncludeVat = Number(unitPriceAfterDis) + Number(vatValueAfterDis)

  //   const unitPriceBeforeDisCurr = Number(unitPriceBeforeDis) / Number(values.currency_id_amount)

  //   const totalCurrency = Number(values.items[params.idx].quantity) * Number(unitPiceAfterDisCurr)
  //   const total = Number(values.items[params.idx].quantity) * Number(unitPriceAfterDisIncludeVat)

  //   setFieldValue(`items.${params.idx}.unit_price_before_dis`, formatNumber(unitPriceBeforeDis))
  //   setFieldValue(`items.${params.idx}.unit_price_after_dis`, formatNumber(unitPriceAfterDis))

  //   setFieldValue(`items.${params.idx}.unit_price_before_dis_include_vat`, formatNumber(unitPriceBeforeDisIncludeVat))
  //   setFieldValue(`items.${params.idx}.unit_price_after_dis_include_vat`, formatNumber(unitPriceAfterDisIncludeVat))
  //   setFieldValue(`items.${params.idx}.unit_price_before_dis_curr`, formatNumber(unitPriceBeforeDisCurr))
  //   setFieldValue(`items.${params.idx}.total`, formatNumber(total))
  //   setFieldValue(`items.${params.idx}.total_currency`, formatNumber(totalCurrency))
  // }

  const columns = [
    {
      field: 'idx',
      headerName: 'No.',
      flex: 0.1,
      align: 'center',
      hide: hiddenColumns['idx'],
      minWidth: 10,
      renderCell: params => {
        return <span>{params.no + 1}</span>
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      hide: hiddenColumns['actions'],
      flex: 0.25,
      minWidth: 80,
      renderCell: params => <RowOptions idx={params.idx} remove={remove} />
    },

    {
      field: 'name',
      headerName: 'Product Name',
      flex: 0.35,
      align: 'center',
      hide: hiddenColumns['name'],
      minWidth: 150,
      renderCell: params => <LinkStyled>{params.name}</LinkStyled>
    },

    {
      field: 'description',
      headerName: 'Description',
      align: 'center',
      hide: hiddenColumns['description'],
      flex: 0.95,
      minWidth: 250,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.description`}
          value={values.items[params.idx].description}
          onChange={handleChange}
          multiline
          rows={4}
        />
      )
    },

    {
      field: 'quantity',
      headerName: 'Quantity',
      align: 'center',
      hide: hiddenColumns['quantity'],
      flex: 0.35,
      minWidth: 100,
      renderCell: params => (
        <Grid item xs={12}>
          <CustomInputField
            value={values.items[params.idx].quantity}
            name={`items.${params.idx}.quantity`}
            type='number'
            onChange={e => {
              if (e.target.value <= 0 || e.target.value === '0' || e.target.value === '') {
                setFieldValue(`items.${params.idx}.quantity`, 1)
              }
              handleChange(e)

              if (values.items[params.idx].unit_quantity > 0) {
                setFieldValue(
                  `items.${params.idx}.total`,
                  (Number(e.target.value) * Number(values.items[params.idx].unit_price_before_dis_include_vat)).toFixed(
                    decimalFormate
                  )
                )
                setFieldValue(
                  `items.${params.idx}.total_currency`,
                  (Number(e.target.value) * Number(values.items[params.idx].unit_price_after_dis_curr)).toFixed(
                    decimalFormate
                  )
                )
              } else {
                setFieldValue(
                  `items.${params.idx}.total`,
                  (Number(e.target.value) * Number(values.items[params.idx].unit_price_before_dis_include_vat)).toFixed(
                    decimalFormate
                  )
                )
              }
            }}
          />
        </Grid>
      )
    },

    {
      field: 'unit',
      headerName: 'Unit',
      align: 'center',
      hide: hiddenColumns['unit'],
      flex: 0.25,
      minWidth: 110,
      renderCell: params => (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
            <Select
              value={values.items[params.idx].unit}
              name={`items.${params.idx}.unit`}
              onChange={e => {
                handleChange(e)
              }}
              id='demo-simple-select'
              label='Unit'
              fullWidth
            >
              {rows[params.idx].all_unit && rows[params.idx].all_unit.length > 0 ? (
                rows[params.idx].all_unit.map((unit, idx) => (
                  <MenuItem
                    key={idx}
                    value={unit.id}
                    onClick={() => {
                      setFieldValue(`items.${params.idx}.list_prices`, unit.list_price)
                      setFieldValue(`items.${params.idx}.child_price`, '')
                      setFieldValue('parent_price', 0)

                      const price_id = 0

                      // set price value based on price_id in all items row if it's unit is null
                      values.items.forEach(() => {
                        if (unit.list_price.length > 0) {
                          const price = unit.list_price.find(price => price.line_id === price_id)

                          if (price) {
                            const priceValue = price.price

                            setFieldValue(`items.${params.idx}.price`, priceValue)
                            setFieldValue(
                              `items.${params.idx}.total`,
                              Number(priceValue) * Number(values.items[params.idx].quantity)
                            )
                          } else if (price === null) {
                            setFieldValue(`items.${params.idx}.price`, 0)
                            setFieldValue(`items.${params.idx}.total`, 0)
                          } else {
                            return
                          }
                        }
                      })
                    }}
                  >
                    {unit.value}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={''}>No Units</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      )
    },

    {
      field: 'child_price',
      headerName: 'List Prices',
      align: 'center',
      hide: hiddenColumns['child_price'],
      flex: 0.35,
      minWidth: 150,
      renderCell: params => (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>List Prices</InputLabel>
            <Select
              value={values.items[params.idx].child_price}
              name={`items.${params.idx}.child_price`}
              onChange={event => {
                handleChange(event)
              }}
              id='demo-simple-select'
              label='List Prices'
              fullWidth
            >
              <MenuItem
                onClick={() => {
                  const parentPrice = values.parent_price
                  const listPrice = values.items[params.idx].list_prices
                  if (listPrice) {
                    const childPrice = listPrice.find(price => price.line_id === parentPrice)
                    setFieldValue(`items.${params.idx}.price`, childPrice?.price)
                  }
                }}
                value={''}
              >
                Please Select
              </MenuItem>
              {rows[params.idx].list_prices && rows[params.idx].list_prices.length > 0
                ? rows[params.idx].list_prices.map((price, idx) => (
                    <MenuItem
                      onClick={() => {
                        setFieldValue(`items.${params.idx}.unit_price_before_dis`, price.price ? price.price : 0)
                        setFieldValue(
                          `items.${params.idx}.total`,
                          (Number(values.items[params.idx].quantity) * Number(price.price)).toFixed(decimalFormate)
                        )
                      }}
                      key={idx}
                      value={price.line_id}
                    >
                      {price.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Grid>
      )
    },
    //TODO: Add unit price before discount( any other logic)
    {
      field: 'unit_price_before_dis',
      headerName: `Unit Price(Before Dis) ${currencyCode}`,
      align: 'center',
      hide: hiddenColumns['unit_price_before_dis'],
      flex: 0.25,
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.unit_price_before_dis`}
          value={values.items[params.idx].unit_price_before_dis}
          onChange={event => {
            handleChange(event)
            handleBeforeDiscount(params, event)
          }}
        />
      )
    },
    //TODO: Add unit price before discount include vat( any other logic)
    {
      field: 'unit_price_before_dis_include_vat',
      headerName: `Unit Price(Before Dis) Include vat ${currencyCode}`,
      align: 'center',
      hide: hiddenColumns['actions'],
      flex: 0.25,
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.unit_price_before_dis_include_vat`}
          value={values.items[params.idx].unit_price_before_dis_include_vat}
          onChange={event => {
            handleChange(event)
            handleBeforeDisIncludeVat(params, event)
          }}
        />
      )
    },
    {
      field: 'unit_price_before_dis_curr',
      headerName: `Unit Price(Before Dis) ${values.currency_symbol}`,
      align: 'center',
      hide: hiddenColumns['unit_price_before_dis_curr'],
      flex: 0.25,
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.unit_price_before_dis_curr`}
          value={values.items[params.idx].unit_price_before_dis_curr}
          onChange={event => {
            handleChange(event)
            handleBeforeDiscountCurrency(params, event)
          }}
        />
      )
    },
    // ** Discount
    {
      field: 'amount_discount',
      headerName: 'Amount Discount',
      align: 'center',
      hide: hiddenColumns['amount_discount'],
      flex: 0.25,
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.amount_discount`}
          value={values.items[params.idx].amount_discount}
          onChange={event => {
            handleChange(event)
            updateAmountDiscount(params, event)
          }}
        />
      )
    },

    {
      field: 'percentage_discount',
      headerName: 'Percentage Discount',
      align: 'center',
      hide: hiddenColumns['percentage_discount'],
      flex: 0.25,
      minWidth: 100,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.percentage_discount`}
          value={values.items[params.idx].percentage_discount}
          onChange={event => {
            handleChange(event)
            updatePercentageDiscount(params, event)
          }}
        />
      )
    },
    //TODO: Add unit price after discount( any other logic)
    {
      field: 'unit_price_after_dis',
      headerName: `Unit Price(After Dis) ${currencyCode}`,
      align: 'center',
      hide: hiddenColumns['unit_price_after_dis'],
      flex: 0.25,
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.unit_price_after_dis`}
          value={values.items[params.idx].unit_price_after_dis}
          onChange={handleChange}
          disabled={true}
        />
      )
    },
    {
      field: 'unit_price_after_dis_curr',
      headerName: `Unit Price(After Dis) ${values.currency_symbol}`,
      align: 'center',
      flex: 0.25,
      hide: hiddenColumns['unit_price_after_dis_curr'],
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.unit_price_after_dis_curr`}
          value={values.items[params.idx].unit_price_after_dis_curr}
          onChange={handleChange}
          disabled={true}
        />
      )
    },
    {
      field: 'unit_price_after_dis_include_vat',
      headerName: `Unit Price(After Dis) Include vat ${currencyCode}`,
      align: 'center',
      flex: 0.25,
      hide: hiddenColumns['unit_price_after_dis_include_vat'],
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.unit_price_after_dis_include_vat`}
          value={values.items[params.idx].unit_price_after_dis_include_vat}
          onChange={handleChange}
          disabled={true}
        />
      )
    },

    {
      field: 'total',
      headerName: 'Total AED',
      align: 'center',
      flex: 0.25,
      hide: hiddenColumns['total'],
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.total`}
          value={
            values.items[params.idx].total ||
            Number(values.items[params.idx].price * values.items[params.idx].quantity).toFixed(decimalFormate)
          }
          onChange={event => {
            handleChange(event)
          }}
          disabled={true}
        />
      )
    },
    {
      field: 'total_currency',
      headerName: 'Total Currency',
      align: 'center',
      flex: 0.25,
      hide: hiddenColumns['total_currency'],
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.total_currency`}
          value={values.items[params.idx].total_currency}
          onChange={handleChange}
          disabled={true}
        />
      )
    },
    {
      field: 'mfg_date',
      headerName: 'MFG Date / EXP Date',
      align: 'center',
      flex: 0.25,
      hide: hiddenColumns['mfg_date'],
      minWidth: 110,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.mfg_date`}
          value={values.items[params.idx].mfg_date}
          onChange={handleChange}
        />
      )
    }
  ]

  useEffect(() => {
    if (values.items && values.items.length > 0) {
      setFieldValue(
        'total_items',
        values.items.map(item => Number(item.quantity)).reduce((acc, curr) => acc + curr, 0)
      )
    }
  }, [setFieldValue, values])

  useEffect(() => {
    if (values.items && values.items.length > 0) {
      setFieldValue(
        'net_total_amount',
        values.items
          .map(item => Number(item.price) * Number(item.quantity))
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(decimalFormate)
      )
    }
  }, [setFieldValue, values, decimalFormate])

  useEffect(() => {
    values.items.map((item, idx) => {
      if (item.unit) {
        const arrOfUnit = item.all_unit

        const unit = arrOfUnit && arrOfUnit.length > 0 && arrOfUnit.find(unit => unit.id === item.unit)
        if (unit) {
          setFieldValue(`items.${idx}.list_prices`, unit.list_price)
        }
      }
    })
  }, [setFieldValue, values.items])

  useEffect(() => {
    if (lastProduct) {
      push({
        id: lastProduct[0].id,
        name: lastProduct[0].text,
        total: lastProduct[0]?.total || 0,
        variation_id: lastProduct[0].variation_id,
        cost: lastProduct[0].cost === 0 ? lastProduct[0].all_unit[0].list_price[0].price : lastProduct[0].cost,
        line_store: '',
        product_id: lastProduct[0].product_id,
        quantity: 1,
        price: lastProduct[0].cost === 0 ? lastProduct[0].all_unit[0].list_price[0].price : lastProduct[0].cost,
        unit: 1,
        store: '',
        all_unit: lastProduct[0].all_units,
        initial: false,
        unit_quantity: 1,
        child_price: '',
        list_prices: []
      })
    }
  }, [lastProduct, push])

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const reorderedRows = reorder(rows, result.source.index, result.destination.index)

    // setMainRows(reorderedRows)
    setFieldValue('items', reorderedRows)
    console.log(reorderedRows, 'reordered Rows🍤🍤🍤')
  }

  const filteredColumns = columns.filter(column => {
    if (values.currency_id) {
      return column
    } else {
      return (
        column.field !== 'unit_price_before_dis_curr' &&
        column.field !== 'unit_price_after_dis_curr' &&
        column.field !== 'total_currency'
      )
    }
  })

  const HandleHideColumn = ({ initialColumns, toggleColumnVisibility }) => {
    // Step 1: Manage columns state with useState
    const [columns] = useState(initialColumns)
    const [anchorEl, setAnchorEl] = useState(null)

    // Step 2: Modify hide value in state
    // const modifyHideValue = fieldName => {
    //   const updatedColumns = columns.map(column => {
    //     if (column.field === fieldName) {
    //       return { ...column, hide: !column.hide } // Toggle hide value
    //     }

    //     return column
    //   })
    //   setColumns(updatedColumns) // Step 3: Update state
    // }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleOpen = event => {
      setAnchorEl(event.currentTarget)
    }

    return (
      <Fragment>
        <Box>
          <Button variant='outlined' color='primary' onClick={handleOpen} sx={{ my: 2 }}>
            Hide Columns
          </Button>
        </Box>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          {columns.map((column, idx) => (
            <MenuItem
              key={idx}
              onClick={() => toggleColumnVisibility(column.field)} // Toggle hide value
            >
              <Checkbox
                checked={!column.hide} // Checkbox is checked if column is visible (hide is false)
                onChange={() => toggleColumnVisibility(column.field)} // Trigger hide/show on change
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    )
  }

  return (
    <>
      <SearchPurchase
        rows={values.items}
        values={values}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        push={push}
        setOpen={setOpen}
      />
      <HandleHideColumn initialColumns={filteredColumns} toggleColumnVisibility={toggleColumnVisibility} />

      <DragDropContext onDragEnd={onDragEnd}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead
              sx={
                {
                  // '& .MuiTableCell-root': {
                  //   backgroundColor: theme => theme.palette.background.default,
                  //   // backgroundColor: 'transparent',
                  //   color: 'text.secondary',
                  //   backdropFilter: `saturate(200%) blur(6px)`,
                  //   fontSize: '.8rem'
                  // },
                  // border: theme => `1px solid ${theme.palette.divider} !important`,
                  // borderRadius: '5px'
                }
              }
            >
              <TableRow>
                {filteredColumns.map((column, idx) => (
                  <TableCell
                    key={idx}
                    align={column.align || 'center'}
                    sx={{
                      minWidth: column.minWidth,
                      flex: column.flex,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',

                      display: column.hide ? 'none' : 'auto'
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <Droppable droppableId='droppable'>
              {provided => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {values.items && values.items.length > 0 ? (
                    values.items.map((row, idx) => (
                      <Draggable key={row.id} draggableId={row.id.toString()} index={idx}>
                        {provided => (
                          <TableRow
                            hover
                            role='checkbox'
                            key={idx}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              display: row.id === -1 ? 'none' : 'auto'
                            }}
                          >
                            {filteredColumns.map((column, index) => {
                              const params = row[column.field]
                              const no = row.id === -1 ? idx - 1 : idx

                              return (
                                <TableCell
                                  key={index + 1}
                                  align={column.align}
                                  sx={{ display: column.hide ? 'none' : 'auto' }}
                                >
                                  {column.renderCell ? column.renderCell({ ...row, idx: idx, no: no }) : params}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell colSpan={8}>
                        <Typography variant='body2' align='center' sx={{ my: 10 }}>
                          No Rows
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
      {open && (
        <Dialog
          open={open}
          onClose={setTimeout(() => {
            setOpen(false)
          }, 2000)}
          maxWidth='md'
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              width: '100%',
              maxHeight: 'calc(100% - 1rem)',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          scroll='body'
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '16px 0'
              }}
            >
              <ProgressCustomization />
            </div>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default CustomPurchaseTable
