// import React, { useState } from 'react'
// import { Formik, Form, ErrorMessage, FieldArray } from 'formik'
// import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

// const initialValues = {
//   price_one: [
//     {
//       single_dpp: 0,
//       single_dpp_in_tax: 0,
//       profit_percent: 0,
//       single_dsp: 0,
//       single_dsp_inc_tax: 0
//     }
//   ]
// }

// const InviteFriends = () => {
//   const [TAX, setTAX] = useState(0.05)

//   // useEffect(() => {
//   //   // Handle changes related to TAX
//   //   const updateFieldsWithTax = () => {
//   //     const taxValue = 1 + TAX

//   //     // Update fields for each item in the array
//   //     values.price_one.forEach((item, index) => {
//   //       setFieldValue(`price_one.${index}.single_dpp_in_tax`, (item.single_dpp * taxValue).toFixed(2))
//   //       setFieldValue(`price_one.${index}.single_dsp_inc_tax`, (item.single_dsp * taxValue).toFixed(2))

//   //       // Add other fields that need to be updated with TAX changes
//   //     })
//   //   }

//   //   updateFieldsWithTax()
//   // }, [TAX])

//   return (
//     <div>
//       <h1>Price of Product</h1>
//       <FormControl fullWidth>
//         <InputLabel id='demo-simple-select-label'>Tax</InputLabel>
//         <Select
//           labelId='demo-simple-select-label'
//           id='demo-simple-select'
//           value={TAX}
//           onChange={e => setTAX(e.target.value)}
//         >
//           <MenuItem value={0.05}>5%</MenuItem>
//           <MenuItem value={0.1}>10%</MenuItem>
//           <MenuItem value={0.15}>15%</MenuItem>
//           <MenuItem value={0.2}>20%</MenuItem>
//         </Select>
//       </FormControl>

