// // ** React Imports
// import { Fragment, useState, useEffect } from 'react'

// // ** MUI Imports
// import Paper from '@mui/material/Paper'
// import Table from '@mui/material/Table'
// import TableRow from '@mui/material/TableRow'
// import TableHead from '@mui/material/TableHead'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import { styled } from '@mui/material/styles'
// // import TablePagination from '@mui/material/TablePagination'

// import { useSelector } from 'react-redux'

// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Dialog,
//   FormControl,
//   InputLabel,
//   Select,
//   Typography,
//   Grid,
//   TextField,
//   Box
// } from '@mui/material'

// // ** Formik
// import { useField } from 'formik'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Third Party Components
// import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
// import SearchAndSelect from './SearchAndSelect'

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// // const StyledTableCell = styled(TableCell)(({ theme }) => ({
// //   [`&.${tableCellClasses.footer}`]: {
// //     color: theme.palette.common.white,
// //     backgroundColor: theme.palette.common.black,
// //     border: 'none'
// //   },
// //   [`&.${tableCellClasses.body}`]: {
// //     fontSize: 14
// //   }
// // }))

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

// const CustomInputField = ({ name, value, onChange }) => {
//   const [field] = useField(name)

//   return (
//     <TextField
//       {...field}
//       value={value}
//       onChange={onChange}
//       fullWidth
//       // variant='outlined'
//       // size='small'
//       // margin='dense'
//     />
//   )
// }

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)

//   return result
// }

// const CustomDragTableSearch = ({ rows, values, handleChange, remove, setFieldValue, push }) => {
//   // ** State
//   const [open, setOpen] = useState(false)
//   const [searchProduct, setSearchProduct] = useState(null)
//   const [data, setData] = useState([])
//   const [mainRows, setMainRows] = useState(rows)

//   // ** Selectors
//   const store = useSelector(state => state.getCreateOpeningStock?.data?.value)

//   useEffect(() => {
//     if (store) {
//       setData(store)
//     }
//   }, [store])

//   // const variation_templates = useSelector(state => state.getCreateProduct?.data?.value?.variation_templates)
//   // const variation_value_templates = useSelector(state => state.getCreateProduct?.data?.value?.variation_value_templates)

//   // useEffect
//   // useEffect(() => {
//   //   if (variation_templates) {
//   //     setVariationsParent(variation_templates)
//   //   }
//   // }, [variation_templates])

//   // useEffect(() => {
//   //   if (variation_value_templates) {
//   //     setVariationsChild(variation_value_templates)
//   //   }
//   // }, [variation_value_templates])

//   // useEffect(() => {
//   //   if (Array.isArray(variationsChild) && searchProduct != null && variationsChild.length > 0 && searchProduct) {
//   //     const filteredChild = variationsChild.filter(child => child.variation_templates_id === searchProduct)
//   //     setFilteredVariationChildSecond(filteredChild)
//   //   }
//   // }, [variationsChild, searchProduct])

//   //** update allUnits when all_units in rows */

//   // ** columns
//   const columns = [
//     {
//       field: 'name',
//       headerName: 'Product Name',
//       flex: 0.25,
//       align: 'center',
//       minWidth: 120,
//       renderCell: params => <LinkStyled>{params.name}</LinkStyled>
//     },
//     {
//       field: 'quantity',
//       headerName: 'Quantity',
//       align: 'center',
//       flex: 0.45,
//       minWidth: 210,
//       renderCell: params => (
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4} sm={12} lg={4}>
//             <CustomInputField
//               // name={`product_compo.${productIndex}.rows.${params.idx}.quantity`}
//               value={params.quantity}
//               onChange={e => {
//                 handleChange(e)
//                 const newValue =
//                   Number(e.target.value) * Number(params.purchase_price_exc) * Number(params.unit_quantity)
//                 //update total amount when quantity changes
//                 console.log('value from quantity', e.target.value, params.purchase_price_exc, params.unit_quantity)
//                 console.log('new value from quantity', newValue)
//                 // setFieldValue(
//                 //   `product_compo.${productIndex}.rows.${params.idx}.total_amount`,
//                 //   Number(newValue).toFixed(2)
//                 // )
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={8} sm={12} lg={8}>
//             <FormControl fullWidth>
//               <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
//               <Select
//                 value={params.unit}
//                 // name={`product_compo.${productIndex}.rows.${params.idx}.unit`}
//                 onChange={e => {
//                   handleChange(e)

