import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// First, create the async thunk
export const postUpdateProduct = createAsyncThunk('dashboard/updateProduct', async payload => {
  const { newProduct, id } = payload

  const product = { ...newProduct }

  // ! compare the data(new) with the previous data(old) and then update the data
  const positionDetailsValueNEW = newProduct.positionDetailsValue
  const oldPositionDetailsValue = positionDetailsValueNEW.filter(item => item.type === 'old')
  const newPositionDetailsValue = positionDetailsValueNEW.filter(item => item.type === 'new')

  console.log('product_racks_update ', oldPositionDetailsValue)
  console.log('product_racks', newPositionDetailsValue)

  // formData.append('product_racks', JSON.stringify(product.positionDetailsValue))

  const formData = new FormData()
  formData.append('name', product.name || '')
  formData.append('product_type', product.product_type || '')
  formData.append('unit_id', product.unit_id || '')
  formData.append('product_racks_update', JSON.stringify(oldPositionDetailsValue))
  formData.append('product_racks', JSON.stringify(newPositionDetailsValue))

  if (product.sub_unit_id && product.sub_unit_id.length > 0) {
    for (let i = 0; i < product.sub_unit_id.length; i++) {
      formData.append(`sub_unit_id[${i}]`, product.sub_unit_id[i])
    }
  }

  if (product.location && product.location.length > 0) {
    for (let i = 0; i < product.location.length; i++) {
      formData.append(`product_locations[${i}]`, product.location[i])
    }
  }

  formData.append('category_id', product.category_id || '')
  formData.append('sub_category_id', product.sub_category_id || '')
  formData.append('brand_id', product.brand_id || '')
  formData.append('tax_id', product.tax_id)
  formData.append('enable_stock', product.enable_stock || '')
  formData.append('alert_quantity', product.alert_quantity || '')
  formData.append('code', product.code || '')
  formData.append('code2', product.code2 || '')
  formData.append('barcode_type', product.barcode_type || '')
  formData.append('expiry_period', product.expiry_period || '')
  formData.append('expiry_period_type', product.expiry_period_type || '')
  formData.append('weight', product.weight || '')
  formData.append('custom_field_1', product.custom_field_1 || '')
  formData.append('custom_field_2', product.custom_field_2 || '')
  formData.append('custom_field_3', product.custom_field_3 || '')
  formData.append('custom_field_4', product.custom_field_4 || '')
  formData.append('warranty_id', product.warranty_id)
  formData.append('not_for_sale', product.not_for_sale)
  formData.append('full_description', product.long_description)
  formData.append('description', product.short_description)

  if (product?.productmultipleimages && product?.productmultipleimages.length > 0) {
    for (let i = 0; i < product?.productmultipleimages.length; i++) {
      formData.append(`more_image[${i}]`, product?.productmultipleimages[i])
    }
  }

  if (product?.productImage && typeof product?.productImage !== 'string' && product?.productImage > 0) {
    formData.append('image', (product.productImage && product?.productImage[0]) || '')
  }
  if (product?.productbrochure && typeof product?.productbrochure !== 'string' && product?.productbrochure > 0) {
    formData.append('bruchore', (product.productbrochure && product?.productbrochure[0]) || '')
  }
  if (product?.productvideo && typeof product?.productvideo !== 'string' && product?.productvideo > 0) {
    formData.append('video', (product.productvideo && product?.productvideo[0]) || '')
  }

  // ** Single Product Price
  if (product.product_type === 'single') {
    if (product.tableData && product.tableData.length > 0) {
      formData.append(
        'table_price_1',
        JSON.stringify(
          product.tableData.map(item => {
            return {
              unit_id: product.unit_id,
              value: item.value,
              single_dpp: item.single_dpp,
              single_dpp_inc_tax: item.single_dpp_in_tax,
              profit_percent: item.profit_percent,
              single_dsp: item.single_dsp,
              single_dsp_inc_tax: item.single_dsp_inc_tax
            }
          })
        )
      )

      // formData.append(
      //   'table_price_1',
      //   JSON.stringify(
      //     [
      //       {
      //         unit_id: product.unit_id,
      //         value: 'default_price',
      //         single_dpp: product.tableData[0].single_dpp,
      //         single_dpp_inc_tax: product.tableData[0].single_dpp_in_tax,
      //         profit_percent: product.tableData[0].profit_percent,
      //         single_dsp: product.tableData[0].single_dsp,
      //         single_dsp_inc_tax: product.tableData[0].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'whole_price',
      //         single_dpp: product.tableData[1].single_dpp,
      //         single_dpp_inc_tax: product.tableData[1].single_dpp_in_tax,
      //         profit_percent: product.tableData[1].profit_percent,
      //         single_dsp: product.tableData[1].single_dsp,
      //         single_dsp_inc_tax: product.tableData[1].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'retail_price',
      //         single_dpp: product.tableData[2].single_dpp,
      //         single_dpp_inc_tax: product.tableData[2].single_dpp_in_tax,
      //         profit_percent: product.tableData[2].profit_percent,
      //         single_dsp: product.tableData[2].single_dsp,
      //         single_dsp_inc_tax: product.tableData[2].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'minimum_price',
      //         single_dpp: product.tableData[3].single_dpp,
      //         single_dpp_inc_tax: product.tableData[3].single_dpp_in_tax,
      //         profit_percent: product.tableData[3].profit_percent,
      //         single_dsp: product.tableData[3].single_dsp,
      //         single_dsp_inc_tax: product.tableData[3].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'last_price',
      //         single_dpp: product.tableData[4].single_dpp,
      //         single_dpp_inc_tax: product.tableData[4].single_dpp_in_tax,
      //         profit_percent: product.tableData[4].profit_percent,
      //         single_dsp: product.tableData[4].single_dsp,
      //         single_dsp_inc_tax: product.tableData[4].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'ecm_before_price',
      //         single_dpp: product.tableData[5].single_dpp,
      //         single_dpp_inc_tax: product.tableData[5].single_dpp_in_tax,
      //         profit_percent: product.tableData[5].profit_percent,
      //         single_dsp: product.tableData[5].single_dsp,
      //         single_dsp_inc_tax: product.tableData[5].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'ecm_after_price',
      //         single_dpp: product.tableData[6].single_dpp,
      //         single_dpp_inc_tax: product.tableData[6].single_dpp_in_tax,
      //         profit_percent: product.tableData[6].profit_percent,
      //         single_dsp: product.tableData[6].single_dsp,
      //         single_dsp_inc_tax: product.tableData[6].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'custom_price_1',
      //         single_dpp: product.tableData[7].single_dpp,
      //         single_dpp_inc_tax: product.tableData[7].single_dpp_in_tax,
      //         profit_percent: product.tableData[7].profit_percent,
      //         single_dsp: product.tableData[7].single_dsp,
      //         single_dsp_inc_tax: product.tableData[7].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'custom_price_2',
      //         single_dpp: product.tableData[8].single_dpp,
      //         single_dpp_inc_tax: product.tableData[8].single_dpp_in_tax,
      //         profit_percent: product.tableData[8].profit_percent,
      //         single_dsp: product.tableData[8].single_dsp,
      //         single_dsp_inc_tax: product.tableData[8].single_dsp_inc_tax
      //       },
      //       {
      //         unit_id: product.unit_id,
      //         value: 'custom_price_3',
      //         single_dpp: product.tableData[9].single_dpp,
      //         single_dpp_inc_tax: product.tableData[9].single_dpp_in_tax,
      //         profit_percent: product.tableData[9].profit_percent,
      //         single_dsp: product.tableData[9].single_dsp,
      //         single_dsp_inc_tax: product.tableData[9].single_dsp_inc_tax
      //       }
      //     ] || null
      //   )
      // )
    }
    if (product.tableDataChildOne && product.tableDataChildOne.length > 0 && product.show_more_price) {
      formData.append(
        'table_price_2',
        JSON.stringify(
          product.tableDataChildOne.map(item => {
            return {
              unit_id: product.sub_unit_id[0],
              value: item.value,
              single_dpp: item.single_dpp,
              single_dpp_inc_tax: item.single_dpp_in_tax,
              profit_percent: item.profit_percent,
              single_dsp: item.single_dsp,
              single_dsp_inc_tax: item.single_dsp_inc_tax
            }
          })
        )
      )

      // formData.append(
      //   'table_price_2',
      //   JSON.stringify([
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'default_price',
      //       single_dpp: product.tableDataChildOne[0].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[0].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[0].profit_percent,
      //       single_dsp: product.tableDataChildOne[0].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[0].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'whole_price',
      //       single_dpp: product.tableDataChildOne[1].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[1].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[1].profit_percent,
      //       single_dsp: product.tableDataChildOne[1].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[1].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'retail_price',
      //       single_dpp: product.tableDataChildOne[2].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[2].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[2].profit_percent,
      //       single_dsp: product.tableDataChildOne[2].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[2].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'minimum_price',
      //       single_dpp: product.tableDataChildOne[3].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[3].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[3].profit_percent,
      //       single_dsp: product.tableDataChildOne[3].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[3].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'last_price',
      //       single_dpp: product.tableDataChildOne[4].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[4].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[4].profit_percent,
      //       single_dsp: product.tableDataChildOne[4].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[4].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'ecm_before_price',
      //       single_dpp: product.tableDataChildOne[5].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[5].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[5].profit_percent,
      //       single_dsp: product.tableDataChildOne[5].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[5].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'ecm_after_price',
      //       single_dpp: product.tableDataChildOne[6].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[6].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[6].profit_percent,
      //       single_dsp: product.tableDataChildOne[6].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[6].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'custom_price_1',
      //       single_dpp: product.tableDataChildOne[7].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[7].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[7].profit_percent,
      //       single_dsp: product.tableDataChildOne[7].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[7].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'custom_price_2',
      //       single_dpp: product.tableDataChildOne[8].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[8].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[8].profit_percent,
      //       single_dsp: product.tableDataChildOne[8].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[8].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[0],
      //       value: 'custom_price_3',
      //       single_dpp: product.tableDataChildOne[9].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildOne[9].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildOne[9].profit_percent,
      //       single_dsp: product.tableDataChildOne[9].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildOne[9].single_dsp_inc_tax
      //     }
      //   ])
      // )
    }
    if (product.tableDataChildTwo && product.tableDataChildTwo.length > 0 && product.show_more_price) {
      formData.append(
        'table_price_3',
        JSON.stringify(
          product.tableDataChildTwo.map(item => {
            return {
              unit_id: product.sub_unit_id[1],
              value: item.value,
              single_dpp: item.single_dpp,
              single_dpp_inc_tax: item.single_dpp_in_tax,
              profit_percent: item.profit_percent,
              single_dsp: item.single_dsp,
              single_dsp_inc_tax: item.single_dsp_inc_tax
            }
          })
        )
      )

      // formData.append(
      //   'table_price_3',
      //   JSON.stringify([
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'default_price',
      //       single_dpp: product.tableDataChildTwo[0].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[0].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[0].profit_percent,
      //       single_dsp: product.tableDataChildTwo[0].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[0].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'whole_price',
      //       single_dpp: product.tableDataChildTwo[1].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[1].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[1].profit_percent,
      //       single_dsp: product.tableDataChildTwo[1].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[1].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'retail_price',
      //       single_dpp: product.tableDataChildTwo[2].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[2].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[2].profit_percent,
      //       single_dsp: product.tableDataChildTwo[2].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[2].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'minimum_price',
      //       single_dpp: product.tableDataChildTwo[3].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[3].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[3].profit_percent,
      //       single_dsp: product.tableDataChildTwo[3].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[3].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'last_price',
      //       single_dpp: product.tableDataChildTwo[4].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[4].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[4].profit_percent,
      //       single_dsp: product.tableDataChildTwo[4].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[4].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'ecm_before_price',
      //       single_dpp: product.tableDataChildTwo[5].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[5].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[5].profit_percent,
      //       single_dsp: product.tableDataChildTwo[5].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[5].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'ecm_after_price',
      //       single_dpp: product.tableDataChildTwo[6].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[6].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[6].profit_percent,
      //       single_dsp: product.tableDataChildTwo[6].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[6].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'custom_price_1',
      //       single_dpp: product.tableDataChildTwo[7].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[7].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[7].profit_percent,
      //       single_dsp: product.tableDataChildTwo[7].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[7].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'custom_price_2',
      //       single_dpp: product.tableDataChildTwo[8].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[8].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[8].profit_percent,
      //       single_dsp: product.tableDataChildTwo[8].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[8].single_dsp_inc_tax
      //     },
      //     {
      //       unit_id: product.sub_unit_id[1],
      //       value: 'custom_price_3',
      //       single_dpp: product.tableDataChildTwo[9].single_dpp,
      //       single_dpp_inc_tax: product.tableDataChildTwo[9].single_dpp_in_tax,
      //       profit_percent: product.tableDataChildTwo[9].profit_percent,
      //       single_dsp: product.tableDataChildTwo[9].single_dsp,
      //       single_dsp_inc_tax: product.tableDataChildTwo[9].single_dsp_inc_tax
      //     }
      //   ])
      // )
    }
  }

  // // ** Variable Product Price
  // if (product.product_type === 'variable') {
  //   formData.append('product_variation', JSON.stringify(product.product_variation))
  // }

  if (product.product_variation.length > 0) {
    product.product_variation.map((item, parentIndex) => {
      if (item.variations.length > 0) {
        item.variations.map((item, index) => {
          if (Array.isArray(item.image) && item.image.length > 0)
            formData.append(`variation_images_${parentIndex}_${index}`, item.image[0])
        })
      }
    })
  }

  if (product.product_type === 'combo') {
    formData.append('product_compo', JSON.stringify(product.product_compo))
  }

  //TODO=================Variable Product Price & its Variations===================

  // ** Old Variation Prices
  //! the main problem is that the old variation prices  (old)=>edit ( new)=>normal
  // ! so we need to compare the old and new variation prices and then update the data by the type
  // ! if the type is old then we need to update the data by the type old=>edit to value (product_variation_edit)  else  type === ''
  // ! then send data to value (product_variation)

  // const prodcut = [
  //   {
  //     id: 1, name: 'John', row: [
  //       { id: 1, name: 'John', type: 'old' },
  //       { id: 1, name: 'John', type: 'old' },
  //     ]
  //   },
  //   {
  //     id: 2, name: 'Doe', row: [
  //       { id: 1, name: 'Doe', type: 'old' },
  //       { id: 2, name: 'Doe', type: '' },
  //     ]
  //   }

  // ]

  // product[0].id , product[1].row[1].type

  // Only for the variable product
  if (product.product_type === 'variable') {
    // ** First filter the old variation prices
    const oldVariationPrices = product.product_variation.filter(item => item.type === 'old')
    const newVariationPrices = product.product_variation.filter(item => item.type === '')

    // ** Then append the old variation prices to the formData
    if (oldVariationPrices.length > 0) {
      // **DO SOMETHING
      //TODO Define the Structure of the old variation  prices (Table) to send it to the backend

      formData.append('product_variation_edit', JSON.stringify(oldVariationPrices))

      oldVariationPrices.map(item, parentIndex => {
        item.variations
          .filter(item => item.type === 'old')
          .map((item, index) => {
            formData.append(`edit_variation_images_${parentIndex}_${index}`, item.image[0])
          })
      })

      // oldVariationPrices.map(item =>
      //   formData.append(`product_variation_edit[${item.table_id}]`, {
      //     ...item,
      //     variations: item.variations.filter(item => item.type === ''),
      //     [`variations_edit[${item.variations.filter(item => item.type === 'old')}]`]: item.variations.filter(
      //       item => item.type === 'old'
      //     )
      //   })
      // )
    }

    if (newVariationPrices.length > 0) {
      // **DO SOMETHING
      //TODO Define the Structure of the new variation prices (Table) to send it to the backend
      formData.append('product_variation', JSON.stringify(newVariationPrices))
    }
  }

  // if (product.product_variation.length > 0) {
  //   product.product_variation.map((item, parentIndex) => {
  //     item.variations.map((item, index) => {
  //       formData.append(`variation_images_${parentIndex}_${index}`, item.image[0])
  //     })
  //   })
  // }

  // // const Data = [
  //   {
  //     table_id: 222,
  //     type: 'old',
  //     variation_template_id: 38,
  //     variations: [
  //       {
  //         rows_id: 217,
  //         type: 'old',
  //         variation_value_id: 186,
  //         value: 'Mahmoud Ali-Mahmoud',
  //         sub_sku: '12',
  //         default_purchase_price: 100,
  //         dpp_inc_tax: 105,
  //         profit_percent: 25,
  //         default_sell_price: 125,
  //         sell_price_inc_tax: 131.25,
  //         image: ''
  //       },
  //       {
  //         rows_id: 218,
  //         type: 'old',
  //         variation_value_id: 187,
  //         value: 'Mahmoud Ali-Ali',
  //         sub_sku: '131e',
  //         default_purchase_price: 200,
  //         dpp_inc_tax: 210,
  //         profit_percent: 25,
  //         default_sell_price: 250,
  //         sell_price_inc_tax: 262.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 236,
  //         type: 'old',
  //         variation_value_id: 226,
  //         value: 'Mahmoud Ali-Mahmoud Ali-Mahmoud',
  //         sub_sku: '12',
  //         default_purchase_price: 1000,
  //         dpp_inc_tax: 1050,
  //         profit_percent: 25,
  //         default_sell_price: 1250,
  //         sell_price_inc_tax: 1312.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 237,
  //         type: 'old',
  //         variation_value_id: 227,
  //         value: 'Mahmoud Ali-Mahmoud Ali-Ali',
  //         sub_sku: '131e',
  //         default_purchase_price: 200,
  //         dpp_inc_tax: 210,
  //         profit_percent: 25,
  //         default_sell_price: 250,
  //         sell_price_inc_tax: 262.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 241,
  //         type: 'old',
  //         variation_value_id: 226,
  //         value: 'Mahmoud Ali-Mahmoud Ali-Mahmoud',
  //         sub_sku: '12',
  //         default_purchase_price: 1000,
  //         dpp_inc_tax: 1050,
  //         profit_percent: 25,
  //         default_sell_price: 1250,
  //         sell_price_inc_tax: 1312.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 242,
  //         type: 'old',
  //         variation_value_id: 227,
  //         value: 'Mahmoud Ali-Mahmoud Ali-Ali',
  //         sub_sku: '131e',
  //         default_purchase_price: 2000,
  //         dpp_inc_tax: 2100,
  //         profit_percent: 25,
  //         default_sell_price: 2500,
  //         sell_price_inc_tax: 2625,
  //         image: ''
  //       },
  //       {
  //         rows_id: 243,
  //         type: 'old',
  //         variation_value_id: 231,
  //         value: 'Mahmoud Ali-Mahmoud Ali-Mahmoud Ali-Mahmoud',
  //         sub_sku: '12',
  //         default_purchase_price: 100000,
  //         dpp_inc_tax: 105000,
  //         profit_percent: 25,
  //         default_sell_price: 125000,
  //         sell_price_inc_tax: 131250,
  //         image: ''
  //       },
  //       {
  //         rows_id: 244,
  //         type: 'old',
  //         variation_value_id: 232,
  //         value: 'Mahmoud Ali-Mahmoud Ali-Mahmoud Ali-Ali',
  //         sub_sku: '131e',
  //         default_purchase_price: 210,
  //         dpp_inc_tax: 220.5,
  //         profit_percent: 25,
  //         default_sell_price: 262.5,
  //         sell_price_inc_tax: 275.63,
  //         image: ''
  //       }
  //     ]
  //   },
  //   {
  //     table_id: 222,
  //     type: 'old',
  //     variation_template_id: 36,
  //     variations: [
  //       {
  //         rows_id: 219,
  //         type: 'old',
  //         variation_value_id: 165,
  //         value: 'One Piece-Lofy',
  //         sub_sku: 'eq43',
  //         default_purchase_price: 100,
  //         dpp_inc_tax: 105,
  //         profit_percent: 35,
  //         default_sell_price: 135,
  //         sell_price_inc_tax: 141.75,
  //         image: ''
  //       },
  //       {
  //         rows_id: 220,
  //         type: 'old',
  //         variation_value_id: 166,
  //         value: 'One Piece-Zoro',
  //         sub_sku: '123d',
  //         default_purchase_price: 200,
  //         dpp_inc_tax: 210,
  //         profit_percent: 35,
  //         default_sell_price: 270,
  //         sell_price_inc_tax: 283.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 221,
  //         type: 'old',
  //         variation_value_id: 208,
  //         value: 'One Piece-new Row',
  //         sub_sku: '34er',
  //         default_purchase_price: 300,
  //         dpp_inc_tax: 315,
  //         profit_percent: 35,
  //         default_sell_price: 405,
  //         sell_price_inc_tax: 425.25,
  //         image: ''
  //       },
  //       {
  //         rows_id: 238,
  //         type: 'old',
  //         variation_value_id: 228,
  //         value: 'One Piece-One Piece-Lofy',
  //         sub_sku: 'eq43',
  //         default_purchase_price: 100,
  //         dpp_inc_tax: 105,
  //         profit_percent: 35,
  //         default_sell_price: 135,
  //         sell_price_inc_tax: 141.75,
  //         image: ''
  //       },
  //       {
  //         rows_id: 239,
  //         type: 'old',
  //         variation_value_id: 229,
  //         value: 'One Piece-One Piece-Zoro',
  //         sub_sku: '123d',
  //         default_purchase_price: 200,
  //         dpp_inc_tax: 210,
  //         profit_percent: 35,
  //         default_sell_price: 270,
  //         sell_price_inc_tax: 283.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 240,
  //         type: 'old',
  //         variation_value_id: 230,
  //         value: 'One Piece-One Piece-new Row',
  //         sub_sku: '34er',
  //         default_purchase_price: 300,
  //         dpp_inc_tax: 315,
  //         profit_percent: 35,
  //         default_sell_price: 405,
  //         sell_price_inc_tax: 425.25,
  //         image: ''
  //       },
  //       {
  //         rows_id: 245,
  //         type: '',
  //         variation_value_id: 228,
  //         value: 'One Piece-One Piece-Lofy',
  //         sub_sku: 'eq43',
  //         default_purchase_price: 100,
  //         dpp_inc_tax: 105,
  //         profit_percent: 35,
  //         default_sell_price: 135,
  //         sell_price_inc_tax: 141.75,
  //         image: ''
  //       },
  //       {
  //         rows_id: 246,
  //         type: 'old',
  //         variation_value_id: 229,
  //         value: 'One Piece-One Piece-Zoro',
  //         sub_sku: '123d',
  //         default_purchase_price: 200,
  //         dpp_inc_tax: 210,
  //         profit_percent: 35,
  //         default_sell_price: 270,
  //         sell_price_inc_tax: 283.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 247,
  //         type: 'old',
  //         variation_value_id: 230,
  //         value: 'One Piece-One Piece-new Row',
  //         sub_sku: '34er',
  //         default_purchase_price: 300,
  //         dpp_inc_tax: 315,
  //         profit_percent: 35,
  //         default_sell_price: 405,
  //         sell_price_inc_tax: 425.25,
  //         image: ''
  //       },
  //       {
  //         rows_id: 248,
  //         type: 'old',
  //         variation_value_id: 233,
  //         value: 'One Piece-One Piece-One Piece-Lofy',
  //         sub_sku: 'eq43',
  //         default_purchase_price: 100,
  //         dpp_inc_tax: 105,
  //         profit_percent: 35,
  //         default_sell_price: 135,
  //         sell_price_inc_tax: 141.75,
  //         image: ''
  //       },
  //       {
  //         rows_id: 249,
  //         type: 'old',
  //         variation_value_id: 234,
  //         value: 'One Piece-One Piece-One Piece-Zoro',
  //         sub_sku: '123d',
  //         default_purchase_price: 200,
  //         dpp_inc_tax: 210,
  //         profit_percent: 35,
  //         default_sell_price: 270,
  //         sell_price_inc_tax: 283.5,
  //         image: ''
  //       },
  //       {
  //         rows_id: 250,
  //         type: 'old',
  //         variation_value_id: 235,
  //         value: 'One Piece-One Piece-One Piece-new Row',
  //         sub_sku: '34er',
  //         default_purchase_price: 300,
  //         dpp_inc_tax: 315,
  //         profit_percent: 35,
  //         default_sell_price: 405,
  //         sell_price_inc_tax: 425.25,
  //         image: ''
  //       },
  //       {
  //         rows_id: 251,
  //         type: 'old',
  //         variation_value_id: 236,
  //         value: 'One Piece-new v',
  //         sub_sku: '1212112',
  //         default_purchase_price: 400,
  //         dpp_inc_tax: 420,
  //         profit_percent: 10,
  //         default_sell_price: 440,
  //         sell_price_inc_tax: 462,
  //         image: ''
  //       }
  //     ]
  //   }
  // ]

  // let users = {
  //   90: { id: 1, name: 'John' }
  // }

  // Accessing the user with index '90'

  const token = getCookie('token')
  const response = await axios.post(`https://test.izocloud.net/api/app/react/products/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log(response.data, '===> response from update Product 🎱🎱🎱')

  return response.data
})

// Then, create the slice
const postUpdateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: {
    data: [],
    status: 'idle',
    error: false,
    loading: false,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postUpdateProduct.pending, state => {
      state.status = 'loading'
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(postUpdateProduct.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = false
      state.status = 'succeeded'
      console.log('fulfilled from update Product product ', action)
      notify('Product Updated successfully', 'success')
    })
    builder.addCase(postUpdateProduct.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = true
      state.status = 'failed'
      console.log('rejected from update Product product ', action)
      notify('Product not Updated ', 'error')
    })
  }
})

export default postUpdateProductSlice.reducer