//       <Formik
//         initialValues={initialValues}
//         onSubmit={async values => {
//           await new Promise(r => setTimeout(r, 500))
//           alert(JSON.stringify(values, null, 2))
//         }}
//       >
//         {({ values, handleChange, setFieldValue }) => (
//           <Form>
//             <FieldArray name='price_one'>
//               {({ remove, push }) => (
//                 <div>
//                   {values.price_one.length > 0 &&
//                     values.price_one.map((friend, index) => (
//                       <div className='row' key={index}>
//                         <div className='col'>
//                           <label htmlFor={`price_one.${index}.single_dpp`}>Single Dpp</label>
//                           <TextField
//                             name={`price_one.${index}.single_dpp`}
//                             value={values.price_one[index].single_dpp}
//                             onChange={e => {
//                               handleChange(e)
//                               const newSingleDpp = parseFloat(e.target.value)
//                               const taxValue = 1 + TAX
//                               setFieldValue(
//                                 `price_one.${index}.single_dpp_in_tax`,
//                                 (newSingleDpp * taxValue).toFixed(2)
//                               )
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp`,
//                                 (newSingleDpp * (1 + values.price_one[index].profit_percent / 100)).toFixed(2)
//                               )
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp_inc_tax`,
//                                 (newSingleDpp * taxValue * (1 + values.price_one[index].profit_percent / 100)).toFixed(
//                                   2
//                                 )
//                               )
//                             }}
//                             placeholder='Single Dpp'
//                             type='text'
//                           />
//                           <ErrorMessage
//                             name={`price_one.${index}.single_dpp`}
//                             component='div'
//                             className='field-error'
//                           />
//                         </div>
//                         <div className='col'>
//                           <label htmlFor={`price_one.${index}.single_dpp_in_tax`}>Single Dpp In Tax</label>
//                           <TextField
//                             name={`price_one.${index}.single_dpp_in_tax`}
//                             value={values.price_one[index].single_dpp_in_tax}
//                             onChange={e => {
//                               handleChange(e)
//                               const newSingleDppInTax = parseFloat(e.target.value)
//                               const taxValue = 1 + TAX
//                               setFieldValue(`price_one.${index}.single_dpp`, (newSingleDppInTax / taxValue).toFixed(2))
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp`,
//                                 (
//                                   (newSingleDppInTax / taxValue) *
//                                   (1 + values.price_one[index].profit_percent / 100)
//                                 ).toFixed(2)
//                               )
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp_inc_tax`,
//                                 (+e.target.value * (1 + values.price_one[index].profit_percent / 100)).toFixed(2)
//                               )
//                             }}
//                             placeholder='Single Dpp In Tax'
//                             type='text'
//                           />
//                           <ErrorMessage
//                             name={`price_one.${index}.single_dpp_in_tax`}
//                             component='div'
//                             className='field-error'
//                           />
//                         </div>
//                         <div className='col'>
//                           <label htmlFor={`price_one.${index}.profit_percent`}>Profit Percent</label>
//                           <TextField
//                             name={`price_one.${index}.profit_percent`}
//                             value={values.price_one[index].profit_percent}
//                             onChange={e => {
//                               handleChange(e)
//                               const newProfitPercent = parseFloat(e.target.value)
//                               const taxValue = 1 + TAX
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp`,
//                                 (values.price_one[index].single_dpp * (1 + newProfitPercent / 100)).toFixed(2)
//                               )
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp_inc_tax`,
//                                 (values.price_one[index].single_dpp * (1 + newProfitPercent / 100) * taxValue).toFixed(
//                                   2
//                                 )
//                               )
//                             }}
//                             placeholder='Profit Percent'
//                             type='text'
//                           />
//                           <ErrorMessage
//                             name={`price_one.${index}.profit_percent`}
//                             component='div'
//                             className='field-error'
//                           />
//                         </div>
//                         <div className='col'>
//                           <label htmlFor={`price_one.${index}.single_dsp`}>Single Dsp</label>
//                           <TextField
//                             name={`price_one.${index}.single_dsp`}
//                             value={values.price_one[index].single_dsp}
//                             onChange={e => {
//                               handleChange(e)
//                               const newSingleDsp = parseFloat(e.target.value)
//                               const taxValue = 1 + TAX
//                               setFieldValue(
//                                 `price_one.${index}.single_dsp_inc_tax`,
//                                 (newSingleDsp * taxValue).toFixed(2)
//                               )
//                             }}
//                             placeholder='Single Dsp'
//                             type='text'
//                           />
//                           <ErrorMessage
//                             name={`price_one.${index}.single_dsp`}
//                             component='div'
//                             className='field-error'
//                           />
//                         </div>
//                         <div className='col'>
//                           <label htmlFor={`price_one.${index}.single_dsp_inc_tax`}>Single Dsp Inc Tax</label>
//                           <TextField
//                             name={`price_one.${index}.single_dsp_inc_tax`}
//                             value={values.price_one[index].single_dsp_inc_tax}
//                             onChange={e => {
//                               handleChange(e)
//                               const newSingleDspIncTax = parseFloat(e.target.value)
//                               const taxValue = 1 + TAX
//                               setFieldValue(`price_one.${index}.single_dsp`, (newSingleDspIncTax / taxValue).toFixed(2))
//                               setFieldValue(`price_one.${index}.single_dsp_inc_tax`, e.target.value)
//                             }}
//                             placeholder='Single Dsp Inc Tax'
//                             type='text'
//                           />
//                           <ErrorMessage
//                             name={`price_one.${index}.single_dsp_inc_tax`}
//                             component='div'
//                             className='field-error'
//                           />
//                         </div>
//                         <div className='col'>
//                           <button type='button' className='secondary' onClick={() => remove(index)}>
//                             X
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   <button
//                     type='button'
//                     className='secondary'
//                     onClick={() =>
//                       push({
//                         single_dpp: 0,
//                         single_dpp_in_tax: 0,
//                         profit_percent: 0,
//                         single_dsp: 0,
//                         single_dsp_inc_tax: 0
//                       })
//                     }
//                   >
//                     Add Price
//                   </button>
//                 </div>
//               )}
//             </FieldArray>
//             <button type='submit'>Invite</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }

// // export default InviteFriends
// import React from 'react'
// import { Formik, Form, Field, FieldArray } from 'formik'