//                   // set value of unit_quantity to unit_quantity
//                   setFieldValue(
//                     // `product_compo.${productIndex}.rows.${params.idx}.unit_quantity`,
//                     rows[params.idx].all_unit.find(unit => unit.id === e.target.value).unit_quantity
//                   )
//                   // when unit takes a unit_quantity , update total amount

//                   setFieldValue(
//                     // `product_compo.${productIndex}.rows.${params.idx}.total_amount`,
//                     Number(
//                       params.purchase_price_exc *
//                         params.quantity *
//                         rows[params.idx].all_unit.find(unit => unit.id === e.target.value).unit_quantity
//                     ).toFixed(2)
//                   )
//                 }}
//                 id='demo-simple-select'
//                 label='Unit'
//                 fullWidth
//               >
//                 {rows[params.idx].all_unit && rows[params.idx].all_unit.length > 0 ? (
//                   rows[params.idx].all_unit.map((unit, idx) => (
//                     <MenuItem key={idx} value={unit.id}>
//                       {unit.value}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem value={''}>No Units</MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       )
//     },
//     {
//       field: 'price',
//       headerName: 'Price',
//       align: 'center',

//       flex: 0.25,
//       minWidth: 120,
//       renderCell: params => <CustomInputField name={`item.${params.idx}.price`} />
//     },
//     {
//       field: 'Store',
//       headerName: 'Store',
//       align: 'center',
//       flex: 0.25,
//       minWidth: 120,
//       renderCell: params => (
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id='demo-simple-select-label'>Store</InputLabel>
//               <Select
//                 value={params.store}
//                 name={`item.${params.idx}.store`}
//                 handleChange={handleChange}
//                 id='demo-simple-select'
//                 label='Store'
//                 fullWidth
//               >
//                 <MenuItem value={''}>Please Select</MenuItem>
//                 {data && data.length > 0
//                   ? data.map((store, idx) => (
//                       <MenuItem key={idx} value={store.id}>
//                         {store.name}
//                       </MenuItem>
//                     ))
//                   : null}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       )
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       align: 'center',
//       flex: 0.25,
//       minWidth: 80,
//       renderCell: params => <RowOptions id={params.id} idx={params.idx} params={params} remove={remove} />
//     }
//   ]

//   // ? const profit = values.product_compo[productIndex].profit_percent

//   //? useEffect(() => {
//   //   const tax = values.tax

//   //   setFieldValue(
//   //     `product_compo.${productIndex}.selling_price_inc_tax`,
//   //     rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0) * (1 + tax) * (1 + profit / 100)
//   //   )
//   // }, [rows, setFieldValue, productIndex, values.tax, profit])

//   // useEffect(() => {
//   //   setFieldValue(
//   //     `product_compo.${productIndex}.selling_price_inc_tax`,
//   //     rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0)
//   //   )
//   // }, [rows, setFieldValue, productIndex])

//   //? useEffect(() => {
//   //   setFieldValue(
//   //     `product_compo.${productIndex}.item_level_purchase_price_total`,
//   //     rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0)
//   //   )
//   // }, [rows, setFieldValue, productIndex])

//   // update selling_price_inc_tax when value.tax changes
//   // useEffect(() => {
//   //   if (values.product_compo[productIndex].change === null) {
//   //     const profit = values.product_compo[productIndex].profit_percent //0
//   //     const tax = values.tax //0.05
//   //     const newSellingPrice =
//   //       Number(values.product_compo[productIndex].item_level_purchase_price_total) * (1 + profit / 100) * (1 + tax)
//   //     setFieldValue(`product_compo.${productIndex}.selling_price_inc_tax`, Number(newSellingPrice).toFixed(2))
//   //   } else {
//   //     const newValue = values.product_compo[productIndex].change
//   //     setFieldValue(`product_compo.${productIndex}.selling_price_inc_tax`, newValue)
//   //   }

//   //   return () => {
//   //     setFieldValue(`product_compo.${productIndex}.change`, null)
//   //   }
//   // }, [values, setFieldValue, productIndex])

//   console.log('searchProduct 🎃🎃🎃🎃', searchProduct)
//   console.log('rows form compo table 🎃', mainRows)

//   // ** Functions to handle drag and drop
//   const onDragEnd = result => {
//     if (!result.destination) {
//       return
//     }

//     const reorderedRows = reorder(rows, result.source.index, result.destination.index)

//     setMainRows(reorderedRows)
//     setFieldValue('items', reorderedRows)
//   }

