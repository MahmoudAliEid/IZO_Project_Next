// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { Dialog, Typography } from '@mui/material'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Third Party Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
// import CustomInputField from './components/CustomInputField'

const CustomTableSingle = ({ columns, rows }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)

  // ** columns
  // const columns = [
  //   {
  //     field: 'sub_sku',
  //     headerName: 'Item Code',
  //     flex: 0.25,
  //     align: 'center',
  //     minWidth: 120,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.sub_sku`}
  //         value={params.sub_sku}
  //         onChange={handleChange}
  //       />
  //     )
  //   },
  //   {
  //     field: 'value',
  //     headerName: 'Value',
  //     align: 'center',
  //     flex: 0.25,
  //     minWidth: 110,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.value`}
  //         value={params.value}
  //         onChange={handleChange}
  //       />
  //     )
  //   },
  //   {
  //     field: 'default_purchase_price',
  //     headerName: 'DPP Exc Tax',
  //     align: 'center',
  //     flex: 0.25,
  //     minWidth: 120,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.default_purchase_price`}
  //         value={params.default_purchase_price}
  //         onChange={e => {
  //           handleChange(e)
  //           const newSingleDpp = parseFloat(e.target.value)
  //           const taxValue = 1 + values.tax
  //           if (typeof newSingleDpp === 'number' && !isNaN(newSingleDpp)) {
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.dpp_inc_tax`,
  //               (newSingleDpp * taxValue).toFixed(2)
  //             )

  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.default_sell_price`,
  //               (
  //                 newSingleDpp *
  //                 (1 + values.product_variation[productIndex].variations[params.idx].profit_percent / 100)
  //               ).toFixed(2)
  //             )
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`,
  //               (
  //                 newSingleDpp *
  //                 taxValue *
  //                 (1 + values.product_variation[productIndex].variations[params.idx].profit_percent / 100)
  //               ).toFixed(2)
  //             )
  //           } else {
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.dpp_inc_tax`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.default_sell_price`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`, 0)
  //           }
  //         }}
  //       />
  //     )
  //   },
  //   {
  //     field: 'dpp_inc_tax',
  //     headerName: 'DPP Inc Tax',
  //     align: 'center',
  //     flex: 0.25,
  //     minWidth: 120,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.dpp_inc_tax`}
  //         value={params.dpp_inc_tax}
  //         onChange={e => {
  //           handleChange(e)
  //           const newSingleDpp = parseFloat(e.target.value)
  //           const taxValue = 1 + values.tax
  //           if (typeof newSingleDpp === 'number' && !isNaN(newSingleDpp)) {
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.default_purchase_price`,
  //               (newSingleDpp / taxValue).toFixed(2)
  //             )
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.default_sell_price`,
  //               (
  //                 (newSingleDpp / taxValue) *
  //                 (1 + values.product_variation[productIndex].variations[params.idx].profit_percent / 100)
  //               ).toFixed(2)
  //             )
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`,
  //               (
  //                 newSingleDpp *
  //                 (1 + values.product_variation[productIndex].variations[params.idx].profit_percent / 100)
  //               ).toFixed(2)
  //             )
  //           } else {
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.default_purchase_price`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.default_sell_price`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`, 0)
  //           }
  //         }}
  //       />
  //     )
  //   },
  //   {
  //     field: 'profit_percent',
  //     headerName: 'Profit',
  //     align: 'center',
  //     flex: 0.25,
  //     minWidth: 110,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.profit_percent`}
  //         value={params.profit_percent}
  //         onChange={e => {
  //           handleChange(e)
  //           const newProfit = parseFloat(e.target.value)
  //           const taxValue = 1 + values.tax

  //           if (typeof newProfit === 'number' && !isNaN(newProfit)) {
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.default_sell_price`,
  //               ((params.dpp_inc_tax / taxValue) * (1 + newProfit / 100)).toFixed(2)
  //             )
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`,
  //               (params.dpp_inc_tax * (1 + newProfit / 100)).toFixed(2)
  //             )
  //           } else {
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.default_sell_price`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`, 0)
  //           }
  //         }}
  //       />
  //     )
  //   },
  //   {
  //     field: 'default_sell_price',
  //     headerName: 'DSP Exc Tax',
  //     flex: 0.25,
  //     minWidth: 125,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.default_sell_price`}
  //         value={params.default_sell_price}
  //         onChange={e => {
  //           handleChange(e)
  //           const newSingleDsp = parseFloat(e.target.value)
  //           const taxValue = 1 + values.tax
  //           if (typeof newSingleDsp === 'number' && !isNaN(newSingleDsp)) {
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`,
  //               (newSingleDsp * taxValue).toFixed(2)
  //             )
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.profit_percent`, 0)
  //           } else {
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.profit_percent`, 0)
  //           }
  //         }}
  //       />
  //     )
  //   },
  //   {
  //     field: 'sell_price_inc_tax',
  //     headerName: 'DSP Inc Tax',
  //     flex: 0.25,
  //     minWidth: 120,
  //     renderCell: params => (
  //       <CustomInputField
  //         name={`product_variation.${productIndex}.variations.${params.idx}.sell_price_inc_tax`}
  //         value={params.sell_price_inc_tax}
  //         onChange={e => {
  //           handleChange(e)
  //           const newSingleDsp = parseFloat(e.target.value)
  //           const taxValue = 1 + values.tax
  //           if (typeof newSingleDsp === 'number' && !isNaN(newSingleDsp)) {
  //             setFieldValue(
  //               `product_variation.${productIndex}.variations.${params.idx}.default_sell_price`,
  //               (newSingleDsp / taxValue).toFixed(2)
  //             )
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.profit_percent`, 0)
  //           } else {
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.default_sell_price`, 0)
  //             setFieldValue(`product_variation.${productIndex}.variations.${params.idx}.profit_percent`, 0)
  //           }
  //         }}
  //       />
  //     )
  //   },
  //   {
  //     field: 'image',
  //     headerName: 'Image',
  //     flex: 0.3,
  //     align: 'center',
  //     minWidth: 90,
  //     renderCell: params => (
  //       <CustomButtonUploadImage
  //         value={params.image}
  //         name={`product_variation.${productIndex}.variations.${params.idx}.image`}
  //         setFieldValue={setFieldValue}
  //       />
  //     )
  //   },
  //   {
  //     field: 'actions',
  //     flex: 0.2,
  //     headerName: 'Actions',
  //     align: 'center',
  //     minWidth: 80,
  //     renderCell: params => (
  //       <RowOptions
  //         id={params.id}
  //         idx={params.idx}
  //         params={params}
  //         pushVariation={pushVariation}
  //         remove={remove}
  //         productIndex={productIndex}
  //         product_variation={values.product_variation}
  //         values={values}
  //         setFieldValue={setFieldValue}
  //       />
  //     )
  //   }
  // ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      {rows && rows.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column, idx) => (
                    <TableCell
                      key={idx}
                      align={column.align || 'center'}
                      sx={{
                        minWidth: column.minWidth,
                        flex: column.flex,
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => {
                  return (
                    <TableRow hover role='checkbox' key={idx}>
                      {columns.map((column, index) => {
                        const params = row[column.field]

                        return (
                          <TableCell key={index} align={column.align}>
                            {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant='h6' align='center' sx={{ my: 10 }}>
          No Rows
        </Typography>
      )}
      {open && (
        <Dialog
          open={open}
          onClose={setTimeout(() => {
            setOpen(false)
          }, 3000)}
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

export default CustomTableSingle
