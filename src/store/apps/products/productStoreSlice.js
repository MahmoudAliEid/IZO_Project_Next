/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import notify from 'src/utils/notify'

// First, create the async thunk
export const saveProduct = createAsyncThunk('products/save', async product => {
  console.log(product, '===> product from saveProduct 🙌🙌')

  // {
  //     "name": "kjlhhjb",
  //     "code": "kjkjkn",
  //     "code2": "kmn55",
  //     "barcode_type": "C128",
  //     "unit_id": 30,
  //     "sub_unit_id": [],
  //     "brand_id": 47,
  //     "category_id": 7,
  //     "sub_category_id": 8,
  //     "enable_stock": false,
  //     "alert_quantity": null,
  //     "warranty_id": 4,
  //     "long_description": {
  //         "blocks": [
  //             {
  //                 "key": "b1jfq",
  //                 "text": "",
  //                 "type": "unstyled",
  //                 "depth": 0,
  //                 "inlineStyleRanges": [],
  //                 "entityRanges": [],
  //                 "data": {}
  //             }
  //         ],
  //         "entityMap": {}
  //     },
  //     "short_description": {
  //         "blocks": [
  //             {
  //                 "key": "etrtd",
  //                 "text": "",
  //                 "type": "unstyled",
  //                 "depth": 0,
  //                 "inlineStyleRanges": [],
  //                 "entityRanges": [],
  //                 "data": {}
  //             }
  //         ],
  //         "entityMap": {}
  //     },
  //     "location": 1,
  //     "productimage": [],
  //     "productmultipleimages": [],
  //     "productbrochure": [],
  //     "productvideo": [],
  //     "expiry_period_type": "no Applicable",
  //     "not_for_sale": false,
  //     "expiry_period": "",
  //     "weight": "",
  //     "custom_field_1": "",
  //     "custom_field_2": "",
  //     "custom_field_3": "",
  //     "custom_field_4": "",
  //     "product_type": "single",
  //     "tax": 0.05,
  //     "tableData": [
  //         {
  //             "id": 1,
  //             "unit_id": 30,
  //             "value": "default_price",
  //             "single_dpp": 100,
  //             "single_dpp_in_tax": 105,
  //             "profit_percent": 25,
  //             "single_dsp": 125,
  //             "single_dsp_inc_tax": 131.25
  //         },
  //         {
  //             "id": 2,
  //             "unit_id": 30,
  //             "value": "whole_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 3,
  //             "unit_id": 30,
  //             "value": "retail_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 4,
  //             "unit_id": 30,
  //             "value": "minimum_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 5,
  //             "unit_id": 30,
  //             "value": "last_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 6,
  //             "unit_id": 30,
  //             "value": "ecm_before_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 7,
  //             "unit_id": 30,
  //             "value": "ecm_after_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 8,
  //             "unit_id": 30,
  //             "value": "custom_price_1",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 9,
  //             "unit_id": 30,
  //             "value": "custom_price_2",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 10,
  //             "unit_id": 30,
  //             "value": "custom_price_3",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 11,
  //             "unit_id": 30,
  //             "value": "custom_price_4",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         }
  //     ],
  //     "tableDataChildOne": [
  //         {
  //             "id": 1,
  //             "unit_id": "",
  //             "value": "default_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 2,
  //             "unit_id": "",
  //             "value": "whole_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 3,
  //             "unit_id": "",
  //             "value": "retail_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 4,
  //             "unit_id": "",
  //             "value": "minimum_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 5,
  //             "unit_id": "",
  //             "value": "last_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 6,
  //             "unit_id": "",
  //             "value": "ecm_before_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 7,
  //             "unit_id": "",
  //             "value": "ecm_after_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 8,
  //             "unit_id": "",
  //             "value": "custom_price_1",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 9,
  //             "unit_id": "",
  //             "value": "custom_price_2",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 10,
  //             "unit_id": "",
  //             "value": "custom_price_3",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 11,
  //             "unit_id": "",
  //             "value": "custom_price_4",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         }
  //     ],
  //     "tableDataChildTwo": [
  //         {
  //             "id": 1,
  //             "unit_id": "",
  //             "value": "default_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 2,
  //             "unit_id": "",
  //             "value": "whole_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 3,
  //             "unit_id": "",
  //             "value": "retail_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 4,
  //             "unit_id": "",
  //             "value": "minimum_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 5,
  //             "unit_id": "",
  //             "value": "last_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 6,
  //             "unit_id": "",
  //             "value": "ecm_before_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 7,
  //             "unit_id": "",
  //             "value": "ecm_after_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 8,
  //             "unit_id": "",
  //             "value": "custom_price_1",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 9,
  //             "unit_id": "",
  //             "value": "custom_price_2",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 10,
  //             "unit_id": "",
  //             "value": "custom_price_3",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 11,
  //             "unit_id": "",
  //             "value": "custom_price_4",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         }
  //     ]
  // }

  // name:test 225130
  // product_type:single
  // unit_id:1
  // sub_unit_id[]:1
  // sub_unit_id[]:2
  // brand_id:1
  // category_id:1
  // sub_category_id:11
  // tax_id:1
  // enable_stock:1
  // alert_quantity:10
  // code:2251230
  // code2:2252230
  // barcode_type:C128
  // expiry_period:12
  // expiry_period_type:months
  // weight:
  // custom_field_1:
  // custom_field_2:
  // custom_field_3:
  // custom_field_4:
  // description:hello world
  // warranty_id:1
  // not_for_sale:0
  // full_description:22222222
  // product_locations[]:1
  // //unit_D[]:1
  // //unit_D[]:2
  // //single_dpp1[]:100
  // //single_dpp1[]:200
  // //single_dpp_inc_tax1[]:125
  // //single_dpp_inc_tax1[]:1253
  // //profit_percent1[]:25
  // //profit_percent1[]:25
  // //single_dsp1[]:16
  // //single_dsp1[]:15
  // //single_dsp_inc_tax1[]:25
  // //single_dsp_inc_tax1[]:150
  // //single_dpp2[]:100
  // //single_dpp2[]:200
  // //single_dpp_inc_tax2[]:125
  // //single_dpp_inc_tax2[]:1253
  // //profit_percent2[]:25
  // //profit_percent2[]:25
  // //single_dsp2[]:16
  // //single_dsp2[]:15
  // //single_dsp_inc_tax2[]:25
  // //single_dsp_inc_tax2[]:150
  // //single_variation_id1:126
  // product_racks[][1][rack]:12
  // product_racks[][1][row]:23
  // product_racks[][1][position]:34
  // product_racks[][5][rack]:45
  // product_racks[][5][row]:56
  // product_racks[][5][position]:67
  // table_price_1[0][unit_id]:1
  // table_price_1[0][value]:default_price
  // table_price_1[0][single_dpp]:1000
  // table_price_1[0][single_dpp_inc_tax]:1050
  // table_price_1[0][profit_percent]:10
  // table_price_1[0][single_dsp]:1100
  // table_price_1[0][single_dsp_inc_tax]:1155
  // table_price_1[1][unit_id]:2
  // table_price_1[1][value]:whole_price
  // table_price_1[1][single_dpp]:1000
  // table_price_1[1][single_dpp_inc_tax]:1050
  // table_price_1[1][profit_percent]:10
  // table_price_1[1][single_dsp]:1100
  // table_price_1[1][single_dsp_inc_tax]:1155

  // {
  //   name: product.name,
  //   product_type: product.product_type,
  //   unit_id: product.unit_id,
  //   'sub_unit_id[]': product.sub_unit_id,
  //   'sub_unit_id[]': [],
  //   brand_id: product.brand_id,
  //   category_id: product.category_id,
  //   sub_category_id: product.sub_category_id,
  //   tax_id: product.tax,
  //   enable_stock: product.enable_stock,
  //   alert_quantity: product.alert_quantity,
  //   code: product.code,
  //   code2: product.code2,
  //   barcode_type: product.barcode_type,
  //   expiry_period: product.expiry_period,
  //   expiry_period_type: product.expiry_period_type,
  //   weight: product.weight,
  //   custom_field_1: product.custom_field_1,
  //   custom_field_2: product.custom_field_2,
  //   custom_field_3: product.custom_field_3,
  //   custom_field_4: product.custom_field_4,
  //   description: product.short_description,
  //   warranty_id: product.warranty_id,
  //   not_for_sale: product.not_for_sale,
  //   full_description: product.long_description,
  //   'product_locations[]': product.location,

  //   //unit_D[]:1
  //   //unit_D[]:2
  //   //single_dpp1[]:100
  //   //single_dpp1[]:200
  //   //single_dpp_inc_tax1[]:125
  //   //single_dpp_inc_tax1[]:1253
  //   //profit_percent1[]:25
  //   //profit_percent1[]:25
  //   //single_dsp1[]:16
  //   //single_dsp1[]:15
  //   //single_dsp_inc_tax1[]:25
  //   //single_dsp_inc_tax1[]:150
  //   //single_dpp2[]:100
  //   //single_dpp2[]:200
  //   //single_dpp_inc_tax2[]:125
  //   //single_dpp_inc_tax2[]:1253
  //   //profit_percent2[]:25
  //   //profit_percent2[]:25
  //   //single_dsp2[]:16
  //   //single_dsp2[]:15
  //   //single_dsp_inc_tax2[]:25
  //   //single_dsp_inc_tax2[]:150
  //   //single_variation_id1:126
  //   'product_racks[][1][rack]': 12,
  //   'product_racks[][1][row]': 23,
  //   'product_racks[][1][position]': 34,
  //   'product_racks[][5][rack]': 45,
  //   'product_racks[][5][row]': 56,
  //   'product_racks[][5][position]': 67,
  //   'table_price_1[0][unit_id]': product.unit_id,
  //   'table_price_1[0][value]': product.tableData[0].value,
  //   'table_price_1[0][single_dpp]': product.tableData[0].single_dpp,
  //   'table_price_1[0][single_dpp_inc_tax]': product.tableData[0].single_dpp_in_tax,
  //   'table_price_1[0][profit_percent]': product.tableData[0].profit_percent,
  //   'table_price_1[0][single_dsp]': product.tableData[0].single_dsp,
  //   'table_price_1[0][single_dsp_inc_tax]': product.tableData[0].single_dsp_inc_tax,
  //   'table_price_1[1][unit_id]': product.unit_id,
  //   'table_price_1[1][value]': product.tableData[1].value,
  //   'table_price_1[1][single_dpp]': product.tableData[1].single_dpp,
  //   'table_price_1[1][single_dpp_inc_tax]': product.tableData[1].single_dpp_in_tax,
  //   'table_price_1[1][profit_percent]': product.tableData[1].profit_percent,
  //   'table_price_1[1][single_dsp]': product.tableData[1].single_dsp,
  //   'table_price_1[1][single_dsp_inc_tax]': product.tableData[1].single_dsp_inc_tax
  // },

  //   {
  //     "name": "jghguytucfx",
  //     "code": "kjhjkk3214235",
  //     "code2": "klhkjhgj+6564",
  //     "barcode_type": "EAN13",
  //     "unit_id": 1,
  //     "sub_unit_id": [
  //         61,
  //         60
  //     ],
  //     "brand_id": 51,
  //     "category_id": 36,
  //     "sub_category_id": "",
  //     "enable_stock": true,
  //     "alert_quantity": "jkghkgj",
  //     "warranty_id": 10,
  //     "long_description": {
  //         "blocks": [
  //             {
  //                 "key": "dl13e",
  //                 "text": "uhghjkghj",
  //                 "type": "unstyled",
  //                 "depth": 0,
  //                 "inlineStyleRanges": [],
  //                 "entityRanges": [],
  //                 "data": {
  //                     "text-align": "right"
  //                 }
  //             }
  //         ],
  //         "entityMap": {}
  //     },
  //     "short_description": {
  //         "blocks": [
  //             {
  //                 "key": "f7oii",
  //                 "text": "lkj;hjk",
  //                 "type": "unstyled",
  //                 "depth": 0,
  //                 "inlineStyleRanges": [],
  //                 "entityRanges": [],
  //                 "data": {}
  //             }
  //         ],
  //         "entityMap": {}
  //     },
  //     "location": 1,
  //     "productimage": [],
  //     "productmultipleimages": [],
  //     "productbrochure": [],
  //     "productvideo": [],
  //     "expiry_period_type": "months",
  //     "not_for_sale": true,
  //     "expiry_period": "3165",
  //     "weight": "5211465",
  //     "custom_field_1": "kjhgjg",
  //     "custom_field_2": "llkjk",
  //     "custom_field_3": "lkhjkh",
  //     "custom_field_4": "kjhkj",
  //     "product_type": "single",
  //     "tax": 0.05,
  //     "tableData": [
  //         {
  //             "id": 1,
  //             "unit_id": 1,
  //             "value": "default_price",
  //             "single_dpp": 100,
  //             "single_dpp_in_tax": 105,
  //             "profit_percent": 25,
  //             "single_dsp": 125,
  //             "single_dsp_inc_tax": 131.25
  //         },
  //         {
  //             "id": 2,
  //             "unit_id": 1,
  //             "value": "whole_price",
  //             "single_dpp": 200,
  //             "single_dpp_in_tax": 210,
  //             "profit_percent": 25,
  //             "single_dsp": 250,
  //             "single_dsp_inc_tax": 262.5
  //         },
  //         {
  //             "id": 3,
  //             "unit_id": 1,
  //             "value": "retail_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 4,
  //             "unit_id": 1,
  //             "value": "minimum_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 5,
  //             "unit_id": 1,
  //             "value": "last_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 6,
  //             "unit_id": 1,
  //             "value": "ecm_before_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 7,
  //             "unit_id": 1,
  //             "value": "ecm_after_price",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 8,
  //             "unit_id": 1,
  //             "value": "custom_price_1",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 9,
  //             "unit_id": 1,
  //             "value": "custom_price_2",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 10,
  //             "unit_id": 1,
  //             "value": "custom_price_3",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         },
  //         {
  //             "id": 11,
  //             "unit_id": 1,
  //             "value": "custom_price_4",
  //             "single_dpp": "",
  //             "single_dpp_in_tax": "",
  //             "profit_percent": "",
  //             "single_dsp": "",
  //             "single_dsp_inc_tax": ""
  //         }
  //     ],
  //     "tableDataChildOne": [
  //         {
  //             "id": 1,
  //             "unit_id": "",
  //             "value": "default_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 2,
  //             "unit_id": "",
  //             "value": "whole_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 3,
  //             "unit_id": "",
  //             "value": "retail_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 4,
  //             "unit_id": "",
  //             "value": "minimum_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 5,
  //             "unit_id": "",
  //             "value": "last_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 6,
  //             "unit_id": "",
  //             "value": "ecm_before_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 7,
  //             "unit_id": "",
  //             "value": "ecm_after_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 8,
  //             "unit_id": "",
  //             "value": "custom_price_1",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 9,
  //             "unit_id": "",
  //             "value": "custom_price_2",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 10,
  //             "unit_id": "",
  //             "value": "custom_price_3",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 11,
  //             "unit_id": "",
  //             "value": "custom_price_4",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         }
  //     ],
  //     "tableDataChildTwo": [
  //         {
  //             "id": 1,
  //             "unit_id": "",
  //             "value": "default_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 2,
  //             "unit_id": "",
  //             "value": "whole_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 3,
  //             "unit_id": "",
  //             "value": "retail_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 4,
  //             "unit_id": "",
  //             "value": "minimum_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 5,
  //             "unit_id": "",
  //             "value": "last_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 6,
  //             "unit_id": "",
  //             "value": "ecm_before_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 7,
  //             "unit_id": "",
  //             "value": "ecm_after_price",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 8,
  //             "unit_id": "",
  //             "value": "custom_price_1",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 9,
  //             "unit_id": "",
  //             "value": "custom_price_2",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 10,
  //             "unit_id": "",
  //             "value": "custom_price_3",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         },
  //         {
  //             "id": 11,
  //             "unit_id": "",
  //             "value": "custom_price_4",
  //             "single_dpp": 0,
  //             "single_dpp_in_tax": 0,
  //             "profit_percent": 0,
  //             "single_dsp": 0,
  //             "single_dsp_inc_tax": 0
  //         }
  //     ]
  // }

  // new product
  //   name:BISCUITS 2220
  // product_type:single
  // unit_id:1
  // sub_unit_id[]:1
  // sub_unit_id[]:2
  // category_id:1
  // sub_category_id:11
  // tax_id:1
  // enable_stock:1
  // alert_quantity:10
  // code:bst2220
  // code2:bs2220
  // barcode_type:C128
  // expiry_period:12
  // expiry_period_type:months
  // weight:
  // custom_field_1:
  // custom_field_2:
  // custom_field_3:
  // custom_field_4:
  // description:hello world
  // warranty_id:3
  // not_for_sale:0
  // full_description:22222222
  // product_locations[]:1
  // //unit_D[]:1
  // //unit_D[]:2
  // //single_dpp1[]:100
  // //single_dpp1[]:200
  // //single_dpp_inc_tax1[]:125
  // //single_dpp_inc_tax1[]:1253
  // //profit_percent1[]:25
  // //profit_percent1[]:25
  // //single_dsp1[]:16
  // //single_dsp1[]:15
  // //single_dsp_inc_tax1[]:25
  // //single_dsp_inc_tax1[]:150
  // //single_dpp2[]:100
  // //single_dpp2[]:200
  // //single_dpp_inc_tax2[]:125
  // //single_dpp_inc_tax2[]:1253
  // //profit_percent2[]:25
  // //profit_percent2[]:25
  // //single_dsp2[]:16
  // //single_dsp2[]:15
  // //single_dsp_inc_tax2[]:25
  // //single_dsp_inc_tax2[]:150
  // //single_variation_id1:126
  // product_racks[][1][rack]:12
  // product_racks[][1][row]:23
  // product_racks[][1][position]:34
  // product_racks[][5][rack]:45
  // product_racks[][5][row]:56
  // product_racks[][5][position]:67
  // table_price_1[0][unit_id]:1
  // table_price_1[0][value]:default_price
  // table_price_1[0][single_dpp]:1000
  // table_price_1[0][single_dpp_inc_tax]:1050
  // table_price_1[0][profit_percent]:10
  // table_price_1[0][single_dsp]:1100
  // table_price_1[0][single_dsp_inc_tax]:1155
  // table_price_1[1][unit_id]:2
  // table_price_1[1][value]:whole_price
  // table_price_1[1][single_dpp]:1000
  // table_price_1[1][single_dpp_inc_tax]:1050
  // table_price_1[1][profit_percent]:10
  // table_price_1[1][single_dsp]:1100
  // table_price_1[1][single_dsp_inc_tax]:1155

  const token = getCookie('token')
  const response = await axios.post(
    'https://test.izocloud.net/api/app/react/products/save',
    {
      name: product.name,
      product_type: product.product_type,
      unit_id: product.unit_id,
      sub_unit_id: product.sub_unit_id,
      category_id: product.category_id,
      sub_category_id: product.sub_category_id,
      tax_id: 1, //product.tax,
      enable_stock: product.enable_stock,
      alert_quantity: product.alert_quantity,
      code: product.code,
      code2: product.code2,
      barcode_type: product.barcode_type,
      expiry_period: product.expiry_period,
      expiry_period_type: product.expiry_period_type,
      weight: product.weight,
      custom_field_1: product.custom_field_1,
      custom_field_2: product.custom_field_2,
      custom_field_3: product.custom_field_3,
      custom_field_4: product.custom_field_4,
      description: product.short_description.blocks[0].text,
      warranty_id: product.warranty_id,
      not_for_sale: product.not_for_sale === false ? 0 : 1,
      full_description: product.long_description.blocks[0].text,
      product_locations: [product.location],
      product_racks: [
        {
          1: {
            rack: 12,
            row: 23,
            position: 34
          },
          5: {
            rack: 45,
            row: 56,
            position: 67
          }
        }
      ],
      table_price_1: [
        {
          unit_id: product.unit_id,
          value: 'default_price',
          single_dpp: product.tableData[0].single_dpp,
          single_dpp_inc_tax: product.tableData[0].single_dpp_in_tax,
          profit_percent: product.tableData[0].profit_percent,
          single_dsp: product.tableData[0].single_dsp,
          single_dsp_inc_tax: product.tableData[0].single_dsp_inc_tax
        },
        {
          unit_id: product.unit_id,
          value: 'whole_price',
          single_dpp: product.tableData[1].single_dpp,
          single_dpp_inc_tax: product.tableData[1].single_dpp_in_tax,
          profit_percent: product.tableData[1].profit_percent,
          single_dsp: product.tableData[1].single_dsp,
          single_dsp_inc_tax: product.tableData[1].single_dsp_inc_tax
        }
      ]
    },
    {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    }
  )

  console.log(response.data, '===> response from saveProduct 🙌🙌')

  return response.data
})

// Then, create the slice
const productSlice = createSlice({
  name: 'products',
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(saveProduct.pending, state => {
      state.loading = 'loading'
      console.log('loading')
    })
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      state.entities.push(action.payload)
      state.loading = 'idle'
      console.log('fulfilled')
    })
    builder.addCase(saveProduct.rejected, state => {
      state.loading = 'idle'
      console.log('rejected')
    })
  }
})

export default productSlice.reducer
