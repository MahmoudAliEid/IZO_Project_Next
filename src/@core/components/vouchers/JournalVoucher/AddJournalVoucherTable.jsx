// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'

import {
  IconButton,
  FormControl,
  Typography,
  Box,
  Select,
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  Tooltip,
  Menu,
  Button
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

// ** Store
import { useSelector, useDispatch } from 'react-redux'

// ** next cookies
import { getCookie } from 'cookies-next'
import { fetchCreateJournalVoucher } from 'src/store/apps/vouchers/journalVoucher/getCreateJournalVoucher'
import notify from 'src/utils/notify'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.footer}`]: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.mode === 'light' ? '#f3f4f6' : '#424242',
    border: 'none'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

// const CustomInput = ({ values, params, setFieldValue, handleChange, ...props }) => {
//   useEffect(() => {
//     if (values.table[params.idx].credit > 0) setFieldValue(`table.${params.idx}.disabled_debit`, true)
//     else setFieldValue(`table.${params.idx}.disabled_debit`, false)
//   }, [values.table, setFieldValue, params])

//   return (
//     <FormControl fullWidth>
//       <TextField
//         {...props}
//         onChange={event => {
//           handleChange(event)
//           if (Number(event.target.value) > 0) setFieldValue(`table.${params.idx}.disabled_debit`, true)
//           else setFieldValue(`table.${params.idx}.disabled_debit`, false)
//         }}
//         onBlur={handleBlur}
//       />
//     </FormControl>
//   )
// }

const AddJournalVoucherTable = ({ values, handleChange, remove, setFieldValue, push, handleBlur }) => {
  // ** States
  const [data, setData] = useState([])
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  const transText = getCookie('fontStyle')

  // ** Hooks
  const dispatch = useDispatch()

  // ** Vars
  const store = useSelector(state => state.getCreateJournalVoucher.data?.value)

  // ** UseEffects
  useEffect(() => {
    dispatch(fetchCreateJournalVoucher())
  }, [dispatch])

  useEffect(() => {
    if (store !== null) {
      setData(store)
    }
  }, [store])
  // ** columns
  const columns = [
    {
      field: 'account_id',
      headerName: 'Account',
      flex: 0.5,
      align: 'center',
      minWidth: 250,
      renderCell: params => (
        <>
          {data?.accounts && data?.accounts.length > 0 && (
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                selectOnFocus
                fullWidth
                id='combo-box-demo'
                name={`table.${params.idx}.account_id`}
                // value={values.accountText}
                value={data?.accounts.find(account => account.value === values.table[params.idx].accountText) || null}
                onChange={(event, newValue) => {
                  setFieldValue(`table.${params.idx}.accountText`, newValue.value)
                  setFieldValue(`table.${params.idx}.account_id`, newValue?.id || '')
                }}
                options={data?.accounts || []}
                getOptionLabel={option => option.value || ''}
                renderInput={params => <TextField fullWidth {...params} label='Account' />}
              />
            </FormControl>
          )}
        </>
      )
    },
    {
      field: 'credit',
      headerName: 'Credit',
      flex: 0.35,
      align: 'center',
      minWidth: 170,
      renderCell: params => (
        <FormControl fullWidth>
          <TextField
            fullWidth
            disabled={values.table[params.idx].disabled_credit}
            name={`table.${params.idx}.credit`}
            value={values.table[params.idx].credit}
            onChange={event => {
              handleChange(event)
              if (Number(event.target.value) > 0) setFieldValue(`table.${params.idx}.disabled_debit`, true)
              else setFieldValue(`table.${params.idx}.disabled_debit`, false)
            }}
            onClick={event => {
              event.target.select()

              if (params.idx + 1 === values.table.length) {
                push({
                  account_id: '',
                  credit: 0,
                  debit: 0,
                  cost_center_id: '',
                  text: '',
                  accountText: '',
                  disabled_debit: false,
                  disabled_credit: false
                })
              }
            }}
            onBlur={handleBlur}
          />
        </FormControl>
      )
    },
    {
      field: '',
      headerName: '',
      flex: 0.1,
      align: 'center',
      minWidth: 30,
      renderCell: params => (
        <IconButton
          onClick={() => {
            handleBalanceV2(params)
          }}
          color='primary'
        >
          <SwapHorizIcon />
        </IconButton>
      )
    },
    {
      field: 'debit',
      headerName: 'Debit',
      flex: 0.35,
      align: 'center',
      minWidth: 170,
      renderCell: params => (
        <FormControl fullWidth>
          <TextField
            fullWidth
            disabled={values.table[params.idx].disabled_debit}
            name={`table.${params.idx}.debit`}
            value={values.table[params.idx].debit}
            onChange={event => {
              handleChange(event)
              if (Number(event.target.value) > 0) setFieldValue(`table.${params.idx}.disabled_credit`, true)
              else setFieldValue(`table.${params.idx}.disabled_credit`, false)
            }}
            onClick={event => {
              event.target.select()

              if (params.idx + 1 === values.table.length) {
                push({
                  account_id: '',
                  credit: 0,
                  debit: 0,
                  cost_center_id: '',
                  text: '',
                  accountText: '',
                  disabled_debit: false,
                  disabled_credit: false
                })
              }
            }}
            onBlur={handleBlur}
          />
        </FormControl>
      )
    },
    {
      field: 'cost_center_id',
      headerName: 'Cost Center',
      flex: 0.5,
      align: 'center',
      minWidth: 200,
      renderCell: params => (
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Cost Center</InputLabel>
          <Select
            fullWidth
            label='Cost Center'
            value={values.table[params.idx].cost_center_id}
            name={`table.${params.idx}.cost_center_id`}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {data &&
              data?.cost_center &&
              data?.cost_center.length > 0 &&
              data?.cost_center.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )
    },
    {
      field: 'text',
      headerName: 'note',
      flex: 0.35,
      align: 'center',
      minWidth: 200,
      renderCell: params => (
        <FormControl fullWidth>
          <TextField
            name={`table.${params.idx}.text`}
            value={values.table[params.idx].text}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </FormControl>
      )
    },
    {
      field: 'options',
      headerName: 'Options',
      flex: 0.1,
      align: 'center',
      minWidth: 30,
      renderCell: params => <RowOptions id={params.id} idx={params.idx} params={params} remove={remove} />
    }
  ]

  // const handleBalance = params => {
  //   const totalDebit = Number(values?.total_debit)
  //   const totalCredit = Number(values?.total_credit)
  //   const difference = Math.abs(totalCredit - totalDebit)
  //   const idx = params.idx
  //   const length = values.table.length

  //   // Function to set field values and handle enabling/disabling fields
  //   const setFieldValues = (index, type, value, disableType) => {
  //     setFieldValue(`table.${index}.${type}`, value)
  //     setFieldValue(`table.${index}.disabled_${disableType}`, true)
  //   }

  //   if (totalCredit > totalDebit) {
  //     // Handle debit when total credit is greater than total debit
  //     if (idx !== length - 1 && !values.table[idx].disabled_debit) {
  //       setFieldValues(idx, 'debit', difference + Number(values.table[idx].debit), 'credit')
  //     } else if (idx !== length - 1) {
  //       let nextIdx = idx + 1
  //       while (nextIdx < length && values.table[nextIdx].disabled_debit) {
  //         nextIdx++
  //       }
  //       if (nextIdx < length) {
  //         setFieldValues(nextIdx, 'debit', difference + Number(values.table[nextIdx].debit), 'credit')
  //       }
  //     } else if (idx === length - 1 && !values.table[idx].disabled_debit) {
  //       setFieldValues(idx, 'debit', difference + Number(values.table[idx].debit), 'credit')
  //     } else if (idx === length - 1) {
  //       let prevIdx = idx - 1
  //       while (prevIdx >= 0 && values.table[prevIdx].disabled_debit) {
  //         prevIdx--
  //       }
  //       if (prevIdx >= 0) {
  //         setFieldValues(prevIdx, 'debit', difference + Number(values.table[prevIdx].debit), 'credit')
  //       }
  //     }
  //   } else if (totalDebit > totalCredit) {
  //     // Handle credit when total debit is greater than total credit
  //     if (idx !== length - 1 && !values.table[idx].disabled_credit) {
  //       setFieldValues(idx, 'credit', difference + Number(values.table[idx].credit), 'debit')
  //     } else if (idx !== length - 1) {
  //       let nextIdx = idx + 1
  //       while (nextIdx < length && values.table[nextIdx].disabled_credit) {
  //         nextIdx++
  //       }
  //       if (nextIdx < length) {
  //         setFieldValues(nextIdx, 'credit', difference + Number(values.table[nextIdx].credit), 'debit')
  //       }
  //     } else if (idx === length - 1 && !values.table[idx].disabled_credit) {
  //       setFieldValues(idx, 'credit', difference + Number(values.table[idx].credit), 'debit')
  //     } else if (idx === length - 1) {
  //       let prevIdx = idx - 1
  //       while (prevIdx >= 0 && values.table[prevIdx].disabled_credit) {
  //         prevIdx--
  //       }
  //       if (prevIdx >= 0) {
  //         setFieldValues(prevIdx, 'credit', difference + Number(values.table[prevIdx].credit), 'debit')
  //       }
  //     }
  //   } else {
  //     notify('Total Credit and Total Debit are equal', 'success')
  //   }
  // }

  // const handleBalanceV2 = params => {
  //   const totalDebit = Number(values?.total_debit)
  //   const totalCredit = Number(values?.total_credit)
  //   const difference = Math.abs(totalCredit - totalDebit)
  //   const idx = params.idx
  //   // const length = values.table.length

  //   // Function to set field values and handle enabling/disabling fields
  //   // const setFieldValues = (index, type, value, disableType) => {
  //   //   setFieldValue(`table.${index}.${type}`, value)
  //   //   setFieldValue(`table.${index}.disabled_${disableType}`, true)
  //   // }

  //   if (totalCredit > totalDebit) {
  //     // Handle debit when total credit is greater than total debit
  //     if (values.table[idx].credit > 0) {
  //       if (Number(values.table[idx].credit) > difference) {
  //         setFieldValue(`table.${idx}.disabled_debit`, true)
  //         setFieldValue(`table.${idx}.disabled_credit`, false)
  //         setFieldValue(`table.${idx}.credit`, Number(values.table[idx].credit) - difference)
  //       } else if (Number(values.table[idx].credit) < difference) {
  //         setFieldValue(`table.${idx}.credit`, 0)
  //         setFieldValue(`table.${idx}.debit`, difference - Number(values.table[idx].debit))
  //         setFieldValue(`table.${idx}.disabled_credit`, true)
  //         setFieldValue(`table.${idx}.disabled_debit`, false)
  //       } else if (Number(values.table[idx].credit) === difference) {
  //         setFieldValue(`table.${idx}.credit`, Number(values.table[idx].credit) + difference)
  //         setFieldValue(`table.${idx}.disabled_credit`, false)
  //         setFieldValue(`table.${idx}.disabled_debit`, true)
  //       }
  //     } else if (Number(values.table[idx].debit) > 0) {
  //       if (Number(values.table[idx].debit) > difference) {
  //         setFieldValue(`table.${idx}.disabled_credit`, true)
  //         setFieldValue(`table.${idx}.disabled_debit`, false)
  //         setFieldValue(`table.${idx}.debit`, Number(values.table[idx].debit) - difference)
  //       } else if (Number(values.table[idx].debit) < difference) {
  //         setFieldValue(`table.${idx}.debit`, 0)
  //         setFieldValue(`table.${idx}.credit`, difference - Number(values.table[idx].debit))
  //         setFieldValue(`table.${idx}.disabled_debit`, true)
  //         setFieldValue(`table.${idx}.disabled_credit`, false)
  //       } else if (Number(values.table[idx].debit) === difference) {
  //         setFieldValue(`table.${idx}.debit`, Number(values.table[idx].debit) + difference)
  //         setFieldValue(`table.${idx}.disabled_debit`, false)
  //         setFieldValue(`table.${idx}.disabled_credit`, true)
  //       }
  //     } else if (Number(values.table[idx].debit) === 0 && Number(values.table[idx].credit) === 0) {
  //       setFieldValue(`table.${idx}.debit`, difference)
  //       setFieldValue(`table.${idx}.disabled_credit`, true)
  //       setFieldValue(`table.${idx}.disabled_debit`, false)
  //     }
  //   } else if (totalDebit > totalCredit) {
  //     // Handle credit when total debit is greater than total credit
  //     if (values.table[idx].debit > 0) {
  //       if (Number(values.table[idx].debit) > difference) {
  //         setFieldValue(`table.${idx}.disabled_credit`, true)
  //         setFieldValue(`table.${idx}.disabled_debit`, false)
  //         setFieldValue(`table.${idx}.debit`, Number(values.table[idx].debit) - difference)
  //       } else if (Number(values.table[idx].debit) < difference) {
  //         setFieldValue(`table.${idx}.debit`, 0)
  //         setFieldValue(`table.${idx}.credit`, difference - Number(values.table[idx].debit))
  //         setFieldValue(`table.${idx}.disabled_debit`, true)
  //         setFieldValue(`table.${idx}.disabled_credit`, false)
  //       } else if (Number(values.table[idx].debit) === difference) {
  //         setFieldValue(`table.${idx}.debit`, Number(values.table[idx].debit) + difference)
  //         setFieldValue(`table.${idx}.disabled_debit`, false)
  //         setFieldValue(`table.${idx}.disabled_credit`, true)
  //       }
  //     } else if (values.table[idx].credit > 0) {
  //       if (Number(values.table[idx].credit) >= difference) {
  //         setFieldValue(`table.${idx}.disabled_debit`, true)
  //         setFieldValue(`table.${idx}.disabled_credit`, false)
  //         setFieldValue(`table.${idx}.credit`, Number(values.table[idx].credit) - difference)
  //       } else if (Number(values.table[idx].credit) <= difference) {
  //         setFieldValue(`table.${idx}.credit`, 0)
  //         setFieldValue(`table.${idx}.debit`, difference - Number(values.table[idx].debit))
  //         setFieldValue(`table.${idx}.disabled_credit`, true)
  //         setFieldValue(`table.${idx}.disabled_debit`, false)
  //       } else if (Number(values.table[idx].credit) === difference) {
  //         setFieldValue(`table.${idx}.credit`, Number(values.table[idx].credit) + difference)
  //         setFieldValue(`table.${idx}.disabled_credit`, false)
  //         setFieldValue(`table.${idx}.disabled_debit`, true)
  //       }
  //     } else if (Number(values.table[idx].credit) === 0 && Number(values.table[idx].debit) === 0) {
  //       setFieldValue(`table.${idx}.credit`, difference)
  //       setFieldValue(`table.${idx}.disabled_debit`, true)
  //       setFieldValue(`table.${idx}.disabled_credit`, false)
  //     }
  //   } else {
  //     notify('Total Credit and Total Debit are equal🍔', 'success')
  //   }

  //   if ((totalCredit === 0 && !values.table[idx].debit) || (totalDebit === 0 && !values.table[idx].credit)) {
  //     setFieldValue(`table.${idx}.disabled_credit`, false)
  //     setFieldValue(`table.${idx}.disabled_debit`, false)
  //     setFieldValue(`table.${idx}.credit`, 0)
  //     setFieldValue(`table.${idx}.debit`, 0)
  //   }
  // }
  const handleBalanceV2 = params => {
    const { idx } = params
    const totalDebit = Number(values?.total_debit)
    const totalCredit = Number(values?.total_credit)
    const difference = Math.abs(totalCredit - totalDebit)

    const setDebitCredit = (index, debitValue, creditValue, disableDebit, disableCredit) => {
      setFieldValue(`table.${index}.debit`, debitValue)
      setFieldValue(`table.${index}.credit`, creditValue)
      setFieldValue(`table.${index}.disabled_debit`, disableDebit)
      setFieldValue(`table.${index}.disabled_credit`, disableCredit)
    }

    //? when total debit is greater than total credit AND debit of row is greater than 0 and greater than difference✅
    //? and total credit is greater than 0 also ✅

    //? when total debit is greater than total credit AND debit of row is greater than 0 and greater than difference✅
    //? and total credit is ===  0 ✅

    //? when total debit is greater than total credit AND debit of row is greater than 0 and less than difference✅
    //? and total credit is greater than 0 also ✅

    //? when total debit is greater than total credit AND debit of row is greater than 0 and less than difference✅
    //? and total credit is ===  0 ✅
    //? when total debit is greater than total credit AND debit of row is greater than 0 and equal to difference✅
    //? difference is equal to total debit✅

    const currentCredit = Number(values.table[idx].credit)
    const currentDebit = Number(values.table[idx].debit)

    // ** when credit is greater than debit
    if (totalCredit > totalDebit) {
      if (currentCredit > difference) {
        setDebitCredit(idx, 0, currentCredit - difference, true, false)
      } else if (difference === totalCredit && difference === currentCredit) {
        setDebitCredit(idx, 0, currentCredit - difference, false, false)
      } else if (currentCredit === difference) {
        setDebitCredit(idx, 0, currentCredit - difference, false, false)
      } else if (currentCredit < difference) {
        setDebitCredit(idx, difference - currentCredit, 0, false, true)
      }
      if (totalDebit === 0) {
        if (currentCredit < difference) setDebitCredit(idx, difference - currentCredit, 0, false, true)
        if (currentCredit === 0 && currentDebit === 0) setDebitCredit(idx, difference, 0, false, true)
      }
      if (currentCredit === 0 && currentDebit === 0) {
        setDebitCredit(idx, difference, 0, false, true)
      }
      if (currentCredit === 0 && currentDebit > 0) {
        setDebitCredit(idx, difference + currentDebit, 0, false, true)
      }

      return
    }

    // ** when debit is greater than credit
    if (totalDebit > totalCredit) {
      if (currentDebit > difference) {
        setDebitCredit(idx, currentDebit - difference, 0, false, true)
      } else if (difference === totalDebit && difference === currentDebit) {
        setDebitCredit(idx, currentDebit - difference, 0, false, false)
      } else if (currentDebit < difference) {
        setDebitCredit(idx, 0, difference - currentDebit, true, false)
      } else if (currentDebit === difference) {
        setDebitCredit(idx, currentDebit - difference, 0, false, false)
      }
      if (totalCredit === 0) {
        if (currentDebit < difference) setDebitCredit(idx, 0, difference - currentDebit, false, true)
        if (currentDebit === 0 && currentCredit === 0) setDebitCredit(idx, 0, difference, true, false)
      }
      if (currentDebit === 0 && currentCredit === 0) {
        setDebitCredit(idx, 0, difference, true, false)
      }
      if (currentDebit === 0 && currentCredit > 0) {
        setDebitCredit(idx, 0, difference + currentCredit, true, false)
      }

      return
    }

    const resetFields = () => {
      setDebitCredit(idx, 0, 0, false, false)
    }

    if (totalDebit === totalCredit) {
      notify('Total Credit and Total Debit are equal 💌', 'success')
    }

    if ((totalCredit === 0 && !values.table[idx].debit) || (totalDebit === 0 && !values.table[idx].credit)) {
      resetFields()
    }
  }

  useEffect(() => {
    setFieldValue(
      'total_credit',
      values.table.reduce((acc, curr) => acc + Number(curr.credit), 0)
    )
    setFieldValue(
      'total_debit',
      values.table.reduce((acc, curr) => acc + Number(curr.debit), 0)
    )
  }, [values.table, setFieldValue])

  console.log('data form journal add table 👀👀👀', data)
  console.log('store form journal add table 👀👀👀', store)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          alignSelf: 'flex-end',
          textTransform: transText,
          m: 3
        }}
      >
        <Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              push({
                account_id: '',
                credit: 0,
                debit: 0,
                cost_center_id: '',
                text: '',
                accountText: '',
                disabled: false,
                disabled_credit: false
              })
            }}
          >
            Add Row
          </Button>
        </Box>
      </Box>
      <>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
          <Table stickyHeader stickyFooter aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns &&
                  columns.length > 0 &&
                  columns.map((column, idx) => (
                    <TableCell
                      key={idx}
                      align={column.align || 'center'}
                      sx={{
                        minWidth: column.minWidth,
                        flex: column.flex,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textTransform: transText
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(values?.table) && values?.table && values?.table.length > 0 ? (
                values?.table.map((row, idx) => (
                  <TableRow hover role='checkbox' key={idx}>
                    {columns.map((column, index) => {
                      const params = row[column.field]

                      return (
                        <TableCell key={index + 1} align={column.align} sx={{ textTransform: transText }}>
                          {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell colSpan={6}>
                    <Typography variant='body2' align='center' sx={{ my: 10, textTransform: transText }}>
                      No Rows
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      <Box
        style={{
          position: 'sticky',
          bottom: '0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: '#424242',
            textTransform: transText
          }}
        >
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }}>Total Credit :</Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography sx={{ textTransform: transText }}>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.total_credit).toFixed(decimalFormat)} ${currency_code} `
                : `${currency_code} ${Number(values?.total_credit).toFixed(decimalFormat)} `}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography sx={{ textTransform: transText }}>Total Debit:</Typography>
          </StyledTableCell>
          <StyledTableCell align='right' colSpan={2}>
            <Typography sx={{ textTransform: transText }}>
              {CurrencySymbolPlacement === 'after'
                ? `${Number(values?.total_debit).toFixed(decimalFormat)} ${currency_code} `
                : `${currency_code} ${Number(values?.total_debit).toFixed(decimalFormat)} `}
            </Typography>
          </StyledTableCell>
        </Box>
      </Box>
    </>
  )
}

export default AddJournalVoucherTable

const RowOptions = ({ id, idx, params, remove }) => {
  const transText = getCookie('fontStyle')
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
    console.log('id 👀👀👀', id)
    console.log('idx 👀👀👀', idx)
    console.log('params 👀👀👀✨', params)

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
        {idx !== 0 && idx !== 1 ? (
          <Tooltip title={`Delete this Row ${idx + 1}`}>
            <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='bx:trash-alt' fontSize={20} />
              Delete
            </MenuItem>
          </Tooltip>
        ) : (
          <MenuItem>
            <Typography variant='caption' align='center' sx={{ my: 1, textTransform: transText }}>
              Not Allowed to Delete
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  )
}