// // Here is an example of a form with an editable list.
// // Next to each input are buttons for insert and remove.
// // If the list is empty, there is a button to add an item.
// const FriendList = () => (
//   <div>
//     <h1>Friend List</h1>
//     <Formik
//       initialValues={{ friends: ['jared', 'ian', 'brent'] }}
//       onSubmit={values =>
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2))
//         }, 500)
//       }
//       render={({ values }) => (
//         <Form>
//           <FieldArray
//             name='friends'
//             render={arrayHelpers => (
//               <div>
//                 {values.friends && values.friends.length > 0 ? (
//                   values.friends.map((friend, index) => (
//                     <div key={index}>
//                       <Field name={`friends.${index}`} />
//                       <button
//                         type='button'
//                         onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                       >
//                         -
//                       </button>
//                       <button
//                         type='button'
//                         onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
//                       >
//                         +
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <button type='button' onClick={() => arrayHelpers.push('')}>
//                     {/* show this when user has removed all friends from the list */}
//                     Add a friend
//                   </button>
//                 )}
//                 <div>
//                   <button type='submit'>Submit</button>
//                 </div>
//               </div>
//             )}
//           />
//         </Form>
//       )}
//     />
//   </div>
// )
// export default FriendList

// import React, { Fragment, useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Formik, Form, FieldArray } from 'formik'
// import { DataGrid } from '@mui/x-data-grid'
// import Button from '@mui/material/Button'
// import {
//   TextField,
//   Card,
//   CardHeader,
//   CardActions,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   Divider
// } from '@mui/material'
// import { useField } from 'formik'
// import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

// import TableVariationVariable from './Table'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // import DeleteIcon from '@mui/icons-material/Delete'
// // import AddIcon from '@mui/icons-material/Add'
// // import MoreVertIcon from '@mui/icons-material/MoreVert'

// const initialValues = {
//   product_variation: [
//     {
//       id: 1,
//       variation_template_id: '',
//       variations: [
//         {
//           item_code: '',
//           value: '',
//           dpp_exc_tax: 0,
//           dpp_inc_tax: 0,
//           profit: 0,
//           dsp_exc_tax: 0,
//           dsp_inc_tax: 0,
//           image: []
//         }
//       ]
//     }
//   ]
// }

// const RowOptions = ({ id, remove, variation, product_variation }) => {
//   // ** State
//   const [anchorEl, setAnchorEl] = useState(null)

//   const rowOptionsOpen = anchorEl

//   const handleRowOptionsClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleRowOptionsClose = () => {
//     setAnchorEl(null)
//   }

//   const handleDelete = () => {
//     // remove(id + 1)

//     // remove(id - 1)
//     console.log('variation 🎈🎈🎈🎈', variation)
//     console.log('product_variation 🎃🎃✨', product_variation)

//     // find index of inner array of variations
//     const index = product_variation.map(item => item.variations.map(item => item.id === id))

//     // console.log('id 🎈🎈🎈🎈', id)
//     console.log('index 🎃🎃✨', index)
//     handleRowOptionsClose()
//   }

//   return (
//     <Fragment>
//       <IconButton size='small' onClick={handleRowOptionsClick}>
//         <Icon icon='bx:dots-vertical-rounded' />
//       </IconButton>
//       <Menu
//         keepMounted
//         anchorEl={anchorEl}
//         open={rowOptionsOpen}
//         onClose={handleRowOptionsClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right'
//         }}
//         PaperProps={{ style: { minWidth: '8rem' } }}
//       >
//         <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='bx:trash-alt' fontSize={20} />
//           Delete
//         </MenuItem>
//       </Menu>
//     </Fragment>
//   )
// }

// const DynamicFieldsForm = () => {
//   // ** States
//   const [variationValue, setVariationValue] = useState(null)
//   const [filteredVariationChild, setFilteredVariationChild] = useState([])
//   const [variationChild, setVariationChild] = useState([])
//   const [variationParent, setVariationParent] = useState([])
//   const [triggerChange, setTriggerChange] = useState(false)

//   // ** Selectors
//   const variation_templates = useSelector(state => state.getCreateProduct?.data?.value?.variation_templates)
//   const variation_value_templates = useSelector(state => state.getCreateProduct?.data?.value?.variation_value_templates)

//   // ** Hook
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchCreateProduct())
//   }, [dispatch])

//   useEffect(() => {
//     if (variation_templates) {
//       setVariationParent(variation_templates)
//     }
//   }, [variation_templates])

//   useEffect(() => {
//     if (variation_value_templates) {
//       setVariationChild(variation_value_templates)
//     }
//   }, [variation_value_templates])