//   return (
//     <>
//       <SearchAndSelect
//         rows={mainRows}
//         values={values}
//         setFieldValue={setFieldValue}
//         handleChange={handleChange}
//         searchProduct={searchProduct}
//         setSearchProduct={setSearchProduct}
//         push={push}
//         setOpen={setOpen}
//       />

//       <DragDropContext onDragEnd={onDragEnd}>
//         <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
//           <Table stickyHeader stickyFooter aria-label='sticky table'>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column, idx) => (
//                   <TableCell
//                     key={idx}
//                     align={column.align || 'center'}
//                     sx={{
//                       minWidth: column.minWidth,
//                       flex: column.flex,
//                       flexDirection: 'column',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     {column.headerName}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <Droppable droppableId='droppable'>
//               {provided => (
//                 <TableBody {...provided.droppableProps} ref={provided.innerRef}>
//                   {mainRows && mainRows.length > 1 ? (
//                     mainRows.map((row, idx) => (
//                       <Draggable key={row.id} draggableId={row.id} index={idx}>
//                         {provided => (
//                           <TableRow
//                             hover
//                             role='checkbox'
//                             key={idx}
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             // sx={{ display: row.initial ? 'none' : 'default' }}
//                           >
//                             {columns.map((column, index) => {
//                               const params = row[column.field]
//                               console.log(row, 'row form table compo')

//                               return (
//                                 <TableCell key={index + 1} align={column.align}>
//                                   {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
//                                 </TableCell>
//                               )
//                             })}
//                           </TableRow>
//                         )}
//                       </Draggable>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell></TableCell>
//                       <TableCell colSpan={3}>
//                         <Typography variant='body2' align='center' sx={{ my: 10 }}>
//                           No Rows
//                         </Typography>
//                       </TableCell>
//                       <TableCell></TableCell>
//                     </TableRow>
//                   )}
//                   {provided.placeholder}
//                 </TableBody>
//               )}
//             </Droppable>

//             {/* <TableFooter
//               style={{
//                 position: 'sticky',
//                 bottom: '0'
//               }}
//             >
//               <TableRow>
//                 <StyledTableCell colSpan={3}>
//                   <Typography color={'white'}>Total Net Amount:</Typography>
//                 </StyledTableCell>
//                 <StyledTableCell align='right' colSpan={2}>
//                   <Typography color={'white'}>
//                     {rows.reduce((acc, curr) => acc + Number(curr.total_amount), 0)}
//                   </Typography>
//                 </StyledTableCell>
//               </TableRow>
//             </TableFooter> */}
//           </Table>
//         </TableContainer>
//       </DragDropContext>

//       {open && (
//         <Dialog
//           open={open}
//           onClose={setTimeout(() => {
//             setOpen(false)
//           }, 2000)}
//           maxWidth='md'
//           fullWidth
//           sx={{
//             '& .MuiDialog-paper': {
//               width: '100%',
//               maxHeight: 'calc(100% - 1rem)',
//               backgroundColor: 'transparent',
//               boxShadow: 'none'
//             }
//           }}
//           scroll='body'
//         >
//           <div>
//             <div
//               style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '16px 0'
//               }}
//             >
//               <ProgressCustomization />
//             </div>
//           </div>
//         </Dialog>
//       )}
//     </>
//   )
// }

// export default CustomDragTableSearch

const RowOptions = ({ id, idx, params, remove }) => {
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
        <Tooltip title={`Delete this Row ${idx}`}>
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
  Box
} from '@mui/material'

// ** Formik
import { useField } from 'formik'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import SearchAndSelect from './SearchAndSelect'

import { getCookie } from 'cookies-next'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