//   // ** UseEffect to filter variation child
//   useEffect(() => {
//     if (Array.isArray(variationChild) && variationValue != null && variationChild.length > 0 && variationValue) {
//       const filteredChild = variationChild.filter(child => child.variation_templates_id === variationValue)
//       setFilteredVariationChild(filteredChild)
//     }
//   }, [variationChild, variationValue])

//   console.log('variationParent 😋😊', variationParent)
//   console.log('variationChild 😋😊', variationChild)
//   console.log('filteredVariationChild 😋😊', filteredVariationChild)
//   console.log('variationValue 😋😊', variationValue)

//   return (
//     <Card>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={values => {
//           // Handle form submission
//           alert(JSON.stringify(values, null, 2))

//           console.log('Form submitted with values: 🎊🎉✨', values)
//         }}
//         enableReinitialize={true}
//       >
//         {({ values, handleChange, setFieldValue }) => (
//           <Form>
//             <FieldArray name='product_variation'>
//               {({ push, remove }) => (
//                 <Box
//                   sx={{
//                     padding: '1rem'
//                   }}
//                 >
//                   {values.product_variation.map((product, productIndex) => (
//                     <Box
//                       key={productIndex}
//                       sx={{
//                         marginTop: '1rem',
//                         padding: '1rem',
//                         border: '1px solid ',
//                         borderRadius: '10px',
//                         borderColor: theme => theme.palette.divider
//                       }}
//                     >
//                       <CardHeader title={`Product Variation ${product.id}`} />
//                       <Divider
//                         sx={{
//                           mb: 2
//                         }}
//                       />
//                       {/* <Box sx={{ my: 2 }}>
//                         <Grid item xs={6} sx={{ my: 5 }}>
//                           <FormControl fullWidth>
//                             <InputLabel id='demo-simple-select-label'>Variations</InputLabel>
//                             <Select
//                               value={product.variation_template_id}
//                               name={`product_variation.${productIndex}.variation_template_id`}
//                               onChange={e => {
//                                 handleChange(e)

//                                 setVariationValue(e.target.value)
//                                 setFieldValue(`product_variation.${productIndex}.variations`, [])

//                                 // setTriggerChange(prev => !prev)
//                               }}
//                               id='demo-simple-select'
//                               label='Variation'
//                               fullWidth
//                             >
//                               {variationParent.map(item => (
//                                 <MenuItem key={item.id} value={item.id}>
//                                   {item.value}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         </Grid>
//                       </Box> */}
//                       <FieldArray name={`product_variation.${productIndex}.variations`}>
//                         {({ push: pushVariation, remove }) => (
//                           <div>
//                             {/* <DataGrid
//                               columns={[
//                                 {
//                                   field: 'id',
//                                   headerName: 'ID',
//                                   minWidth: 30,
//                                   flex: 0.1
//                                 },
//                                 {
//                                   field: 'item_code',
//                                   headerName: 'Item Code',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${
//                                         params.row.id - 1
//                                       }.item_code`}
//                                       value={params.row.item_code}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'value',
//                                   headerName: 'Value',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${params.row.id - 1}.value`}
//                                       value={params.row.value}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'dpp_exc_tax',
//                                   headerName: 'DPP Exc Tax',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${
//                                         params.row.id - 1
//                                       }.dpp_exc_tax`}
//                                       value={params.row.dpp_exc_tax}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'dpp_inc_tax',
//                                   headerName: 'DPP Inc Tax',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${
//                                         params.row.id - 1
//                                       }.dpp_inc_tax`}
//                                       value={params.row.dpp_inc_tax}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'profit',
//                                   headerName: 'Profit',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${params.row.id - 1}.profit`}
//                                       value={params.row.profit}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'dsp_exc_tax',
//                                   headerName: 'DSP Exc Tax',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${
//                                         params.row.id - 1
//                                       }.dsp_exc_tax`}
//                                       value={params.row.dsp_exc_tax}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'dsp_inc_tax',
//                                   headerName: 'DSP Inc Tax',
//                                   flex: 0.25,
//                                   minWidth: 110,
//                                   renderCell: params => (
//                                     <InputField
//                                       name={`product_variation.${productIndex}.variations.${
//                                         params.row.id - 1
//                                       }.dsp_inc_tax`}
//                                       value={params.row.dsp_inc_tax}
//                                       onChange={handleChange}
//                                     />
//                                   )
//                                 },
//                                 {
//                                   field: 'actions',
//                                   flex: 0.2,
//                                   headerName: 'Actions',
//                                   minWidth: 90,
//                                   renderCell: params => (
//                                     <RowOptions
//                                       id={params.row.id}
//                                       variation={params.row}
//                                       index={params.tabIndex}
//                                       pushVariation={pushVariation}
//                                       remove={remove}
//                                       productIndex={productIndex}
//                                       product_variation={values.product_variation}
//                                     />
//                                   )
//                                 }
//                               ]}
//                               rows={product.variations}
//                               pageSize={5}
//                               rowHeight={100}
//                               autoHeight
//                             /> */}
//                             {/* <Box sx={{ my: 2 }}>
//                               <Grid item xs={6} sx={{ my: 5 }}>
//                                 <FormControl fullWidth>
//                                   <InputLabel id='demo-simple-select-label'>Variations</InputLabel>
//                                   <Select
//                                     value={product.variation_template_id}
//                                     name={`product_variation.${productIndex}.variation_template_id`}
//                                     onChange={e => {
//                                       handleChange(e)
//                                       setVariationValue(e.target.value)

//                                       // setTriggerChange(prev => !prev)
//                                       setFieldValue(`product_variation.${productIndex}.variations`, [])

//                                       // setTimeout(() => {
//                                       //   filteredVariationChild.forEach(item => {
//                                       //     pushVariation({
//                                       //       item_code: '',
//                                       //       value: item.name,
//                                       //       dpp_exc_tax: 0,
//                                       //       dpp_inc_tax: 0,
//                                       //       profit: 0,
//                                       //       dsp_exc_tax: 0,
//                                       //       dsp_inc_tax: 0,
//                                       //       image: []
//                                       //     })
//                                       //   })
//                                       // }, 2000)
//                                     }}
//                                     id='demo-simple-select'
//                                     label='Variation'
//                                     fullWidth
//                                   >
//                                     {variationParent.map(item => (
//                                       <MenuItem key={item.id} value={item.id}>
//                                         {item.value}
//                                       </MenuItem>
//                                     ))}
//                                   </Select>
//                                 </FormControl>
//                               </Grid>
//                             </Box> */}
//                             {/* {triggerChange && (
//                               <Box sx={{ my: 2 }}>
//                                 <Button
//                                   variant='contained'
//                                   color='primary'
//                                   sx={{ my: 2, px: 2 }}
//                                   onClick={() => {
//                                     setTimeout(() => {
//                                       filteredVariationChild.forEach(item => {
//                                         pushVariation({
//                                           item_code: '',
//                                           value: item.name,
//                                           dpp_exc_tax: 0,
//                                           dpp_inc_tax: 0,
//                                           profit: 0,
//                                           dsp_exc_tax: 0,
//                                           dsp_inc_tax: 0,
//                                           image: []
//                                         })
//                                       })
//                                     }, 2000)
//                                   }}
//                                 >
//                                   Add Chosen Variations
//                                   <Icon icon='bi:arrow-right' width={20} height={20} />
//                                 </Button>
//                               </Box>
//                             )} */}