const CustomInputField = ({ name, value, onChange }) => {
  const [field] = useField(name)

  return <TextField {...field} value={value} onChange={onChange} fullWidth />
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const CustomDragTableSearch = ({ rows, values, handleChange, remove, setFieldValue, push }) => {
  const [open, setOpen] = useState(false)
  const [searchProduct, setSearchProduct] = useState(null)
  const [data, setData] = useState([])
  // const [mainRows, setMainRows] = useState(rows)

  const store = useSelector(state => state.getCreateOpeningStock?.data?.value?.store)

  // ** Cookies
  const decimalFormate = getCookie('DecimalFormat')
  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

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

  const columns = [
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 0.25,
      align: 'center',
      minWidth: 120,
      renderCell: params => <LinkStyled>{params.name}</LinkStyled>
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      align: 'center',
      flex: 0.45,
      minWidth: 210,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={12} lg={4}>
            <CustomInputField
              value={values.items[params.idx].quantity}
              name={`items.${params.idx}.quantity`}
              type='number'
              onChange={e => {
                if (e.target.value <= 0 || e.target.value === '0' || e.target.value === '') {
                  setFieldValue(`items.${params.idx}.quantity`, 1)
                }
                handleChange(e)
                // const newValue =
                //   Number(e.target.value) * Number(params.purchase_price_exc) * Number(params.unit_quantity)
                // console.log('value from quantity', e.target.value, params.purchase_price_exc, params.unit_quantity)
                // console.log('new value from quantity', newValue)
                if (values.items[params.idx].unit_quantity > 0) {
                  setFieldValue(
                    `items.${params.idx}.total`,
                    (
                      Number(e.target.value) *
                      Number(values.items[params.idx].price) *
                      Number(values.items[params.idx].unit_quantity)
                    ).toFixed(decimalFormate)
                  )
                } else {
                  setFieldValue(
                    `items.${params.idx}.total`,
                    (Number(e.target.value) * Number(values.items[params.idx].price)).toFixed(decimalFormate)
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} sm={12} lg={8}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
              <Select
                value={values.items[params.idx].unit}
                name={`items.${params.idx}.unit`}
                onChange={e => {
                  handleChange(e)
                  // setFieldValue(rows[params.idx].all_unit.find(unit => unit.id === e.target.value).unit_quantity)
                  // setFieldValue(
                  //   Number(
                  //     params.purchase_price_exc *
                  //       params.quantity *
                  //       rows[params.idx].all_unit.find(unit => unit.id === e.target.value).unit_quantity
                  //   ).toFixed(2)
                  // )
                  // setFieldValue(`items.${params.idx}.total`, (Number(e.target.value) * Number(values.items[params.idx].quantity)).toFixed(decimalFormate))
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
                        setFieldValue(
                          `items.${params.idx}.total`,
                          (
                            Number(values.items[params.idx].price) *
                            Number(values.items[params.idx].quantity) *
                            Number(unit.unit_quantity)
                          ).toFixed(decimalFormate)
                        )
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
        </Grid>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.price`}
          value={Number(values.items[params.idx].price).toFixed(decimalFormate)}
          onChange={handleChange}
        />
      )
    },
    {
      field: 'total',
      headerName: 'Total',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <CustomInputField
          name={`items.${params.idx}.total`}
          value={
            values.items[params.idx].total ||
            (Number(values.items[params.idx].price) * Number(values.items[params.idx].quantity)).toFixed(decimalFormate)
          }
          onChange={event => {
            handleChange(event)
            if (values.items[params.idx].quantity > 0) {
              setFieldValue(
                `items.${params.idx}.total`,
                (Number(event.target.value) * Number(values.items[params.idx].quantity)).toFixed(decimalFormate)
              )
            }
          }}
        />
      )
    },
    {
      field: 'Store',
      headerName: 'Store',
      align: 'center',
      flex: 0.25,
      minWidth: 120,
      renderCell: params => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <FormControl fullWidth>
              <InputLabel htmlFor='Store'>Store</InputLabel>
              <Select
                value={params.store}
                name={`items.${params.idx}.store`}
                onChange={handleChange}
                id='Store'
                label='Store'
                fullWidth
              >
                <MenuItem value={''}>Please Select</MenuItem>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel htmlFor='Store'>Store</InputLabel>
              <Select
                id='Store'
                label='Store'
                name={`items.${params.idx}.store`}
                value={values.items[params.idx].store}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={''}>Please Select</MenuItem>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      flex: 0.25,
      minWidth: 80,
      renderCell: params => <RowOptions id={params.id} idx={params.idx} params={params} remove={remove} />
    }
  ]

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const reorderedRows = reorder(rows, result.source.index, result.destination.index)

    // setMainRows(reorderedRows)
    setFieldValue('items', reorderedRows)
  }

  return (
    <>
      <SearchAndSelect
        rows={values.items}
        values={values}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        push={push}
        setOpen={setOpen}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%' }}>
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
            <Droppable droppableId='droppable'>
              {provided => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {values.items && values.items.length > 1 ? (
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
                            sx={{ display: row.id === 0 ? 'none' : 'auto' }}
                          >
                            {columns.map((column, index) => {
                              const params = row[column.field]

                              return (
                                <TableCell key={index + 1} align={column.align}>
                                  {column.renderCell ? column.renderCell({ ...row, idx: idx }) : params}
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
                      <TableCell colSpan={3}>
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

export default CustomDragTableSearch