//                             <TableVariationVariable
//                               rows={product.variations}
//                               handleChange={handleChange}
//                               values={values}
//                               productIndex={productIndex}
//                               product_variation={values.product_variation}
//                               pushVariation={pushVariation}
//                               remove={remove}
//                               setFieldValue={setFieldValue}
//                               filteredVariationChild={filteredVariationChild}
//                             />
//                             <CardActions>
//                               <CustomButton
//                                 pushVariation={pushVariation}
//                                 data={{
//                                   item_code: '',
//                                   value: '',
//                                   dpp_exc_tax: 0,
//                                   dpp_inc_tax: 0,
//                                   profit: 0,
//                                   dsp_exc_tax: 0,
//                                   dsp_inc_tax: 0,
//                                   image: []
//                                 }}
//                                 filteredVariationChild={filteredVariationChild}
//                                 length={values.product_variation[productIndex].variations.length}
//                                 remove={remove}
//                                 triggerChange={triggerChange}
//                                 setTriggerChange={setTriggerChange}
//                               />
//                               <Button
//                                 type='button'
//                                 variant='outlined'
//                                 color='error'
//                                 sx={{ my: 2, px: 2 }}
//                                 onClick={() => remove(values.product_variation[productIndex].variations.length - 1)}
//                               >
//                                 Remove Variation
//                               </Button>
//                             </CardActions>
//                           </div>
//                         )}
//                       </FieldArray>
//                     </Box>
//                   ))}
//                   <CardActions sx={{ justifyContent: 'center' }}>
//                     <Button
//                       type='button'
//                       variant='outlined'
//                       color='primary'
//                       sx={{ my: 2, px: 2 }}
//                       onClick={() =>
//                         push({
//                           id: values.product_variation.length + 1,
//                           variation_template_id: '',
//                           variations: [
//                             {
//                               item_code: '',
//                               value: '',
//                               dpp_exc_tax: 0,
//                               dpp_inc_tax: 0,
//                               profit: 0,
//                               dsp_exc_tax: 0,
//                               dsp_inc_tax: 0,
//                               image: []
//                             }
//                           ]
//                         })
//                       }
//                     >
//                       Add Product Variation
//                     </Button>
//                     <Button
//                       type='button'
//                       variant='outlined'
//                       color='error'
//                       sx={{ my: 2, px: 2 }}
//                       onClick={() => remove(values.product_variation.length - 1)}
//                     >
//                       Remove Product Variation
//                     </Button>
//                   </CardActions>
//                 </Box>
//               )}
//             </FieldArray>
//             <CardActions>
//               <Button type='submit' variant='contained' color='primary'>
//                 Submit
//               </Button>
//             </CardActions>
//           </Form>
//         )}
//       </Formik>
//     </Card>
//   )
// }

// export default DynamicFieldsForm

// const InputField = ({ name, value, onChange }) => {
//   const [field] = useField(name)

//   return (
//     <>
//       <TextField
//         type='text'
//         {...field}
//         value={value}
//         onChange={e => {
//           onChange(e)
//         }}
//       />
//     </>
//   )
// }

// const CustomButton = ({
//   pushVariation,
//   data,
//   filteredVariationChild,
//   length,
//   remove,
//   triggerChange,
//   setTriggerChange
// }) => {
//   console.log('data 🎈🎈🎈🎈', data)
//   console.log('filteredVariationChild 🎈🎈🎈🎈', filteredVariationChild)
//   console.log('length 🎈🎈🎈🎈', length)

//   // const pushVariationMemoized = useCallback(pushVariation, [pushVariation])
//   // const removeMemoized = useCallback(remove, [remove])

//   // const variationsCount = length

//   // useEffect(() => {
//   //   // Remove all existing variations
//   //   if (triggerChange) {
//   //     for (let i = 0; i <= variationsCount; i++) {
//   //       remove(i)
//   //     }
//   //   }

//   //   // Clear the timeout when the component is unmounted or when the dependencies change

//   //   return () => {
//   //     setTriggerChange(false)
//   //   }
//   // }, [variationsCount, remove, triggerChange, setTriggerChange])

//   // useEffect(() => {
//   //   const timeoutId = setTimeout(() => {
//   //     filteredVariationChild.forEach((item, index) => {
//   //       console.log('item 🎈🎈🎈🎈', item)
//   //       console.log('index 🎈🎈🎈🎈', index)

//   //       pushVariation({
//   //         id: index + 1,
//   //         item_code: '',
//   //         value: item.name,
//   //         dpp_exc_tax: 0,
//   //         dpp_inc_tax: 0,
//   //         profit: 0,
//   //         dsp_exc_tax: 0,
//   //         dsp_inc_tax: 0,
//   //         image: []
//   //       })
//   //     })
//   //   }, 2000) // 2000 milliseconds = 2 seconds

//   //   // Clear the timeout when the component is unmounted or when the dependencies change
//   //   return () => clearTimeout(timeoutId)
//   // }, [filteredVariationChild, pushVariation])

//   return (
//     <Button
//       type='button'
//       variant='contained'
//       color='primary'
//       sx={{ my: 2, px: 2, mr: 2 }}
//       onClick={() => {
//         pushVariation(data)
//       }}
//     >
//       Add Variation
//     </Button>
//   )
// }

const AddProduct = () => {
  return (
    <div>
      <h1>Add Product</h1>
    </div>
  )
}
export default AddProduct
